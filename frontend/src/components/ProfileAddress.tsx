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

export default function ProfileAddress() {
    const [addresses, setAddresses] = useState<Address[]>([])

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
        alert('[saveAddress()]')
        if (address.isNew) {
            await createUserAddress(token, address)
                .catch()
                .finally(() => alert('[createUserAddress] : Berhasil'))
        } else {
            await updateUserAddress(token, address.id!, address)
                .catch()
                .finally(() => alert('[updateUserAddress] : Berhasil'))
        }
    }


    const deleteAddress = async (index: number) => {
        const addr = addresses[index]
        const token = localStorage.getItem('token')

        if (addr.id) {
            await deleteUserAddress(token!, addr.id)
        }

        setAddresses(prev => prev.filter((_, i) => i !== index))
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


    useEffect(() => {
        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) return

        readUserAddresses(jwtToken)
            .then((res) => {
                setAddresses(res.data.userAddresses)
            })
            .catch(() => {
                setAddresses([])
            })
    }, [])

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
                                            <Button variant='outlineDestructive' className='rounded-full min-w-25!' size='sm' onClick={() => deleteAddress(i)} type='button'>
                                                <LuTrash2 /> Delete
                                            </Button>
                                        )}
                                        <Button variant='default' className='w-fit' onClick={() => saveAddress(a)} type='submit'><LuSave /> Save Address</Button>
                                        {/* <Button variant='default' className='w-fit' onClick={() => console.log(JSON.stringify(a))} type='submit'><LuSave /> alert address</Button> */}
                                    </CardFooter>
                                </AccordionContent>
                            </Card >
                        </AccordionItem>
                    
                ))}
            </Accordion>
        </Card >
    )
}
