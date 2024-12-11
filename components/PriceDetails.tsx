import {
  getCurrentPrice,
  getLowestPrice,
  getAveragePrice,
  //   getDaysCampaignedInYearCount,
} from "@/app/product/[id]/utils";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Product, ProductPriceHistory } from "@/types/api";
import { twMerge } from "tailwind-merge";

export default function ProductCard({
  priceHistory,
  product,
}: {
  product: Product;
  priceHistory: ProductPriceHistory;
}) {
  const currentPrice = getCurrentPrice(priceHistory);
  const lowestPrice = getLowestPrice(priceHistory);
  const averagePrice = getAveragePrice(priceHistory);
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
          <Detail titel="Current Price" detail={currentPrice} />
          <Detail titel="Lowest Price" detail={lowestPrice} />
          <Detail titel="Average Price" detail={averagePrice} />
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
