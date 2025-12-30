import React from 'react'

import { SignupForm } from '@/components/signup-form'

export default function SignUp() {
  return (
    <div className='flex min-h-[80vh] md:min-h-screen w-full items-center justify-center p-6 md:p-10 mt-15'>
      <div className='w-full max-w-sm'>
        <SignupForm />
      </div>
    </div>
  )
}

