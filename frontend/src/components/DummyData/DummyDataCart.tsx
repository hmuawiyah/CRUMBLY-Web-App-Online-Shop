export type dummyCartType = {
  id: string | number
  name: string
  image: string
  price: number
  qty: number
  subtotal: number
  selected: boolean
}

export const dummyCart: dummyCartType[] = [
  { 
    id: '1', 
    name: 'Croissant Bread', 
    image: '/images/croissant.jpg',
    price: 94000, 
    qty: 1, 
    subtotal: 94000,
    selected: false 
  },
]
