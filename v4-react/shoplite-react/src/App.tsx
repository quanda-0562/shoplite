import { useState } from 'react'
import { ContactForm } from './components/ContactForm'
import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import { ProductList } from './components/ProductList'
import { products } from './data'
import type { CartItem, Product } from './types'
import { normalizeVietnamese } from './utils/normalizeVietnamese'

function App() {
  const [query, setQuery] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const normalizedQuery = normalizeVietnamese(query)
  const filteredProducts = products.filter((product) => {
    const searchableText = normalizeVietnamese(`${product.title} ${product.category}`)
    return searchableText.includes(normalizedQuery)
  })
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
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Khám phá</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Sản phẩm nổi bật</h1>
          </div>
          <p className="text-sm text-slate-500">{filteredProducts.length} sản phẩm</p>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} onAddToCart={addToCart} />
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">Không tìm thấy sản phẩm phù hợp.</p>
        )}

        <section className="mt-14 grid gap-6 md:grid-cols-2" aria-label="Biểu mẫu người dùng">
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
      </main>
    </div>
  )
}

export default App
