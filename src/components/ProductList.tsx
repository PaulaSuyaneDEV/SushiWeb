'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '@/data/products'

export default function ProductList() {
  const [filter, setFilter] = useState<'todos' | 'comidas' | 'bebidas'>('todos')

  const filteredProducts = products.filter((product) => {
    if (filter === 'bebidas') return product.category === 'Bebida'
    if (filter === 'comidas') return product.category !== 'Bebida'
    return true
  })

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Botões de filtro */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full border transition ${
            filter === 'todos'
              ? 'bg-red-600 text-white'
              : 'border-red-600 text-red-600 hover:bg-red-100'
          }`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-full border transition ${
            filter === 'comidas'
              ? 'bg-red-600 text-white'
              : 'border-red-600 text-red-600 hover:bg-red-100'
          }`}
          onClick={() => setFilter('comidas')}
        >
          Comidas
        </button>
        <button
          className={`px-4 py-2 rounded-full border transition ${
            filter === 'bebidas'
              ? 'bg-red-600 text-white'
              : 'border-red-600 text-red-600 hover:bg-green-100'
          }`}
          onClick={() => setFilter('bebidas')}
        >
          Bebidas
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
