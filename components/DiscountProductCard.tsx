import Link from "next/link";
import Image from "next/image";
import { Deal } from "@/types/api";
import { Card } from "./ui/card";

interface ProductCardProps {
  product: Deal;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.product_id}`}
      className="group max-w-40 grid gap-1"
    >
      <div className="aspect-square w-full overflow-hidden rounded-2xl xl:aspect-w-7 xl:aspect-h-8 shadow-sm group-hover:-translate-y-2 transition-all group-hover:shadow-lg">
        {product.image && (
          <Image
            src={product.image}
            alt={product.product_name}
            width={200}
            height={200}
            className="h-full w-full object-contain object-center group-hover:opacity-75 p-1"
            placeholder="data:image/png;base64,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"
          />
        )}
      </div>
      <h3 className="mt-4 md:text-lg font-bold text-rema-primary text-center">
        {product.product_name}
      </h3>
      <div className="grid gap-2  font-semibold">
        <Card className="flex flex-col justify-between text-center gap-1 p-2 w-full">
          {product.advertised_price} kr
        </Card>
        <div className="flex justify-center gap-2">
          {product.difference_amount == 0 ? (
            <Card className="w-full p-2 content-center text-center">
              <span>Ny vare / Første tilbud</span>
            </Card>
          ) : (
            <>
              <Card className="flex text-rema-primary text-xs justify-center flex-col text-center p-2 w-full">
                <span>-{product.difference_amount} kr</span>
              </Card>
              <Card className="flex flex-col justify-center text-xs text-center p-2 w-full text-red-500">
                <span>{product.difference_percent}%</span>
              </Card>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
