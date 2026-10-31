# Temelia — catalog online pentru un magazin de materiale de construcții

Proiect de portofoliu: site de prezentare pentru **Temelia**, un magazin **fictiv** de materiale de
construcții din Galați. Catalog cu 29 de produse în 7 categorii, prețuri cu TVA, fără coș: comenzile se fac telefonic.

> Magazinul, numele, telefonul, zona, programul și prețurile sunt inventate. Prețurile sunt estimări realiste
> pentru piața din România (toamna 2026).

## Ce include

- **Catalog cu căutare** fără diacritice („usa” găsește „ușă”), filtru pe categorii și stare în URL
  (`/catalog/?q=pelet&categorie=pelet-si-combustibil`), deci rezultatele se pot trimite ca link.
- **Pagini de produs** generate automat: specificații, variante de ambalare cu prețuri, produse similare.
- **Pagini de conținut:** Despre noi, Servicii, Întrebări frecvente, Contact cu hartă schematică desenată în SVG.
- **Mobil întâi:** bară fixă „Sună acum”, meniu adaptat, fără scroll orizontal.
- **Ilustrații SVG proprii** pentru fiecare categorie și un pipeline pentru fotografii reale (`public/products/`).
- **Accesibilitate și performanță:** Lighthouse 95–100 la performanță, 100 la accesibilitate și bune practici;
  animațiile respectă `prefers-reduced-motion`.
