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
import toast from 'react-hot-toast'

type ProductCardProps = {
  id: number,
  imageUrl: string,
  name: string,
  price: number,
  description: string,
}



export const LazyProductCard = () => {
  return (
    <Card className="w-[48%] lg:w-[30%] xl:w-[25%] mt-4">
      <CardHeader className='gap-1'>
        <Skeleton className='w-full h-fit aspect-square bg-gray-300 rounded-md' />
        <Skeleton className='w-full h-6 bg-gray-300 rounded-full' />
        <Skeleton className='w-full h-6 bg-gray-300 rounded-full' />
        <Skeleton className='w-full h-6 bg-gray-300 rounded-full' />
      </CardHeader>
      <CardFooter>
        <Skeleton className='w-full h-6 bg-gray-300 rounded-full mt-4' />
      </CardFooter>
    </Card>
  )
}

export default function ProductCard({ id, imageUrl, name, price, description }: ProductCardProps) {
  const navigate = useNavigate()
  const { items, addToCart } = useCartStore()
  return (
    <Card className="w-[48%] lg:w-[30%] xl:w-[25%] mt-4">
      <CardHeader>
        <img className='w-full aspect-square object-center object-cover cursor-pointer rounded-xl' src={imageUrl} alt={imageUrl} onClick={() => navigate(`/product/${id}`)} />
        <CardTitle className='truncate cursor-pointer' onClick={() => navigate(`/product/${id}`)}>{name}</CardTitle>
        <CardDescription> Rp {price.toLocaleString('id-ID')} </CardDescription>
        <CardDescription className='text-sm md:text-base font-normal truncate'>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="default"
          className="w-full"
          onClick={() => {
            addToCart({ id, name });
            toast.success("Item added!");
          }}
        >
          <LuShoppingCart /> Add to Cart
        </Button>
      </CardFooter>
    </Card >
  )
}


