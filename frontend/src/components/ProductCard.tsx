import React, { ReactNode } from 'react'
import useCartStore from '@/store/cart.store'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LuShoppingCart } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

type ProductCardProps = {
  id: number,
  name: string,
  price: number,
  description: string,
}



export const LazyProductCard = () => {
  return (
    <Card className="w-[48%] lg:w-[30%] xl:w-[25%] mt-4">
      <CardHeader>
        <Skeleton className='w-full aspect-square bg-gray-200 rounded-md' />
        <Skeleton className='w-full bg-gray-200 h-6' />
        <Skeleton className='w-full bg-gray-200 h-6' />
        <Skeleton className='w-full bg-gray-200 h-6' />
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button variant='outline' className='w-full'> <Skeleton className='w-full bg-gray-200 h-6' /> </Button>
      </CardFooter>
    </Card>
  )
}

export default function ProductCard({ id, name, price, description }: ProductCardProps) {
  const navigate = useNavigate()
  const { items, addToCart } = useCartStore()
  return (
    <Card className="w-[48%] lg:w-[30%] xl:w-[25%] mt-4">
      <CardHeader>
        <div className='w-full aspect-square bg-gray-400 rounded-md cursor-pointer' onClick={() => navigate(`/product/${id}`)}></div>
        <CardTitle className='truncate cursor-pointer' onClick={() => navigate(`/product/${id}`)}>{name}</CardTitle>
        <CardDescription> Rp {price.toLocaleString('id-ID')} </CardDescription>
        <CardDescription className='text-sm md:text-base font-normal truncate'>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button variant='default' className='w-full' onClick={() => (addToCart({ id, name }))}> <LuShoppingCart /> Add to Cart </Button>
        {/* <Button variant='default' className='w-full' onClick={() =>alert(JSON.stringify(items))}> alert </Button> */}
      </CardFooter>
    </Card>
  )
}


