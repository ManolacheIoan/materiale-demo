"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useId, useState } from "react";
import { categories, type CategoryId } from "@/data/products";
import type { ProductWithImage } from "@/lib/images";
import { buildQuery, catalogHref, filterProducts, parseQuery, type CatalogQuery } from "@/lib/search";
import { CallButton } from "./CallButton";
import { ProductGrid } from "./ProductCard";

/*
 * Starea căutării se scrie în adresă (?q=&categorie=), deci se poate copia, trimite și păstra la reîncărcare.
 * Starea locală dă răspuns imediat la tastare; adresa se citește din nou doar când e schimbată din afară
 * (link din meniu, butonul Înapoi).
 */
function writeUrl(query: CatalogQuery) {
  window.history.replaceState(null, "", `${window.location.pathname}${buildQuery(query)}`);
}

const EMPTY: CatalogQuery = { q: "", categorie: null };

function countLabel(n: number) {
  if (n === 0) return "Niciun produs găsit";
  if (n === 1) return "1 produs găsit";
  return n < 20 ? `${n} produse găsite` : `${n} de produse găsite`;
}

type Props = { products: ProductWithImage[] };

/** HTML-ul static conține catalogul complet; după încărcare se aplică parametrii din adresă. */
export function CatalogBrowser({ products }: Props) {
  return (
    <Suspense fallback={<CatalogView products={products} query={EMPTY} onChange={() => {}} />}>
      <CatalogFromUrl products={products} />
    </Suspense>
  );
}

function CatalogFromUrl({ products }: Props) {
  const url = useSearchParams().toString();
  const [query, setQuery] = useState(() => parseQuery(url));
  const [lastUrl, setLastUrl] = useState(url);

  if (url !== lastUrl) {
    setLastUrl(url);
    const fromUrl = parseQuery(url);
    if (buildQuery(fromUrl) !== buildQuery(query)) setQuery(fromUrl);
  }

  const onChange = (next: CatalogQuery) => {
    setQuery(next);
    writeUrl(next);
  };
  return <CatalogView products={products} query={query} onChange={onChange} />;
}

type ViewProps = Props & { query: CatalogQuery; onChange: (query: CatalogQuery) => void };

function CatalogView({ products, query, onChange: setQuery }: ViewProps) {
  const inputId = useId();
  const hintId = useId();

  const byQuery = filterProducts(products, { q: query.q, categorie: null });
  const results = filterProducts(byQuery, { q: "", categorie: query.categorie });
  const filtered = query.q.trim() !== "" || query.categorie !== null;
  const activeCategory = categories.find((c) => c.id === query.categorie);

  const selectCategory = (categorie: CategoryId | null) => (e: React.MouseEvent) => {
    e.preventDefault();
    setQuery({ ...query, categorie });
  };

  let summary = countLabel(results.length);
  if (query.q.trim()) summary += ` pentru „${query.q.trim()}”`;
  if (activeCategory) summary += ` în ${activeCategory.name}`;

  return (
    <>
      <form role="search" className="search" action="/catalog/" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={inputId} className="search__label">
          Caută în catalog
        </label>
        <div className="search__field">
          <svg className="search__icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id={inputId}
            name="q"
            type="search"
            className="search__input"
            placeholder="ex.: pelet, vopsea, adeziv"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby={hintId}
            value={query.q}
            onChange={(e) => setQuery({ ...query, q: e.target.value })}
          />
          {query.q && (
            <button type="button" className="search__clear" onClick={() => setQuery({ ...query, q: "" })}>
              <span aria-hidden="true">×</span>
              <span className="visually-hidden">Șterge căutarea</span>
            </button>
          )}
        </div>
        <p id={hintId} className="search__hint">
          Caută după numele sau descrierea produsului. Diacriticele nu contează.
        </p>
      </form>

      <nav aria-label="Filtrează după categorie" className="filter">
        <ul className="filter__list">
          <li>
            <Link
              href={catalogHref({ q: query.q })}
              className="chip"
              aria-current={query.categorie ? undefined : "true"}
              onClick={selectCategory(null)}
            >
              Toate <span className="chip__count">{byQuery.length}</span>
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={catalogHref({ q: query.q, categorie: c.id })}
                className="chip"
                aria-current={query.categorie === c.id ? "true" : undefined}
                onClick={selectCategory(c.id)}
              >
                {c.name}{" "}
                <span className="chip__count">{byQuery.filter((p) => p.category === c.id).length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="results-bar">
        <p className="results-bar__count" role="status" aria-live="polite" aria-atomic="true">
          {summary}
        </p>
        {filtered && (
          <button type="button" className="text-link results-bar__reset" onClick={() => setQuery({ q: "", categorie: null })}>
            Șterge filtrele
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <h2 className="empty__title">Nu am găsit produse pentru căutarea dumneavoastră</h2>
          <p className="muted">
            Încercați alt cuvânt sau altă categorie. Ori sunați-ne: vă spunem ce produs se potrivește lucrării.
          </p>
          <div className="empty__actions">
            <CallButton showNumber />
            <button type="button" className="btn btn--outline" onClick={() => setQuery({ q: "", categorie: null })}>
              Vezi tot catalogul
            </button>
          </div>
        </div>
      ) : filtered ? (
        <>
          <h2 className="visually-hidden">Rezultate</h2>
          <ProductGrid products={results} eagerCount={2} />
        </>
      ) : (
        categories.map((c, i) => (
          <section key={c.id} className="catalog__group" aria-labelledby={`cat-${c.id}`}>
            <h2 id={`cat-${c.id}`} className="catalog__heading">
              {c.name}
            </h2>
            <ProductGrid products={results.filter((p) => p.category === c.id)} eagerCount={i === 0 ? 2 : 0} />
          </section>
        ))
      )}
    </>
  );
}
