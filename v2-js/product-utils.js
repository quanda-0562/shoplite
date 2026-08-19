export function filterByKeyword(list, q) {
    const normalizedQuery = q.trim().toLowerCase();

    if (!normalizedQuery) {
        return [...list];
    }

    return list.filter((product) => {
        const title = product.title.toLowerCase();
        const category = product.category.toLowerCase();

        return title.includes(normalizedQuery) || category.includes(normalizedQuery);
    });
}

export function sortByPrice(list, dir = "asc") {
    const sortedList = [...list];

    if (dir === "desc") {
        return sortedList.sort((a, b) => b.price - a.price);
    }

    return sortedList.sort((a, b) => a.price - b.price);
}
