"use client";

import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  // Client Component: click events and the Zustand store run in the browser.
  return (
    <button type="button" onClick={() => addToCart(product)} className="mt-4 rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      Thêm vào giỏ
    </button>
  );
}
