import axios from "axios"
import { CartItem } from "@/store/cart.store"

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

const API_URL = import.meta.env.VITE_API_URL + '/api/order'
type OrderItem = {
    productId: string | number
    quantity: number
}


export const createOrder = async (token: string, items: OrderItem[], address: UserAddress | null, note: string | null) => {
    return await axios.post(`${API_URL}/create`,
        {
            items, address, note
        }, {
        headers: { Authorization: `Bearer ${token}` }
    }
    )
}

export const readOrder = async (token: string, id: string) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const readAllOrders = async (token: string) => {
    return await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const readAllOrdersBuyer = async (token: string) => {
    return await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const cancelOrder = async (token: string, id: string) => {
    return await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
} 