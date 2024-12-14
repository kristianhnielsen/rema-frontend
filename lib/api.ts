import { Department, Product, ProductPriceHistory } from "@/types/api";

export async function fetchProducts(
  offset: number = 0,
  limit: number = 20
): Promise<Product[]> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/product/?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProductsCount(): Promise<number> {
  const response = await fetch(
    "https://rema-fastapi.onrender.com/product/count"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products count");
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

export async function fetchDepartments(): Promise<Department[]> {
  const response = await fetch(`https://rema-fastapi.onrender.com/department`);
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  // const a = response.json();
  // console.log(a);
  // return a;
  return response.json();
}

export async function fetchDepartmentProducts(
  department_id: number
): Promise<Product[]> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/department/${department_id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products from department");
  }
  return response.json();
}
