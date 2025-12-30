import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '@/store/cart.store'

import { Skeleton } from '@/components/ui/skeleton'
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

import { LuCirclePlus, LuCircleMinus, LuTrash2, LuShoppingCart } from 'react-icons/lu'
import toast from 'react-hot-toast'

type OrderSubtotalProps = {
  id: number
  name: string
  price: number
}

export default function OrderSubtotal({ id, name, price }: OrderSubtotalProps) {
  const { addToCartMany } = useCartStore()

  const [qty, setQty] = useState<number>(1)

  const plusQty = () => {
    setQty(qty + 1)
  }

  const minusQty = () => {
    setQty(qty - 1)
  }

  useEffect(() => {
    if (qty < 1) { setQty(1) }
  }, [qty])

  return (
    <>
      <Card className="flex gap-5 sticky top-20! overflow-hidden mt-4">
        <CardHeader>
          <CardTitle className='text-2xl'>Subtotal</CardTitle>
          <CardDescription className='text-3xl!'>Rp {(price * qty).toLocaleString('id-ID')}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <div className="flex flex-col xl:flex-row items-center gap-3 w-full">

            <div className='flex w-full md:w-auto justify-end'>
              <div className="flex w-auto md:w-full items-center border border-gray-200 rounded-full">
                <Button variant='ghost' onClick={minusQty} >
                  <LuCircleMinus />
                </Button>
                <div className="px-3 py-1 min-w-[10px] text-center">{qty}</div>
                <Button variant='ghost' onClick={plusQty}>
                  <LuCirclePlus />
                </Button>
              </div>
            </div>

            <Button variant='default' onClick={() => {addToCartMany({ id, name, qty }); toast.success('item added!') }} className='flex-1 w-full'> <LuShoppingCart /> Add to Cart </Button>

          </div>
          
          <Link to={'/cart'} className='w-full'><Button variant='outline' className='w-full'> Continue to payment </Button> </Link>
        </CardFooter>
      </Card>

    </>
  )
}

export const LazyOrderSubtotal = () => {
  return (
    <Card className="flex gap-5 sticky top-20! overflow-hidden mt-4">
      <CardHeader>
        <Skeleton className='w-30 h-5 bg-gray-300 rounded-full' />
        <Skeleton className='w-50 h-7 bg-gray-300 rounded-full mt-2' />
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <div className="flex flex-col xl:flex-row items-center gap-3 w-full">

          <Skeleton className='w-1/3 h-7 bg-gray-300 rounded-full mt-2' />
          <Skeleton className='w-2/3 h-7 bg-gray-300 rounded-full mt-2' />

        </div>
        <Skeleton className='w-full h-7 bg-gray-300 rounded-full mt-2' />
      </CardFooter>
    </Card>
  )
}

