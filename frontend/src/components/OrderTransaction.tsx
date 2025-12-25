import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PayButtonTokenOnly } from '@/components/PayButton'

import { LuShoppingCart, LuSearch } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa6'
import { cancelOrder, readAllOrders } from '@/service/order.service'
import { Link } from 'react-router-dom'

type itemsProps = {
    id: string,
    orderId: string,
    productId: number,
    quantity: number,
    subtotal: number,
    unitPrice: number,
    product: { name: string }
}

type orderProps = {
    id: string,
    userId: string,
    status: string,
    totalAmount: number,
    address: string,
    notes: null
    paymentStatus: string,
    shippingService: string,
    trackingNumber: string,
    midtransToken: string,
    items: itemsProps[],
    createdAt: string,
    updatedAt: string
}

type OrderTransactionProps = {
    orders: orderProps[],
    setOrders: React.Dispatch<React.SetStateAction<orderProps[]>>
}

export default function OrderTransaction({ orders, setOrders }: OrderTransactionProps) {
    // const [orders, setOrders] = useState<orderProps[]>([])


    const toCapitalize = (val: string) => {
        val = val.toLowerCase()
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const toLocalDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }

    const toTitleCase = (val: string = ''): string => {
        return val
            .toLowerCase()
            .split(' ')
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(' ')
    }

    const handleCancelOrder = async (id: string) => {
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) return

        try {
            await cancelOrder(jwtToken, id)

            setOrders(prev =>
                prev.map(o =>
                    o.id === id
                        ? { ...o, status: 'CANCELED' }
                        : o
                )
            );

        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    return (
        <>
            {/* <Button onClick={() => { alert(orders); console.log(orders) }}>realAllOrders</Button> */}
            {orders?.map((order, i) => (
                <Card key={i} className="w-full md:w-[75%] mt-7 gap-0">
                    <CardHeader className='gap-0 pb-2 md:pb-4'>
                        <div className='flex justify-between opacity-50'>
                            <CardTitle className='text-xs! md:text-sm!'>{toLocalDate(order.createdAt)}</CardTitle>
                            <CardTitle className='text-xs! md:text-sm!'>{toTitleCase(order.status)}</CardTitle>
                        </div>
                    </ CardHeader>

                    {order.items.map((item, i) => (
                        <>
                            <CardContent key={i} className='gap-0 px-2 md:px-4'>
                                <div className="flex py-3">
                                    <div className="aspect-1/1 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400 mr-3"> IMG </div>
                                    <div className='flex flex-col justify-between w-full'>
                                        <div>
                                            <CardTitle>{item.product.name}</CardTitle>
                                            <CardTitle className="text-sm! md:text-base! opacity-75">{item.quantity}x Quantity</CardTitle>
                                        </div>
                                        <CardDescription className='text-right'> Rp {item.subtotal.toLocaleString('id-ID')} </CardDescription>
                                    </div>
                                </div>
                            </CardContent>

                            <hr className="my-3 border border-gray-200" />
                        </>
                    ))}

                    <CardFooter className="flex justify-between gap-2">
                        <div className='flex flex-col md:flex-row items-center gap-3'>
                            <CardTitle className="text-sm! md:text-base! flex items-center">Total <span className='font-bold ml-1'>Rp {order.totalAmount.toLocaleString('id-ID')}</span></CardTitle>
                            <Link to={`/transaction/${order.id}`}> <Button variant='outline' className='font-normal'> <LuSearch /> Details </Button> </Link>
                        </div>
                        <div className='flex flex-col md:flex-row items-center gap-3'>
                            {(order.status == 'COMPLETED') && <Button variant='outline' className='font-normal'> <LuShoppingCart /> Buy Again </Button>}
                            {(order.status == 'WAITING PAYMENT') && <PayButtonTokenOnly token={order.midtransToken} />}
                            {/* {(order.status == 'WAITING PAYMENT') && <Button variant={'outlineDestructive'} onClick={() => handleCancelOrder(order.id)}>Canceled</Button>} */}
                        </div>
                    </CardFooter>
                </Card>

            ))
            }
        </>
    )
}

export const NoDataOrderTransaction = () => (
    <Card className='w-full md:w-[75%] mt-7 gap-0'>
        <CardContent className='px-2 md:px-4'>
            <div className='flex flex-col w-full h-30 items-center justify-center'>
                <p className='text-lg mb-3'>Oops! Nothing in your transaction yet.</p>
                <Link to={'/'}> <Button> See other products </Button> </Link>
            </div>
        </CardContent>
    </Card>
)
