import { ProductList, ProductPriceHistory } from "../types/api";

export async function fetchProducts(): Promise<ProductList> {
  const response = await fetch("https://rema-fastapi.onrender.com/product/");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProductPrices(
  productId: number
): Promise<ProductPriceHistory> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/prices/${productId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product prices");
  }
  return response.json();
}
