import React, { useMemo, useState, useEffect } from 'react'
import useCartStore from '@/store/cart.store'

import OrderCart, { LazyOrderCart, NoDataOrderCart } from '@/components/PageCart/OrderCart'
import OrderSummary, { LazyOrderSummary } from '@/components/PageCart/OrderSummary'
import { readProductByIds } from '@/service/product.service'

import { Button } from '@/components/ui/button'

type Product = {
  id: string | number
  name: string
  price: number
  imageUrl: string
}

export default function BuyerCart() {
  const [loadingProducts, setLoadingProducts] = useState(true)
  const cartItems = useCartStore(state => state.items ?? [])
  const { increaseQty, decreaseQty, toggleSelect, selectAll, unselectAll } = useCartStore()

  const [products, setProducts] = useState<Product[]>([])

  const productIds = cartItems.map(i => i.id)

  useEffect(() => {
    const jwtToken = localStorage.getItem('token')
    if (!jwtToken) return
    if (productIds.length === 0) {
      setProducts([])
      setLoadingProducts(false)
      return
    }

    readProductByIds(jwtToken, productIds)
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => {
        alert('Failed fetching data')
        console.error(err)
      })
      .finally(() => setLoadingProducts(false))

  }, [cartItems])

  const cartViewData = useMemo(() => {
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.id)
      return {
        id: item.id,
        name: product?.name ?? item.name,
        image: product?.imageUrl ?? '',
        price: product?.price ?? 0,
        qty: item.qty,
        subtotal: (product?.price ?? 0) * item.qty,
        selected: item.selected ?? false
      }
    })
  }, [cartItems, products])

  const totalPrice = useMemo(() => {
    return cartViewData
      .filter(i => i.selected)
      .reduce((acc, i) => acc + i.subtotal, 0)
  }, [cartViewData])

  const [isSelectAll, setIsSelectAll] = useState(false)
  const toggleSelectAll = () => {
    const next = !isSelectAll
    setIsSelectAll(next)
    next ? selectAll() : unselectAll()
  }

  const handleQty = (id: string | number, delta: number) => {
    if (delta > 0) increaseQty(id)
    else decreaseQty(id)
  }

  const handleToggle = (id: string | number) => toggleSelect(id)

  const handleRemove = (id: string | number) => {
    const item = cartItems.find(i => i.id === id)
    if (!item) return
    for (let i = 0; i < item.qty; i++) decreaseQty(id)
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between w-full mt-15 gap-6">
      <div className="w-full md:w-[70%] space-y-4">

        <div className="flex items-center gap-3">
          <input type="checkbox" checked={isSelectAll} onChange={toggleSelectAll} className="w-4 h-4" />
          <div className="text-sm">Select All</div>
        </div>

        <div className="space-y-4">

          {/* <Button onClick={() => { alert(cartViewData.length) }}>cartViewData</Button> */}

          {loadingProducts && (
            <LazyOrderCart />
          )}

          {!loadingProducts && cartViewData.length > 0 && (
            cartViewData.map(item => (
              <OrderCart
                key={item.id}
                item={item}
                onQty={handleQty}
                onRemove={handleRemove}
                onToggle={handleToggle}
              />
            ))
          )}

          {!loadingProducts && cartViewData.length === 0 && (
            <NoDataOrderCart />
          )}

        </div>
      </div>


      <div className="w-full md:w-[30%]">
        {loadingProducts && (
          <LazyOrderSummary />
        )}

        {!loadingProducts && cartViewData.length >= 0 && (
          <OrderSummary cartViewData={cartViewData} totalPrice={totalPrice} />
        )}
      </div>
    </div>
  )
}
