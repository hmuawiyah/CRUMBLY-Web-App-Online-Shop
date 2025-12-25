import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import OrderReview from '@/components/OrderReview'
import OrderSubtotal from '@/components/OrderSubtotal'

import { LuShoppingCart } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa6'

import { readProduct } from '@/service/product.service'
import { breadReviews } from '@/components/DummyDataReview'

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

export default function Product() {
    const [data, setData] = useState<dataProps | null>(null)
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

    }, [id])
    if(!data) return <div></div>

    return (
        <>
            {/* <Button onClick={() => console.log((data?.price))}>data id</Button> */}
            <div className='flex flex-wrap gap-4 justify-center mt-15'>
                <Card className='w-full md:w-[60%] mt-4'>
                    <CardContent className='px-4'>
                        <div className='flex flex-col md:flex-row gap-4 mt-2 md:mt-0'>
                            <div className='w-full md:w-[40%] h-fit aspect-square bg-gray-400 rounded-md'></div>
                            <div className='w-full md:w-[60%] space-y-1'>
                                <CardTitle className='text-xl md:text-3xl'>{data?.name}</CardTitle>
                                <CardDescription className='text-xl md:text-3xl'>Rp {data?.price.toLocaleString('id-ID')}</CardDescription>
                                <CardDescription className='font-normal flex items-center text-base md:text-lg'> <FaStar className='text-yellow-400 mr-2' /> 4.5 &bull; 12 Reviews</CardDescription>
                                <CardDescription className='font-normal text-base md:text-lg mt-8'>{data?.description}</CardDescription>
                                {/* <CardDescription className='font-normal text-base md:text-lg mt-8'>Traditional French baguette with a golden, crispy crust and soft, airy interior. Perfect for any meal. soft, airy interior. Perfect for</CardDescription> */}
                            </div>
                        </div>

                    </CardContent>

                    {breadReviews.map((review, i) => (
                        <OrderReview
                            key={i}
                            name={review.name}
                            star={review.star}
                            date={review.date}
                            reviewComment={review.review}
                        />
                    ))}

                </Card>

                <div className='w-full md:w-[35%] xl:w-[30%]'>
                    <OrderSubtotal id={data?.id} name={data?.name} price={data?.price} />
                </div>
            </div>
        </>
    )
}
