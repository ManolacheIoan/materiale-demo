import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { getProduct } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Servicii",
  description: `Livrare în zona ${site.city}, tăiere la dimensiune și calculul cantităților.`,
};

const services = [
  {
    id: "livrare",
    title: `Livrare în zona ${site.city}`,
    lead: `Livrăm în ${site.city} și în localitățile apropiate, cu autoutilitară.`,
    points: [
      "Costul livrării depinde de distanță și de greutatea comenzii; vi-l spunem la telefon, înainte de confirmare.",
      "Stabilim împreună ziua și intervalul orar, în timpul programului.",
      "Paletele se descarcă la poartă sau în locul convenit, unde are acces mașina.",
    ],
  },
  {
    id: "taiere",
    title: "Tăiere la dimensiune",
    lead: "Pregătim materialele la măsura de care aveți nevoie, ca să nu pierdeți timp pe șantier.",
    points: [
      "Plăci de polistiren tăiate la lățimea necesară, pentru glafuri, spaleți și colțuri.",
      "Plasă de armare din fibră de sticlă tăiată la metru.",
      "Ne spuneți dimensiunile la telefon; vă confirmăm ce se poate tăia și când este gata.",
    ],
  },
  {
    id: "cantitati",
    title: "Calculul cantităților",
    lead: "Ne spuneți suprafața și tipul lucrării; vă spunem câți saci, câte găleți sau câte plăci vă trebuie.",
    points: [
      "Ținem cont de consumul fiecărui produs și de un mic adaos pentru pierderi.",
      "Vă recomandăm ambalarea potrivită: sac, găleată sau palet, după caz.",
    ],
  },
];

/** Exemple calculate din consumurile trecute în fișa produselor. */
const examples = [
  { slug: "adeziv-gresie-faianta-c1-25kg", work: "Faianță pe 20 m² de perete", calc: "20 m² × ~4 kg/m² ≈ 80 kg", result: "4 saci de 25 kg" },
  { slug: "tencuiala-var-ciment-40kg", work: "Tencuială de 1,5 cm pe 30 m²", calc: "30 m² × 1,5 cm × ~14 kg ≈ 630 kg", result: "16 saci de 40 kg" },
  { slug: "vopsea-lavabila-interior-alba-15l", work: "Două straturi pe 80 m² de pereți și tavan", calc: "160 m² ÷ ~11 m²/L ≈ 15 L", result: "o găleată de 15 L" },
  { slug: "polistiren-expandat-eps80-10cm", work: "Termoizolație pe 100 m² de fațadă", calc: "100 m² + ~5% pierderi ≈ 105 m²", result: "35 de pachete de 3 m²" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Servicii" }]}
        title="Servicii"
        intro="Pe lângă materiale: livrare, tăiere la dimensiune și ajutor la calculul cantităților. Totul se stabilește la telefon."
      />
      <div className="container prose-page">
        <ul className="service-list">
          {services.map((s, i) => (
            <li key={s.id} id={s.id} className="service reveal">
              <span className="service__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="service__title">{s.title}</h2>
                <p className="service__lead">{s.lead}</p>
                <ul className="check-list">
                  {s.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <section className="section section--tight" aria-labelledby="exemple">
          <h2 id="exemple">Exemple de calcul</h2>
          <p className="muted">
            Calcule aproximative, pe baza consumului din fișa produsului. La telefon ținem cont și de suport și de
            modul de aplicare.
          </p>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Lucrare</th>
                  <th scope="col">Produs</th>
                  <th scope="col">Calcul</th>
                  <th scope="col">Necesar</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((e) => {
                  const product = getProduct(e.slug);
                  return (
                    <tr key={e.slug}>
                      <th scope="row" data-label="Lucrare">{e.work}</th>
                      <td data-label="Produs">{product ? <Link href={`/produs/${product.slug}/`}>{product.name}</Link> : null}</td>
                      <td data-label="Calcul">{e.calc}</td>
                      <td data-label="Necesar" className="data-table__strong">{e.result}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <CtaBand title="Spuneți-ne despre lucrare" text="Vă calculăm cantitățile și stabilim livrarea într-un singur telefon." />
      </div>
    </>
  );
}
