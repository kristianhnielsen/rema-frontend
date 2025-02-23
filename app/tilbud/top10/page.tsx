import { Suspense } from "react";
import PageTitle from "@/components/PageTitle";
import { fetchTop10Discounts } from "@/lib/api";
import DiscountProductsSection from "../DiscountProductSection";
import { Deal } from "@/types/api";
import { SkeletonCard } from "@/app/loading";

async function DiscountProducts() {
  const products: Deal[] = await fetchTop10Discounts();
  return <DiscountProductsSection products={products} />;
}

export default function DiscountPage() {
  return (
    <>
      <PageTitle>Top 10 Tilbud</PageTitle>
      <Suspense fallback={<SkeletonCard />}>
        <DiscountProducts />
      </Suspense>
    </>
  );
}

// "use client";

// import { Suspense, useEffect, useState } from "react";
// import PageTitle from "@/components/PageTitle";
// import { fetchTop10Discounts } from "@/lib/api";
// import DiscountProductsSection from "../DiscountProductSection";
// import { Deal } from "@/types/api";
// import Loading from "@/app/loading";

// export default function DiscountPage() {
//   const [products, setProducts] = useState<Deal[]>([]);

//   useEffect(() => {
//     const loadDiscounts = async () => {
//       try {
//         const data = await fetchTop10Discounts();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching discounts:", error);
//       }
//     };

//     loadDiscounts();
//   }, []);

//   return (
//     <>
//       <PageTitle>Top 10 Tilbud</PageTitle>
//       <Suspense fallback={<Loading />}>
//         <DiscountProductsSection products={products} />
//       </Suspense>
//     </>
//   );
// }

// "use client";
// import PageTitle from "@/components/PageTitle";
// import { fetchTop10Discounts } from "@/lib/api";
// import DiscountProductsSection from "../DiscountProductSection";
// import { Deal } from "@/types/api";

// export default async function DiscountPage() {
//   const products: Deal[] = await fetchTop10Discounts();

//   return (
//     <>
//       <PageTitle>Top 10 Tilbud</PageTitle>
//       <DiscountProductsSection products={products} />
//     </>
//   );
// }
