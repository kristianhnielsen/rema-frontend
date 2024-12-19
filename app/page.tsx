import PageTitle from "@/components/PageTitle";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, fetchProductsCount } from "@/lib/api";
import { Product } from "@/types/api";

const ITEMS_PER_PAGE = 20;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const products: Product[] = await fetchProducts(offset, ITEMS_PER_PAGE);
  const totalProducts = await fetchProductsCount();
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return (
    <>
      <PageTitle>All Products</PageTitle>
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/" />
    </>
  );
}
