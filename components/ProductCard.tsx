import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategory } from "@/lib/catalog";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, headingLevel = 3 }: { product: Product; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className="card product-card reveal">
      <div className="product-card__media">
        <ProductImage product={product} />
        {product.top && <span className="badge">Căutat</span>}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{getCategory(product.category).name}</p>
        <Heading className="product-card__title">
          <Link href={`/produs/${product.slug}/`} className="stretched-link">
            {product.name}
          </Link>
        </Heading>
        <PriceTag product={product} />
      </div>
    </article>
  );
}

export function ProductGrid({ products, headingLevel }: { products: Product[]; headingLevel?: 2 | 3 }) {
  return (
    <ul className="product-grid">
      {products.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
