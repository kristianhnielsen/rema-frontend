import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
        {product.img != null && (
          <Image
            src={product.img}
            alt={product.name}
            width={200}
            height={200}
            className="h-full w-full object-contain object-center group-hover:opacity-75 p-1"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.department}</p>
    </Link>
  );
}
