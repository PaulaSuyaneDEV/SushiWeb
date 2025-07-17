'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Cart = { [productId: string]: number }

interface CartContextType {
  cart: Cart
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({})

  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[id] > 1) {
        newCart[id] -= 1
      } else {
        delete newCart[id]
      }
      return newCart
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (quantity < 1) {
        delete newCart[id]
      } else {
        newCart[id] = quantity
      }
      return newCart
    })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro do CartProvider')
  }
  return context
}
