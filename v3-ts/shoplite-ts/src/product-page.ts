import "./style.css";
import { fetchProductById } from "./api";
import { addToCart, getCartQuantity } from "./cart";
import { getClosest, getElement } from "./dom";
import { formatPrice } from "./product-utils";
import type { FetchState, Product } from "./types";

const productDetail = getElement<HTMLElement>("#product-detail");
const cartBadge = getElement<HTMLElement>("#cart-badge");
const requestedId = Number(new URLSearchParams(window.location.search).get("id"));
const productId = Number.isSafeInteger(requestedId) && requestedId > 0 ? requestedId : 1;
let productState: FetchState<Product> = { status: "idle" };

function updateCartBadge(): void {
    cartBadge.textContent = String(getCartQuantity());
}

function renderLoading(): void {
    productDetail.innerHTML = `
        <div class="product-detail detail-loading" aria-label="Đang tải sản phẩm">
            <div class="detail-gallery surface-card"><div class="detail-image skeleton"></div></div>
            <article class="detail-panel surface-card">
                <div class="skeleton skeleton-line"></div>
                <div class="skeleton skeleton-line skeleton-line-short"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-button"></div>
            </article>
        </div>
    `;
}

function productDetailHTML(product: Product): string {
    return `
        <div class="product-detail" data-id="${product.id}">
            <div class="detail-gallery surface-card">
                <div class="detail-image"><img src="${product.thumbnail}" alt="${product.title}"></div>
            </div>
            <article class="detail-panel surface-card">
                <span class="eyebrow">${product.category}</span>
                <h1>${product.title}</h1>
                <p class="detail-price">${formatPrice(product.price)}</p>
                <p class="detail-description">${product.description}</p>
                <ul class="detail-list">
                    <li>Mã sản phẩm: #${product.id}</li>
                    <li>Tồn kho: ${product.stock} sản phẩm</li>
                    <li>Đánh giá khách hàng: ${product.rating}/5 sao</li>
                </ul>
                <button class="detail-button" type="button" data-action="add-to-cart">Thêm vào giỏ</button>
            </article>
        </div>
    `;
}

async function loadProduct(): Promise<void> {
    productState = { status: "loading" };
    renderLoading();

    try {
        const product = await fetchProductById(productId);
        productState = { status: "success", data: product };
        productDetail.innerHTML = productDetailHTML(product);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Lỗi không xác định.";
        productState = { status: "error", error: message };
        productDetail.innerHTML = `<p class="feedback-message is-error">Không thể tải sản phẩm. ${message}</p>`;
    }
}

productDetail.addEventListener("click", (event) => {
    if (!getClosest(event.target, '[data-action="add-to-cart"]') || !productState.data) {
        return;
    }

    addToCart(productState.data);
    updateCartBadge();
});

updateCartBadge();
void loadProduct();
