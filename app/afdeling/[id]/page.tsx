import PageTitle from "@/components/PageTitle";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import {
  fetchDepartmentProducts,
  fetchDepartmentProductsCount,
  fetchDepartments,
} from "@/lib/api";
import { Product } from "@/types/api";

export async function generateStaticParams() {
  const departments = await fetchDepartments();
  return departments.map((department) => ({
    id: department.id.toString(),
  }));
}

export default async function DepartmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; page: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const ITEMS_PER_PAGE = 20;
  const pageNum = typeof page === "string" ? parseInt(page, 10) : 1;
  const offset = (pageNum - 1) * ITEMS_PER_PAGE;
  const totalProducts = await fetchDepartmentProductsCount(parseInt(id));
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const products: Product[] = await fetchDepartmentProducts(
    parseInt(id),
    offset,
    ITEMS_PER_PAGE
  );

  const departmentName = products[0].department_name;

  if (products) {
    return (
      <>
        <PageTitle>{departmentName}</PageTitle>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          baseUrl={`/afdeling/${id}`}
        />
      </>
    );
  }
}
