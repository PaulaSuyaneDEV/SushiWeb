'use client'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

export default function CarrinhoPage() {
  const { cart, removeFromCart } = useCart()

  const cartItems = cart.map((item) => {
    const product = products.find(p => p.id === item.id)
    return product ? { ...product, quantity: item.quantity } : null
  }).filter(Boolean)

  const total = cartItems.reduce((acc, item) => acc + item!.price * item!.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-6">
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
              >
                Remover
              </button>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold text-white">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}
