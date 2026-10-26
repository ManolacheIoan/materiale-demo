import Image from "next/image";
import type { ProductWithImage } from "@/lib/images";

type Props = {
  product: ProductWithImage;
  /** Doar pentru imaginile vizibile la încărcare (deasupra liniei de pliere). */
  eager?: boolean;
  /** Text alternativ când se afișează ilustrația categoriei (implicit decorativă). */
  fallbackAlt?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

/**
 * Imagine produs în raport fix 4:3 (object-fit: cover), cu dimensiuni declarate, deci fără salt de layout.
 * Încărcare leneșă, cu excepția imaginilor marcate `eager`.
 */
export function ProductImage({
  product,
  eager = false,
  fallbackAlt = "",
  sizes = "(min-width: 1180px) 270px, (min-width: 520px) 45vw, 50vw",
  width = 480,
  height = 360,
}: Props) {
  return (
    <Image
      src={product.img.src}
      alt={product.img.isPhoto ? product.name : fallbackAlt}
      width={width}
      height={height}
      sizes={sizes}
      className={`product-image${product.img.isPhoto ? " product-image--photo" : ""}`}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );
}
