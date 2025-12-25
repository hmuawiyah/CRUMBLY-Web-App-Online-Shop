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


export default function ProfilePersonalInfo() {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const jwtToken = localStorage.getItem('token')
    if (!jwtToken) return

    useEffect(() => {
        try {
            readUser(jwtToken)
                .then((res) => {
                    setId(res.data.user.id)
                    setName(res.data.user.name)
                    setEmail(res.data.user.email)
                })

        } catch (error) {
            console.log('Error: ' + error)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateUser(jwtToken, name, email, '')
            .then(() => alert('sukses'))

    }
    return (
        <>
            {/* <Button onClick={() => console.log(id)}>res.data</Button> */}
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
                        <Button variant='default' className='mt-2 w-fit' type='submit'><LuSave />Save Profile</Button>
                    </CardFooter>
                </form>
            </Card>

        </>
    )
}
