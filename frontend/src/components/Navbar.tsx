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

type dataProps = {
  id: any
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
    const cart = localStorage.getItem('cart-storage');

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

      <header className='fixed w-full top-0 left-0 z-100 bg-gray-200'>
        <div className='h-[60px] mx-4 md:mx-8 lg:mx-30'>
          <div className='flex items-center justify-between h-full'>

            <div className='hidden md:flex'>
              <Link to={'/'}> <Button variant='outline' onClick={() => setMenuClicked('home')}>
                {menuClicked == 'home'
                  ? <IoHome />
                  : <IoHomeOutline />
                }
                Home </Button> </Link>
            </div>

            <div className='w-full md:w-[350px] lg:w-[550px]'>
              <div className='relative'>
                <IoSearch className='absolute top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 ml-3' />
                <Input type='text' placeholder='Search...' value={search} className='pl-8 bg-white w-full rounded-full'
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    // setFilteredData(data.filter((s) => {

                    // }))
                  }}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {search && <LuCircleX />}
                </button>
              </div>


              {/* <Button onClick={() => console.log(filteredData)}>filteredData</Button> */}

              {(search !== '') &&
                <div className='absolute bg-gray-50 w-[calc(100%-2rem)] md:w-[inherit] h-auto rounded-xl mt-5 border shadow-sm'>
                  {filteredData.map((val, i) => (
                    <>
                      <div className='flex gap-4 p-4 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer' onClick={() => {
                        navigate(`/product/${val.id}`)
                        setSearch('')

                      }}>
                        <div className='w-15 h-fit aspect-square shrink-0 rounded-md bg-gray-300'></div>
                        <div className='min-w-0'>
                          <div className='text-lg truncate'>{val.name}</div>
                          <div className='text-lg font-semibold'>Rp {val.price.toLocaleString('id-ID')}</div>
                        </div>
                      </div >

                      {(i < filteredData.length - 1) && <hr className='m-2' />}
                    </>
                  ))}

                </div>
              }

            </div>

            <div className='hidden md:flex gap-1'>
              <Link to={'/cart'}> <Button variant='outline' onClick={() => setMenuClicked('cart')}>
                {menuClicked == 'cart'
                  ? <IoCart />
                  : <IoCartOutline />
                }
                {totalQty == '0'
                  ? ''
                  : totalQty
                }
              </Button> </Link>
              <Link to={'/transaction'}> <Button variant='outline' onClick={() => setMenuClicked('transaction')}>
                {menuClicked == 'transaction'
                  ? <IoDocumentText />
                  : <IoDocumentTextOutline />
                }
              </Button> </Link>
              <Link to={'/profile'}> <Button variant='outline' onClick={() => setMenuClicked('profile')}>
                {menuClicked == 'profile'
                  ? <IoPerson />
                  : <IoPersonOutline />
                }</Button> </Link>
            </div>

          </div>
        </div>
      </header >


      <div className='mb-[60px]'></div>

    </>
  )
}