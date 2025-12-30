import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import OrderReview from '@/components/PageDetailProduct/OrderReview'
import OrderSubtotal, { LazyOrderSubtotal } from '@/components/PageDetailProduct/OrderSubtotal'

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

import { LuShoppingCart } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa6'

import { readProduct } from '@/service/product.service'

import { breadReviews } from '@/components/DummyData/DummyDataReview'

type dataProps = {
    id: number
    imageUrl: string
    name: string
    stock: number
    price: number
    description: string
    createdAt: string
    updatedAt: string
}

type Review = {
    name: string
    star: number
    date: string
    review: string
}

export default function Product() {
    const [data, setData] = useState<dataProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const id = Number(useParams().id)
    if (!id) return

    useEffect(() => {

        readProduct(id)
            .then((res) => {
                setData(res.data.product)
            })
            .catch(() => {
                navigate('/')
            })
            .finally(() => setIsLoading(false))

    }, [id])

    return (
        <>
            <div className='flex flex-wrap gap-4 justify-center mt-15'>

                {isLoading && <LazyDetailProduct />}
                {!isLoading && <DetailProduct data={data} breadReviews={breadReviews} />}

                <div className='w-full md:w-[35%] xl:w-[30%]'>
                    {isLoading && <LazyOrderSubtotal />}
                    {!isLoading && data && <OrderSubtotal id={data?.id} name={data?.name} price={data?.price} />}
                </div>
                
            </div>
        </>
    )
}

type DetailProductProps = {
    data?: dataProps | null
    breadReviews?: Review[]
}

export const DetailProduct = ({ data, breadReviews }: DetailProductProps) => {
    return (
        <Card className='w-full md:w-[60%] mt-4'>
            <CardContent className='px-4'>
                <div className='flex flex-col md:flex-row gap-4 mt-2 md:mt-0'>
                    <img src={data?.imageUrl} alt='' className='w-full md:w-[40%] h-fit aspect-square object-center object-cover rounded-xl' />
                    <div className='w-full md:w-[60%] space-y-1'>
                        <CardTitle className='text-xl md:text-3xl'>{data?.name}</CardTitle>
                        <CardDescription className='text-xl md:text-3xl'>Rp {data?.price.toLocaleString('id-ID')}</CardDescription>
                        <CardDescription className='font-normal flex items-center text-base md:text-lg'> <FaStar className='text-yellow-400 mr-2' /> 4.5 &bull; 12 Reviews</CardDescription>
                        <CardDescription className='font-normal text-base md:text-lg mt-8'>{data?.description}</CardDescription>
                    </div>
                </div>

            </CardContent>

            {breadReviews && breadReviews.map((review, i) => (
                <OrderReview
                    key={i}
                    name={review.name}
                    star={review.star}
                    date={review.date}
                    reviewComment={review.review}
                />
            ))}

        </Card>
    )
}

const LazyDetailProduct = () => {
    return (
        <Card className='w-full md:w-[60%] mt-4'>

            <CardContent className='px-4'>

                <div className='flex flex-col md:flex-row gap-4 mt-2 md:mt-0'>
                    <Skeleton className='w-full md:w-[40%] h-fit aspect-square bg-gray-300 rounded-xl' />
                    <div className='w-full md:w-[60%] space-y-1'>
                        <Skeleton className='w-50 h-8 bg-gray-300 rounded-full' />
                        <Skeleton className='w-40 h-8 bg-gray-300 rounded-full mt-3' />
                        <Skeleton className='w-45 h-6 bg-gray-300 rounded-full mt-3' />
                        <Skeleton className='w-full h-4 bg-gray-300 rounded-full mt-10' />
                        <Skeleton className='w-full h-4 bg-gray-300 rounded-full mt-3' />
                        <Skeleton className='w-full h-4 bg-gray-300 rounded-full mt-3' />
                        <Skeleton className='w-25 h-4 bg-gray-300 rounded-full mt-3' />
                    </div>
                </div>

            </CardContent>

        </Card>
    )
}
