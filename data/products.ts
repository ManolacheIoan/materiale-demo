/**
 * Catalogul de produse — singurul fișier de editat pentru produse și prețuri.
 *
 * - `price` este prețul final în lei (număr; zecimalele cu punct: 36.5 = 36,50 lei).
 * - `unit` este unitatea de vânzare afișată după „lei/” (ex.: „sac 40 kg” → „lei/sac 40 kg”).
 * - `top: true` pune produsul în „Cele mai căutate produse”.
 * - Fotografii: puneți public/products/<slug>.webp (sau .jpg) și apar automat; fără fișier se afișează
 *   ilustrația categoriei. `image` (opțional) forțează altă cale din /public.
 * - `specs` (opțional): tabelul de specificații de pe pagina produsului (etichetă + valoare).
 * - `variants` (opțional): alte ambalări, fiecare cu prețul și unitatea ei. Includeți și varianta principală
 *   (același `price` și `unit` ca produsul); lista apare pe pagină când are cel puțin două variante.
 * - `slug` apare în adresa paginii (/produs/<slug>/) și trebuie să fie unic.
 */

export type CategoryId =
  | "ciment-si-var"
  | "adezivi-si-mortare"
  | "vopsele-si-lacuri"
  | "izolatii"
  | "pelet-si-combustibil"
  | "scule-si-unelte"
  | "usi-si-tamplarie";

export type Unit =
  | `sac ${number} kg`
  | `găleată ${number} L`
  | `bidon ${number} L`
  | `cutie ${number} L`
  | `rolă ${number} m²`
  | `pachet ${number} kg`
  | `pachet ${number} m²`
  | `palet ${number} kg`
  | "palet"
  | "kg"
  | "m²"
  | "buc";

