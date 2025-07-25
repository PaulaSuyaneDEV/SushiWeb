'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { Product } from '@/context/CartContext'
import { useState, useEffect } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, removeFromCart, updateQuantity, removeQuantityFromCart } = useCart()

  const cartItem = cart.find(item => item.id === product.id)
  const quantity = cartItem?.quantity || 0

  const [inputValue, setInputValue] = useState(quantity.toString())

  // Sincroniza input com a quantidade real do carrinho
  useEffect(() => {
    setInputValue(quantity.toString())
  }, [quantity])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-3 flex flex-col justify-between">
      <Image
        src={product.image}
        alt={`Foto de ${product.name}, categoria ${product.category}`}
        width={250}
        height={150}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-lg font-bold text-rose-600">
            R$ {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
          </p>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg w-full text-sm font-medium"
          >
            Adicionar ao Carrinho
          </button>

          {quantity > 0 && (
            <button
              onClick={() => {
                const parsed = parseInt(inputValue)
                if (!isNaN(parsed) && parsed >= 1) {
                  removeQuantityFromCart(product.id, parsed)
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium"
            >
              Remover
            </button>
          )}
        </div>

        {quantity > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <label htmlFor={`qty-${product.id}`} className="text-sm text-gray-600">
              Quantidade:
            </label>
            <input
              id={`qty-${product.id}`}
              type="number"
              min={1}
              value={inputValue}
              onChange={handleQuantityChange}
              className="w-16 border border-gray-400 bg-white text-gray-900 rounded px-2 py-1 text-sm"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
                appearance: 'textfield'
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
