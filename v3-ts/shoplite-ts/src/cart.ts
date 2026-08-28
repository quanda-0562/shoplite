import type { CartItem, Product } from "./types";

const CART_STORAGE_KEY = "shoplite-cart";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isCartItem(value: unknown): value is CartItem {
    return (
        isRecord(value) &&
        typeof value.id === "number" &&
        typeof value.title === "string" &&
        typeof value.description === "string" &&
        typeof value.price === "number" &&
        typeof value.discountPercentage === "number" &&
        typeof value.rating === "number" &&
        typeof value.stock === "number" &&
        typeof value.category === "string" &&
        typeof value.thumbnail === "string" &&
        Array.isArray(value.images) &&
        value.images.every((image) => typeof image === "string") &&
        typeof value.quantity === "number" &&
        Number.isInteger(value.quantity) &&
        value.quantity > 0
    );
}

function loadCart(): CartItem[] {
    try {
        const cartJSON = localStorage.getItem(CART_STORAGE_KEY);

        if (!cartJSON) {
            return [];
        }

        const parsed: unknown = JSON.parse(cartJSON);
        return Array.isArray(parsed) && parsed.every(isCartItem) ? parsed : [];
    } catch (error: unknown) {
        console.error("Không thể đọc giỏ hàng:", error);
        return [];
    }
}

function saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function getCart(): CartItem[] {
    return loadCart();
}

export function addToCart(product: Product): CartItem[] {
    const cart = loadCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    return cart;
}

export function removeFromCart(productId: number): CartItem[] {
    const cart = loadCart().filter((item) => item.id !== productId);
    saveCart(cart);
    return cart;
}

export function updateQty(productId: number, quantity: number): CartItem[] {
    if (!Number.isInteger(quantity) || quantity < 1) {
        return removeFromCart(productId);
    }

    const cart = loadCart().map((item) => (
        item.id === productId ? { ...item, quantity } : item
    ));

    saveCart(cart);
    return cart;
}

export function getCartTotal(cart: CartItem[] = loadCart()): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartQuantity(cart: CartItem[] = loadCart()): number {
    return cart.reduce((total, item) => total + item.quantity, 0);
}
