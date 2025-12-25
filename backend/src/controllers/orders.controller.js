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

        // console.log('[order.controller.js] setelah for of')

        itemsDataForMidtrans.push({
            id: 'SHIPPING',
            price: shippingFee,
            quantity: 1,
            name: 'Shipping Fee'
        });
        // console.log('[order.controller.js] setelah itemsDataForMidtrans')


        // try {
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
        // } catch (error) {
        //     console.log("Error: " + error)
        // }

        // totalAmount += shippingFee        
        // const midtransOrderId = `BREADFREE-${order.id}`;

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
        // console.log('[order.controller.js] setelah let parameter')

        const snapRes = await snap.createTransaction(parameter);
        // console.log('[order.controller.js] setelah snapRes')

        order = await prisma.orders.update({
            where: {
                id: order.id
            },
            data: {
                midtransToken: snapRes.token,
            },
        });
        // console.log('[order.controller.js] setelah order = await prisma.orders.update')

        // console.log({
        //     msg: 'success create order!',
        //     order,
        //     transactionToken: snapRes.token,
        //     snapRes: snapRes
        // });
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
            // include: { items: true, payment: true }
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
            // idNya: id
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
        // console.log({
        //     orders
        // });
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
                                name: true
                            }
                        }
                    }
                }
            }
        });
        // console.log({
        //     orders
        // });
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
        // console.log({
        //     order
        // });
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
    } = req.params; // order UUID
    const userId = req.user.id;

    try {
        // Ambil order dulu
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

        // Cancel di Midtrans
        try {
            const cancelRes = await coreApi.cancelTransaction(order.id);
            // console.log('Midtrans cancel response:', cancelRes);
        } catch (err) {
            console.warn('Midtrans cancel failed, order might not be paid yet:', err.message);
            // Optional: tetap update DB meskipun cancel gagal
        }

        // Update DB
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