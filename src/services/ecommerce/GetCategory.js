import config from "@/config";

export const fetchProductCategory = async (slug, searchString, maxprice) => {
    const params = new URLSearchParams();

    if (searchString) params.append("search", searchString);
    if (maxprice && maxprice > 0) params.append("maxprice", maxprice);

    const res = await fetch(
        `${config.apiBaseUrl}/category/products/${slug}?${params.toString()}`,
        { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch Categories");
    return await res.json();
};

export const fetchAllCategories = async () => {
    const res = await fetch(`${config.apiBaseUrl}/product/categories`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};

export const fetchAllCategoriesZeroCount = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};


export const fetchCategoriesByType = async (type) => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories/${type}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};



export const fetchCategoryDetail = async (catSlug) => {
    const res = await fetch(`${config.apiBaseUrl}/category/detail/${catSlug}`,{
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch Categories');
    return await res.json();
};



