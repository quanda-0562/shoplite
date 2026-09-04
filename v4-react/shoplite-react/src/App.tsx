import { Header } from './components/Header'
import { ProductList } from './components/ProductList'
import { products } from './data'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main id="products" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Khám phá</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Sản phẩm nổi bật</h1>
          </div>
          <p className="text-sm text-slate-500">{products.length} sản phẩm</p>
        </div>
        <ProductList products={products} />
      </main>
    </div>
  )
}

export default App
