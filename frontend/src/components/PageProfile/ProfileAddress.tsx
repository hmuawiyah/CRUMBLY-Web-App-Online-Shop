import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


import { LuSave, LuTrash2, LuPlus } from 'react-icons/lu'
import { createUserAddress, deleteUserAddress, readUserAddresses, updateUserAddress } from '@/service/userAddresses.service'
import toast from 'react-hot-toast'
import { Skeleton } from '../ui/skeleton'

type Address = {
    id?: string
    addressName: string
    phone: string
    street: string
    city: string
    postalCode: string
    province: string
    isNew?: boolean
}


type ProfileAddressProps = {
    addresses: Address[]
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>
}

export default function ProfileAddress({ addresses, setAddresses }: ProfileAddressProps) {
    const [addressLoading, setAddressLoading] = useState(false)

    const addAddress = () => {
        setAddresses(prev => [
            ...prev,
            {
                addressName: 'New Address',
                phone: '',
                street: '',
                city: '',
                postalCode: '',
                province: '',
                isNew: true
            }
        ])
    }

    const saveAddress = async (address: Address) => {
        const token = localStorage.getItem('token')
        if (!token) return
        setAddressLoading(true)
        if (address.isNew) {
            await createUserAddress(token, address)
                .then(() => {
                    toast.success('Successfully added address!')
                    setAddressLoading(false)
                })
        } else {
            await updateUserAddress(token, address.id!, address)
                .then(() => {
                    toast.success('Successfully added address!')
                    setAddressLoading(false)
                })
        }
    }


    const deleteAddress = async (index: number) => {
        const addr = addresses[index]
        const token = localStorage.getItem('token')

        if (!addr.id) return

        setAddressLoading(true)
        await deleteUserAddress(token!, addr.id)

        try {
            setAddresses(prev => prev.filter((_, i) => i !== index))
            toast.success('Successfully delete address!')
        } catch (error) {
            toast.error('Failed to delete address!')
        } finally {
            setAddressLoading(false)
        }
    }

    const handleChange = (
        index: number,
        field: keyof Address,
        value: string
    ) => {
        setAddresses(prev =>
            prev.map((addr, i) =>
                i === index ? { ...addr, [field]: value } : addr
            )
        )
    }



    return (
        <Card className='space-y-6 px-2 md:px-4'>
            <CardHeader className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Address</h2>
                {addresses.length < 3 && (<Button variant='outline' onClick={addAddress}><LuPlus />Add more</Button>)}
            </CardHeader>

            <Accordion type='single' collapsible className='w-full space-y-2' defaultValue='item-1'>
                {addresses.map((a, i) => (

                    <AccordionItem
                        key={i}
                        value={`item-${i + 1}`}
                        className='bg-card rounded-md border-b-0'
                    >
                        <Card key={i} className=''>

                            <AccordionTrigger className='flex items-center [&>svg]:rotate-90 [&[data-state=open]>svg]:rotate-0 px-5'>
                                <h3 className='text-lg font-medium'>{a.addressName}</h3>
                            </AccordionTrigger>

                            <AccordionContent className='px-5'>

                                <CardContent className='space-y-4 px-2 md:px-4'>
                                    <label htmlFor='addressName' className='text-sm'>Address Name</label>
                                    <Input
                                        id='addressName'
                                        value={a.addressName}
                                        onChange={e => handleChange(i, 'addressName', e.target.value)}
                                    />

                                    <label htmlFor='phone' className='text-sm'>Phone Number</label>
                                    <Input
                                        id='phone'
                                        value={a.phone}
                                        onChange={e => handleChange(i, 'phone', e.target.value)}
                                    />


                                    <label htmlFor='street' className='text-sm'>Street</label>
                                    <Input
                                        id='street'
                                        value={a.street}
                                        onChange={e => handleChange(i, 'street', e.target.value)}
                                    />

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div>
                                            <label htmlFor='city' className='text-sm'>City</label>
                                            <Input
                                                id='city'
                                                value={a.city}
                                                onChange={e => handleChange(i, 'city', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='postalCode' className='text-sm'>Postal Code</label>
                                            <Input
                                                id='postalCode'
                                                value={a.postalCode}
                                                onChange={e => handleChange(i, 'postalCode', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <label htmlFor='province' className='text-sm'>Province</label>
                                    <Input
                                        id='province'
                                        value={a.province}
                                        onChange={e => handleChange(i, 'province', e.target.value)}
                                    />

                                </CardContent>
                                <CardFooter className={addresses.length > 1
                                    ? 'flex justify-between mt-6'
                                    : 'flex justify-end mt-6'
                                }>
                                    {addresses.length > 1 && (
                                        <Button variant='outlineDestructive' className='rounded-full min-w-25!' disabled={addressLoading} size='sm' onClick={() => deleteAddress(i)} type='button'>
                                            <LuTrash2 /> Delete
                                        </Button>
                                    )}
                                    <Button variant='default' className='w-fit' disabled={addressLoading} onClick={() => saveAddress(a)} type='submit'><LuSave /> {addressLoading ? 'Processing' : 'Save Loading'}</Button>
                                </CardFooter>
                            </AccordionContent>
                        </Card >
                    </AccordionItem>

                ))}
            </Accordion>
        </Card >
    )
}


export const LazyProfileAddress = () => {
    return (
        <Card className='space-y-6 px-2 md:px-4'>
            <CardHeader className='flex justify-between items-center'>
                <Skeleton className='w-35 h-6 bg-gray-300 rounded-full' />
                <Skeleton className='w-30 h-6 bg-gray-300 rounded-full' />
            </CardHeader>

            <Accordion type='single' collapsible className='w-full space-y-2' defaultValue='item-1'>

                <AccordionItem
                    value={`1`}
                    className='bg-card rounded-md border-b-0'
                >

                    <Card className=''>

                        <AccordionTrigger className='flex items-center [&>svg]:rotate-90 [&[data-state=open]>svg]:rotate-0 px-5'>
                            <Skeleton className='w-25 h-5 bg-gray-300 rounded-full' />
                        </AccordionTrigger>

                        <AccordionContent className='px-5'>

                            <CardContent className='space-y-5 px-2 md:px-4'>
                                <Skeleton className='w-35 h-4 bg-gray-300 rounded-full' />
                                <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />

                                <Skeleton className='w-32 h-4 bg-gray-300 rounded-full' />
                                <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />

                                <Skeleton className='w-20 h-4 bg-gray-300 rounded-full' />
                                <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />


                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='space-y-4'>
                                        <Skeleton className='w-15 h-4 bg-gray-300 rounded-full' />
                                        <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />
                                    </div>
                                    <div className='space-y-4'>
                                        <Skeleton className='w-25 h-4 bg-gray-300 rounded-full' />
                                        <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />
                                    </div>
                                </div>

                                <Skeleton className='w-21 h-4 bg-gray-300 rounded-full' />
                                <Skeleton className='w-full h-4 bg-gray-300 rounded-full' />

                            </CardContent>

                            <CardFooter className='flex justify-between items-center mt-6'>
                                <Skeleton className='w-35 h-6 bg-gray-300 rounded-full' />
                                <Skeleton className='w-30 h-6 bg-gray-300 rounded-full' />
                            </CardFooter>
                        </AccordionContent>
                    </Card >
                </AccordionItem>
            </Accordion>
        </Card >
    )
}