/**
 * Verificări statice pe build-ul exportat (out/). Rulați `npm run build` înainte de `npm test`.
 * 1. Nicio cerere externă: fără http(s):// sau // în src/href/srcset/action/poster, url() sau @import.
 * 2. Nicio mențiune despre stoc / disponibilitate și niciun text de tip „orientativ”.
 * 3. Toate paginile au noindex, iar fiecare produs are pagina lui cu buton de apel.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "../data/products";

const OUT = join(__dirname, "..", "out");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = existsSync(OUT) ? walk(OUT) : [];
const html = files.filter((f) => f.endsWith(".html"));
const css = files.filter((f) => f.endsWith(".css"));
const svg = files.filter((f) => f.endsWith(".svg"));
const read = (f: string) => readFileSync(f, "utf8");

/** Doar textul vizibil: fără scripturi, stiluri și etichete. */
function visibleText(source: string): string {
  return source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ");
}

const EXTERNAL_ATTR = /\b(?:src|href|srcset|action|poster|formaction|xlink:href)\s*=\s*["']?\s*(?:https?:)?\/\//gi;
const EXTERNAL_CSS = /(?:url\(\s*["']?\s*(?:https?:)?\/\/|@import\s+["']?(?:url\()?\s*["']?(?:https?:)?\/\/)/gi;
const STOCK_WORDS = [/\bstoc/i, /disponibil/i, /epuizat/i, /în limita/i, /\bla comandă\b/i, /orientativ/i, /pre[țţt]\w*\s+demo/i];

describe("build static", () => {
  it("există un build în out/", () => {
    expect(html.length, "Rulați `npm run build` înainte de teste").toBeGreaterThan(30);
  });

  it("HTML nu face cereri externe", () => {
    for (const f of html) {
      const s = read(f);
      expect(s.match(EXTERNAL_ATTR), relative(OUT, f)).toBeNull();
      expect(s, relative(OUT, f)).not.toMatch(/rel=["']?(?:preconnect|dns-prefetch)/i);
      expect(s.match(EXTERNAL_CSS), relative(OUT, f)).toBeNull();
    }
  });

  it("CSS și SVG nu încarcă resurse externe", () => {
    for (const f of [...css, ...svg]) {
      const s = read(f).replace(/xmlns(?::\w+)?="http:\/\/www\.w3\.org\/[^"]*"/g, "");
      expect(s.match(EXTERNAL_CSS), relative(OUT, f)).toBeNull();
      expect(s.match(EXTERNAL_ATTR), relative(OUT, f)).toBeNull();
    }
  });

  it("fontul este găzduit local", () => {
    expect(files.some((f) => f.endsWith(".woff2"))).toBe(true);
  });

  it("nu apare nicio informație despre stoc sau prețuri orientative", () => {
    for (const f of html) {
      const text = visibleText(read(f));
      for (const word of STOCK_WORDS) expect(text, `${relative(OUT, f)}: ${word}`).not.toMatch(word);
    }
  });

  it("toate paginile sunt noindex", () => {
    for (const f of html) {
      expect(read(f), relative(OUT, f)).toMatch(/<meta name="robots" content="noindex, nofollow/);
    }
  });

  it("fiecare produs are pagina lui, cu preț și buton de apel", () => {
    for (const p of products) {
      const page = join(OUT, "produs", p.slug, "index.html");
      expect(existsSync(page), p.slug).toBe(true);
      const s = read(page);
      expect(s).toContain('href="tel:');
      expect(visibleText(s)).toContain("Sună acum");
      expect(visibleText(s)).toMatch(/\d+,\d{2} lei\//);
    }
  });
});

describe("date produse", () => {
  it("slug-uri unice și prețuri pozitive", () => {
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    for (const p of products) expect(p.price, p.slug).toBeGreaterThan(0);
  });
});
