import { Suspense } from "react";
import PageTitle from "@/components/PageTitle";
import { fetchDepartmentDiscounts, fetchDepartments } from "@/lib/api";
import { Deal } from "@/types/api";
import DiscountProductsSection from "../../DiscountProductSection";
import { SkeletonCard, SkeletonTitle } from "@/app/loading";

export async function generateStaticParams() {
  const departments = await fetchDepartments();
  return departments.map((department) => ({
    id: department.id.toString(),
  }));
}

async function DepartmentName({ id }: { id: string }) {
  const departments = await fetchDepartments();
  const department_name = departments.find(
    (department) => department.id === parseInt(id)
  )?.name;

  return <PageTitle>Tilbudsvarer i {department_name}</PageTitle>;
}

async function DepartmentDeals({ id }: { id: string }) {
  const deals: Deal[] = await fetchDepartmentDiscounts(parseInt(id));
  return <DiscountProductsSection products={deals} />;
}

export default async function DiscountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <Suspense fallback={<SkeletonTitle />}>
        <DepartmentName id={id} />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <DepartmentDeals id={id} />
      </Suspense>
    </>
  );
}
