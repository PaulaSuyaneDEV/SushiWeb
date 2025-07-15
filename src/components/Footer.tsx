// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white shadow-md border-t border-gray-200 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Um Sushi. Todos os direitos reservados.
        </p>

        <div className="flex gap-4">
          <a href="#" className="hover:text-rose-600 transition text-sm text-gray-600">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-rose-600 transition text-sm text-gray-600">
            Contato
          </a>
        </div>
      </div>
    </footer>
  )
}
