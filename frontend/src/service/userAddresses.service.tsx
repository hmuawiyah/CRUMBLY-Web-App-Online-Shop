import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + '/api/useraddresses'

export const readAllUserAddresses = async (token: string) => {
    return await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const readUserAddresses = async (token: string) => {
    return await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

type addressProps = {
    addressName: string,
    street: string,
    city: string,
    province: string,
    postalCode: string,
    phone: string
}

export const createUserAddress = async (token: string, address: addressProps) => {
    return await axios.post(`${API_URL}/create`, address, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const updateUserAddress = async (token: string, id: string, updateData: addressProps) => {
    return await axios.put(`${API_URL}/update/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const deleteUserAddress = async (token: string, id: string) => {
    return await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}