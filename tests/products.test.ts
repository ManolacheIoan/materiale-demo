import { describe, expect, it } from "vitest";
import { products } from "../data/products";

const STOCK = /\bstoc|disponibil|epuizat|orientativ/i;

describe("data/products.ts", () => {
  it("are specificații pentru fiecare produs, fără etichete repetate", () => {
    for (const p of products) {
      expect(p.specs?.length ?? 0, p.slug).toBeGreaterThanOrEqual(3);
      const labels = p.specs!.map((s) => s.label);
      expect(new Set(labels).size, p.slug).toBe(labels.length);
      for (const s of p.specs!) expect(s.value.trim(), `${p.slug}: ${s.label}`).not.toBe("");
    }
  });

  it("variantele includ varianta principală și au prețuri pozitive", () => {
    for (const p of products.filter((x) => x.variants)) {
      const v = p.variants!;
      expect(v.length, p.slug).toBeGreaterThanOrEqual(2);
      expect(new Set(v.map((x) => x.label)).size, p.slug).toBe(v.length);
      expect(v.some((x) => x.price === p.price && x.unit === p.unit), `${p.slug}: lipsește varianta principală`).toBe(true);
      for (const x of v) expect(x.price, `${p.slug}: ${x.label}`).toBeGreaterThan(0);
    }
  });

  it("paletul este mai ieftin pe unitate decât sacul (unde există ambele)", () => {
    for (const p of products.filter((x) => x.variants)) {
      const sac = p.variants!.find((v) => /^(sac|pachet) (\d+(\.\d+)?) kg$/.test(v.unit));
      const palet = p.variants!.find((v) => /^palet (\d+) kg$/.test(v.unit));
      if (!sac || !palet) continue;
      const kg = (u: string) => Number(u.match(/(\d+(\.\d+)?) kg/)![1]);
      expect(palet.price / kg(palet.unit), p.slug).toBeLessThan(sac.price / kg(sac.unit));
    }
  });

  it("nu conține mențiuni despre stoc", () => {
    expect(JSON.stringify(products)).not.toMatch(STOCK);
  });
});
