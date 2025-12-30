import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMidtransSnap } from '@/service/midtrans.service'
import { cancelOrder, checkExpiredOrder, createOrder } from '@/service/order.service'
import useCartStore from '@/store/cart.store'
import { LuCirclePlus, LuCircleMinus, LuTrash2, LuShoppingCart, LuChevronDown } from 'react-icons/lu'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

type UserAddress = {
    id: string
    userId: string
    addressName: string
    street: string
    city: string
    province: string
    postalCode: string
    phone: string
    createdAt: string
}

type PayButton = {
    selectAddress: UserAddress | null
    notes: string | null
}

export const PayButton = ({ selectAddress, notes }: PayButton) => {
    const isSnapReady = useMidtransSnap()
    const [loading, setLoading] = useState(false)

    const cartItems = useCartStore(state => state.items)

    const handlePay = async () => {
        if (!isSnapReady || !window.snap) {
            toast.error('Payment system is not ready')
            return
        }

        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) {
            toast.error('User not authenticated')
            return
        }

        try {
            setLoading(true)
            const payloadItems = cartItems.map(i => ({
                productId: i.id,
                quantity: i.qty
            }))


            const res = await createOrder(
                jwtToken,
                payloadItems,
                selectAddress,
                notes,
            )

            let midtransToken = res.data.transactionToken

            window.snap.pay(midtransToken, {
                onSuccess: (result) => {
                    console.log('SUCCESS', result)
                    toast.success('Payment success')
                },
                onPending: (result) => {
                    console.log('PENDING', result)
                },
                onError: (result) => {
                    console.log('ERROR', result)
                },
                onClose: () => {
                    console.log('POPUP CLOSED')
                },
            })

        } catch (err) {
            console.error(err)
            toast.error('Payment failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handlePay}
            disabled={!isSnapReady || loading || cartItems.length === 0 || selectAddress == null}
            className="px-4 py-2 w-full"
        > <LuShoppingCart />
            {loading ? 'Processing...' : 'Pay Now'}
        </Button>
    )
}

type PayButtonTokenOnlyProps = {
    midtransToken: string
    onExpired: (orderId: string) => void
}

export const PayButtonTokenOnly = ({ midtransToken, onExpired }: PayButtonTokenOnlyProps) => {

    const isSnapReady = useMidtransSnap()
    const [loading, setLoading] = useState(false)

    const handlePay = async () => {
        if (!isSnapReady || !window.snap) {
            toast.error('Payment system is not ready')
            return
        }

        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) {
            toast.error('User not authenticated')
            return
        }

        try {
            setLoading(true)

            const res = await checkExpiredOrder(jwtToken, midtransToken)
            if (res.data.isExpired) {
                setLoading(false)
                onExpired(res.data.orderId)
                toast.error('Payment has expired')
                return
            }

            window.snap.pay(midtransToken, {
                onSuccess: (result) => {
                    console.log('SUCCESS', result)
                    toast.success('Payment success')
                    window.location.replace("/")
                },
                onPending: (result) => {
                    console.log('PENDING', result)
                    window.location.replace("/")
                },
                onError: (result) => {
                    console.log('ERROR', result)
                    window.location.replace("/transaction")
                },
                onClose: () => {
                    console.log('POPUP CLOSED')
                    window.location.replace("/")
                },
            })

        } catch (err) {
            console.error(err)
            toast.error('Payment failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handlePay}
            className="px-4 py-2 w-auto"
        > <LuShoppingCart />
            {loading ? 'Processing...' : 'Resume Pay'}
        </Button>
    )
}

