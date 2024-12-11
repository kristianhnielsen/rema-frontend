import { fetchProducts, fetchProductPrices } from "@/lib/api";
import { ProductPriceHistory } from "@/types/api";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import { getPriceEntries } from "./utils";
import PriceDetails from "@/components/PriceDetails";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const products = await fetchProducts();
  const product = await products.find(
    (product) => product.id.toString() === params.id
  );
  const priceHistory: ProductPriceHistory = await fetchProductPrices(
    parseInt(params.id)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const priceEntries = getPriceEntries(priceHistory);

  const chartData = priceEntries.map(([date, details]) => ({
    date,
    price: details.price,
  }));

  return (
    <div className="space-y-8">
      <PriceDetails product={product} priceHistory={priceHistory} />
      <PriceHistoryChart chartData={chartData} />
    </div>
  );
}
