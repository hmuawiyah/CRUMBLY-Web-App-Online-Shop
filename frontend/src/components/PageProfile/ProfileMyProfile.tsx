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
import { toLocalDate } from '@/helper/simpleFn'
import { Skeleton } from '../ui/skeleton'


type dataProps = {
    name: string
    email: string
    orders: string
    createdAt: string
}

type ProfileMyProfileProps = {
    data: dataProps | null;
};

export default function ProfileMyProfile({ data }: ProfileMyProfileProps) {

    return (
        <>
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
                                <td className='font-medium bold py-3'>Member since</td><td>{data && toLocalDate(data?.createdAt)}</td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>

            </Card>
        </>
    )
}

export const LazyProfileMyProfile = () => {
    return (
        <>
        
        
        <Card className='px-2 md:px-4'>
                <CardHeader className='text-xl font-semibold'><Skeleton className='w-28 h-5 bg-gray-300 rounded-full' /></CardHeader>

                <CardContent className='space-y-4 px-2 md:px-4'>
                    <table className='w-full'>
                        <tbody>
                            <tr className='border-b'>
                                <td className='font-medium bold py-3'><Skeleton className='w-20 h-4 bg-gray-300 rounded-full' /></td><td><Skeleton className='w-30 h-4 bg-gray-300 rounded-full' /> </td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium bold py-3'><Skeleton className='w-24 h-4 bg-gray-300 rounded-full' /></td><td><Skeleton className='w-35 h-4 bg-gray-300 rounded-full' /> </td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium bold py-3'><Skeleton className='w-28 h-4 bg-gray-300 rounded-full' /></td><td><Skeleton className='w-15 h-4 bg-gray-300 rounded-full' /> </td>
                            </tr>
                            <tr className=''>
                                <td className='font-medium bold py-3'><Skeleton className='w-32 h-4 bg-gray-300 rounded-full' /></td><td><Skeleton className='w-32 h-4 bg-gray-300 rounded-full' /> </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>

            </Card>
        </>
    )
}