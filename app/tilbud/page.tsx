import DiscountProductCard from "@/components/DiscountProductCard";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchDepartmentDiscounts } from "@/lib/api";
import { Deal, DiscountDepartment } from "@/types/api";
import Link from "next/link";

export default async function DiscountPage() {
  const departments: DiscountDepartment[] = await fetchDepartmentDiscounts();
  const allDeals: Deal[] = departments.flatMap(
    (department) => department.deals
  );

  const topTenAmount: Deal[] = allDeals
    .sort((a, b) => b.difference_amount - a.difference_amount)
    .slice(0, 10);

  const dealsOver50percent: Deal[] = allDeals.filter(
    (deal) => deal.difference_percent >= 50
  );
  return (
    <>
      <PageTitle>Tilbudsvarer</PageTitle>
      <section className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <Link href={`#top10`}>
            <Button variant={"outline"}>Top 10</Button>
          </Link>
          <Link href={`#underhalvpris`}>
            <Button variant={"outline"}>Under halv pris</Button>
          </Link>
        </div>
        <Separator />

        <div className="flex flex-wrap gap-4">
          {departments.map((department) => (
            <Link
              href={`#${department.department_id}`}
              key={department.department_id}
            >
              <Button variant={"outline"}>{department.department_name}</Button>
            </Link>
          ))}
        </div>
      </section>

      <DiscountProductsSection
        products={topTenAmount}
        title="Top 10"
        headerId="top10"
      />
      <DiscountProductsSection
        products={dealsOver50percent}
        title="Under halv pris"
        headerId="underhalvpris"
      />

      {departments.map((department) => (
        <section className="mb-12" key={department.department_id}>
          <h2
            className="text-2xl font-semibold text-gray-900 mb-6 border-b-4"
            id={department.department_id.toString()}
          >
            {department.department_name}
          </h2>

          <div className="flex flex-wrap justify-around lg:justify-normal gap-16">
            {department.deals.map((product) => (
              <DiscountProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

async function DiscountProductsSection({
  products,
  title,
  headerId,
}: {
  products: Deal[];
  title: string;
  headerId: string;
}) {
  return (
    <section className="mb-12">
      <h2
        className="text-2xl font-semibold text-gray-900 mb-6 border-b-4"
        id={headerId}
      >
        {title}
      </h2>

      <div className="flex flex-wrap justify-around lg:justify-normal gap-16">
        {products.map((product) => (
          <DiscountProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}
