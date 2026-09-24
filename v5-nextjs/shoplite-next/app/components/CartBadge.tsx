"use client";

import { useCartStore } from "../store/cartStore";

export function CartBadge() {
  const count = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return <span aria-hidden="true" className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-xs font-bold text-white">{count}</span>;
}
