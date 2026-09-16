import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-blue-700">
          ShopLite
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-600 lg:flex" aria-label="Điều hướng chính">
          <Link href="/">Sản phẩm</Link>
          <Link href="/orders">Đơn hàng</Link>
          <Link href="/login">Đăng nhập</Link>
        </nav>

        <label className="relative ml-auto min-w-0 max-w-xl flex-1">
          <span className="sr-only">Tìm kiếm sản phẩm</span>
          <input
            type="search"
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
          <svg className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="6" />
            <path d="m16 16 4 4" />
          </svg>
        </label>

        <Link href="/cart" className="relative grid size-10 shrink-0 place-items-center rounded-full text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label="Giỏ hàng, 0 sản phẩm">
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 3h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 7H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-xs font-bold text-white">0</span>
        </Link>
      </div>
    </header>
  );
}
