'use client'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'
import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

export default function CarrinhoPage() {
  const { cart, removeFromCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const cartItems = cart.map((item) => {
    const product = products.find(p => p.id === item.id)
    return product ? { ...product, quantity: item.quantity } : null
  }).filter(Boolean)

  const total = cartItems.reduce((acc, item) => acc + item!.price * item!.quantity, 0)
    
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Seu carrinho está vazio')
      return
    }

    setIsProcessing(true)
    
    try {
      const orderItems = cartItems.map(item => ({
        menuItemId: parseInt(item!.id),
        quantity: item!.quantity
      }))

      const response = await fetch('https://sushiweb-backend.onrender.com/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: orderItems,
          customerName: customerData.name,
          customerPhone: customerData.phone,
          status: 'pending'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao processar pedido')
      }

      const order = await response.json()
      router.push(`/pedido/${order.id}`)
      toast.success('Pedido realizado com sucesso!')
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error)
      toast.error(error instanceof Error ? error.message : 'Erro ao processar seu pedido. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">🛒 Seu Carrinho</h1>
        <p className="text-gray-600 mb-6">Seu carrinho está vazio.</p>
        <a 
          href="/" 
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Ver Cardápio
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Seu Carrinho</h1>

      <div className="space-y-6 mb-8">
        {cartItems.map(item => (
          <div key={item!.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-black">{item!.name}</h2>
              <p className="text-sm text-gray-600">Qtd: {item!.quantity}</p>
              <p className="text-sm text-rose-600 font-bold">R$ {(item!.price * item!.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeFromCart(item!.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              disabled={isProcessing}
            >
              Remover
            </button>
          </div>
        ))}

        <div className="text-right mt-6 text-xl font-bold text-white">
          Total: R$ {total.toFixed(2)}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={isProcessing || cartItems.length === 0}
          className={`px-6 py-3 rounded-lg font-medium text-white ${
            isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
        </button>
      </div>
    </div>
  )
}
