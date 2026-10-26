import Link from "next/link";
import type { CategoryId } from "@/data/products";
import { categories, products, productsIn } from "@/lib/catalog";

/** Filtru pe categorii: fiecare categorie are propria pagină statică. */
export function CategoryFilter({ active }: { active?: CategoryId }) {
  return (
    <nav aria-label="Filtrează după categorie" className="filter">
      <ul className="filter__list">
        <li>
          <Link href="/catalog/" className="chip" aria-current={active ? undefined : "page"}>
            Toate <span className="chip__count">{products.length}</span>
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={`/catalog/${c.id}/`} className="chip" aria-current={active === c.id ? "page" : undefined}>
              {c.name} <span className="chip__count">{productsIn(c.id).length}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
