import PageTitle from "@/components/PageTitle";
import ProductCard from "@/components/ProductCard";
import { fetchDepartmentProducts, fetchDepartments } from "@/lib/api";
import { Product } from "@/types/api";

export async function generateStaticParams() {
  const departments = await fetchDepartments();
  return departments.map((department) => ({
    id: department.id.toString(),
  }));
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products: Product[] = await fetchDepartmentProducts(parseInt(id));
  const aplhabeticallySortedProducts = products.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const departmentName = products[0].department_name;

  if (products) {
    return (
      <>
        <PageTitle>{departmentName}</PageTitle>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {aplhabeticallySortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }
}
