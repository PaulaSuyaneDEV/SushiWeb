// src/app/layout.tsx
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Um Sushi',
  description: 'Cardápio digital interativo',
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main> {/* <-- Isso empurra o Footer para o fim */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
