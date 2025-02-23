import PageTitle from "@/components/PageTitle";
import { fetchUnderHalfPriceDiscounts } from "@/lib/api";
import DiscountProductsSection from "../DiscountProductSection";
import { Deal } from "@/types/api";
import { SkeletonCard } from "@/app/loading";
import { Suspense } from "react";

async function DiscountProducts() {
  const products: Deal[] = await fetchUnderHalfPriceDiscounts();
  return <DiscountProductsSection products={products} />;
}

export default function DiscountPage() {
  return (
    <>
      <PageTitle>Tilbud - Under Halv Pris</PageTitle>
      <Suspense fallback={<SkeletonCard />}>
        <DiscountProducts />
      </Suspense>
    </>
  );
}
