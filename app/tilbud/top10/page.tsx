import PageTitle from "@/components/PageTitle";
import { fetchTop10Discounts } from "@/lib/api";
import DiscountProductsSection from "../DiscountProductSection";
import { Deal } from "@/types/api";

export default async function DiscountPage() {
  const products: Deal[] = await fetchTop10Discounts();

  return (
    <>
      <PageTitle>Top 10 Tilbud</PageTitle>
      <DiscountProductsSection products={products} />
    </>
  );
}
