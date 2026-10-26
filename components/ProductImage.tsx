import Image from "next/image";
import type { Product } from "@/data/products";
import { productImage } from "@/lib/catalog";

/** Fotografia produsului sau, dacă lipsește, ilustrația categoriei (raport 4:3). */
export function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Image
      src={productImage(product)}
      alt={product.image ? product.name : ""}
      width={480}
      height={360}
      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
      className="product-image"
      priority={priority}
    />
  );
}
