import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

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
import { signUp } from '@/service/users.service'

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const [showPass, setShowPass] = useState<boolean>(false)
  const [showPass2, setShowPass2] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleSignUp = (
    e: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string
  ) => {
    e.preventDefault()

    if (password !== password2) return alert('Password must be the same!')

    try {
      const res = signUp(name, email, password)
      if (!res) return

      navigate('/login')

    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Fresh bread is waiting!</CardTitle>
        <CardDescription className='mb-10 text-xl'>
          Sign up and grab your favorites
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSignUp(e, name, email, password)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Full Name</FieldLabel>
              <Input
                id='name'
                type='text'
                // placeholder='John Doe' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </Field>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                id='email'
                type='email'
                // placeholder='m@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <div className="relative">
                <Input
                  id="Password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor='retypePassword'>
                Retype Password
              </FieldLabel>
              <div className="relative">
                <Input
                  id="retypePassword"
                  type={showPass2 ? "text" : "password"}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass2(!showPass2)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPass2 ? <LuEye /> : <LuEyeOff />}
                </button>
              </div>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type='submit'>Create Account</Button>

                <FieldDescription className='px-6 text-center'>
                  Already have an account? <Link to='/login'>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
