import Image from "next/image";
import Link from "next/link";
import { categories, productsIn } from "@/lib/catalog";
import { catalogHref } from "@/lib/search";
import { withBase } from "@/lib/base-path";

export function CategoryStrip() {
  return (
    <ul className="category-strip">
      {categories.map((c) => (
        <li key={c.id}>
          <Link href={catalogHref({ categorie: c.id })} className="category-tile">
            <Image src={withBase(c.illustration)} alt="" width={480} height={360} sizes="160px" className="category-tile__img" />
            <span className="category-tile__name">{c.name}</span>
            <span className="category-tile__count">{productsIn(c.id).length} produse</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
