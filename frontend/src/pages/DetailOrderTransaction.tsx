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
import DataDetailOrder, { LazyDataDetailOrder } from '@/components/PageDetailOrderTransaction/DataDetailOrder'

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

    useEffect(() => {
        if (!id || !jwtToken) {
            navigate('/')
            return
        }

        readOrder(jwtToken, id)
            .then(res => {
                setOrder(res.data.order)
            })
            .catch((error) => {
                navigate('/')
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id, jwtToken, navigate])

    return (
        <>
            {!loadinng &&
                <DataDetailOrder order={order} setOrder={setOrder} feeShipping={feeShipping} />
            }
            {loadinng &&
                <LazyDataDetailOrder />
            }

        </>
    )
}

