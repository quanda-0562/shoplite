import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types'

interface CartStore {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQty: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const getCartCount = (items: CartItem[]) => items.reduce((total, item) => total + item.quantity, 0)

export const getCartTotal = (items: CartItem[]) => items.reduce((total, item) => total + item.price * item.quantity, 0)

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) => set((state) => {
        const item = state.items.find((cartItem) => cartItem.id === product.id)

        if (item) {
          return {
            items: state.items.map((cartItem) => (
              cartItem.id === product.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )),
          }
        }

        return { items: [...state.items, { ...product, quantity: 1 }] }
      }),
      removeFromCart: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),
      updateQty: (productId, quantity) => set((state) => ({
        items: quantity > 0
          ? state.items.map((item) => (item.id === productId ? { ...item, quantity } : item))
          : state.items.filter((item) => item.id !== productId),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shoplite-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
