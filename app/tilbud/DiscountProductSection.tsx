import DiscountProductCard from "@/components/DiscountProductCard";
import { Deal } from "@/types/api";

export default function DiscountProductsSection({
  products,
  title,
  headerId,
}: {
  products: Deal[];
  title?: string;
  headerId?: string;
}) {
  return (
    <section className="mb-12">
      {title && (
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6 border-b-4"
          id={headerId}
        >
          {title}
        </h2>
      )}

      <div className="flex flex-wrap justify-around lg:justify-normal gap-16">
        {products.map((product) => (
          <DiscountProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}
