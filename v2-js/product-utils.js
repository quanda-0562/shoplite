export function filterByKeyword(list, q) {
    const normalizedQuery = normalizeVietnamese(q);

    if (!normalizedQuery) {
        return [...list];
    }

    return list.filter((product) => {
        const title = normalizeVietnamese(product.title);
        const category = normalizeVietnamese(product.category);

        return title.includes(normalizedQuery) || category.includes(normalizedQuery);
    });
}

export function normalizeVietnamese(text) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
}

export function sortByPrice(list, dir = "asc") {
    const sortedList = [...list];

    if (dir === "desc") {
        return sortedList.sort((a, b) => b.price - a.price);
    }

    return sortedList.sort((a, b) => a.price - b.price);
}

export function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}
