import { useProduct } from '../hooks/useProducts'
import { useCartStore } from '../store/cartStore'

interface ProductDetailProps {
  productId: number
  onClose: () => void
}

const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })

export function ProductDetail({ productId, onClose }: ProductDetailProps) {
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId)
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-live="polite">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">Chi tiết sản phẩm</h2>
        <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Quay lại</button>
      </div>

      {isLoading && <div className="grid animate-pulse gap-6 md:grid-cols-2"><div className="aspect-square rounded-xl bg-slate-200" /><div className="space-y-4"><div className="h-7 w-3/4 rounded bg-slate-200" /><div className="h-5 w-1/3 rounded bg-slate-200" /><div className="h-20 rounded bg-slate-200" /></div></div>}

      {isError && <div className="rounded-xl bg-rose-50 p-5 text-rose-700"><p>{error.message}</p><button type="button" onClick={() => refetch()} className="mt-3 rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white hover:bg-rose-700">Thử lại</button></div>}

      {product && !isLoading && !isError && (
        <div className="grid gap-6 md:grid-cols-2">
          <img src={product.thumbnail} alt={product.title} className="aspect-square w-full rounded-xl bg-slate-100 object-cover" />
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">{product.category}</p>
            <h3 className="mt-2 text-2xl font-black">{product.title}</h3>
            <p className="mt-4 text-2xl font-black text-rose-600">{currencyFormatter.format(product.price)}</p>
            <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
            <p className="mt-4 text-sm text-slate-500">Rating {product.rating.toFixed(1)} | Còn {product.stock} sản phẩm</p>
            <button type="button" onClick={() => addToCart(product)} className="mt-6 rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700">Thêm vào giỏ</button>
          </div>
        </div>
      )}
    </section>
  )
}
