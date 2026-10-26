import Link from "next/link";
import { getCategory } from "@/lib/catalog";
import type { ProductWithImage } from "@/lib/images";
import { PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";

type CardProps = { product: ProductWithImage; headingLevel?: 2 | 3; eager?: boolean };

export function ProductCard({ product, headingLevel = 3, eager = false }: CardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className="card product-card reveal">
      <div className="product-card__media">
        <ProductImage product={product} eager={eager} />
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

type GridProps = {
  products: ProductWithImage[];
  headingLevel?: 2 | 3;
  /** Câte carduri de la început se încarcă imediat (vizibile fără derulare). */
  eagerCount?: number;
};

export function ProductGrid({ products, headingLevel, eagerCount = 0 }: GridProps) {
  return (
    <ul className="product-grid">
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} headingLevel={headingLevel} eager={i < eagerCount} />
        </li>
      ))}
    </ul>
  );
}
