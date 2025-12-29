import prisma from '../libs/prisma.js';
import midtransClient from 'midtrans-client';

const coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export default async function midtransNotification(req, res) {
    try {

        const notification = req.body;
        console.log({
            notification
        })

        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;
        const paymentType = notification.payment_type;
        const transactionId = notification.transaction_id;
        const fraudStatus = notification.fraud_status;

        const existingPayment = await prisma.payments.findUnique({
            where: {
                orderId
            }
        });

        if (existingPayment) {
            await prisma.payments.update({
                where: {
                    orderId
                },
                data: {
                    transactionStatus,
                    paymentType,
                    transactionId,
                    fraudStatus
                }
            });
        } else {
            await prisma.payments.create({
                data: {
                    orderId,
                    transactionStatus,
                    paymentType,
                    transactionId,
                    fraudStatus
                }
            });

        }

        let status = 'WAITING PAYMENT';
        let statusUpdate = 'PENDING';
        if (transactionStatus === 'capture' && fraudStatus === 'accept') {
            status = 'PROCESSING';
            statusUpdate = 'PAID';
        } else if (transactionStatus === 'settlement') {
            status = 'PROCESSING';
            statusUpdate = 'PAID';
        } else if (['deny', 'cancel', 'expire'].includes(transactionStatus)) {
            status = 'CANCELED';
            statusUpdate = 'CANCELED';
        }

        await prisma.orders.update({
            where: {
                id: orderId
            },
            data: {
                status: status,
                paymentStatus: statusUpdate,
            }
        });

        return res.status(200).json({
            msg: 'Notification handled',
            notification
        });

    } catch (err) {
        console.log('Error: ' + err.message)
        return res.status(500).json({
            error: err.message
        });
    }
}