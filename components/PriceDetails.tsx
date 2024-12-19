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
      <CardContent className="grid grid-cols-1 md:grid-cols-2 justify-items-center p-6 gap-4">
        <div className="aspect-square max-w-40 lg:max-w-60 overflow-hidden rounded-lg bg-white">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-contain object-center p-1"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Detail
            className="col-span-3"
            titel="Afdeling"
            detail={product.department_name}
          />
          <Detail titel="Nuværende pris" detail={priceHistory.current_price} />
          <Detail titel="Laveste pris" detail={priceHistory.lowest_price} />
          <Detail titel="Gns. pris" detail={priceHistory.avg_price} />
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
    <Card
      className={twMerge(
        "flex flex-col justify-between items-center",
        className
      )}
    >
      <CardHeader className="p-2">
        <CardTitle className="text-wrap text-center">{titel}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-xl">{detail}</p>
      </CardContent>
    </Card>
  );
}
