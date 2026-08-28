import type { Product } from "./types";

const API_BASE_URL = "https://dummyjson.com";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isProduct(value: unknown): value is Product {
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
        value.images.every((image) => typeof image === "string")
    );
}

async function requestJSON(path: string): Promise<unknown> {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error(`Không thể tải dữ liệu: HTTP ${response.status}`);
    }

    const data: unknown = await response.json();
    return data;
}

export async function fetchProducts(): Promise<Product[]> {
    const data = await requestJSON("/products");

    if (!isRecord(data) || !Array.isArray(data.products) || !data.products.every(isProduct)) {
        throw new Error("Dữ liệu danh sách sản phẩm không hợp lệ.");
    }

    return data.products;
}

export async function fetchProductById(id: number): Promise<Product> {
    const data = await requestJSON(`/products/${id}`);

    if (!isProduct(data)) {
        throw new Error("Dữ liệu chi tiết sản phẩm không hợp lệ.");
    }

    return data;
}
