const API_BASE_URL = "https://dummyjson.com";

async function requestJSON(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error(`Không thể tải dữ liệu: HTTP ${response.status}`);
    }

    return response.json();
}

export async function fetchProducts() {
    const data = await requestJSON("/products");
    return data.products;
}

export function fetchProductById(id) {
    return requestJSON(`/products/${id}`);
}
