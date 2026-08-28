import "./style.css";
import { getCart, getCartQuantity, getCartTotal, removeFromCart, updateQty } from "./cart";
import { getClosest, getElement } from "./dom";
import { formatPrice } from "./product-utils";
import type { CartItem } from "./types";

const cartList = getElement<HTMLElement>("#cart-list");
const cartBadge = getElement<HTMLElement>("#cart-badge");
const cartSubtotal = getElement<HTMLElement>("#cart-subtotal");
const cartTotal = getElement<HTMLElement>("#cart-total");

function cartItemHTML(item: CartItem): string {
    return `
        <article class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <a class="cart-thumb" href="product.html?id=${item.id}" aria-label="Xem chi tiết ${item.title}">
                    <img src="${item.thumbnail}" alt="${item.title}">
                </a>
                <div class="cart-item-name"><h3><a href="product.html?id=${item.id}">${item.title}</a></h3><p>${item.category}</p></div>
            </div>
            <div class="cart-quantity" aria-label="Số lượng ${item.title}">
                <button type="button" data-action="decrease" aria-label="Giảm số lượng">−</button>
                <input class="cart-qty" type="number" value="${item.quantity}" min="1" data-action="quantity">
                <button type="button" data-action="increase" aria-label="Tăng số lượng">+</button>
            </div>
            <div class="cart-price">${formatPrice(item.price)}</div>
            <button class="cart-remove-button" type="button" data-action="remove">Xóa</button>
        </article>
    `;
}

function renderCart(): void {
    const cart = getCart();
    const total = getCartTotal(cart);

    cartBadge.textContent = String(getCartQuantity(cart));
    cartSubtotal.textContent = formatPrice(total);
    cartTotal.textContent = formatPrice(total);
    cartList.innerHTML = cart.length > 0
        ? cart.map(cartItemHTML).join("")
        : '<p class="cart-empty">Giỏ hàng đang trống. Hãy chọn sản phẩm bạn yêu thích.</p>';
}

cartList.addEventListener("click", (event) => {
    const actionButton = getClosest(event.target, "[data-action]");
    const item = getClosest(event.target, "[data-id]");

    if (!actionButton || !item) {
        return;
    }

    const productId = Number(item.getAttribute("data-id"));
    const cartItem = getCart().find((entry) => entry.id === productId);

    if (actionButton.getAttribute("data-action") === "remove") {
        removeFromCart(productId);
    } else if (actionButton.getAttribute("data-action") === "increase" && cartItem) {
        updateQty(productId, cartItem.quantity + 1);
    } else if (actionButton.getAttribute("data-action") === "decrease" && cartItem) {
        updateQty(productId, Math.max(1, cartItem.quantity - 1));
    }

    renderCart();
});

cartList.addEventListener("change", (event) => {
    const quantityInput = getClosest(event.target, '[data-action="quantity"]');
    const item = getClosest(event.target, "[data-id]");

    if (!(quantityInput instanceof HTMLInputElement) || !item) {
        return;
    }

    updateQty(Number(item.getAttribute("data-id")), Number(quantityInput.value));
    renderCart();
});

renderCart();
