import { lazy, Suspense, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'

const CatalogPage = lazy(() => import('./pages/CatalogPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

function App() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header query={query} onQueryChange={setQuery} />
      <main id="products" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Suspense fallback={<p className="py-12 text-center text-slate-500">Đang tải trang...</p>}>
          <Routes>
            <Route path="/" element={<CatalogPage query={query} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
