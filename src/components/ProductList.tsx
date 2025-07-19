'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

type RawProduct = {
  id: string
  nome: string
  categoria: string
  imagem: string
  preco: number
}

type Product = {
  id: string
  name: string
  category: string
  image: string
  price: number
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<'todos' | 'comidas' | 'bebidas'>('todos')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://sushiweb-backend.onrender.com/menu')
        const data: Product[] = await res.json()

        const adaptado: Product[] = data.map((item) => {
          item.image =  'https://sushiweb-backend.onrender.com' + item.image;
          return item;
        })

        setProducts(adaptado)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (filter === 'bebidas') return product.category === 'Bebida'
    if (filter === 'comidas') return product.category !== 'Bebida'
    return true
  })

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Botões de filtro */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(['todos', 'comidas', 'bebidas'] as const).map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full border transition ${
              filter === type
                ? 'bg-red-600 text-white'
                : 'border-red-600 text-red-600 hover:bg-red-100'
            }`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
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
