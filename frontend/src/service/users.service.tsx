import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + '/api/users'

export const signUp = async (name: string, email: string, password: string) => {
    return await axios.post(`${API_URL}/create`, {
        name, email, password
    })
}

export const readUser = async (token: string) => {
    return await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export const updateUser = async (
    token: string,
    name: string,
    email: string,
    password: string
) => {
    return await axios.put(`${API_URL}/update`, {
        name,
        email,
        password
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}