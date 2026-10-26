import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { PageHeader } from "@/components/PageHeader";
import { categories, products } from "@/lib/catalog";
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
        intro={`${products.length} de produse în ${categories.length} categorii. Prețurile sunt finale, cu TVA.`}
      />
      <div className="container catalog">
        <CatalogBrowser products={withImages(products)} />
      </div>
    </>
  );
}
