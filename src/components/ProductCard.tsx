'use client'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  image: string
  price: number
  category: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, removeFromCart } = useCart()

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-2 flex flex-col justify-between">
      <Image
        src={product.image}
        alt={product.name}
        width={250}
        height={150}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-lg font-bold text-rose-600">R$ {product.price.toFixed(2)}</p>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => addToCart(product.id)}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg w-full text-sm font-medium"
          >
            Adicionar ao Carrinho
          </button>

          {cart[product.id] && (
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium"
            >
              Remover
            </button>
          )}
        </div>

        {cart[product.id] && (
          <p className="mt-2 text-sm text-gray-600">Quantidade: {cart[product.id]}</p>
        )}
      </div>
    </div>
  )
}
