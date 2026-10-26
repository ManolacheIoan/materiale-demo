/**
 * Catalogul de produse — singurul fișier de editat pentru produse și prețuri.
 *
 * - `price` este prețul final în lei (număr; zecimalele cu punct: 36.5 = 36,50 lei).
 * - `unit` este unitatea de vânzare afișată după „lei/” (ex.: „sac 40 kg” → „lei/sac 40 kg”).
 * - `top: true` pune produsul în „Cele mai căutate produse”.
 * - Fotografii: puneți public/products/<slug>.webp (sau .jpg) și apar automat; fără fișier se afișează
 *   ilustrația categoriei. `image` (opțional) forțează altă cale din /public.
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
    top: false,
  },
];
