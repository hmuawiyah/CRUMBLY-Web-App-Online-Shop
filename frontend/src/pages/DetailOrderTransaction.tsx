import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cancelOrder, readOrder } from '@/service/order.service'

import { Button } from '@/components/ui/button'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { PayButtonTokenOnly } from '@/components/PayButton'

import { LuShoppingCart, LuSearch, LuCopy } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa6'

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

export default function DetailOrderTransaction() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [order, setOrder] = useState<orderProps | any>(null)
    const [loadinng, setLoading] = useState<boolean>(true)

    const feeShipping = 15000
    const jwtToken = localStorage.getItem('token')
    // if (!id) return

    useEffect(() => {
        if (!id || !jwtToken) {
            navigate('/')
            return
        }

        readOrder(jwtToken, id)
            .then(res => {
                setOrder(res.data.order)
                // alert('res.data')
            })
            .catch((error) => {
                // console.log('Error: ' + error)
                navigate('/')
            })
            .finally(() => {
                setLoading(false)
            })

        // alert('here')
    }, [id, jwtToken, navigate])

    const toLocalDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }

    const toLocalTime = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const handleCancelOrder = async (id: string) => {
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) return

        try {
            await cancelOrder(jwtToken, id)

            setOrder((o: orderProps | any) => ({ ...o, status: 'CANCELED' }));

        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    const toCapitalize = (val: string = '') => {
        val = val.toLowerCase()
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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


    if (!order) return <div></div>

    return (
        <>
            {/* <Button onClick={() => alert(id)}>id dari transaction</Button>
            <Button onClick={() => alert(jwtToken)}>jwtToken</Button>
            <Button onClick={() => console.log(JSON.stringify(order))}>order</Button> */}

            <Card className='w-full md:w-[75%] mt-15 gap-0'>
                <CardHeader className='gap-0 pb-2 md:pb-4'>
                    <div className='flex justify-between opacity-50'>
                        <CardTitle className='text-xs! md:text-sm!'>{toLocalDate(order?.createdAt)}</CardTitle>
                        <CardTitle className='text-xs! md:text-sm!'>{toTitleCase(order?.status)}</CardTitle>
                    </div>
                </ CardHeader>
                {order?.items.map((item: itemsProps) => (
                    <>
                        <CardContent className='gap-0 px-2 md:px-4'>
                            <div className='flex py-3'>
                                <div className='aspect-1/1 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400 mr-3'> IMG </div>
                                <div className='flex flex-col justify-between w-full'>
                                    <div>
                                        <CardTitle>{item.product.name}</CardTitle>
                                        <CardTitle className='text-sm! md:text-base! opacity-75'>{item.quantity}x Quantity</CardTitle>
                                    </div>
                                    <CardDescription className='text-right'> Rp {item.subtotal.toLocaleString('id-ID')} </CardDescription>
                                </div>
                            </div>
                        </CardContent>

                        <hr className='my-3 border border-gray-200' />
                    </>
                ))}

                <CardContent className='gap-0 px-2 md:px-4'>
                    <div className='flex py-3'>
                        {/* <div className='aspect-1/1 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-400 mr-3'> IMG </div> */}
                        <div className='flex justify-between w-full'>
                            {/* <div> */}
                            <CardTitle>Fee Shipping</CardTitle>
                            {/* <CardTitle className='text-sm! md:text-base! opacity-75'>{item.quantity}x Quantity</CardTitle> */}
                            <CardDescription > Rp {feeShipping.toLocaleString('id-ID')} </CardDescription>
                            {/* </div> */}
                        </div>
                    </div>
                </CardContent>

                <hr className='my-3 border border-gray-200' />

                <CardContent className='px-2 md:px-4'>
                    <CardTitle className='font-semibold mb-5'>Detail Transaction</CardTitle>

                    <div className='flex flex-col md:flex-row w-full items-start mb-20 space-y-5'>
                        <table className='w-full m-0!'>
                            <tbody className='[&_td]:py-2 [&_tr]:border-b'>
                                <tr>
                                    <td className='font-medium w-1/2'>Date</td>
                                    <td className='w-1/2'>{toLocalDate(order?.createdAt)}</td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Time</td>
                                    <td>{toLocalTime(order?.createdAt)}</td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Status</td>
                                    <td>{toTitleCase(order?.status)}</td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Note</td>
                                    <td>{order?.notes || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='w-full'>
                            <tbody className='[&_td]:py-2 [&_tr]:border-b'>
                                <tr>
                                    <td className='font-medium'>Shipping Service</td>
                                    <td>JNT</td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Tracking Number</td>
                                    <td className='flex gap-1 items-center cursor-pointer underline'>JNT1234567890 <LuCopy /></td>
                                </tr>
                                <tr>
                                    <td className='flex items-start font-medium w-1/2'>Address</td>
                                    <td className='w-1/2'>
                                        <div>
                                            {order?.user.name}
                                        </div>
                                        <div>
                                            {'(' + order?.address.phone + ')'}
                                        </div>
                                        <div>
                                            {order?.address.street + ', ' + order?.address.city + ', ' + order?.address.postalCode}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </CardContent>


                <CardFooter className='flex justify-between gap-2'>
                    <div className='flex flex-col md:flex-row items-center gap-3'>
                        <CardTitle className='text-sm! md:text-base! flex items-center'>
                            Total
                            <span className='font-bold ml-1'>
                                Rp {(order?.items.reduce((sum: any, item:any) =>
                                    sum = sum + item.subtotal, 0
                                ) + feeShipping).toLocaleString('id-ID')}
                            </span>
                        </CardTitle>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-3'>
                        {(order?.status == 'COMPLETED') && <Button variant='outline' className='font-normal'> <LuShoppingCart /> Buy Again </Button>}
                        {(order?.status == 'WAITING PAYMENT') && <PayButtonTokenOnly token={order.midtransToken} />}
                        {(order?.status == 'WAITING PAYMENT') && <Button variant={'outlineDestructive'} onClick={() => handleCancelOrder(order.id)}>Canceled</Button>}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
