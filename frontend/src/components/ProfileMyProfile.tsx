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

export default function ProfileMyProfile() {

    type dataProps = {
        name: string
        email: string
        orders: string
        createdAt: string
    }

    const [data, setData] = useState<dataProps | null>(null)

    const jwtToken = localStorage.getItem('token')
    if (!jwtToken) return

    useEffect(() => {
        try {
            readUser(jwtToken)
                .then((res) => {
                    setData(res.data.user)
                })

        } catch (error) {
            console.log('Error: ' + error)
        }
    }, [])

    const toLocalDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <>
            {/* <Button onClick={() => console.log(data)}>data</Button> */}
            <Card className='px-2 md:px-4'>
                <CardHeader className='text-xl font-semibold'>My Profile</CardHeader>

                <CardContent className='space-y-4 px-2 md:px-4'>
                    <table className='w-full'>
                        <tbody>
                            <tr className='border-b'>
                                <td className='font-medium bold py-3'>Name</td><td>{data?.name}</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium bold py-3'>Email</td><td>{data?.email}</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium bold py-3'>Total order</td><td>{JSON.stringify(data?.orders.length)}</td>
                            </tr>
                            <tr className=''>
                                <td className='font-medium bold py-3'>Member since</td><td>{toLocalDate(data?.createdAt)}</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>

                {/* <CardFooter className='flex justify-end mt-4'>
                        <Button variant='default' className='mt-2 w-fit'><LuSave />Save</Button>
                    </CardFooter> */}
            </Card>
        </>
    )
}
