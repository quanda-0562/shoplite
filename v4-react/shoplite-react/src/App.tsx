import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ContactForm } from './components/ContactForm'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import { ProductList } from './components/ProductList'
import { ProductListSkeleton } from './components/ProductListSkeleton'
import { useProducts } from './hooks/useProducts'
import { ProductDetailPage } from './pages/ProductDetailPage'
import type { CartItem, Product } from './types'
import { normalizeVietnamese } from './utils/normalizeVietnamese'

interface CatalogPageProps {
  query: string
  onAddToCart: (product: Product) => void
}

function CatalogPage({ query, onAddToCart }: CatalogPageProps) {
  const navigate = useNavigate()
  const { data: products = [], isLoading, isError, error, refetch } = useProducts()
  const normalizedQuery = normalizeVietnamese(query)
  const filteredProducts = products.filter((product) => {
    const searchableText = normalizeVietnamese(`${product.title} ${product.category}`)
    return searchableText.includes(normalizedQuery)
  })

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Server state: TanStack Query</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Sản phẩm nổi bật</h1>
        </div>
        <p className="text-sm text-slate-500">{isLoading ? 'Đang tải sản phẩm...' : `${filteredProducts.length} sản phẩm`}</p>
      </div>

      {isLoading && <ProductListSkeleton />}

      {isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800" role="alert">
          <p className="font-bold">Không thể tải danh sách sản phẩm.</p>
          <p className="mt-1 text-sm">{error.message}</p>
          <button type="button" onClick={() => refetch()} className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700">Thử lại</button>
        </div>
      )}

      {!isLoading && !isError && filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} onAddToCart={onAddToCart} onViewDetail={(id) => navigate(`/products/${id}`)} />
      )}

      {!isLoading && !isError && filteredProducts.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">Không tìm thấy sản phẩm phù hợp.</p>
      )}

      <section className="mt-14 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <strong>Client state:</strong> Giỏ hàng tạm đang nằm trong <code className="rounded bg-amber-100 px-1">useState</code> của App. Dữ liệu sản phẩm được TanStack Query quản lý riêng.
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2" aria-label="Biểu mẫu người dùng">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">RHF + Zod</p>
          <h2 className="mt-2 text-xl font-black">Đăng nhập</h2>
          <p className="mt-2 text-sm text-slate-600">Schema được tách riêng để tái sử dụng tại checkout sau này.</p>
          <LoginForm />
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">RHF + Zod</p>
          <h2 className="mt-2 text-xl font-black">Liên hệ</h2>
          <p className="mt-2 text-sm text-slate-600">Dữ liệu chỉ được báo thành công khi vượt qua toàn bộ validation.</p>
          <ContactForm />
        </article>
      </section>
    </>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  function addToCart(product: Product) {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header query={query} onQueryChange={setQuery} cartCount={cartCount} />
      <main id="products" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Routes>
          <Route path="/" element={<CatalogPage query={query} onAddToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetailPage onAddToCart={addToCart} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
