import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { CallButton } from "@/components/CallButton";
import { ClockIcon } from "@/components/icons";
import { PriceTag } from "@/components/PriceTag";
import { ProductGrid } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductImage } from "@/components/ProductImage";
import { formatPrice, formatUnit, getCategory, getProduct, products, productsIn } from "@/lib/catalog";
import { withImage, withImages } from "@/lib/images";
import { catalogHref } from "@/lib/search";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const found = getProduct((await params).slug);
  if (!found) notFound();
  const product = withImage(found);
  const category = getCategory(product.category);
  const related = withImages(productsIn(category.id)).filter((p) => p.slug !== product.slug);
  const weekdays = site.hours[0];
  const variants = product.variants ?? [];
  const specRows = [
    ...(product.specs ?? []),
    { label: "Unitate de vânzare", value: formatUnit(product.unit).replace(/^lei\//, "") },
    { label: "Ambalare", value: product.packaging },
  ];

  return (
    <>
      <div className="container product">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link href="/">Acasă</Link>
            </li>
            <li>
              <Link href="/catalog/">Catalog</Link>
            </li>
            <li>
              <Link href={catalogHref({ categorie: category.id })}>{category.name}</Link>
            </li>
            <li>
              <span aria-current="page">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="product__grid">
          <div className="product__media">
            <ProductImage
              product={product}
              eager
              width={960}
              height={720}
              sizes="(min-width: 1180px) 560px, (min-width: 960px) 48vw, 100vw"
              fallbackAlt={`Ilustrație pentru categoria ${category.name}`}
            />
            {product.top && <span className="badge">Printre cele mai căutate</span>}
          </div>

          <div className="product__info">
            <p className="product__category">
              <Link href={catalogHref({ categorie: category.id })}>{category.name}</Link>
            </p>
            <h1 className="product__title">{product.name}</h1>
            <PriceTag product={product} size="lg" />
            <p className="product__vat">Preț final, TVA inclus.</p>

            <p className="product__description">{product.description}</p>

            {variants.length > 1 && (
              <section className="variants" aria-labelledby="variante">
                <h2 id="variante" className="product__subheading">
                  Variante și prețuri
                </h2>
                <ul className="variants__list">
                  {variants.map((v) => {
                    const main = v.price === product.price && v.unit === product.unit;
                    return (
                      <li key={v.label} className={`variant${main ? " variant--main" : ""}`}>
                        <span className="variant__label">
                          {v.label}
                          {main && <span className="variant__tag">Preț afișat sus</span>}
                        </span>
                        <span className="variant__price">
                          <strong>{formatPrice(v.price)}</strong> {formatUnit(v.unit)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="variants__note">La telefon precizați varianta dorită.</p>
              </section>
            )}

            <section aria-labelledby="specificatii">
              <h2 id="specificatii" className="product__subheading">
                Specificații
              </h2>
              <table className="spec-table">
                <tbody>
                  {specRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <div className="order-box">
              <p className="order-box__title">Comandați la telefon</p>
              <p className="order-box__text">
                Spuneți-ne produsul și cantitatea; vă pregătim comanda.
              </p>
              <CallButton size="lg" showNumber className="order-box__btn" />
              <p className="order-box__hours">
                <ClockIcon size={18} /> {weekdays.days}, {weekdays.time}
              </p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section--band" aria-labelledby="similare">
          <div className="container">
            <SectionHeading
              id="similare"
              title="Produse similare"
              intro={`Tot din categoria ${category.name}.`}
              link={{ href: catalogHref({ categorie: category.id }), label: "Toată categoria" }}
            />
            <ProductGrid products={related.slice(0, 4)} />
          </div>
        </section>
      )}
    </>
  );
}
