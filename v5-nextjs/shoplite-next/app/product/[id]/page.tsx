import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../components/AddToCartButton";
import type { Product } from "../../types/product";

interface ProductDetail extends Product {
  description: string;
  stock: number;
  brand?: string;
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Server Component: data fetching and detail HTML are generated on the server.
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 300 },
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Không thể tải chi tiết sản phẩm.");

  const product: ProductDetail = await res.json();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="grid gap-7 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
          <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" priority />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{product.title}</h1>
          <p className="mt-4 text-3xl font-black text-rose-600">${product.price}</p>
          <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            {product.brand && <div><dt className="text-slate-500">Thương hiệu</dt><dd className="mt-1 font-bold text-slate-800">{product.brand}</dd></div>}
            <div><dt className="text-slate-500">Đánh giá</dt><dd className="mt-1 font-bold text-slate-800">{product.rating.toFixed(1)} / 5</dd></div>
            <div><dt className="text-slate-500">Tồn kho</dt><dd className="mt-1 font-bold text-slate-800">{product.stock} sản phẩm</dd></div>
          </dl>
          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            <AddToCartButton product={product} />
            <Link href="/" className="mt-4 rounded-lg border border-blue-600 px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50">Quay về sản phẩm</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
