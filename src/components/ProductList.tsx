'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type RawProduct = {
  id: string
  name: string
  category: string
  image: string
  price: number
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null)
        
        const res = await fetch('https://sushiweb-backend.onrender.com/menu')
        
        if (!res.ok) {
          throw new Error(`Erro ao carregar produtos: ${res.status} ${res.statusText}`)
        }
        
        const data: RawProduct[] = await res.json()
        console.log('Dados da API:', data)

        const adaptado: Product[] = data.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          image: 'https://sushiweb-backend.onrender.com' + item.image,
          price: item.price
        }))

        setProducts(adaptado)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.')
        toast.error('Erro ao carregar o cardápio. Tente atualizar a página.')
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    if (filter === 'bebidas') return product.category === 'Bebida'
    if (filter === 'comidas') return product.category !== 'Bebida'
    return true
  })

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>
    </div>
  )
}
