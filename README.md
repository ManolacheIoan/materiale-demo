# Materiale Demo — catalog online (demo)

Site de prezentare pentru un magazin **fictiv** de materiale de construcții din Galați.
Catalog cu prețuri, fără coș: comenzile se fac doar telefonic.

> **Notă internă (nu apare pe site):** numele, telefonul, zona, programul și prețurile sunt fictive.
> Prețurile sunt estimări realiste pentru piața din România (toamna 2026), afișate pe site ca prețuri finale.
> Înainte de o utilizare reală, verificați fiecare preț în `data/products.ts`.

## Tehnologie

- Next.js 16 (App Router) cu export static (`output: "export"`) → folderul `out/` se poate urca pe orice hosting static.
- CSS propriu (`app/globals.css`), fără framework de UI. Font Source Sans 3 găzduit local (`public/fonts/`, licență OFL).
- Fără scripturi terțe și fără cereri externe la rulare. Toate paginile au `noindex, nofollow`.

## Comenzi

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run clean && npm run build   # generează out/
npm test             # rulați după build: verifică out/
```

Testul `tests/static-build.test.ts` verifică pe build-ul final că nu există cereri externe
(src/href/url()/@import către alte domenii), că nu apare nicio mențiune despre stoc/disponibilitate
sau prețuri „orientative”, că toate paginile sunt noindex și că fiecare produs are pagina lui.

## Editarea produselor

Totul se află în **`data/products.ts`** (fișier TypeScript cu tipuri, deci greșelile apar la `npm run typecheck`).

```ts
{
  slug: "ciment-cem-ii-a-ll-42-5r-40kg", // adresa paginii: /produs/<slug>/ — unic, fără diacritice
  name: "Ciment Portland CEM II/A-LL 42,5R",
  category: "ciment-si-var",            // una din cele 7 categorii
  price: 36.5,                           // preț final în lei; zecimale cu punct
  unit: "sac 40 kg",                     // afișat ca „lei/sac 40 kg”
  description: "…",
  packaging: "Sac de hârtie 40 kg; 35 de saci pe palet.",
  top: true,                             // apare la „Cele mai căutate”
  // image: "/images/produse/ciment-42-5.jpg", // opțional
},
```

- **Adăugare:** copiați un obiect existent, schimbați `slug`-ul și câmpurile. Pagina se generează automat.
- **Ștergere:** ștergeți obiectul.
- **Preț:** schimbați `price`. Formatul afișat (1.690,00) se face automat.
- **Unități acceptate:** `sac N kg`, `găleată N L`, `bidon N L`, `cutie N L`, `rolă N m²`, `pachet N kg`,
  `pachet N m²`, `palet N kg`, `palet`, `kg`, `m²`, `buc`. Pentru alta, adăugați-o în tipul `Unit`.
- **Top:** `top: true` / `false`. Pe pagina „Cele mai căutate”, produsele de top apar primele, în ordinea din fișier.
- **Categorii:** lista `categories` din același fișier (nume, descriere scurtă, ilustrație).

## Redenumirea magazinului

1. `config/site.ts` → constanta **`STORE_NAME`**. Se schimbă peste tot: antet, subsol, titluri de pagini.
   Logo-ul afișează primul cuvânt în vișiniu și restul în albastru.
2. În același fișier: telefon (`display` și `href`), zonă, program, mesajul despre comenzi.
3. Opțional, semnul grafic: `components/Logo.tsx` (`LogoMark`) și favicon-ul `app/icon.svg` (același desen).

## Înlocuirea imaginilor

Produsele fără fotografie folosesc ilustrația categoriei din `public/images/categorii/<categorie>.svg`.

Pentru o fotografie reală:

1. Puneți fișierul în `public/images/produse/` (recomandat JPG/WebP, raport **4:3**, minim 960 × 720 px).
2. Adăugați la produs: `image: "/images/produse/numele-fisierului.jpg"`.
3. Fotografia apare pe card și pe pagina produsului; dacă ștergeți câmpul, revine ilustrația.

Pentru a schimba ilustrația unei categorii, înlocuiți SVG-ul cu același nume (sau schimbați `illustration` în `categories`).
Folosiți doar imagini proprii sau cu drept de utilizare.

## Structură

```
config/site.ts        nume magazin, telefon, zonă, program
config/navigation.ts  meniul
data/products.ts      categorii și produse
lib/catalog.ts        funcții: formatare preț/unitate, căutare produs, imagine cu fallback
components/           antet, subsol, card produs, etichetă preț, hartă schematică etc.
app/                  pagini: /, /catalog/, /catalog/<categorie>/, /produs/<slug>/, /cele-mai-cautate/, /contact/
public/images/        ilustrații categorii + fotografii produse
tests/                testul static pe out/
```

## Lighthouse (măsurat local pe build)

Performanță 97–100, Accesibilitate 100, Bune practici 100 (mobil și desktop).
SEO apare ~60 **intenționat**: paginile au `noindex` (demo privat). Scoaterea `robots` din `app/layout.tsx`
ridică SEO, dar face site-ul indexabil.

Animațiile (apariție la derulare, ridicare la hover, tranziții pe butoane) se dezactivează când sistemul cere
mișcare redusă (`prefers-reduced-motion`).
