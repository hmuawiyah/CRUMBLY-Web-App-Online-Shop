import axios from 'axios'
import useCartStore from '@/store/cart.store';

const API_URL = import.meta.env.VITE_API_URL + '/api/auth'

export const login = async ( { email, password } : { email: string; password: string }) => {
    return axios.post(`${API_URL}/login`, { email, password })
}

export const logout = async () => {
    
    localStorage.removeItem('token')
    localStorage.removeItem('cart-storage')
    useCartStore.getState().clearCart();
    
}