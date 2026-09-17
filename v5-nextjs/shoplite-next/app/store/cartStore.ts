"use client";

import { create } from "zustand";
import type { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
}

// Client-only store: only interactive components import this module.
export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  addToCart: (product) => set((state) => {
    const item = state.items.find((cartItem) => cartItem.id === product.id);

    if (item) {
      return {
        items: state.items.map((cartItem) => (
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )),
      };
    }

    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
}));
