import PageTitle from "@/components/PageTitle";
import { fetchUnderHalfPriceDiscounts } from "@/lib/api";
import DiscountProductsSection from "../DiscountProductSection";
import { Deal } from "@/types/api";

export default async function DiscountPage() {
  const products: Deal[] = await fetchUnderHalfPriceDiscounts();

  return (
    <>
      <PageTitle>Tilbud - Under Halv Pris</PageTitle>
      <DiscountProductsSection products={products} />
    </>
  );
}
