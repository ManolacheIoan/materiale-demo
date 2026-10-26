import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Întrebări frecvente",
  description: "Comenzi, prețuri, plată, livrare și retur — pe scurt.",
};

type Faq = { q: string; a: React.ReactNode };

const groups: { title: string; items: Faq[] }[] = [
  {
    title: "Comenzi și prețuri",
    items: [
      {
        q: "Cum pot comanda?",
        a: (
          <>
            Doar telefonic, la <a href={site.phone.href}>{site.phone.display}</a>, în timpul programului. Ne spuneți
            produsele și cantitățile, iar noi vă confirmăm totalul și când este gata comanda.
          </>
        ),
      },
      { q: "Prețurile din catalog includ TVA?", a: "Da. Toate prețurile afișate sunt finale, cu TVA inclus." },
      {
        q: "Ce înseamnă „lei/sac 40 kg” sau „lei/palet”?",
        a: "Prețul este pentru unitatea indicată: un sac de 40 kg, o găleată de 15 L, un palet întreg și așa mai departe. Unele produse au mai multe variante de ambalare, fiecare cu prețul ei, afișate pe pagina produsului.",
      },
      {
        q: "Mă ajutați să calculez cantitatea?",
        a: (
          <>
            Da. Ne spuneți suprafața și tipul lucrării și vă spunem de câți saci, găleți sau plăci aveți nevoie. Vedeți
            și <Link href="/servicii/#cantitati">exemplele de calcul</Link>.
          </>
        ),
      },
    ],
  },
  {
    title: "Plată, ridicare și livrare",
    items: [
      { q: "Cum pot plăti?", a: "Numerar sau cu cardul, la ridicarea din magazin sau la livrare." },
      { q: "Emiteți factură pe firmă?", a: "Da, emitem factură atât pentru persoane fizice, cât și pentru firme." },
      {
        q: "Livrați la adresă?",
        a: (
          <>
            Da, în {site.city} și în localitățile apropiate. Costul depinde de distanță și de greutatea comenzii și vi-l
            spunem înainte de confirmare. Detalii pe pagina <Link href="/servicii/#livrare">Servicii</Link>.
          </>
        ),
      },
      {
        q: "Pot ridica singur comanda?",
        a: "Da. Vă spunem la telefon când este pregătită; o ridicați în timpul programului, cu mașina proprie.",
      },
    ],
  },
  {
    title: "Altele",
    items: [
      {
        q: "Pot returna produsele?",
        a: "Produsele nedesfăcute, în ambalajul original, se pot returna în condițiile legii. Sunați-ne înainte, ca să stabilim detaliile.",
      },
      {
        q: "Unde se află magazinul?",
        a: (
          <>
            În {site.area.replace(/^Zona/, "zona")}. {site.areaNote} Vedeți și pagina <Link href="/contact/">Contact</Link>.
          </>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Întrebări frecvente" }]}
        title="Întrebări frecvente"
        intro="Răspunsuri scurte despre comenzi, prețuri, plată și livrare. Pentru orice altceva, sunați-ne."
      />
      <div className="container prose-page">
        {groups.map((g, gi) => (
          <section key={g.title} className="faq-group" aria-labelledby={`faq-${gi}`}>
            <h2 id={`faq-${gi}`}>{g.title}</h2>
            <div className="faq">
              {g.items.map((item) => (
                <details key={item.q} className="faq__item">
                  <summary className="faq__q">{item.q}</summary>
                  <div className="faq__a">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
        <CtaBand title="Nu ați găsit răspunsul?" text="Sunați-ne în timpul programului și vă lămurim pe loc." />
      </div>
    </>
  );
}
