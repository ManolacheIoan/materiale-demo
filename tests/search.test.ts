import { describe, expect, it } from "vitest";
import { products } from "../data/products";
import { buildQuery, catalogHref, filterProducts, matchesQuery, normalize, parseQuery } from "../lib/search";

const search = (q: string, categorie: Parameters<typeof filterProducts>[1]["categorie"] = null) =>
  filterProducts(products, { q, categorie }).map((p) => p.slug);

describe("normalize", () => {
  it("elimină diacriticele (inclusiv ş/ţ cu sedilă) și majusculele", () => {
    expect(normalize("Vopsea LAVABILĂ ȘȚ şţ Îâ")).toBe("vopsea lavabila st st ia");
  });
});

describe("căutare", () => {
  it("„pelet” găsește doar produse cu pelet", () => {
    const found = search("pelet");
    expect(found).toContain("pelet-lemn-sac-15kg");
    expect(found).toContain("pelet-lemn-palet-975kg");
    for (const slug of found) {
      const p = products.find((x) => x.slug === slug)!;
      expect(normalize(`${p.name} ${p.description}`)).toContain("pelet");
    }
  });

  it("„vopsea” găsește vopselele lavabile", () => {
    const found = search("vopsea");
    expect(found).toEqual(expect.arrayContaining(["vopsea-lavabila-interior-alba-15l", "vopsea-lavabila-exterior-15l"]));
  });

  it("nu ține cont de diacritice, în niciun sens", () => {
    expect(search("tencuiala")).toContain("tencuiala-var-ciment-40kg");
    expect(search("TENCUIALĂ")).toEqual(search("tencuiala"));
    expect(search("usa")).toEqual(search("ușă"));
    expect(search("usa").length).toBeGreaterThan(0);
  });

  it("caută și în descriere", () => {
    expect(matchesQuery({ name: "X", description: "Pentru fațade și terase" }, "fatade")).toBe(true);
  });

  it("toate cuvintele trebuie să apară", () => {
    expect(search("ciment alb")).toEqual(["ciment-alb-25kg"]);
    expect(search("ciment xyzqw")).toEqual([]);
  });

  it("se combină cu filtrul de categorie", () => {
    const all = search("adeziv");
    const izolatii = search("adeziv", "izolatii");
    expect(izolatii).toContain("adeziv-polistiren-25kg");
    for (const slug of izolatii) expect(products.find((p) => p.slug === slug)!.category).toBe("izolatii");
    expect(all.length).toBeGreaterThan(izolatii.length);
    expect(search("pelet", "vopsele-si-lacuri")).toEqual([]);
  });

  it("căutarea goală întoarce tot catalogul sau toată categoria", () => {
    expect(search("   ")).toHaveLength(products.length);
    expect(search("", "izolatii")).toHaveLength(products.filter((p) => p.category === "izolatii").length);
  });
});

describe("parametrii din adresă", () => {
  it("citește q și categorie, ignoră categoriile necunoscute", () => {
    expect(parseQuery("?q=pelet&categorie=izolatii")).toEqual({ q: "pelet", categorie: "izolatii" });
    expect(parseQuery("?categorie=nu-exista")).toEqual({ q: "", categorie: null });
    expect(parseQuery("")).toEqual({ q: "", categorie: null });
  });

  it("construiește adresa și face drumul invers", () => {
    expect(buildQuery({ q: "", categorie: null })).toBe("");
    expect(buildQuery({ q: "ușă albă", categorie: "usi-si-tamplarie" })).toBe("?q=u%C8%99%C4%83+alb%C4%83&categorie=usi-si-tamplarie");
    expect(parseQuery(buildQuery({ q: "ușă albă", categorie: "usi-si-tamplarie" }))).toEqual({
      q: "ușă albă",
      categorie: "usi-si-tamplarie",
    });
    expect(catalogHref({ categorie: "izolatii" })).toBe("/catalog/?categorie=izolatii");
  });
});
