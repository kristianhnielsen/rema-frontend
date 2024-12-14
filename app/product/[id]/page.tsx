import { fetchProducts, fetchProductPrices, fetchProduct } from "@/lib/api";
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(parseInt(id));
  const priceHistory: ProductPriceHistory = await fetchProductPrices(
    parseInt(id)
  );

  console.log(product);
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
