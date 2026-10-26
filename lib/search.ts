import type { CategoryId, Product } from "@/data/products";
import { categories } from "@/data/products";

/** Fără diacritice și majuscule: „Vopsea lavabilă” → „vopsea lavabila”; ș/ş, ț/ţ → s, t. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export interface CatalogQuery {
  q: string;
  categorie: CategoryId | null;
}

const categoryIds = new Set<string>(categories.map((c) => c.id));

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return !!value && categoryIds.has(value);
}

/** Toate cuvintele căutate trebuie să apară în nume sau descriere (ca început de cuvânt sau în interior). */
export function matchesQuery(product: Pick<Product, "name" | "description">, q: string): boolean {
  const words = normalize(q).split(" ").filter(Boolean);
  if (words.length === 0) return true;
  const haystack = normalize(`${product.name} ${product.description}`);
  return words.every((w) => haystack.includes(w));
}

export function filterProducts<T extends Product>(list: T[], query: CatalogQuery): T[] {
  return list.filter(
    (p) => (!query.categorie || p.category === query.categorie) && matchesQuery(p, query.q),
  );
}

/** „?q=pelet&categorie=izolatii” → { q, categorie }; categoriile necunoscute sunt ignorate. */
export function parseQuery(search: string): CatalogQuery {
  const params = new URLSearchParams(search);
  const categorie = params.get("categorie");
  return { q: params.get("q") ?? "", categorie: isCategoryId(categorie) ? categorie : null };
}

/** Inversul lui parseQuery; parametrii goi nu apar în adresă. */
export function buildQuery({ q, categorie }: CatalogQuery): string {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q);
  if (categorie) params.set("categorie", categorie);
  const s = params.toString();
  return s ? `?${s}` : "";
}

export function catalogHref(query: Partial<CatalogQuery>): string {
  return `/catalog/${buildQuery({ q: query.q ?? "", categorie: query.categorie ?? null })}`;
}
