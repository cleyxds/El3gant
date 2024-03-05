"use client"

import { StaticImageData } from "next/image"
import { ReactNode, createContext, useState } from "react"

type Cart = {
  price: number
  name: string
  id: string
  image: string | StaticImageData
}

type CartContextProvider = {
  addToCart: (cartItem: Cart) => void
  cartItems: Cart[]
  removeById: (id: string) => void
}

export const CartContext = createContext<CartContextProvider>(
  {} as CartContextProvider
)

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Cart[]>([])

  const addToCart = (cartItem: Cart) => {
    setCartItems((prev) => [...prev, cartItem])
  }

  const removeById = () => {}

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeById,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
