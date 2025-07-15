'use client'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const totalItems = Object.values(cart).reduce((sum, qnt) => sum + qnt, 0)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">

        <Link href="/" className="text-xl font-bold text-rose-600 hover:opacity-80 transition">
          🍣 Um Sushi
        </Link>

        <Link href="/carrinho" className="relative group flex items-center gap-2 text-gray-700 hover:text-rose-600 transition">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
