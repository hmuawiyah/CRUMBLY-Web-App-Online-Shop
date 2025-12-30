import React, { useEffect, useMemo, useState } from 'react'

import OrderTransaction, { NoDataOrderTransaction, LazyOrderTransaction } from '@/components/PageTransaction/OrderTransaction'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { readAllOrders, readAllOrdersBuyer } from '@/service/order.service'

import { LuChevronDown } from "react-icons/lu"

import { toTitleCase } from '@/helper/simpleFn'

type Checked = DropdownMenuCheckboxItemProps["checked"]

type itemsProps = {
    id: string,
    orderId: string,
    productId: number,
    quantity: number,
    subtotal: number,
    unitPrice: number,
    product: { name: string }
}

type orderProps = {
    id: string,
    userId: string,
    status: string,
    totalAmount: number,
    address: string,
    notes: null
    paymentStatus: string,
    shippingService: string,
    trackingNumber: string,
    midtransToken: string,
    items: itemsProps[],
    createdAt: string,
    updatedAt: string
}

export default function BuyerTransaction() {
    const [radioFilter, setRadioFilter] = useState<string>('ALL')
    const categoriesStatus: string[] = ['ALL', 'WAITING PAYMENT', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELED']
    const [orders, setOrders] = useState<orderProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [sortedBy, setSortedBy] = useState<string>('LASTEST')
    const sortedItems: string[] = ['LASTEST', 'OLDEST', 'HIGHEST PRICE', 'LOWEST PRICE']

    useEffect(() => {

        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) return

        readAllOrdersBuyer(jwtToken)
            .then(res => {
                setOrders(res.data.orders)
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
            .finally(() => setIsLoading(false))

    }, [])

    const applyFilterSort = () => {
        let filteredOrders = [...orders]
            .filter(order =>
                radioFilter === 'ALL'
                    ? true
                    : order.status === radioFilter
            )
            .slice()
            .sort((a, b) => {
                switch (sortedBy) {
                    case 'OLDEST':
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

                    case 'LASTEST':
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

                    case 'HIGHEST PRICE':
                        return b.totalAmount - a.totalAmount;

                    case 'LOWEST PRICE':
                        return a.totalAmount - b.totalAmount;

                    default:
                        return 0;
                }
            });

        return filteredOrders;
    }

    const filteredOrders = useMemo(() => applyFilterSort(), [
        orders,
        radioFilter,
        sortedBy,
    ])


    return (
        <>

            <div className=' flex justify-start w-full space-y-4 overflow-x-auto h-auto mt-15 '>
                <div className='flex gap-5 min-w-[500px]!'>
                    {categoriesStatus.map((item: string, i: number) => (
                        <Button
                            key={i}
                            variant={radioFilter == item ? 'outline' : 'ghost'}
                            onClick={() => setRadioFilter(item)}
                            className={radioFilter == item
                                ? 'border border-primary rounded-full opacity-100'
                                : 'rounded-full opacity-40'
                            }
                        >
                            {toTitleCase(item)}
                        </Button>
                    ))}
                </div>

            </div>

            <div className='flex items-center gap-3 mt-7'>
                <p>Sort By </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='border border-primary rounded-full'>{toTitleCase(sortedBy)} <LuChevronDown /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' className="w-56">
                        <DropdownMenuGroup>
                            {sortedItems.map((item, i) => (
                                <>
                                    <DropdownMenuItem
                                        onClick={() => setSortedBy(item)}
                                    >
                                        {toTitleCase(item)}
                                    </DropdownMenuItem>
                                    {(i < sortedItems.length - 1) && <DropdownMenuSeparator />}
                                </>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {isLoading && <LazyOrderTransaction />}

            {!isLoading && <OrderTransaction orders={filteredOrders} setOrders={setOrders} />}

            {!isLoading && (filteredOrders.length == 0) && <NoDataOrderTransaction />}

        </>
    )
}