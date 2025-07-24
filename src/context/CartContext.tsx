'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Product = {
  id: string
  name: string
  category: string
  image: string
  price: number
}

export type CartItem = Product & { quantity: number }

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  removeQuantityFromCart: (id: string, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Carrega do localStorage apenas no client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart))
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error)
        }
      }
    }
  }, [])

  // Salva no localStorage sempre que cart mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  const addToCart = (product: Product) => {
  setCart(prev => {
    const updatedCart = (() => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })()

    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    return updatedCart
  })
}


  const removeFromCart = (id: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity } : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeQuantityFromCart = (id: string, quantityToRemove: number) => {
    if (quantityToRemove < 1) return

    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity - quantityToRemove
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter((item): item is CartItem => item !== null)
    )
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, removeQuantityFromCart }}
    >
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
