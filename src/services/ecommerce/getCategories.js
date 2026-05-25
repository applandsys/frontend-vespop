
import config from "@/config";

export const getCategories = async () => {
    const res = await fetch(
        `${config.apiBaseUrl}/product/categories`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error('Failed to fetch Categories');
    const data = await res.json();
    return data;
};

export const getFeaturedCategories = async () => {
    const res = await fetch(
        `${config.apiBaseUrl}/category/featured`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error('Failed to fetch Categories');
    const data = await res.json();
    return data;
};

/* No Cache
    const res = await fetch(
      `${config.apiBaseUrl}/product/categories`,
      { cache: "no-store" }
    );
 */

/* ISR (revalidate every 60s)
    const res = await fetch(
      `${config.apiBaseUrl}/product/categories`,
      { next: { revalidate: 60 } }
    );
 */

/* Usage
    import CategoryClient from "./CategoryClient";
    import { getCategories } from "@/services/product/category";

    export default async function CategoryWrapper() {
      const categories = await getCategories();
      return <CategoryClient categories={categories} />;
    }
 */


export const getAllCategories = async () => {
    const res = await fetch(`${config.apiBaseUrl}/admin/product/categories`);
    if (!res.ok) throw new Error('Failed to fetch Categories');
    const data = await res.json();
    return data;
};



