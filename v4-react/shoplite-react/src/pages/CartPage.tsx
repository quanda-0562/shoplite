import { Link } from 'react-router-dom'
import { getCartTotal, useCartStore } from '../store/cartStore'

const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQty = useCartStore((state) => state.updateQty)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const total = getCartTotal(items)

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h1 className="text-2xl font-black">Giỏ hàng trống</h1>
        <p className="mt-2 text-slate-600">Hãy thêm một sản phẩm để bắt đầu.</p>
        <Link to="/" className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">Xem sản phẩm</Link>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Zustand + localStorage</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Giỏ hàng</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {items.map((item) => (
            <article key={item.id} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center">
              <img src={item.thumbnail} alt={item.title} className="size-[72px] rounded-lg bg-slate-100 object-cover" />
              <div className="min-w-0">
                <h2 className="font-bold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-sm font-semibold text-rose-600">{currencyFormatter.format(item.price)}</p>
                <div className="mt-3 flex items-center gap-2" aria-label={`Số lượng ${item.title}`}>
                  <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} className="grid size-8 place-items-center rounded border border-slate-300 text-lg font-bold text-slate-700 hover:bg-slate-100" aria-label={`Giảm số lượng ${item.title}`}>-</button>
                  <span className="grid min-w-8 place-items-center font-bold">{item.quantity}</span>
                  <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} className="grid size-8 place-items-center rounded border border-slate-300 text-lg font-bold text-slate-700 hover:bg-slate-100" aria-label={`Tăng số lượng ${item.title}`}>+</button>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end">
                <p className="font-extrabold text-slate-900">{currencyFormatter.format(item.price * item.quantity)}</p>
                <button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-semibold text-rose-600 hover:text-rose-700">Xóa</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-lg font-black">Tổng kết đơn hàng</h2>
          <div className="mt-5 flex items-center justify-between border-b border-slate-200 pb-4 text-slate-600"><span>Tạm tính</span><span>{currencyFormatter.format(total)}</span></div>
          <div className="mt-4 flex items-center justify-between text-lg font-black"><span>Tổng cộng</span><span className="text-rose-600">{currencyFormatter.format(total)}</span></div>
          <button type="button" onClick={() => window.alert('Thanh toán sẽ được triển khai ở module Next.')} className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700">Thanh toán</button>
        </aside>
      </div>
    </section>
  )
}
