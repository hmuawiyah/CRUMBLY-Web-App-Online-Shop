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
import { Skeleton } from '@/components/ui/skeleton'
import { PayButtonTokenOnly } from '@/components/PayButton'

import { LuShoppingCart, LuSearch, LuCopy } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa6'

import { toLocalDate, toLocalTime, toCapitalize, toTitleCase } from '@/helper/simpleFn'

type itemsProps = {
    id: string,
    orderId: string,
    productId: number,
    quantity: number,
    subtotal: number,
    unitPrice: number,
    product: { name: string, imageUrl: string }
}

type orderProps = {
    id: string
    userId: string
    status: string
    totalAmount: number
    notes: null
    paymentStatus: string
    shippingService: string
    trackingNumber: string
    midtransToken: string
    items: itemsProps[]
    createdAt: string
    updatedAt: string
    user: { name: string }
    address: {
        phone: string
        street: string
        city: string
        postalCode: string
    }
}

type DataDetailOrder = {
    order: orderProps
    setOrder: React.Dispatch<React.SetStateAction<orderProps>>
    feeShipping: number
}

export default function DataDetailOrder({ order, setOrder, feeShipping }: DataDetailOrder) {

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

    const handleOrderExpired = (orderId: string) => {
        setOrder((prev) => {
            if (!prev) return prev
            if (prev.id !== orderId) return prev

            return {
                ...prev,
                status: 'CANCELED'
            }
        })
    }

    return (
        <>

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
                            <div className='flex py-3 gap-3'>
                                <img className="w-20 h-20 aspect-square object-center object-cover rounded-lg" src={item.product.imageUrl} alt={item.product.name} />
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
                        <div className='flex justify-between w-full'>
                            <CardTitle>Fee Shipping</CardTitle>
                            <CardDescription > Rp {feeShipping.toLocaleString('id-ID')} </CardDescription>
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
                                    <td>{order?.shippingService || '-'}</td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Tracking Number</td>
                                    <td className='flex gap-1 items-center'>{order?.trackingNumber && (<LuCopy />) || '-'} </td>
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
                                Rp {(order?.items.reduce((sum: any, item: any) =>
                                    sum = sum + item.subtotal, 0
                                ) + feeShipping).toLocaleString('id-ID')}
                            </span>
                        </CardTitle>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-3'>
                        {(order?.status == 'COMPLETED') && <Button variant='outline' className='font-normal'> <LuShoppingCart /> Buy Again </Button>}
                        {(order?.status == 'WAITING PAYMENT') && <PayButtonTokenOnly midtransToken={order.midtransToken} onExpired={handleOrderExpired} />}
                        {(order?.status == 'WAITING PAYMENT') && <Button variant={'outlineDestructive'} onClick={() => handleCancelOrder(order.id)}>Canceled</Button>}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export const LazyDataDetailOrder = () => {
    return (
        <Card className='w-full md:w-[75%] mt-7 gap-0'>
            <CardHeader className='gap-0 pb-2 md:pb-4'>
                <div className='flex justify-between opacity-50'>
                    <Skeleton className='w-35 h-4 bg-gray-300 rounded-full' />

                    <Skeleton className='w-35 h-4 bg-gray-300 rounded-full' />
                </div>
            </ CardHeader>

            <CardContent className='gap-0 px-2 md:px-4'>
                <div className='flex py-3'>
                    <Skeleton className='aspect-1/1 w-20 h-fit bg-gray-300 rounded-lg mr-3' />
                    <div className='flex flex-col justify-between w-full'>
                        <div>
                            <Skeleton className='w-40 h-4 bg-gray-300 rounded-full' />
                            <Skeleton className='w-20 h-4 bg-gray-300 rounded-full mt-2' />
                        </div>
                        <div className='flex justify-end'>
                            <Skeleton className='w-30 h-4 bg-gray-300 rounded-full' />
                        </div>
                    </div>
                </div>

            </CardContent>

            <hr className='my-3 border border-gray-200' />

            <CardContent className='flex justify-between gap-2 px-2 md:px-4'>
                <Skeleton className='w-40 h-4 bg-gray-300 rounded-full' />
                <Skeleton className='w-40 h-4 bg-gray-300 rounded-full' />
            </CardContent>

            <hr className='my-3 border border-gray-200' />

            <CardContent className='px-2 md:px-4'>
                <Skeleton className='w-40 h-4 bg-gray-300 rounded-full' />

                <div className='flex flex-col md:flex-row w-full items-start mb-20 space-y-5'>
                    <table className='w-full m-0!'>
                        <tbody className='[&_td]:py-2 [&_tr]:border-b'>
                            <tr>
                                <td className='font-medium w-1/2'><Skeleton className='w-23 h-4 bg-gray-300 rounded-full' /></td>
                                <td className='w-1/2'><Skeleton className='w-32 h-4 bg-gray-300 rounded-full' /></td>
                            </tr>
                            <tr>
                                <td className='font-medium'><Skeleton className='w-23 h-4 bg-gray-300 rounded-full' /></td>
                                <td><Skeleton className='w-20 h-4 bg-gray-300 rounded-full' /></td>
                            </tr>
                            <tr>
                                <td className='font-medium'><Skeleton className='w-25 h-4 bg-gray-300 rounded-full' /></td>
                                <td><Skeleton className='w-25 h-4 bg-gray-300 rounded-full' /></td>
                            </tr>
                            <tr>
                                <td className='font-medium'><Skeleton className='w-20 h-4 bg-gray-300 rounded-full' /></td>
                                <td><Skeleton className='w-32 h-4 bg-gray-300 rounded-full' /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='w-full'>
                        <tbody className='[&_td]:py-2 [&_tr]:border-b'>
                            <tr>
                                <td className='font-medium'><Skeleton className='w-34 h-4 bg-gray-300 rounded-full' /></td>
                                <td><Skeleton className='w-15 h-4 bg-gray-300 rounded-full' /></td>
                            </tr>
                            <tr>
                                <td className='font-medium'><Skeleton className='w-34 h-4 bg-gray-300 rounded-full' /></td>
                                <td><Skeleton className='w-32 h-4 bg-gray-300 rounded-full' /></td>
                            </tr>
                            <tr>
                                <td className='flex items-start font-medium w-1/2'><Skeleton className='w-18 h-4 bg-gray-300 rounded-full' /></td>
                                <td className='w-1/2 space-y-2'>
                                    <Skeleton className='w-18 h-4 bg-gray-300 rounded-full' />
                                    <Skeleton className='w-15 h-4 bg-gray-300 rounded-full' />
                                    <Skeleton className='w-32 h-4 bg-gray-300 rounded-full' />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </CardContent>

            <CardFooter className='flex mt-4'>
                <Skeleton className='w-30 h-4 bg-gray-300 rounded-full' />
            </CardFooter>

        </Card>
    )
}