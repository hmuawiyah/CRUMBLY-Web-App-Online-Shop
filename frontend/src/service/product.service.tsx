import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/api/product'

export const readAllProduct = async () => {
  return axios.get(`${API_URL}/`, {
  })
}

export const readProduct = (id: number) => {
  return axios.get(`${API_URL}/${id}`)
}

export const readProductByIds = async (token: string, productIds: (string | number)[]) => {
  try {
    return await axios.post(`${API_URL}/by-ids`, {
      ids: productIds
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

  } catch (error) {
    console.log('Failed to fetch products by ids:', error)
    throw error
  }
}

