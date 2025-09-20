import { Product } from "./types";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`, { next: { revalidate: 3600 } }); // 1 saat cache
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export async function getProductById(id: string): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch(`${API_URL}/products/categories`, { next: { revalidate: 86400 } }); // 1 gün cache
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}