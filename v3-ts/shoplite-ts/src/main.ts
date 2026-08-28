import "./style.css";
import { fetchProducts } from "./api";
import { addToCart, getCartQuantity } from "./cart";
import { getClosest, getElement } from "./dom";
import { filterByKeyword, formatPrice } from "./product-utils";
import type { FetchState, Product } from "./types";

const searchInput = getElement<HTMLInputElement>("#search-input");
const productGrid = getElement<HTMLElement>("#product-grid");
const cartBadge = getElement<HTMLElement>("#cart-badge");
let productState: FetchState<Product[]> = { status: "idle" };

function updateCartBadge(): void {
    cartBadge.textContent = String(getCartQuantity());
}

function productCardHTML(product: Product): string {
    return `
        <article class="product-card surface-card" data-id="${product.id}">
            <a class="product-image" href="product.html?id=${product.id}" aria-label="Xem chi tiết ${product.title}">
                <img src="${product.thumbnail}" alt="${product.title}">
            </a>
            <h3><a href="product.html?id=${product.id}">${product.title}</a></h3>
            <p>${product.category} · ${product.rating}/5 sao</p>
            <div class="product-meta"><span class="product-price">${formatPrice(product.price)}</span></div>
            <button class="product-button" type="button" data-action="add-to-cart">Thêm vào giỏ</button>
        </article>
    `;
}

function renderSkeletons(): void {
    productGrid.innerHTML = Array.from({ length: 8 }, () => `
        <article class="product-card surface-card skeleton-card" aria-hidden="true">
            <div class="product-image skeleton"></div>
            <div class="skeleton skeleton-line"></div>
            <div class="skeleton skeleton-line skeleton-line-short"></div>
            <div class="skeleton skeleton-button"></div>
        </article>
    `).join("");
}

function renderProducts(products: Product[]): void {
    productGrid.innerHTML = products.length > 0
        ? products.map(productCardHTML).join("")
        : '<p class="feedback-message">Không tìm thấy sản phẩm phù hợp.</p>';
}

async function loadProducts(): Promise<void> {
    productState = { status: "loading" };
    renderSkeletons();

    try {
        const products = await fetchProducts();
        productState = { status: "success", data: products };
        renderProducts(products);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Lỗi không xác định.";
        productState = { status: "error", error: message };
        productGrid.innerHTML = `<p class="feedback-message is-error">Không thể tải sản phẩm. ${message}</p>`;
    }
}

searchInput.addEventListener("input", () => {
    renderProducts(filterByKeyword(productState.data ?? [], searchInput.value));
});

productGrid.addEventListener("click", (event) => {
    const addButton = getClosest(event.target, '[data-action="add-to-cart"]');
    const card = getClosest(event.target, "[data-id]");

    if (!addButton || !card || !productState.data) {
        return;
    }

    const productId = Number(card.getAttribute("data-id"));
    const product = productState.data.find((item) => item.id === productId);

    if (product) {
        addToCart(product);
        updateCartBadge();
    }
});

updateCartBadge();
void loadProducts();
