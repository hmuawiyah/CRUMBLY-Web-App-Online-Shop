import React, { useEffect, useState } from 'react'

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

import { LuSave, LuTrash2, LuPlus } from 'react-icons/lu'
import { readUser, updateUser } from '@/service/users.service'
import toast from 'react-hot-toast'
import { Skeleton } from '../ui/skeleton'


type ProfilePersonalInfoProps = {
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

export default function ProfilePersonalInfo({ name, setName, email, setEmail }: ProfilePersonalInfoProps) {
    const [personalInfoLoading, setPersonalInfoLoading] = useState(false)

    const jwtToken = localStorage.getItem('token')
    if (!jwtToken) return


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPersonalInfoLoading(true)
        await updateUser(jwtToken, name, email, '')
            .then(() => {
                toast.success('Success to update Personal Info')
            }).catch((error) => {
                toast.error('Failed to update Personal Info')
            }).finally(() => {
                setPersonalInfoLoading(false)
            })

    }
    return (
        <>
            <Card className='px-2 md:px-4'>
                <CardHeader className='text-xl font-semibold'>Personal Information</CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className='space-y-4 px-2 md:px-4'>
                        <label htmlFor='name' className='text-sm'>Name</label>
                        <Input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor='email' className='text-sm'>Email</label>
                        <Input
                            id='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </CardContent>

                    <CardFooter className='flex justify-end mt-4'>
                        <Button variant='default' className='mt-2 w-fit' disabled={personalInfoLoading} type='submit'><LuSave />{personalInfoLoading ? 'Processing...' : 'Save Profile'}</Button>
                    </CardFooter>
                </form>
            </Card>

        </>
    )
}

export const LazyProfilePersonalInfo = () => {
    return (
        <>
            <Card className='px-2 md:px-4'>
                <CardHeader className='text-xl font-semibold'><Skeleton className='w-50 h-5 bg-gray-300 rounded-full' /></CardHeader>

                <CardContent className='space-y-4 px-2 md:px-4 mt-4'>
                    <Skeleton className='w-20 h-4 bg-gray-300 rounded-full' />
                    <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />
                    <Skeleton className='w-25 h-4 bg-gray-300 rounded-full' />
                    <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />
                </CardContent>

                <CardFooter className='flex justify-end mt-4'>
                    <Skeleton className='w-35 h-5 bg-gray-300 rounded-full' />
                </CardFooter>
            </Card>

        </>
    )
}
