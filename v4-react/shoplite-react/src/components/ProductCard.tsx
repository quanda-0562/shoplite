import type { Product } from '../types'
import { useCartStore } from '../store/cartStore'

interface ProductCardProps {
  product: Product
  onViewDetail: (productId: number) => void
}

const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })

export function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <img src={product.thumbnail} alt={product.title} className="aspect-square w-full bg-slate-100 object-cover" />
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{product.category}</p>
        <h2 className="mt-2 line-clamp-2 min-h-10 text-sm font-bold text-slate-800 sm:text-base">{product.title}</h2>
        <div className="mt-3 flex items-center gap-1 text-sm text-amber-500"><span aria-hidden="true">★</span><span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span><span className="text-slate-400">({product.stock} còn lại)</span></div>
        <p className="mt-3 text-base font-extrabold text-rose-600 sm:text-lg">{currencyFormatter.format(product.price)}</p>
        <div className="mt-4 grid gap-2">
          <button type="button" onClick={() => addToCart(product)} className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Thêm vào giỏ</button>
          <button type="button" onClick={() => onViewDetail(product.id)} className="rounded-xl border border-blue-600 px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Xem chi tiết</button>
        </div>
      </div>
    </article>
  )
}
