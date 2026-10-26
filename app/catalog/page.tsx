import type { Metadata } from "next";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductCard";
import { categories, products, productsIn } from "@/lib/catalog";
import { withImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Toate produsele, pe categorii: ciment, adezivi, vopsele, izolații, pelet, scule, uși.",
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Catalog" }]}
        title="Catalog"
        intro={`${products.length} produse în ${categories.length} categorii. Prețurile sunt finale, cu TVA.`}
      />
      <div className="container catalog">
        <CategoryFilter />
        {categories.map((c, i) => (
          <section key={c.id} className="catalog__group" aria-labelledby={`cat-${c.id}`}>
            <h2 id={`cat-${c.id}`} className="catalog__heading">
              {c.name}
            </h2>
            <ProductGrid products={withImages(productsIn(c.id))} eagerCount={i === 0 ? 2 : 0} />
          </section>
        ))}
      </div>
    </>
  );
}
