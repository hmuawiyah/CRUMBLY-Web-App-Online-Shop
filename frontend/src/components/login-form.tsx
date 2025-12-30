import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '@/service/auth.service'
import toast from 'react-hot-toast'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { LuSave, LuEye, LuEyeOff } from 'react-icons/lu'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPass, setShowPass] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await login({ email, password })
      
      const token = res.data?.token
      if (!token) { throw new Error('Token not found in response') }
      localStorage.setItem('token', token)
      toast.success('Login success!')

      navigate('/cart')

    } catch (error: any) {
      console.log('Error: ' + error.message)
      toast.error('Email or Password is wrong!')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='px-2 md:px-4'>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription className='mb-10 text-xl'>
            Log in for freshly baked goodness
          </CardDescription>
        </CardHeader>
        <CardContent className='px-2 md:px-4'>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                {/* <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required /> */}
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='pr-10'
                  />

                  <button
                    type='button'
                    onClick={() => setShowPass(!showPass)}
                    className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'
                  >
                    {showPass ? <LuEye /> : <LuEyeOff />}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type='submit'>Login</Button>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account? <Link to='/signup'>Sign Up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
