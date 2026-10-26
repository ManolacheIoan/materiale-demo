import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductCard";
import { categories, productsIn } from "@/lib/catalog";
import { withImages } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ categorie: c.id }));
}

type Props = { params: Promise<{ categorie: string }> };

function findCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = findCategory((await params).categorie);
  return category ? { title: category.name, description: category.blurb } : {};
}

export default async function CategoryPage({ params }: Props) {
  const category = findCategory((await params).categorie);
  if (!category) notFound();
  const list = withImages(productsIn(category.id));
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { href: "/catalog/", label: "Catalog" }, { label: category.name }]}
        title={category.name}
        intro={`${category.blurb} ${list.length} produse.`}
      />
      <div className="container catalog">
        <CategoryFilter active={category.id} />
        <h2 className="visually-hidden">Produse</h2>
        <ProductGrid products={list} eagerCount={2} />
      </div>
    </>
  );
}
