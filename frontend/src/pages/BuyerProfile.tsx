import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProfileMyProfile, { LazyProfileMyProfile } from '@/components/PageProfile/ProfileMyProfile'
import ProfilePersonalInfo, { LazyProfilePersonalInfo } from '@/components/PageProfile/ProfilePersonalInfo'
import ProfileAddress, { LazyProfileAddress } from '@/components/PageProfile/ProfileAddress'
import ProfilePassword, { LazyProfilePassword } from '@/components/PageProfile/ProfilePassword'

import { LuLogOut } from 'react-icons/lu';

import { logout } from '@/service/auth.service'
import { useNavigate } from 'react-router-dom'
import { readUserAddresses } from '@/service/userAddresses.service'
import { readUser } from '@/service/users.service'
import { Skeleton } from '@/components/ui/skeleton'

type Address = {
  id?: string
  addressName: string
  phone: string
  street: string
  city: string
  postalCode: string
  province: string
  isNew?: boolean
}

type dataProps = {
  name: string
  email: string
  orders: string
  createdAt: string
}

export default function BuyerProfile() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [data, setData] = useState<dataProps | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const jwtToken = localStorage.getItem('token')
  useEffect(() => {
    if (!jwtToken) return

    setIsLoading(true)
    readUserAddresses(jwtToken)
      .then((res) => {
        setAddresses(res.data.userAddresses)
      })
      .catch(() => {
        setAddresses([])
      })
  }, [])

  useEffect(() => {
    if (!jwtToken) return

    readUser(jwtToken)
      .then((res) => {
        setData(res.data.user)
        setName(res.data.user.name)
        setEmail(res.data.user.email)
      })
      .catch((error) => {
        console.log('Error: ' + error)
      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [])

  return (
    <>
      <div className='flex flex-wrap justify-center w-full mt-15 gap-5'>

        <div className='space-y-5 w-full md:w-[40%]'>
          {!isLoading
            ?
            <>
              <ProfileMyProfile data={data} />
              <ProfilePersonalInfo name={name} setName={setName} email={email} setEmail={setEmail} />
              <ProfilePassword />
            </>
            :
            <>
              <LazyProfileMyProfile />
              <LazyProfilePersonalInfo />
              <LazyProfilePassword />
            </>
          }

        </div>

        <div className='space-y-5 w-full md:w-[50%]'>
          {!isLoading
            ?
            <>
              <ProfileAddress addresses={addresses} setAddresses={setAddresses} />
              <ProfileLogout />
            </>
            :
            <>
              <LazyProfileAddress />
              <LazyProfileLogout />
            </>
          }
        </div>

      </div>
    </>
  )
}

const ProfileLogout = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <Card className='px-2 md:px-4'>
      <CardContent className='flex items-center justify-between px-2 md:px-4 gap-2 '>
        <div>
          <p className='font-bold'>Here to logout</p>
          <p className='text-sm'>Come back for fresh goodies!</p>
        </div>
        <Button variant={'outlineDestructive'} onClick={() => handleLogout()}><LuLogOut /> Logout</Button>
      </CardContent>
    </Card>
  )
}

const LazyProfileLogout = () => {
  return (
    <Card className='px-2 md:px-4'>
      <CardContent className='flex items-center justify-between px-2 md:px-4 gap-2 '>
        <div className='space-y-2'>
          <Skeleton className='w-30 h-4 bg-gray-300 rounded-full' />
          <Skeleton className='w-45 h-4 bg-gray-300 rounded-full' />
        </div>
        <Skeleton className='w-25 h-6 bg-gray-300 rounded-full' />
      </CardContent>
    </Card>
  )
}
