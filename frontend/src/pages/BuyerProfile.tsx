import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ProfileMyProfile from '@/components/ProfileMyProfile'
import ProfilePersonalInfo from '@/components/ProfilePersonalInfo'
import ProfileAddress from '@/components/ProfileAddress'
import ProfilePassword from '@/components/ProfilePassword'

import { LuLogOut } from 'react-icons/lu';

import { logout } from '@/service/auth.service'
import { useNavigate } from 'react-router-dom'

export default function BuyerProfile() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <div className='flex flex-wrap justify-center w-full mt-15 gap-5'>

        <div className='space-y-5 w-full md:w-[40%]'>
          <ProfileMyProfile/>
          <ProfilePersonalInfo />
          <ProfilePassword />
        </div>

        <div className='space-y-5 w-full md:w-[50%]'>
          <ProfileAddress />
          <Card className='px-2 md:px-4'>
            <CardContent className='flex items-center justify-between px-2 md:px-4 gap-2 '>
              <div>
                <p className='font-bold'>Here to logout</p>
                <p className='text-sm'>Come back for fresh goodies!</p>
              </div>
              <Button variant={'outlineDestructive'} onClick={() => handleLogout()}><LuLogOut /> Logout</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </>
  )
}

