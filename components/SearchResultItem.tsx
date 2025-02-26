import { Product } from "@/types/api";
import Image from "next/image";

export default function ResultItem({ product }: { product: Product }) {
  return (
    <a
      href={`/produkt/${product.id}`}
      className="flex border-b-2 border-accent p-4 transition-all group hover:bg-rema-tertiary max-h-32 gap-4"
    >
      <div className="aspect-square overflow-hidden rounded-2xl shadow-sm">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className="h-full w-full object-contain object-center group-hover:opacity-75 p-1"
          />
        )}
      </div>
      <div className="grid gap-1 content-center">
        <span className="text-sm">{product.name}</span>
        <span className="text-xs text-slate-500">{product.underline}</span>
      </div>
    </a>
  );
}
