"use client";

import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import { Product } from "@/types/api";
import ResultItem from "./SearchResultItem";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (query.length >= 3) {
        const results = await searchProducts(query);
        setProducts(results);
      }
    }

    fetchData();
  }, [query]);

  return (
    <section className="grid justify-items-center gap-4">
      {products.length !== 0 && (
        <SearchResultInfo productsNum={products.length} />
      )}
      {products.length !== 0 && (
        <div className="flex max-h-80 max-w-xl flex-col overflow-y-scroll rounded-lg border ">
          {products.map((product) => (
            <ResultItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function SearchResultInfo({ productsNum }: { productsNum: number }) {
  return (
    <div className="grid text-center text-sm">
      {productsNum === 1 ? (
        <p>{productsNum} resultat</p>
      ) : (
        <p>{productsNum} resultater</p>
      )}
    </div>
  );
}
