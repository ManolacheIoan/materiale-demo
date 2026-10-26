import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, STORE_NAME } from "@/config/site";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { categories } from "@/lib/catalog";
import { catalogHref } from "@/lib/search";

export const metadata: Metadata = {
  title: "Despre noi",
  description: `${STORE_NAME} — magazin de materiale de construcții în ${site.city}.`,
};

const principles = [
  {
    title: "Prețuri clare",
    text: "Prețurile din catalog sunt finale, cu TVA inclus, afișate pe unitatea în care se vinde produsul.",
  },
  {
    title: "Comenzi simple",
    text: "Ne sunați, ne spuneți ce vă trebuie, iar noi pregătim comanda pentru ridicare sau livrare.",
  },
  {
    title: "Sfaturi de la oameni care știu",
    text: "Vă ajutăm să alegeți produsul potrivit lucrării și să calculați cantitatea, ca să nu cumpărați prea mult sau prea puțin.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Despre noi" }]}
        title="Despre noi"
        intro={`Un magazin de materiale de construcții din ${site.city}, pentru cei care construiesc, renovează sau repară.`}
      />
      <div className="container prose-page">
        <section className="split" aria-labelledby="cine-suntem">
          <div>
            <h2 id="cine-suntem">Cine suntem</h2>
            <p>
              {STORE_NAME} este un magazin de cartier pentru materiale de construcții, în {site.area.replace(/^Zona/, "zona")}.
              Lucrăm cu meseriași, cu firme mici și cu oricine își renovează casa sau apartamentul.
            </p>
            <p>
              Avem în catalog ce se folosește cel mai des pe un șantier: ciment și var, adezivi și mortare, vopsele,
              izolații, pelet și brichete, scule și uși. Ne concentrăm pe produse obișnuite, de calitate bună, la prețuri
              corecte.
            </p>
          </div>
          <div className="split__art" aria-hidden="true">
            <Image src={categories[0].illustration} alt="" width={480} height={360} sizes="(min-width: 960px) 460px, 90vw" />
          </div>
        </section>

        <section className="section section--tight" aria-labelledby="cum-lucram">
          <h2 id="cum-lucram">Cum lucrăm</h2>
          <ul className="feature-grid">
            {principles.map((p, i) => (
              <li key={p.title} className="feature reveal">
                <span className="feature__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section section--tight" aria-labelledby="ce-gasiti">
          <h2 id="ce-gasiti">Ce găsiți la noi</h2>
          <ul className="pill-list">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={catalogHref({ categorie: c.id })} className="chip">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <CtaBand title="Aveți o lucrare în plan?" text="Sunați-ne și vă spunem ce vă trebuie și cât costă." />
      </div>
    </>
  );
}
