const CART_STORAGE_KEY = "shoplite-cart";

function loadCart() {
    try {
        const cartJSON = localStorage.getItem(CART_STORAGE_KEY);

        if (!cartJSON) {
            return [];
        }

        const cart = JSON.parse(cartJSON);
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        console.error("Không thể đọc giỏ hàng:", error);
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function getCart() {
    return loadCart();
}

export function addToCart(product) {
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

export function removeFromCart(productId) {
    const cart = loadCart().filter((item) => item.id !== productId);
    saveCart(cart);
    return cart;
}

export function updateQty(productId, quantity) {
    const nextQuantity = Number(quantity);

    if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
        return removeFromCart(productId);
    }

    const cart = loadCart().map((item) => (
        item.id === productId ? { ...item, quantity: nextQuantity } : item
    ));

    saveCart(cart);
    return cart;
}

export function getCartTotal(cart = loadCart()) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartQuantity(cart = loadCart()) {
    return cart.reduce((total, item) => total + item.quantity, 0);
}
