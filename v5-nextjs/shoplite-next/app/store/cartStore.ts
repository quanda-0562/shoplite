"use client";

import { createContext, createElement, useContext, useState, type ReactNode } from "react";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand/vanilla";
import type { CartItem, Product } from "../types/product";

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

type CartStoreApi = StoreApi<CartStore>;

function createCartStore() {
  return createStore<CartStore>()(persist((set, get) => ({
    items: [],
    addToCart: (product) => set((state) => {
      const item = state.items.find((cartItem) => cartItem.id === product.id);
      return item
        ? { items: state.items.map((cartItem) => cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem) }
        : { items: [...state.items, { ...product, quantity: 1 }] };
    }),
    removeFromCart: (productId) => set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
    updateQty: (productId, quantity) => set((state) => ({ items: quantity > 0 ? state.items.map((item) => item.id === productId ? { ...item, quantity } : item) : state.items.filter((item) => item.id !== productId) })),
    clearCart: () => set({ items: [] }),
    getCartTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
  }), { name: "shoplite-cart", partialize: (state) => ({ items: state.items }) }));
}

const CartStoreContext = createContext<CartStoreApi | null>(null);

export function CartStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createCartStore);
  return createElement(CartStoreContext.Provider, { value: store }, children);
}

export function useCartStore<T>(selector: (state: CartStore) => T): T {
  const store = useContext(CartStoreContext);
  if (!store) throw new Error("useCartStore phải được dùng trong CartStoreProvider.");
  return useStore(store, selector);
}
