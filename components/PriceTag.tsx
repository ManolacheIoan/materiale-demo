import type { Product } from "@/data/products";
import { formatPrice, formatUnit } from "@/lib/catalog";

export function PriceTag({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  return (
    <p className={`price price--${size}`}>
      <span className="price__value">{formatPrice(product.price)}</span>{" "}
      <span className="price__unit">{formatUnit(product.unit)}</span>
    </p>
  );
}