export interface Category {
  id: CategoryId;
  name: string;
  /** O frază scurtă pentru cardul de categorie. */
  blurb: string;
  /** Ilustrația implicită pentru produsele fără fotografie. */
  illustration: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Variant {
  /** Ex.: „Sac 40 kg”, „Palet 35 de saci (1.400 kg)”, „Lățime 90 cm”. */
  label: string;
  price: number;
  unit: Unit;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  unit: Unit;
  description: string;
  packaging: string;
  top: boolean;
  /** Opțional: altă fotografie decât public/products/<slug>.webp|jpg. */
  image?: string;
  specs?: Spec[];
  variants?: Variant[];
}

export const categories: Category[] = [
  {
    id: "ciment-si-var",
    name: "Ciment și var",
    blurb: "Ciment pentru betoane și șape, var hidratat.",
    illustration: "/images/categorii/ciment-si-var.svg",
  },
  {
    id: "adezivi-si-mortare",
    name: "Adezivi și mortare",
    blurb: "Adezivi pentru plăci, mortare și tencuieli.",
    illustration: "/images/categorii/adezivi-si-mortare.svg",
  },
  {
    id: "vopsele-si-lacuri",
    name: "Vopsele și lacuri",
    blurb: "Lavabile de interior și exterior, grunduri, lacuri.",
    illustration: "/images/categorii/vopsele-si-lacuri.svg",
  },
  {
    id: "izolatii",
    name: "Izolații",
    blurb: "Polistiren, vată minerală, plasă și adezivi.",
    illustration: "/images/categorii/izolatii.svg",
  },
  {
    id: "pelet-si-combustibil",
    name: "Pelet și combustibil",
    blurb: "Pelet la sac sau la palet, brichete din lemn.",
    illustration: "/images/categorii/pelet-si-combustibil.svg",
  },
  {
    id: "scule-si-unelte",
    name: "Scule și unelte",
    blurb: "Unelte de șantier și consumabile.",
    illustration: "/images/categorii/scule-si-unelte.svg",
  },
  {
    id: "usi-si-tamplarie",
    name: "Uși și tâmplărie",
    blurb: "Uși de interior și exterior, ferestre PVC.",
    illustration: "/images/categorii/usi-si-tamplarie.svg",
  },
];

export const products: Product[] = [
  // ——— Ciment și var ———
  {
    slug: "ciment-cem-ii-a-ll-42-5r-40kg",
    name: "Ciment Portland CEM II/A-LL 42,5R",
    category: "ciment-si-var",
    price: 36.5,
    unit: "sac 40 kg",
    description:
      "Ciment cu rezistență inițială mare, potrivit pentru betoane de fundații, stâlpi, grinzi și plăci, precum și pentru șape.",
    packaging: "Sac de hârtie 40 kg; 35 de saci pe palet.",
    specs: [
      { label: "Tip", value: "CEM II/A-LL 42,5R (SR EN 197-1)" },
      { label: "Greutate", value: "40 kg / sac" },
      { label: "Rezistență la 28 de zile", value: "minimum 42,5 MPa" },
      { label: "Utilizare", value: "betoane armate, fundații, stâlpi, plăci, șape" },
      { label: "Depozitare", value: "loc uscat, pe palet, cel mult 6 luni" },
    ],
    variants: [
      { label: "Sac 40 kg", price: 36.5, unit: "sac 40 kg" },
      { label: "Palet 35 de saci (1.400 kg)", price: 1249, unit: "palet 1400 kg" },
    ],
    top: true,
  },
  {
    slug: "ciment-cem-ii-b-m-32-5r-40kg",
    name: "Ciment CEM II/B-M 32,5R",
    category: "ciment-si-var",
    price: 32.9,
    unit: "sac 40 kg",
    description:
      "Ciment pentru lucrări curente: mortare de zidărie și tencuială, betoane simple, pardoseli și trotuare.",
    packaging: "Sac de hârtie 40 kg; 35 de saci pe palet.",
    specs: [
      { label: "Tip", value: "CEM II/B-M (S-LL) 32,5R" },
      { label: "Greutate", value: "40 kg / sac" },
      { label: "Rezistență la 28 de zile", value: "minimum 32,5 MPa" },
      { label: "Utilizare", value: "mortare de zidărie și tencuială, betoane simple, trotuare" },
    ],
    variants: [
      { label: "Sac 40 kg", price: 32.9, unit: "sac 40 kg" },
      { label: "Palet 35 de saci (1.400 kg)", price: 1119, unit: "palet 1400 kg" },
    ],
    top: false,
  },
  {
    slug: "ciment-alb-25kg",
    name: "Ciment alb",
    category: "ciment-si-var",
    price: 79.9,
    unit: "sac 25 kg",
    description:
      "Ciment alb pentru elemente decorative, rosturi, tencuieli colorate și finisaje unde contează culoarea.",
    packaging: "Sac de hârtie 25 kg.",
    specs: [
      { label: "Tip", value: "CEM I 52,5R alb" },
      { label: "Greutate", value: "25 kg / sac" },
      { label: "Culoare", value: "alb" },
      { label: "Utilizare", value: "rosturi, elemente decorative, tencuieli și mortare colorate" },
    ],
    top: false,
  },
  {
    slug: "var-hidratat-20kg",
    name: "Var hidratat pentru construcții",
    category: "ciment-si-var",
    price: 22.5,
    unit: "sac 20 kg",
    description:
      "Var hidratat praf pentru mortare și tencuieli var-ciment, cu lucrabilitate bună și aderență sporită.",
    packaging: "Sac de hârtie 20 kg; 50 de saci pe palet.",
    specs: [
      { label: "Tip", value: "var calcic hidratat CL 90-S" },
      { label: "Greutate", value: "20 kg / sac" },
      { label: "Culoare", value: "alb" },
      { label: "Utilizare", value: "mortare și tencuieli var-ciment, văruire" },
      { label: "Depozitare", value: "loc uscat, sac închis" },
    ],
    variants: [
      { label: "Sac 20 kg", price: 22.5, unit: "sac 20 kg" },
      { label: "Palet 50 de saci (1.000 kg)", price: 1069, unit: "palet 1000 kg" },
    ],
    top: true,
  },

  // ——— Adezivi și mortare ———
  {
    slug: "adeziv-gresie-faianta-c1-25kg",
    name: "Adeziv pentru gresie și faianță C1",
    category: "adezivi-si-mortare",
    price: 39.9,
    unit: "sac 25 kg",
    description:
      "Adeziv pe bază de ciment pentru plăci ceramice la interior, pe pereți și pardoseli din beton sau tencuială.",
    packaging: "Sac 25 kg; consum aproximativ 3–5 kg/m².",
    specs: [
      { label: "Clasă", value: "C1T (SR EN 12004)" },
      { label: "Consum", value: "aproximativ 3–5 kg/m²" },
      { label: "Timp deschis", value: "minimum 20 de minute" },
      { label: "Grosime strat", value: "3–10 mm" },
      { label: "Utilizare", value: "interior, gresie și faianță pe pereți și pardoseli" },
    ],
    variants: [
      { label: "Sac 25 kg", price: 39.9, unit: "sac 25 kg" },
      { label: "Sac 5 kg", price: 12.9, unit: "sac 5 kg" },
    ],
    top: true,
  },
  {
    slug: "adeziv-flexibil-c2te-s1-25kg",
    name: "Adeziv flexibil C2TE S1",
    category: "adezivi-si-mortare",
    price: 69.9,
    unit: "sac 25 kg",
    description:
      "Adeziv deformabil pentru plăci mari, gresie porțelanată, încălzire în pardoseală, terase și balcoane.",
    packaging: "Sac 25 kg; consum aproximativ 3–6 kg/m².",
    specs: [
      { label: "Clasă", value: "C2TE S1 (SR EN 12004)" },
      { label: "Consum", value: "aproximativ 3–6 kg/m²" },
      { label: "Deformabilitate", value: "S1 — potrivit pentru suporturi care lucrează" },
      { label: "Utilizare", value: "interior și exterior, plăci mari, încălzire în pardoseală, terase" },
    ],
    top: false,
  },
  {
    slug: "mortar-zidarie-m5-40kg",
    name: "Mortar pentru zidărie M5",
    category: "adezivi-si-mortare",
    price: 24.9,
    unit: "sac 40 kg",
    description:
      "Mortar uscat gata preparat pentru zidărie din cărămidă și BCA; se amestecă doar cu apă.",
    packaging: "Sac 40 kg; 35 de saci pe palet.",
    specs: [
      { label: "Clasă", value: "M5 (minimum 5 N/mm²)" },
      { label: "Apă de amestec", value: "aproximativ 5 L la sac" },
      { label: "Granulație", value: "0–2 mm" },
      { label: "Utilizare", value: "zidărie din cărămidă, BCA și piatră" },
    ],
    variants: [
      { label: "Sac 40 kg", price: 24.9, unit: "sac 40 kg" },
      { label: "Palet 35 de saci (1.400 kg)", price: 849, unit: "palet 1400 kg" },
    ],
    top: false,
  },
  {
    slug: "tencuiala-var-ciment-40kg",
    name: "Tencuială var-ciment pentru interior și exterior",
    category: "adezivi-si-mortare",
    price: 28.5,
    unit: "sac 40 kg",
    description:
      "Tencuială uscată pentru aplicare manuală sau mecanizată, în strat de 10–20 mm, pe zidărie și beton.",
    packaging: "Sac 40 kg; consum aproximativ 14 kg/m² la 1 cm grosime.",
    specs: [
      { label: "Grosime strat", value: "10–20 mm" },
      { label: "Consum", value: "aproximativ 14 kg/m² la 1 cm" },
      { label: "Granulație", value: "0–1,2 mm" },
      { label: "Aplicare", value: "manuală sau mecanizată" },
      { label: "Utilizare", value: "interior și exterior, pe zidărie și beton" },
    ],
    variants: [
      { label: "Sac 40 kg", price: 28.5, unit: "sac 40 kg" },
      { label: "Palet 42 de saci (1.680 kg)", price: 1149, unit: "palet 1680 kg" },
    ],
    top: true,
  },

  // ——— Vopsele și lacuri ———
  {
    slug: "vopsea-lavabila-interior-alba-15l",
    name: "Vopsea lavabilă albă pentru interior",
    category: "vopsele-si-lacuri",
    price: 189,
    unit: "găleată 15 L",
    description:
      "Vopsea mată, cu putere bună de acoperire, pentru pereți și tavane din tencuială, gips-carton și glet.",
    packaging: "Găleată 15 L; randament aproximativ 10–12 m²/L pe strat.",
    specs: [
      { label: "Culoare", value: "alb" },
      { label: "Finisaj", value: "mat" },
      { label: "Randament", value: "10–12 m²/L pe strat" },
      { label: "Diluare", value: "maximum 10% apă" },
      { label: "Uscare", value: "2 ore între straturi" },
    ],
    variants: [
      { label: "Găleată 15 L", price: 189, unit: "găleată 15 L" },
      { label: "Găleată 8,5 L", price: 119, unit: "găleată 8.5 L" },
      { label: "Găleată 2,5 L", price: 44.9, unit: "găleată 2.5 L" },
    ],
    top: true,
  },
  {
    slug: "vopsea-lavabila-exterior-15l",
    name: "Vopsea lavabilă pentru exterior",
    category: "vopsele-si-lacuri",
    price: 289,
    unit: "găleată 15 L",
    description:
      "Vopsea rezistentă la intemperii și raze UV, pentru fațade din tencuială, beton și sisteme de termoizolație.",
    packaging: "Găleată 15 L; randament aproximativ 7–9 m²/L pe strat.",
    specs: [
      { label: "Culoare", value: "alb" },
      { label: "Finisaj", value: "mat" },
      { label: "Randament", value: "7–9 m²/L pe strat" },
      { label: "Rezistență", value: "intemperii și raze UV" },
      { label: "Temperatură de aplicare", value: "+5 … +30 °C" },
    ],
    variants: [
      { label: "Găleată 15 L", price: 289, unit: "găleată 15 L" },
      { label: "Găleată 4 L", price: 94.9, unit: "găleată 4 L" },
    ],
    top: false,
  },
  {
    slug: "amorsa-grund-5l",
    name: "Amorsă pentru pereți (grund)",
    category: "vopsele-si-lacuri",
    price: 64.9,
    unit: "bidon 5 L",
    description:
      "Grund de profunzime care uniformizează absorbția suportului înainte de vopsire, gletuire sau placare.",
    packaging: "Bidon 5 L; se diluează conform indicațiilor de pe ambalaj.",
    specs: [
      { label: "Aspect", value: "lichid lăptos, transparent după uscare" },
      { label: "Randament", value: "6–10 m²/L, după absorbția suportului" },
      { label: "Uscare", value: "aproximativ 4 ore" },
      { label: "Utilizare", value: "tencuieli, glet, gips-carton, beton" },
    ],
    variants: [
      { label: "Bidon 5 L", price: 64.9, unit: "bidon 5 L" },
      { label: "Bidon 10 L", price: 114, unit: "bidon 10 L" },
    ],
    top: false,
  },
  {
    slug: "lac-lemn-exterior-0-75l",
    name: "Lac pentru lemn, exterior",
    category: "vopsele-si-lacuri",
    price: 54.9,
    unit: "cutie 0.75 L",
    description:
      "Lac lucios cu protecție UV pentru uși, garduri, lambriuri și mobilier de grădină din lemn.",
    packaging: "Cutie metalică 0,75 L.",
    specs: [
      { label: "Culoare", value: "incolor" },
      { label: "Finisaj", value: "lucios" },
      { label: "Randament", value: "10–14 m²/L pe strat" },
      { label: "Uscare", value: "8–12 ore între straturi" },
      { label: "Utilizare", value: "lemn la exterior și interior" },
    ],
    variants: [
      { label: "Cutie 0,75 L", price: 54.9, unit: "cutie 0.75 L" },
      { label: "Cutie 2,5 L", price: 159, unit: "cutie 2.5 L" },
    ],
    top: false,
  },

  // ——— Izolații ———
  {
    slug: "polistiren-expandat-eps80-10cm",
    name: "Polistiren expandat EPS 80, 10 cm",
    category: "izolatii",
    price: 27.9,
    unit: "m²",
    description:
      "Plăci de polistiren pentru termoizolarea fațadelor, cu dimensiunea plăcii de 1000 × 500 mm.",
    packaging: "Pachet de 3 m² (6 plăci); se vinde la metru pătrat, în pachete întregi.",
    specs: [
      { label: "Grosime", value: "10 cm" },
      { label: "Dimensiune placă", value: "1000 × 500 mm" },
      { label: "Conductivitate termică", value: "λ ≤ 0,038 W/mK" },
      { label: "Utilizare", value: "termoizolație fațade (sistem ETICS)" },
    ],
    variants: [
      { label: "La metru pătrat", price: 27.9, unit: "m²" },
      { label: "Pachet 3 m² (6 plăci)", price: 83.7, unit: "pachet 3 m²" },
    ],
    top: true,
  },
  {
    slug: "vata-minerala-bazaltica-10cm",
    name: "Vată minerală bazaltică, 10 cm",
    category: "izolatii",
    price: 139,
    unit: "pachet 3.6 m²",
    description:
      "Plăci din vată bazaltică pentru izolații termice și fonice la fațade, mansarde și pereți despărțitori.",
    packaging: "Pachet de 3,6 m² (6 plăci 1000 × 600 mm).",
    specs: [
      { label: "Grosime", value: "10 cm" },
      { label: "Dimensiune placă", value: "1000 × 600 mm" },
      { label: "Conductivitate termică", value: "λ ≤ 0,036 W/mK" },
      { label: "Reacție la foc", value: "clasa A1 (incombustibil)" },
      { label: "Utilizare", value: "fațade, mansarde, pereți despărțitori" },
    ],
    top: false,
  },
  {
    slug: "plasa-fibra-sticla-145g",
    name: "Plasă din fibră de sticlă 145 g/m²",
    category: "izolatii",
    price: 119,
    unit: "rolă 50 m²",
    description:
      "Plasă de armare pentru sisteme de termoizolație, rezistentă la mediul alcalin al adezivilor.",
    packaging: "Rolă de 50 m² (1 × 50 m).",
    specs: [
      { label: "Greutate", value: "145 g/m²" },
      { label: "Ochiuri", value: "4 × 4 mm" },
      { label: "Dimensiune rolă", value: "1 × 50 m" },
      { label: "Rezistență", value: "la mediul alcalin" },
    ],
    top: false,
  },
  {
    slug: "adeziv-polistiren-25kg",
    name: "Adeziv pentru polistiren și masă de șpaclu",
    category: "izolatii",
    price: 42.9,
    unit: "sac 25 kg",
    description:
      "Adeziv pentru lipirea plăcilor de polistiren și pentru înglobarea plasei de armare.",
    packaging: "Sac 25 kg; consum aproximativ 4–5 kg/m² la lipire.",
    specs: [
      { label: "Consum la lipire", value: "aproximativ 4–5 kg/m²" },
      { label: "Consum la armare", value: "aproximativ 3–4 kg/m²" },
      { label: "Grosime strat de armare", value: "2–3 mm" },
      { label: "Utilizare", value: "lipire și armare polistiren și vată minerală" },
    ],
    variants: [
      { label: "Sac 25 kg", price: 42.9, unit: "sac 25 kg" },
      { label: "Palet 48 de saci (1.200 kg)", price: 1989, unit: "palet 1200 kg" },
    ],
    top: true,
  },

  // ——— Pelet și combustibil ———
  {
    slug: "pelet-lemn-sac-15kg",
    name: "Pelet din lemn de fag",
    category: "pelet-si-combustibil",
    price: 28,
    unit: "sac 15 kg",
    description:
      "Pelet din rumeguș de fag, fără aditivi, cu putere calorică mare și cenușă puțină, pentru centrale și sobe.",
    packaging: "Sac de plastic 15 kg.",
    specs: [
      { label: "Esență", value: "fag" },
      { label: "Diametru", value: "6 mm" },
      { label: "Putere calorică", value: "aproximativ 4,9 kWh/kg" },
      { label: "Cenușă", value: "sub 0,7%" },
      { label: "Umiditate", value: "sub 10%" },
    ],
    variants: [
      { label: "Sac 15 kg", price: 28, unit: "sac 15 kg" },
      { label: "Palet 65 de saci (975 kg)", price: 1690, unit: "palet 975 kg" },
    ],
    top: true,
  },
  {
    slug: "pelet-lemn-palet-975kg",
    name: "Pelet din lemn de fag, la palet",
    category: "pelet-si-combustibil",
    price: 1690,
    unit: "palet",
    description:
      "Același pelet din fag, la palet complet — varianta avantajoasă pentru întregul sezon de încălzire.",
    packaging: "Palet de 975 kg (65 de saci × 15 kg), folie de protecție.",
    specs: [
      { label: "Esență", value: "fag" },
      { label: "Diametru", value: "6 mm" },
      { label: "Putere calorică", value: "aproximativ 4,9 kWh/kg" },
      { label: "Cenușă", value: "sub 0,7%" },
      { label: "Saci pe palet", value: "65 × 15 kg" },
    ],
    top: true,
  },
  {
    slug: "brichete-lemn-ruf-10kg",
    name: "Brichete din lemn tip RUF",
    category: "pelet-si-combustibil",
    price: 17.5,
    unit: "pachet 10 kg",
    description:
      "Brichete presate din rumeguș, pentru sobe, șeminee și cazane pe lemne; ard uniform și mult timp.",
    packaging: "Pachet folie 10 kg; 96 de pachete pe palet.",
    specs: [
      { label: "Material", value: "rumeguș de fag și stejar, fără lianți" },
      { label: "Dimensiune brichetă", value: "aproximativ 15 × 9 × 6 cm" },
      { label: "Putere calorică", value: "aproximativ 4,8 kWh/kg" },
      { label: "Umiditate", value: "sub 10%" },
    ],
    variants: [
      { label: "Pachet 10 kg", price: 17.5, unit: "pachet 10 kg" },
      { label: "Palet 96 de pachete (960 kg)", price: 1490, unit: "palet 960 kg" },
    ],
    top: false,
  },
  {
    slug: "brichete-lemn-palet-960kg",
    name: "Brichete din lemn tip RUF, la palet",
    category: "pelet-si-combustibil",
    price: 1490,
    unit: "palet 960 kg",
    description:
      "Brichete RUF la palet complet, pentru cine se încălzește pe lemne întreaga iarnă.",
    packaging: "Palet de 960 kg (96 de pachete × 10 kg).",
    specs: [
      { label: "Material", value: "rumeguș de fag și stejar, fără lianți" },
      { label: "Putere calorică", value: "aproximativ 4,8 kWh/kg" },
      { label: "Pachete pe palet", value: "96 × 10 kg" },
    ],
    top: false,
  },

  // ——— Scule și unelte ———
  {
    slug: "roaba-constructii-90l",
    name: "Roabă pentru construcții 90 L",
    category: "scule-si-unelte",
    price: 349,
    unit: "buc",
    description:
      "Roabă cu cuvă din tablă zincată și roată pneumatică, pentru transportul materialelor pe șantier.",
    packaging: "Livrată demontată, în cutie.",
    specs: [
      { label: "Capacitate", value: "90 L" },
      { label: "Sarcină maximă", value: "160 kg" },
      { label: "Cuvă", value: "tablă zincată" },
      { label: "Roată", value: "pneumatică, 4.00-8" },
    ],
    top: false,
  },
  {
    slug: "mistrie-zidarie-200mm",
    name: "Mistrie pentru zidărie 200 mm",
    category: "scule-si-unelte",
    price: 32.9,
    unit: "buc",
    description: "Mistrie din oțel călit cu mâner ergonomic, pentru zidărie și tencuieli.",
    packaging: "Bucată.",
    specs: [
      { label: "Lungime lamă", value: "200 mm" },
      { label: "Material", value: "oțel călit" },
      { label: "Mâner", value: "lemn lăcuit" },
    ],
    top: false,
  },
  {
    slug: "nivela-aluminiu-60cm",
    name: "Nivelă din aluminiu 60 cm",
    category: "scule-si-unelte",
    price: 54.9,
    unit: "buc",
    description: "Nivelă cu trei bule (orizontal, vertical, 45°) și profil rigid din aluminiu.",
    packaging: "Bucată.",
    specs: [
      { label: "Lungime", value: "60 cm" },
      { label: "Bule", value: "3 (orizontal, vertical, 45°)" },
      { label: "Precizie", value: "0,5 mm/m" },
      { label: "Material", value: "aluminiu" },
    ],
    top: false,
  },
  {
    slug: "cuie-constructii",
    name: "Cuie pentru construcții",
    category: "scule-si-unelte",
    price: 12.9,
    unit: "kg",
    description:
      "Cuie din sârmă de oțel cu cap plat, pentru cofraje, șarpante și lucrări de tâmplărie; diverse lungimi.",
    packaging: "Se vând la kilogram, ambalate în pungă.",
    specs: [
      { label: "Material", value: "oțel, finisaj natural" },
      { label: "Lungimi", value: "40–150 mm" },
      { label: "Cap", value: "plat" },
      { label: "Utilizare", value: "cofraje, șarpante, tâmplărie" },
    ],
    variants: [
      { label: "La kilogram", price: 12.9, unit: "kg" },
      { label: "Pachet 5 kg", price: 59.9, unit: "pachet 5 kg" },
    ],
    top: false,
  },

  // ——— Uși și tâmplărie ———
  {
    slug: "usa-interior-mdf-alba-80cm",
    name: "Ușă de interior MDF albă, 80 cm",
    category: "usi-si-tamplarie",
    price: 649,
    unit: "buc",
    description:
      "Ușă de interior plină, finisaj alb, cu toc reglabil și pervaz, balamale și broască incluse.",
    packaging: "Set: foaie de ușă, toc, pervaz, feronerie.",
    specs: [
      { label: "Material", value: "MDF, finisaj alb" },
      { label: "Înălțime foaie", value: "203 cm" },
      { label: "Toc", value: "reglabil, 100–120 mm" },
      { label: "Sens de deschidere", value: "stânga sau dreapta, se precizează la telefon" },
    ],
    variants: [
      { label: "Lățime 70 cm", price: 649, unit: "buc" },
      { label: "Lățime 80 cm", price: 649, unit: "buc" },
      { label: "Lățime 90 cm", price: 699, unit: "buc" },
    ],
    top: true,
  },
  {
    slug: "usa-metalica-exterior-90cm",
    name: "Ușă metalică de exterior, 90 cm",
    category: "usi-si-tamplarie",
    price: 1390,
    unit: "buc",
    description:
      "Ușă de intrare din tablă de oțel cu umplutură izolantă, yală cu cilindru și vizor.",
    packaging: "Ușă cu toc, ambalată în carton și folie.",
    specs: [
      { label: "Dimensiune", value: "90 × 205 cm" },
      { label: "Culoare", value: "antracit" },
      { label: "Încuiere", value: "yală cu cilindru, 3 puncte de închidere" },
      { label: "Umplutură", value: "spumă poliuretanică" },
    ],
    top: false,
  },
  {
    slug: "fereastra-pvc-120x120",
    name: "Fereastră PVC oscilobatantă 120 × 120 cm",
    category: "usi-si-tamplarie",
    price: 899,
    unit: "buc",
    description:
      "Fereastră din profil PVC cu 5 camere și geam termoizolant, deschidere oscilobatantă.",
    packaging: "Bucată, cu toc; ambalată în folie.",
    specs: [
      { label: "Profil", value: "PVC, 5 camere, 70 mm" },
      { label: "Geam", value: "termoizolant 4-16-4, Low-E" },
      { label: "Culoare", value: "alb" },
      { label: "Deschidere", value: "oscilobatantă" },
    ],
    variants: [
      { label: "60 × 60 cm", price: 389, unit: "buc" },
      { label: "120 × 120 cm", price: 899, unit: "buc" },
      { label: "140 × 140 cm", price: 1149, unit: "buc" },
    ],
    top: false,
  },
  {
    slug: "clanta-usa-rozeta",
    name: "Clanță de ușă cu rozetă",
    category: "usi-si-tamplarie",
    price: 89.9,
    unit: "buc",
    description: "Set de clanțe din aluminiu cu finisaj inox periat, pentru uși de interior.",
    packaging: "Set: două clanțe, rozete, șuruburi.",
    specs: [
      { label: "Material", value: "aluminiu" },
      { label: "Finisaj", value: "inox periat" },
      { label: "Conținut", value: "2 clanțe, 2 rozete, tijă, șuruburi" },
      { label: "Compatibilitate", value: "uși de interior cu broască obișnuită" },
    ],
    top: false,
  },
];
