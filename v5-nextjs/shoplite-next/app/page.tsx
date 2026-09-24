import { ProductCard } from "./components/ProductCard";
import type { Product } from "./types/product";
import type { Metadata } from "next";
import { connection } from "next/server";
import { siteUrl } from "./lib/siteUrl";

export const metadata: Metadata = {
  title: { absolute: "ShopLite | Mua sắm trực tuyến dễ dàng" },
  description: "Khám phá sản phẩm nổi bật tại ShopLite. Tìm kiếm, lọc theo danh mục và chọn món đồ phù hợp với bạn.",
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    title: "ShopLite | Mua sắm trực tuyến dễ dàng",
    description: "Khám phá sản phẩm nổi bật và mua sắm dễ dàng tại ShopLite.",
    type: "website",
  },
};

interface ProductsResponse {
  products: Product[];
}

type HomePageProps = { searchParams: Promise<{ q?: string | string[]; category?: string | string[]; page?: string | string[] }> };

const PAGE_SIZE = 8;

function firstValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

function normalizeVietnamese(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

export default async function HomePage({ searchParams }: HomePageProps) {
  await connection();
  const params = await searchParams;
  const q = firstValue(params.q).trim();
  const category = firstValue(params.category);
  const requestedPage = Number(firstValue(params.page));
  // Server Component: this fetch stays on the server and the resulting cards are in the initial HTML.
  const res = await fetch("https://dummyjson.com/products?limit=100&select=id,title,price,thumbnail,category,rating", {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm.");

  const { products }: ProductsResponse = await res.json();
  const categories = [...new Set(products.map((product) => product.category))].sort();
  const normalizedQuery = normalizeVietnamese(q);
  const filteredProducts = products.filter((product) => (!normalizedQuery || normalizeVietnamese(product.title).includes(normalizedQuery)) && (!category || product.category === category));
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, totalPages) : 1;
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function pageHref(nextPage: number): string {
    const nextParams = new URLSearchParams();
    if (q) nextParams.set("q", q);
    if (category) nextParams.set("category", category);
    if (nextPage > 1) nextParams.set("page", String(nextPage));
    const query = nextParams.toString();
    return query ? `/?${query}` : "/";
  }

  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Server Component</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Sản phẩm nổi bật</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Danh sách được fetch và render trên server. Chỉ ô tìm kiếm, badge và nút thêm giỏ được gửi JavaScript xuống trình duyệt.</p>

      <form action="/" className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_220px_auto]">
        <label className="sr-only" htmlFor="product-search">Tìm sản phẩm</label>
        <input id="product-search" name="q" defaultValue={q} placeholder="Tìm sản phẩm..." className="rounded-lg border border-slate-300 px-3 py-2" />
        <label className="sr-only" htmlFor="product-category">Danh mục</label>
        <select id="product-category" name="category" defaultValue={category} className="rounded-lg border border-slate-300 px-3 py-2"><option value="">Tất cả danh mục</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">Lọc</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">{filteredProducts.length} sản phẩm phù hợp</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} preload={index === 0} />)}
      </div>
      {!visibleProducts.length && <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-6 text-slate-600">Không tìm thấy sản phẩm phù hợp.</p>}
      <nav aria-label="Phân trang" className="mt-8 flex items-center justify-center gap-3">{page > 1 ? <a href={pageHref(page - 1)} className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100">Trước</a> : <span className="rounded-lg border border-slate-200 px-3 py-2 text-slate-600">Trước</span>}<span className="text-sm text-slate-600">Trang {page} / {totalPages}</span>{page < totalPages ? <a href={pageHref(page + 1)} className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100">Sau</a> : <span className="rounded-lg border border-slate-200 px-3 py-2 text-slate-600">Sau</span>}</nav>
    </section>
  );
}
