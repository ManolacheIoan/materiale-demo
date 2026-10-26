import type { Metadata } from "next";
import { CallButton } from "@/components/CallButton";
import { PageHeader } from "@/components/PageHeader";
import { ProductGrid } from "@/components/ProductCard";
import { productsTopFirst } from "@/lib/catalog";
import { withImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Cele mai căutate",
  description: "Produsele cerute cel mai des, urmate de restul catalogului.",
};

export default function TopPage() {
  const all = withImages(productsTopFirst());
  const top = all.filter((p) => p.top);
  const rest = all.filter((p) => !p.top);
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Cele mai căutate" }]}
        title="Cele mai căutate produse"
        intro="Mai întâi produsele cerute cel mai des de clienți, apoi restul catalogului."
      />
      <section className="container section section--tight" aria-labelledby="top">
        <div className="ranked-heading">
          <h2 id="top">Top {top.length}</h2>
          <CallButton variant="outline" />
        </div>
        <ProductGrid products={top} eagerCount={2} />
      </section>
      <section className="container section section--tight" aria-labelledby="restul">
        <h2 id="restul">Restul produselor</h2>
        <ProductGrid products={rest} />
      </section>
    </>
  );
}
