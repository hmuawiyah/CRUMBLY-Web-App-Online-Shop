import React, { useState, ReactNode, useEffect } from 'react'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import ProductCard, { LazyProductCard } from '@/components/ProductCard'
import FeatureContent from '@/components/FeatureContent'
import { Button } from '@/components/ui/button'

import { LuShoppingCart, LuChefHat, LuBadgeCheck, LuAward, LuTruck } from 'react-icons/lu'
import { readAllProduct } from '@/service/product.service'

const radioItems: string[] = ['Fresh Arrivals', 'Special Offers', 'Full Menu']

export default function Home() {
  type Product = {
    id: number
    name: string
    description: string
    price: number
    stock: number
    imageUrl: string
    createdAt: string
    updatedAt: string
  }

  const [radioFilter, setRadioFilter] = useState<string>('Fresh Arrivals')
  const [dataProduct, setDataProduct] = useState<Product[]>([])
  const [filteredDataProduct, setFilteredDataProduct] = useState<Product[]>([])

  const reversed = [...dataProduct].reverse()
  const shuffled = [...dataProduct].sort(() => Math.random() - 0.5)

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    readAllProduct()
      .then(res => {
        setDataProduct(res.data.products)
        setFilteredDataProduct(res.data.products)
        // console.log({ data: res.data })
      })
      .catch((error: any) => {
        console.log('Error: ' + error.message)
      })
      .finally(() => setLoading(false))

  }, [])

  return (
    <>

      <div className='flex justify-start md:justify-center items-center w-full space-y-4 overflow-x-auto h-15 mt-15'>
        <div className='flex gap-5'>
          {radioItems.map((item: string, i: number) => (
            <Button
              variant={radioFilter == item ? 'outline' : 'ghost'}
              size='lg'
              onClick={() => {
                setRadioFilter(item)
                item == 'Fresh Arrivals' ? setFilteredDataProduct(dataProduct) : ''
                item == 'Special Offers' ? setFilteredDataProduct(shuffled) : ''
                item == 'Full Menu' ? setFilteredDataProduct(reversed) : ''
                // setDataProduct() 
              }}
              className={radioFilter == item
                ? 'border border-primary rounded-full opacity-100'
                : 'rounded-full opacity-40'
              }
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex justify-center items-center mt-15'>
        <div className='flex flex-wrap justify-start md:justify-center gap-2 md:gap-4 w-full md:w-[80%]'>
          {loading
            ? [1, 2, 3, 4, 5, 6].map(() => (
              <LazyProductCard />
            ))
            : filteredDataProduct.map((product) => (
              <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} />
            ))
          }
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div className='w-[70%] aspect-3/1 h-auto bg-gray-400 rounded-lg mt-40'>
          Ads Delivery
        </div>
      </div>

      <div className='flex justify-center mt-40'>
        <div className='flex flex-wrap md:flex-nowrap justify-center items-center w-[100%] gap-4'>
          <FeatureContent icon={<LuChefHat strokeWidth={1.5} className='w-7! h-7! md:w-9! md:h-9!' />} text1="Always Freshly" text2="Baked" />
          <FeatureContent icon={<LuBadgeCheck strokeWidth={1.5} className='w-7! h-7! md:w-9! md:h-9!' />} text1="High-Quality" text2="Standards" />
          <FeatureContent icon={<LuAward strokeWidth={1.5} className='w-7! h-7! md:w-9! md:h-9!' />} text1="Two Decades" text2="of Quality" />
          <FeatureContent icon={<LuTruck strokeWidth={1.5} className='w-7! h-7! md:w-9! md:h-9!' />} text1="Same-Day" text2="Delivery" />
        </div>
      </div>

    </>
  )
}

