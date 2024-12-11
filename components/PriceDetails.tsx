import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Product, ProductPriceHistory } from "@/types/api";
import { twMerge } from "tailwind-merge";

export default function ProductCard({
  priceHistory,
  product,
}: {
  priceHistory: ProductPriceHistory;
  product: Product;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="aspect-square max-w-40 lg:max-w-60 overflow-hidden rounded-lg bg-white">
          <Image
            src={product.img}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-contain object-center p-1"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Detail
            className="col-span-3"
            titel="Department"
            detail={product.department}
          />
          <Detail titel="Current Price" detail={priceHistory.current_price} />
          <Detail titel="Lowest Price" detail={priceHistory.lowest_price} />
          <Detail titel="Average Price" detail={priceHistory.avg_price} />
        </div>
      </CardContent>
    </Card>
  );
}

export function Detail({
  titel,
  detail,
  className,
}: {
  titel: string;
  detail: number | string;
  className?: string;
}) {
  return (
    <Card className={twMerge("grid place-items-center", className)}>
      <CardHeader>
        <CardTitle className="text-lg text-wrap">{titel}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl">{detail}</p>
      </CardContent>
    </Card>
  );
}
