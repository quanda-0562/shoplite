import Image from "next/image";
import Link from "next/link";
import type { Product } from "../types/product";
import { AddToCartButton } from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

// Server Component: product content is rendered into the initial HTML.
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-square w-full bg-slate-100">
        <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{product.category}</p>
        <h2 className="mt-2 line-clamp-2 min-h-12 font-bold text-slate-900">{product.title}</h2>
        <p className="mt-3 text-sm text-amber-600">★ {product.rating.toFixed(1)}</p>
        <p className="mt-3 text-lg font-black text-rose-600">${product.price}</p>
        <div className="mt-auto grid gap-2 pt-4">
          <AddToCartButton product={product} />
          <Link href={`/product/${product.id}`} className="rounded-lg border border-blue-600 px-3 py-2 text-center text-sm font-bold text-blue-700 hover:bg-blue-50">Xem chi tiết</Link>
        </div>
      </div>
    </article>
  );
}
