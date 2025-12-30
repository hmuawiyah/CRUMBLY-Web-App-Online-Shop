import React, { useEffect, useState } from 'react'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
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
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PayButton } from '@/components/PayButton'
import { Input } from '@/components/ui/input'

import { LuCirclePlus, LuCircleMinus, LuTrash2, LuShoppingCart, LuChevronDown, LuCircleX } from 'react-icons/lu'
import { readUserAddresses } from '@/service/userAddresses.service'


type Checked = DropdownMenuCheckboxItemProps['checked']

type UserAddress = {
  id: string
  userId: string
  addressName: string
  street: string
  city: string
  province: string
  postalCode: string
  phone: string
  createdAt: string
}

type SortByDropdownMenuProps = {
  selectAddress: UserAddress | null
  setSelectAddress: React.Dispatch<React.SetStateAction<UserAddress | null>>
}

const SortByDropdownMenu = ({ selectAddress, setSelectAddress }: SortByDropdownMenuProps) => {
  const [loading, setLoading] = useState(true)
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([])

  useEffect(() => {

    const jwtToken = localStorage.getItem('token')
    if (!jwtToken) return

    readUserAddresses(jwtToken)
      .then(res => {
        setUserAddresses((res.data.userAddresses as UserAddress[]))
      })
      .catch(error => {
        console.log('Error: ' + error.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* <Button onClick={() => { alert(JSON.stringify(selectAddress)) }}>selectAddress</Button>
      <Button onClick={() => { alert(JSON.stringify(userAddresses)) }}>userAddresses</Button> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>

          <Button variant='outline' className='w-full rounded-full'>
            {loading ? (
              <Skeleton className='h-[18.4px] w-[145.6px]' />
            ) : (
              <>
                {selectAddress ? selectAddress.addressName : 'Choose Address'} <LuChevronDown />
              </>
            )}
          </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-56'>
          <DropdownMenuGroup>
            {userAddresses?.map((item, i) => (
              <>
                <DropdownMenuItem
                  onClick={() => setSelectAddress(item)}
                >
                  {item.addressName}
                </DropdownMenuItem>
                {(i < userAddresses.length - 1) && <DropdownMenuSeparator />}
              </>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

type cartViewData = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  qty: number;
  subtotal: number;
  selected: boolean;
}

type OrderSummaryProps = {
  cartViewData: cartViewData[]
  totalPrice: number
}

export const LazyOrderSummary = () => (
  <>
    <Card className='flex gap-3 sticky top-20! overflow-hidden'>
      <CardHeader>
        {/* <CardTitle>Order Summary</CardTitle> */}
        <Skeleton className='w-35 h-6 bg-gray-300 rounded-full' />
        <table className='text-sm w-full table-fixed'>
          <tbody>
            <tr className='border-b '>
              <td className='py-1 w-[70%]'><Skeleton className='w-3/4 h-4 bg-gray-300 rounded-full' /></td>
              <td className='w-[30%]'><Skeleton className='w-full h-4 bg-gray-300 rounded-full' /></td>
            </tr>
            <tr className=''>
              <td className='py-1 w-[70%]'><Skeleton className='w-3/4 h-4 bg-gray-300 rounded-full' /></td>
              <td className='w-[30%]'><Skeleton className='w-full h-4 bg-gray-300 rounded-full' /></td>
            </tr>
          </tbody>
        </table>
        {/* <CardDescription className='mt-5'>Total Rp 200.000</CardDescription> */}
        <CardDescription className='mt-5'><Skeleton className='w-45 h-6 bg-gray-300 rounded-full' /></CardDescription>
      </CardHeader>
      <CardFooter className='flex-col gap-5'>
        {/* <Button className='w-full'>Pay Button</Button> */}
        <Skeleton className='w-full h-8 bg-gray-300 rounded-full' />
        <div className='w-full'>
          {/* <label htmlFor='address'> Address </label> */}
          <Skeleton className='w-25 h-4 bg-gray-300 rounded-full' />
          <Skeleton className='w-full h-8 bg-gray-300 rounded-full mt-3' />
          <Skeleton className='w-25 h-4 bg-gray-300 rounded-full mt-3' />
          <Skeleton className='w-full h-8 bg-gray-300 rounded-full mt-3' />
          {/* <div className='w-full flex-1' id='address'>
            <Button className='w-full'>Choose Address</Button>
          </div> */}
        </div>
      </CardFooter>
    </Card>
  </>
)

export default function OrderSummary({ cartViewData, totalPrice }: OrderSummaryProps) {
  const [notes, setNotes] = useState<string>('')
  // const [selectAddress, setSelectAddress] = useState<UserAddress>('')
  const [selectAddress, setSelectAddress] = useState<UserAddress | null>(null)
  return (
    <>
      <Card className='flex gap-3 sticky top-20! overflow-hidden'>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <table className='text-sm w-full table-fixed'>
            <tbody>
              {cartViewData.map((item, i) => (
                item.selected && (
                  <tr key={i} className='border-b '>
                    <td className='py-1 w-[70%] truncate'>{item.qty}x {item.name}</td><td className='w-[30%]'>Rp {item.subtotal.toLocaleString('id-ID')}</td>
                  </tr>
                )
              ))}
              <tr key={cartViewData.length + 1}>
                <td className='py-1 w-[70%]'>Shipping Fee</td><td className='w-[30%]'>Rp 15.000</td>
              </tr>
            </tbody>
          </table>
          <CardDescription className='mt-5'>Total Rp {(totalPrice + 15000).toLocaleString('id-ID')}</CardDescription>
        </CardHeader>
        <CardFooter className='flex-col gap-5'>
          <PayButton selectAddress={selectAddress} notes={notes} />
          <div className='w-full'>
            <label htmlFor='address'> Address </label>
            <div className='w-full flex-1' id='address'>
              <SortByDropdownMenu selectAddress={selectAddress} setSelectAddress={setSelectAddress} />
            </div>
          </div>
          <div className='w-full'>

            <label htmlFor='notes'>Notes (optional)</label>
            <div className='relative'>
              <Input
                id='notes'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className='rounded-full pr-10'
              />

              <button
                type='button'
                onClick={() => setNotes('')}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'
              >
                <LuCircleX />
              </button>
            </div>

          </div>
        </CardFooter>
      </Card>
    </>
  )
}