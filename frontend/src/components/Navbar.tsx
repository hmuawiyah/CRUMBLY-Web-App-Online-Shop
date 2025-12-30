import React, { useEffect, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import useMenuStore from '@/store/menu.store'

import useCartStore from '@/store/cart.store'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  IoHome, IoCart, IoDocumentText, IoPerson,
  IoHomeOutline, IoCartOutline, IoDocumentTextOutline, IoPersonOutline,
  IoSearch,
} from 'react-icons/io5'
import { readAllProduct, readProduct } from '@/service/product.service'

import { LuCircleX } from 'react-icons/lu'
import { readUser } from '@/service/users.service'

type dataProps = {
  id: any
  imageUrl: string
  name: string
  email: string
  price: number
  orders: string
  createdAt: string
}

export default function Navbar() {
  const { menuClicked, setMenuClicked } = useMenuStore()
  const [totalQty, setTotalQty] = useState('')
  const [data, setData] = useState<dataProps[]>([])
  const [filteredData, setFilteredData] = useState<dataProps[]>([])
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const cartItems = useCartStore(state => state.items ?? [])
  const result = cartItems.reduce((sum, item) => sum + item.qty, 0)

  useEffect(() => {
    const cart = localStorage.getItem('cart-storage')



    if (cart) {
      setTotalQty('+' + String(result))
      if (result.toString() == '0') { setTotalQty('') }

    } else {
      setTotalQty('')
    }

    readAllProduct()
      .then(res => {
        setData(res.data.products)
      })

  }, [cartItems])

  useEffect(() => {
    let temp = data.filter(val => val.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredData(temp)
  }, [search, data])

  return (
    <>

      <header className='fixed w-full top-0 left-0 z-50 bg-background '>
        <div className="relative shadow-[0_1px_10px_0_rgba(0,0,0,0.2)] bg-background">
          {/* <div className="relative shadow-md! bg-background"> */}
          <div className='h-[60px] mx-4 md:mx-8 lg:mx-30'>
            <div className='flex items-center justify-between h-full'>

              <div className='hidden md:flex'>
                <Link to={'/'}> <Button variant='outline' onClick={() => setMenuClicked('home')}
                  className={
                    (menuClicked == 'home')
                      ? 'text-white! bg-primary hover:bg-primary/80'
                      : 'text-primary!'
                  }>

                  {menuClicked == 'home'
                    ? <IoHome />
                    : <IoHomeOutline />
                  }

                  Home </Button> </Link>
              </div>

              <div className='w-full md:w-[350px] lg:w-[550px]'>
                <div className='relative'>
                  <IoSearch className='absolute top-1/2 -translate-y-1/2 text-primary w-4 h-4 ml-3' />
                  <Input type='text' placeholder='Search...' value={search} className='pl-8 bg-white w-full rounded-full border border-primary'
                    onChange={(e) => {
                      setSearch(e.target.value)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                    }}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 "
                  >
                    {search && <LuCircleX />}
                  </button>
                </div>


                {/* <Button onClick={() => console.log(filteredData)}>filteredData</Button> */}

                {(search !== '') &&
                  <div className='absolute bg-white w-[calc(100%-2rem)] md:w-[inherit] h-auto rounded-xl mt-5 border shadow-sm max-h-[300px] md:max-h-[400px] overflow-y-auto'>
                    
                    {filteredData.map((val, i) => (
                      <>
                        <div className='flex gap-4 p-4 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer' onClick={() => {
                          navigate(`/product/${val.id}`)
                          setSearch('')

                        }}>
                          {/* <div className='w-10 md:w-15 h-fit aspect-square shrink-0 rounded-md bg-gray-300'></div> */}
                          <img src={val.imageUrl} alt={val.imageUrl} className='w-10 md:w-15 h-fit aspect-square shrink-0 rounded-xl' />
                          <div className='min-w-0'>
                            <div className='text-sm md:text-lg truncate'>{val.name}</div>
                            <div className='text-sm md:text-lg font-semibold'>Rp {val.price.toLocaleString('id-ID')}</div>
                          </div>
                        </div >

                        {(i < filteredData.length - 1) && <hr className='m-2' />}
                      </>
                    ))}

                  </div>
                }

              </div>

              <div className='hidden md:flex gap-2'>
                <Link to={'/cart'}> <Button variant='outline' onClick={() => setMenuClicked('cart')} className={
                  (menuClicked == 'cart')
                    ? 'text-white! bg-primary hover:bg-primary/80'
                    : 'text-primary!'
                }>
                  {menuClicked == 'cart'
                    ? <IoCart />
                    : <IoCartOutline />
                  }
                  {totalQty == '0'
                    ? 'Cart'
                    : 'Cart ' + totalQty
                  }
                </Button> </Link>
                <Link to={'/transaction'}> <Button variant='outline' onClick={() => setMenuClicked('transaction')} className={
                  (menuClicked == 'transaction')
                    ? 'text-white! bg-primary hover:bg-primary/80'
                    : 'text-primary!'
                }>
                  {menuClicked == 'transaction'
                    ? <><IoDocumentText /> Transaction</>
                    : <><IoDocumentTextOutline />Transaction</>
                  }
                </Button> </Link>
                <Link to={'/profile'}> <Button variant='outline' onClick={() => setMenuClicked('profile')} className={
                  (menuClicked == 'profile')
                    ? 'text-white! bg-primary hover:bg-primary/80'
                    : 'text-primary!'
                }>
                  {menuClicked == 'profile'
                    ? <IoPerson />
                    : <IoPersonOutline />
                  }</Button> </Link>
              </div>

            </div>
          </div>
        </div>
      </header >


      <div className='mb-[60px]'></div>

    </>
  )
}