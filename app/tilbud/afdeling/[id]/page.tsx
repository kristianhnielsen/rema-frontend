import PageTitle from "@/components/PageTitle";
import { fetchDepartmentDiscounts, fetchDepartments } from "@/lib/api";
import { Deal } from "@/types/api";
import DiscountProductsSection from "../../DiscountProductSection";

export async function generateStaticParams() {
  const departments = await fetchDepartments();
  return departments.map((department) => ({
    id: department.id.toString(),
    dept_name: department.name,
  }));
}

export default async function DiscountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const departments = await fetchDepartments();
  const department_name = departments
    .filter((department) => department.id == parseInt(id))
    .at(0)?.name;
  const deals: Deal[] = await fetchDepartmentDiscounts(parseInt(id));

  return (
    <>
      <PageTitle>Tilbudsvarer i {department_name}</PageTitle>
      <DiscountProductsSection products={deals} />
    </>
  );
}
