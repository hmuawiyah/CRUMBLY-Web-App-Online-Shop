import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useMidtransSnap } from '@/service/midtrans.service'
import { createOrder } from '@/service/order.service'
import useCartStore from '@/store/cart.store'
import { LuCirclePlus, LuCircleMinus, LuTrash2, LuShoppingCart, LuChevronDown } from 'react-icons/lu'

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
            alert('Payment system is not ready')
            return
        }

        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) {
            alert('User not authenticated')
            return
        }

        try {
            setLoading(true)
            // alert('setelah setLoading')
            const payloadItems = cartItems.map(i => ({
                productId: i.id,
                quantity: i.qty
            }))
            // alert('setelah payloadItems')

            // console.log('yang akan dikirim ' + jwtToken + ' : ' + JSON.stringify(payloadItems) + ' : ' + JSON.stringify(selectAddress) + ' : ' + notes)

            const res = await createOrder(
                jwtToken,
                payloadItems,
                selectAddress,
                notes,
            )
            // alert('setelah res')

            let token = res.data.transactionToken

            window.snap.pay(token, {
                onSuccess: (result) => {
                    console.log('SUCCESS', result)
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

            // alert('setelah snap')
        } catch (err) {
            console.error(err)
            alert('Payment failed' + err)
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
    token: string,
}

export const PayButtonTokenOnly = ({ token }: PayButtonTokenOnlyProps) => {
    const isSnapReady = useMidtransSnap()
    const [loading, setLoading] = useState(false)

    const handlePay = async () => {
        if (!isSnapReady || !window.snap) {
            alert('Payment system is not ready')
            return
        }

        const jwtToken = localStorage.getItem('token')
        if (!jwtToken) {
            alert('User not authenticated')
            return
        }

        try {
            setLoading(true)

            // let token = ''
            window.snap.pay(token, {
                onSuccess: (result) => {
                    console.log('SUCCESS', result)
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

            // alert('setelah snap')
        } catch (err) {
            console.error(err)
            alert('Payment failed' + err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handlePay}
            // disabled={!isSnapReady || loading || cartItems.length === 0 || selectAddress == null}
            className="px-4 py-2 w-auto"
        > <LuShoppingCart />
            {loading ? 'Processing...' : 'Resume Pay'}
        </Button>
    )
}

// export default PayButton
