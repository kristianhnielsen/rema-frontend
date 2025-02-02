import { Department, Product, ProductPriceHistory } from "@/types/api";

const revalidationCooldown = 3600;

export async function fetchProducts(
  offset: number = 0,
  limit: number = 20
): Promise<Product[]> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/product/?offset=${offset}&limit=${limit}`,
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/product/${id}`,
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export async function fetchProductsCount(): Promise<number> {
  const response = await fetch(
    "https://rema-fastapi.onrender.com/product/count",
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products count");
  }
  return response.json();
}

export async function fetchDepartmentProductsCount(
  department_id: number
): Promise<number> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/department/${department_id}/count`,
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch products count in department ${department_id}`
    );
  }
  return response.json();
}

export async function fetchProductPrices(
  productId: number
): Promise<ProductPriceHistory> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/prices/${productId}`,
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product prices");
  }
  return response.json();
}

export async function fetchDepartments(): Promise<Department[]> {
  const response = await fetch(`https://rema-fastapi.onrender.com/department`, {
    next: { revalidate: revalidationCooldown },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }
  return response.json();
}

export async function fetchDepartmentProducts(
  department_id: number,
  offset: number = 0,
  limit: number = 20
): Promise<Product[]> {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/department/${department_id}/?offset=${offset}&limit=${limit}`,
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products from department");
  }
  return response.json();
}

export async function fetchDepartmentDiscounts(department_id: number) {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/discount/departments/${department_id}`,
    { next: { revalidate: revalidationCooldown } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch department deals");
  }
  return response.json();
}

export async function fetchTop10Discounts() {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/discount/top-10-discounts`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top 10 discounted deals");
  }
  return response.json();
}
export async function fetchUnderHalfPriceDiscounts() {
  const response = await fetch(
    `https://rema-fastapi.onrender.com/discount/under-50-percent`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch deals under half price");
  }
  return response.json();
}

export async function fetchDepartmentMetrics() {
  const response = await fetch(
    "https://rema-fastapi.onrender.com/department/metrics",
    { next: { revalidate: revalidationCooldown } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch department metrics");
  }
  return response.json();
}
