import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { CallButton } from "@/components/CallButton";
import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductGrid } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreInfo } from "@/components/StoreInfo";
import { categories, topProducts } from "@/lib/catalog";
import { withImages } from "@/lib/images";

export default function HomePage() {
  const top = withImages(topProducts().slice(0, 8));
  const mosaic = categories.slice(0, 4);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__text">
            <p className="eyebrow">Materiale de construcții · {site.city}</p>
            <h1 id="hero-title">
              Tot ce trebuie pentru casă și șantier, <span className="accent">la un telefon distanță.</span>
            </h1>
            <p className="hero__lead">
              Ciment, adezivi, vopsele, izolații, pelet, scule și uși. Alegeți din catalog, sunați-ne și vă pregătim
              comanda.
            </p>
            <div className="hero__actions">
              <CallButton size="lg" showNumber />
              <Link href="/catalog/" className="btn btn--outline btn--lg">
                Vezi catalogul
              </Link>
            </div>
            <ul className="hero__facts">
              <li>Prețuri finale, cu TVA</li>
              <li>Comenzi doar telefonic</li>
              <li>{site.area}</li>
            </ul>
          </div>
          <div className="hero__art" aria-hidden="true">
            {mosaic.map((c, i) => (
              <Image
                key={c.id}
                src={c.illustration}
                alt=""
                width={480}
                height={360}
                sizes="(min-width: 960px) 260px, 45vw"
                loading={i < 2 ? "eager" : "lazy"}
                className={`hero__tile hero__tile--${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="categorii">
        <div className="container">
          <SectionHeading
            id="categorii"
            eyebrow="Categorii"
            title="Ce găsiți la noi"
            link={{ href: "/catalog/", label: "Tot catalogul" }}
          />
          <CategoryStrip />
        </div>
      </section>

      <section className="section section--band" aria-labelledby="top-produse">
        <div className="container">
          <SectionHeading
            id="top-produse"
            eyebrow="Recomandate"
            title="Cele mai căutate produse"
            intro="Produsele pe care clienții noștri le cer cel mai des."
            link={{ href: "/cele-mai-cautate/", label: "Vezi toată lista" }}
          />
          <ProductGrid products={top} />
        </div>
      </section>

      <section className="section" aria-labelledby="magazin">
        <div className="container">
          <SectionHeading
            id="magazin"
            eyebrow="Magazinul"
            title={`Suntem în ${site.city}`}
            intro={site.orderNote}
          />
          <StoreInfo />
        </div>
      </section>
    </>
  );
}
