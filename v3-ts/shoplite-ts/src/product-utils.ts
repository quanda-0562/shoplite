import type { Product, SortDir } from "./types";

export function normalizeVietnamese(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
}

export function filterByKeyword(list: Product[], query: string): Product[] {
    const normalizedQuery = normalizeVietnamese(query);

    if (!normalizedQuery) {
        return [...list];
    }

    return list.filter((product) => {
        const searchableText = normalizeVietnamese(`${product.title} ${product.category}`);
        return searchableText.includes(normalizedQuery);
    });
}

export function sortByPrice(list: Product[], direction: SortDir = "asc"): Product[] {
    return [...list].sort((first, second) => (
        direction === "asc" ? first.price - second.price : second.price - first.price
    ));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}
