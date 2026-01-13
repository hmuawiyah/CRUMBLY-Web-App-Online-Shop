import prisma from '../libs/prisma.js';
import snap from '../utils/midtrans.js';
import midtransClient from 'midtrans-client';

const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export const createOrder = async (req, res) => {
    const {
        items,
        address,
        notes
    } = req.body;

    if (!address) {
        return res.status(400).json({
            message: 'Address is required'
        })
    }

    try {

        let itemsData = [];
        let itemsDataForMidtrans = [];
        let totalAmount = 0;
        let shippingFee = 15000;

        for (const i of items) {
            const product = await prisma.products.findUnique({
                where: {
                    id: i.productId
                }
            });

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }

            const unitPrice = product.price;
            const subtotal = unitPrice * i.quantity;

            itemsData.push({
                productId: i.productId,
                quantity: i.quantity,
                unitPrice,
                subtotal
            });

            itemsDataForMidtrans.push({
                id: i.productId,
                price: product.price,
                quantity: i.quantity,
                name: product.name
            });

            totalAmount += subtotal;
        }


        itemsDataForMidtrans.push({
            id: 'SHIPPING',
            price: shippingFee,
            quantity: 1,
            name: 'Shipping Fee'
        });


        let order = await prisma.orders.create({
            data: {
                userId: req.user.id,
                status: 'WAITING PAYMENT',
                totalAmount: totalAmount + shippingFee,
                userAddressesId: address.id,
                notes,
                midtransToken: '',
                items: {
                    create: itemsData
                }
            },
            include: {
                items: true
            }
        });
        console.log('[order.controller.js] setelah let order')


        const parameter = {
            transaction_details: {
                order_id: order.id,
                gross_amount: totalAmount + shippingFee
            },

            credit_card: {
                secure: true
            },


            item_details: itemsDataForMidtrans,

            customer_details: {
                first_name: req.user.name,
                last_name: '-',
                email: req.user.email,
                phone: address.phone,
                billing_address: {
                    first_name: req.user.name,
                    last_name: '',
                    email: req.user.email,
                    phone: address.phone,
                    address: address.street,
                    city: address.city,
                    postal_code: address.postalCode,
                    country_code: 'IDN'
                },
                shipping_address: {
                    first_name: req.user.name,
                    last_name: '-',
                    email: req.user.email,
                    phone: address.phone,
                    address: address.street,
                    city: address.city,
                    postal_code: address.postalCode,
                    country_code: 'IDN'
                }
            }
        };

        const snapRes = await snap.createTransaction(parameter);

        order = await prisma.orders.update({
            where: {
                id: order.id
            },
            data: {
                midtransToken: snapRes.token,
            },
        });

        return res.status(201).json({
            msg: 'success create order!',
            order,
            transactionToken: snapRes.token,
            snapRes: snapRes
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const readOrder = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id
            },
            include: {
                items: {
                    include: {
                        product: true,
                    }
                },
                address: true,
                user: {
                    select: {
                        name: true
                    },
                },
            }
        });

        if (!order) {
            console.log('!order')
            return res.status(404).json({
                msg: 'Order not found',
            });
        }

        console.log({
            order
        });

        return res.status(200).json({
            msg: 'success get order!',
            order
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

export const readAllOrders = async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({
            msg: 'success get all orders!',
            orders
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const readAllOrdersBuyer = async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        });
        return res.status(200).json({
            msg: 'success get all orders!',
            orders
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const updateOrder = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        userId,
        status,
        totalAmount,
        midtransOrderId,
        address,
        notes
    } = req.body;
    const updateData = {};
    if (userId) updateData.userId = userId;
    if (status) updateData.status = status;
    if (totalAmount) updateData.totalAmount = totalAmount;
    if (midtransOrderId) updateData.midtransOrderId = midtransOrderId;
    if (address) updateData.address = address;
    if (notes) updateData.notes = notes;
    try {
        const order = await prisma.orders.update({
            where: {
                id
            },
            data: updateData,
        });
        return res.status(201).json({
            msg: 'success update order!',
            order
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const cancelOrder = async (req, res) => {
    const {
        id
    } = req.params;
    const userId = req.user.id;

    try {
        const order = await prisma.orders.findUnique({
            where: {
                id
            }
        });

        if (!order) return res.status(404).json({
            msg: 'Order not found'
        });
        if (order.userId !== userId) return res.status(403).json({
            msg: 'Not your order'
        });
        if (order.status !== 'WAITING PAYMENT') return res.status(400).json({
            msg: 'Order cannot be cancelled'
        });

        try {
            const cancelRes = await coreApi.cancelTransaction(order.id);
        } catch (err) {
            console.warn('Midtrans cancel failed, order might not be paid yet:', err.message);
        }

        const canceledOrder = await prisma.orders.update({
            where: {
                id
            },
            data: {
                status: 'CANCELED'
            }
        });

        return res.status(200).json({
            msg: 'Order cancelled',
            order: canceledOrder
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

export const checkExpiredOrder = async (req, res) => {
    const {
        midtransToken
    } = req.body

    try {
        const order = await prisma.orders.findFirst({
            where: {
                midtransToken: midtransToken
            }
        })

        if (!order) return alert('There is no order')

        const createdAt = new Date(order.createdAt);
        const now = new Date();

        const isMoreThan24Hours = now - createdAt > 24 * 60 * 60 * 1000;

        if (isMoreThan24Hours) {

            try {
                const cancelRes = await coreApi.cancelTransaction(order.id);
            } catch (err) {
                console.warn('Midtrans cancel failed, order might not be paid yet:', err.message);
            }

            const canceledOrder = await prisma.orders.update({
                where: {
                    id: order.id
                },
                data: {
                    status: 'CANCELED'
                }
            });

            return res.status(200).json({
                msg: 'Order cancelled',
                orderId: order.id,
                isExpired: true
            });
        } else {
            console.log('Belum 24 jam');

            return res.status(200).json({
                msg: 'Let\'s pay the order',
                orderId: order.id,
                isExpired: false
            });
        }


    } catch (error) {
        return res.status(500).json({
            error: err.message
        });
    }
}