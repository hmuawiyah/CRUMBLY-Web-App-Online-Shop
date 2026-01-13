import React from 'react'
import { Link } from 'react-router-dom'
import { dummyCartType as DC } from '@/components/DummyData/DummyDataCart'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'

import { LuCirclePlus, LuCircleMinus, LuTrash2 } from 'react-icons/lu'

type Props = {
  item: DC
  onQty: (id: string | number, delta: number) => void
  onRemove: (id: string | number) => void
  onToggle: (id: string | number) => void
}

export const NoDataOrderCart = () => (
  <Card className='w-full mt-4 gap-0'>
    <CardContent className='px-2 md:px-4'>
      <div className='flex flex-col w-full h-30 items-center justify-center'>
        <p className='text-lg mb-3'>Oops! Nothing in your cart yet.</p>
        <Link to={'/'}> <Button> See other products </Button> </Link>
      </div>
    </CardContent>
  </Card>
)

export const LazyOrderCart = () => (
  <Card className='w-full mt-4 gap-0'>
    <CardContent className='px-2 md:px-4'>
      <div className='flex gap-4 items-start'>
        <input type='checkbox' className='w-4 h-4' />
        <div className='flex-1'>
          <div className='flex gap-3'>
            <Skeleton className='aspect-square w-20 h-20 bg-gray-300 rounded-md' />
            <div className='flex flex-col justify-between w-full'>
              <div>
                <Skeleton className='w-32 h-4 bg-gray-300 rounded-full' />
                <Skeleton className='w-24 h-4 bg-gray-300 rounded-full mt-2' />
              </div>
              <div className='flex justify-end'>
                <Skeleton className='w-24 h-4 bg-gray-300 rounded-full mt-2 text-right' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>

    <hr className='my-2 md:my-4 border border-gray-200' />

    <CardContent className='px-2 md:px-4'>
      <div className='flex justify-between'>
        <Skeleton className='w-38 h-4 bg-gray-300 rounded-full' />
        <Skeleton className='w-42 h-4 bg-gray-300 rounded-full mt-2' />
      </div>
    </CardContent>
  </Card>
)

export default function OrderCart({ item, onQty, onRemove, onToggle }: Props) {
  const totalPrice = (item.price ?? 0) * (item.qty ?? 1)

  return (
    <Card className='w-full mt-4 gap-0'>
      <CardContent className='px-2 md:px-4'>
        <div className='flex gap-4 items-start'>
          <input
            type='checkbox'
            checked={!!item.selected}
            onChange={() => onToggle(item.id)}
            className='w-4 h-4'
          />

          <div className='flex-1 flex gap-3'>
            <img className="w-20 h-20 aspect-square object-center object-cover rounded-lg" src={item.image} alt={item.name} />
            <div className='flex flex-col justify-between w-full'>
              <div>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className='text-sm opacity-75'>{item.qty}x Quantity</CardDescription>
              </div>
              <CardDescription className='text-right'>
                Rp {(item.price ?? 0).toLocaleString('id-ID')}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardContent>

      <hr className='my-2 md:my-4 border border-gray-200' />

      <CardContent className='px-2 md:px-4'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col md:flex-row w-full'>
            <div>Total</div>
            <div className='font-bold ml-1'>Rp {totalPrice.toLocaleString('id-ID')}</div>
          </div>

          <div className='flex items-center gap-3'>
            <Button
              variant='ghostDestructive'
              onClick={() => onRemove(item.id)}
              className='rounded-full hover:bg-gray-100'
            >
              <LuTrash2 />
            </Button>

            <div className='flex items-center border border-gray-200 rounded-full'>
              <Button variant='ghost' onClick={() => onQty(item.id, -1)}>
                <LuCircleMinus />
              </Button>
              <div className='px-3 py-1 min-w-[10px] text-center'>{item.qty}</div>
              <Button variant='ghost' onClick={() => onQty(item.id, 1)}>
                <LuCirclePlus />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
