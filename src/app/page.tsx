'use client'
import ProductList from '@/components/ProductList'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-7">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-1">
          Cardápio <span className="text-rose-600">Um Sushi</span> 🍣
        </h1>
        <ProductList />
      </div>
    </div>
  )
}
