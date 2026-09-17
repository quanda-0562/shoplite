import { ProductCard } from "./components/ProductCard";
import type { Product } from "./types/product";

interface ProductsResponse {
  products: Product[];
}

export default async function HomePage() {
  // Server Component: this fetch stays on the server and the resulting cards are in the initial HTML.
  const res = await fetch("https://dummyjson.com/products?limit=12&select=id,title,price,thumbnail,category,rating", {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm.");

  const { products }: ProductsResponse = await res.json();

  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Server Component</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Sản phẩm nổi bật</h1>
      <p className="mt-3 max-w-2xl text-slate-600">Danh sách được fetch và render trên server. Chỉ ô tìm kiếm, badge và nút thêm giỏ được gửi JavaScript xuống trình duyệt.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
