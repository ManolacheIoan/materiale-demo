/**
 * Verifică fotografiile din public/products/:
 *   npm run images:check
 * - numele fișierului = slug-ul produsului (ex.: pelet-lemn-sac-15kg.webp);
 * - format .webp sau .jpg, raport 4:3, recomandat 1200 × 900 px, sub 300 KB.
 * Erorile (fișier fără produs, format greșit, raport greșit) opresc scriptul cu cod 1.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { products } from "../data/products.ts";
import { imageSize } from "../lib/imageSize.ts";

const dir = join(import.meta.dirname, "..", "public", "products");
const slugs = new Set(products.map((p) => p.slug));
const files = readdirSync(dir).filter((f) => !f.startsWith("."));
const errors: string[] = [];
const warnings: string[] = [];
const withPhoto = new Set<string>();

for (const file of files) {
  const match = file.match(/^(.+)\.(webp|jpg)$/);
  if (!match) {
    errors.push(`${file}: folosiți .webp sau .jpg (cu litere mici)`);
    continue;
  }
  const [, slug] = match;
  if (!slugs.has(slug)) {
    errors.push(`${file}: nu există niciun produs cu slug-ul „${slug}”`);
    continue;
  }
  if (withPhoto.has(slug)) warnings.push(`${slug}: există și .webp și .jpg; se folosește .webp`);
  withPhoto.add(slug);

  const path = join(dir, file);
  const size = imageSize(readFileSync(path));
  if (!size) {
    errors.push(`${file}: fișier imagine nerecunoscut`);
    continue;
  }
  const ratio = size.width / size.height;
  if (Math.abs(ratio - 4 / 3) > 0.02) errors.push(`${file}: ${size.width}×${size.height} nu are raport 4:3`);
  else if (size.width < 1200) warnings.push(`${file}: ${size.width}×${size.height}; recomandat 1200 × 900`);
  const kb = Math.round(statSync(path).size / 1024);
  if (kb > 300) warnings.push(`${file}: ${kb} KB; comprimați sub 300 KB`);
}

console.log(`Produse cu fotografie: ${withPhoto.size}/${products.length}`);
const missing = products.filter((p) => !withPhoto.has(p.slug) && !p.image);
if (missing.length) {
  console.log(`Fără fotografie (se afișează ilustrația categoriei):`);
  for (const p of missing) console.log(`  public/products/${p.slug}.webp`);
}
for (const w of warnings) console.warn(`Atenție: ${w}`);
for (const e of errors) console.error(`Eroare: ${e}`);
process.exit(errors.length ? 1 : 0);
