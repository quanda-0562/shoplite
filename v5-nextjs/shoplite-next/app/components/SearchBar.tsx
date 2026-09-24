"use client";

import { useSearchParams } from "next/navigation";

export function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  // Client Component: controlled input needs state and an onChange handler.
  return (
    <form action="/" className="relative ml-auto min-w-0 max-w-xl flex-1" key={`${query}-${category}`}>
      <label className="sr-only" htmlFor="header-search">Tìm kiếm sản phẩm</label>
      <input
        id="header-search"
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Tìm sản phẩm..."
        className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
      {category && <input type="hidden" name="category" value={category} />}
      <svg className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </svg>
    </form>
  );
}
