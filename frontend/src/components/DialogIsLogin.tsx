import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { Button } from '@/components/ui/button'
import { LuCircleAlert, LuX } from 'react-icons/lu'

export default function DialogIsLogin() {
  const [isActive, setIsActive] = useState(true)

  if (!isActive) return null
  
  const jwtToken = localStorage.getItem('token')
  if (jwtToken) return null

  return (
    <div className='fixed z-100'>
      <Alert className='flex justify-between mt-5 w-fit'>
        <div className=''>
          <div className='flex-1 flex-col justify-center gap-1'>
            <p className='flex flexrow items-center gap-1 font-semibold text-lg'><LuCircleAlert /> Hey there!</p>
            <p>Login or sign up to unlock all the cool stuff</p>
          </div>
          <div className='flex gap-2 mt-3'>
            <Link to={'/login'}>
              <Button variant='outline' size='lg'> Login </Button>
            </Link>
            <Link to={'/signup'}>
              <Button size='lg'> Sign up </Button>
            </Link>
          </div>
        </div>

        <button className='cursor-pointer' onClick={() => setIsActive(false)}>
          <LuX className='size-5' />
          <span className='sr-only'>Close</span>
        </button>
      </Alert>
    </div>
  )
}


