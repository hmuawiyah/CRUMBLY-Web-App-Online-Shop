import { useState } from 'react'

import { Input } from '@/components/ui/input'
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

import { LuSave, LuEye, LuEyeOff } from 'react-icons/lu'
import { updateUser } from '@/service/users.service'

export default function ProfilePassword() {
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')

    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPass2, setShowPass2] = useState<boolean>(false)

    const jwtToken = localStorage.getItem('token')
    if (!jwtToken) return

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (pass !== pass2) return

        await updateUser(jwtToken, '', '', pass)
            .then(() => {
                alert('Success update password!')
            })
            .finally(() => {
                setPass('')
                setPass2('')
            })
    }

    const clear = () => {
        setPass('')
        setPass2('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className='space-y-6 px-2 md:px-4'>
                <CardHeader>
                    <h2 className='text-xl font-semibold'>Password</h2>
                </CardHeader>

                <CardContent className='space-y-4 px-2 md:px-4'>
                    <label htmlFor='password'>Password</label>
                    <div className='relative'>
                        <Input
                            id='password'
                            type={showPass ? 'text' : 'password'}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
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

                    <label htmlFor='retypePassword'>Retype Password</label>
                    <div className='relative'>
                        <Input
                            id='retypePassword'
                            type={showPass2 ? 'text' : 'password'}
                            value={pass2}
                            onChange={(e) => setPass2(e.target.value)}
                            className='pr-10'
                        />

                        <button
                            type='button'
                            onClick={() => setShowPass2(!showPass2)}
                            className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700'
                        >
                            {showPass2 ? <LuEye /> : <LuEyeOff />}
                        </button>
                    </div>

                </CardContent>

                <CardFooter className='flex justify-end gap-4'>
                    <Button variant='outline' onClick={clear}>Clear</Button>
                    <Button type='submit'><LuSave /> Save Password</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
