"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Suspense } from "react";
import { CartBadge } from "./CartBadge";
import { SearchBar } from "./SearchBar";

export function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-blue-700">
          ShopLite
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-600 lg:flex" aria-label="Điều hướng chính">
          <Link href="/">Sản phẩm</Link>
          <Link href="/orders">Đơn hàng</Link>
        </nav>

        <Suspense fallback={<div className="ml-auto h-9 max-w-xl flex-1 rounded-full bg-slate-100" />}>
          <SearchBar />
        </Suspense>

        {status === "loading" ? <span className="text-sm text-slate-500">...</span> : session?.user ? <><span className="hidden text-sm font-semibold text-slate-600 md:block">{session.user.name}</span><button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="shrink-0 text-sm font-bold text-slate-700 hover:text-blue-700">Đăng xuất</button></> : <Link href="/login" className="shrink-0 text-sm font-bold text-blue-700 hover:text-blue-900">Đăng nhập</Link>}
        <Link href="/cart" className="relative grid size-10 shrink-0 place-items-center rounded-full text-slate-700 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label="Giỏ hàng">
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 3h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 7H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <CartBadge />
        </Link>
      </div>
    </header>
  );
}