- **Teste** (Vitest) pentru căutare, datele produselor, imagini și build-ul static final.

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
  specs: [                               // opțional: tabelul „Specificații”
    { label: "Greutate", value: "40 kg / sac" },
  ],
  variants: [                            // opțional: „Variante și prețuri” (min. 2, include varianta principală)
    { label: "Sac 40 kg", price: 36.5, unit: "sac 40 kg" },
    { label: "Palet 35 de saci (1.400 kg)", price: 1249, unit: "palet 1400 kg" },
  ],
  top: true,                             // apare la „Cele mai căutate”
  // fotografia: public/products/<slug>.webp (vezi „Fotografii produse”)
},
```

- **Specificații:** 3–5 rânduri scurte (greutate, consum, culoare, utilizare). „Unitate de vânzare” și „Ambalare”
  se adaugă automat la final.
- **Variante:** alte ambalări sau dimensiuni, fiecare cu preț și unitate proprii. Testele verifică că lista include
  varianta principală (același `price` și `unit`) și că paletul iese mai ieftin pe kg decât sacul.
- **Produse similare:** pagina produsului arată automat alte produse din aceeași categorie.

- **Adăugare:** copiați un obiect existent, schimbați `slug`-ul și câmpurile. Pagina se generează automat.
- **Ștergere:** ștergeți obiectul.
- **Preț:** schimbați `price`. Formatul afișat (1.690,00) se face automat.
- **Unități acceptate:** `sac N kg`, `găleată N L`, `bidon N L`, `cutie N L`, `rolă N m²`, `pachet N kg`,
  `pachet N m²`, `palet N kg`, `palet`, `kg`, `m²`, `buc`. Pentru alta, adăugați-o în tipul `Unit`.
- **Top:** `top: true` / `false`. Pe pagina „Cele mai căutate”, produsele de top apar primele, în ordinea din fișier.
- **Categorii:** lista `categories` din același fișier (nume, descriere scurtă, ilustrație).

## Căutare în catalog

Pagina `/catalog/` are căutare după nume și descriere (fără diacritice: „usa” găsește „ușă”), combinată cu filtrul
de categorie. Starea apare în adresă (`/catalog/?q=pelet&categorie=pelet-si-combustibil`), deci linkurile se pot
trimite. Logica este în `lib/search.ts` (testată în `tests/search.test.ts`), interfața în `components/CatalogBrowser.tsx`.
Fără JavaScript, pagina afișează tot catalogul pe categorii.

## Pagini de conținut

Textele pentru „Despre noi”, „Servicii” (livrare, tăiere la dimensiune, calculul cantităților) și
„Întrebări frecvente” sunt direct în `app/despre-noi/page.tsx`, `app/servicii/page.tsx` și
`app/intrebari-frecvente/page.tsx`. Sunt generice și fictive: verificați-le (zonă de livrare, plată, retur) înainte
de folosirea reală.

## Redenumirea magazinului

1. `config/site.ts` → constanta **`STORE_NAME`**. Se schimbă peste tot: antet, subsol, titluri de pagini.
   Logo-ul afișează primul cuvânt în vișiniu și restul în albastru.
2. În același fișier: telefon (`display` și `href`), zonă, program, mesajul despre comenzi.
3. Opțional, semnul grafic: `components/Logo.tsx` (`LogoMark`) și favicon-ul `app/icon.svg` (același desen).

## Fotografii produse

Produsele fără fotografie folosesc ilustrația categoriei (`public/images/categorii/<categorie>.svg`).
Fotografia se adaugă **doar punând fișierul în folder**, fără modificări în cod:

1. **Nume:** `public/products/<slug>.webp` sau `public/products/<slug>.jpg` — `slug` este cel din
   `data/products.ts` (ex.: `public/products/pelet-lemn-sac-15kg.webp`). Dacă există ambele, se folosește `.webp`.
2. **Dimensiune:** raport **4:3**, recomandat **1200 × 900 px** (minim 960 × 720). Imaginea se afișează
   decupat (`object-fit: cover`), deci păstrați produsul centrat, cu puțin spațiu în jur.
3. **Compresie:** sub **300 KB** (ideal 100–200 KB). WebP calitate ~75–80 sau JPEG calitate ~80, fără metadate.
   Exemple: [Squoosh](https://squoosh.app) (în browser, local) sau din terminal:
   ```bash
   cwebp -q 78 -resize 1200 900 poza.jpg -o public/products/<slug>.webp      # dacă aveți cwebp
   sips -z 900 1200 -s format jpeg -s formatOptions 80 poza.jpg --out public/products/<slug>.jpg   # macOS, poza deja decupată 4:3
   ```
4. **Verificare:** `npm run images:check` listează produsele cu/fără fotografie și semnalează fișierele
   cu nume greșit, raport diferit de 4:3, rezoluție mică sau dimensiune prea mare.
5. `npm run build` — fotografia apare pe card și pe pagina produsului. Ștergeți fișierul și revine ilustrația.

Alegerea se face la build (site static), deci nu există imagini lipsă/404 pe site. Textul alternativ este numele
produsului. Imaginile au dimensiuni declarate (fără salt de layout), se încarcă leneș, cu excepția celor vizibile
la deschiderea paginii. Exportul static servește fișierul așa cum este, de aceea contează compresia.

Câmpul opțional `image` din `data/products.ts` rămâne pentru cazurile în care vreți altă cale.
Pentru a schimba ilustrația unei categorii, înlocuiți SVG-ul cu același nume.
Folosiți doar fotografii proprii sau cu drept de utilizare.

## Structură

```
config/site.ts        nume magazin, telefon, zonă, program
config/navigation.ts  meniul (antet + subsol); `short` = etichetă scurtă în antet
data/products.ts      categorii și produse
lib/catalog.ts        funcții: formatare preț/unitate, căutare produs
lib/images.ts         alegerea imaginii (fotografie sau ilustrație), la build
components/           antet, subsol, card produs, etichetă preț, hartă schematică etc.
app/                  pagini: /, /catalog/ (?q=&categorie=), /produs/<slug>/, /cele-mai-cautate/,
                      /servicii/, /despre-noi/, /intrebari-frecvente/, /contact/
public/images/        ilustrații categorii
public/products/      fotografii produse (<slug>.webp|jpg)
scripts/              check-images.ts (npm run images:check)
tests/                testul static pe out/
```

## Lighthouse (măsurat local pe build)

Performanță 95–100, Accesibilitate 100, Bune practici 100 (mobil și desktop, toate tipurile de pagini).
SEO apare ~60 **intenționat**: paginile au `noindex` (demo privat). Scoaterea `robots` din `app/layout.tsx`
ridică SEO, dar face site-ul indexabil.

Animațiile (apariție la derulare, ridicare la hover, tranziții pe butoane) se dezactivează când sistemul cere
mișcare redusă (`prefers-reduced-motion`).
