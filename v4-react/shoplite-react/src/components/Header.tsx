import { SearchBar } from './SearchBar'
import { Link } from 'react-router-dom'
import { getCartCount, getCartTotal, useCartStore } from '../store/cartStore'

interface HeaderProps {
  query: string
  onQueryChange: (nextQuery: string) => void
}

const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })

export function Header({ query, onQueryChange }: HeaderProps) {
  const items = useCartStore((state) => state.items)
  const cartCount = getCartCount(items)
  const cartTotal = getCartTotal(items)

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/#products" className="shrink-0 text-xl font-black tracking-tight text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          ShopLite
        </Link>
        <SearchBar query={query} onQueryChange={onQueryChange} />
        <button type="button" className="relative flex shrink-0 items-center gap-2 rounded-full p-2 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label={`Giỏ hàng, ${cartCount} sản phẩm, tổng ${currencyFormatter.format(cartTotal)}`}>
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 3h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 7H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          {cartCount > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-xs font-bold text-white">{cartCount}</span>}
          <span className="hidden text-sm font-bold sm:inline">{currencyFormatter.format(cartTotal)}</span>
        </button>
      </div>
    </header>
  )
}
