import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { ProductList } from "@/types/api";

export default async function Home() {
  const products: ProductList = await fetchProducts();

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
