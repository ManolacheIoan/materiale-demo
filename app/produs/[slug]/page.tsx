import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { CallButton } from "@/components/CallButton";
import { ClockIcon } from "@/components/icons";
import { PriceTag } from "@/components/PriceTag";
import { ProductGrid } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getCategory, getProduct, productImage, products, productsIn } from "@/lib/catalog";

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
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = productsIn(category.id).filter((p) => p.slug !== product.slug);
  const weekdays = site.hours[0];

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
              <Link href={`/catalog/${category.id}/`}>{category.name}</Link>
            </li>
            <li>
              <span aria-current="page">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="product__grid">
          <div className="product__media">
            <Image
              src={productImage(product)}
              alt={product.image ? product.name : `Ilustrație pentru categoria ${category.name}`}
              width={960}
              height={720}
              sizes="(min-width: 960px) 560px, 100vw"
              className="product-image"
              priority
            />
            {product.top && <span className="badge">Printre cele mai căutate</span>}
          </div>

          <div className="product__info">
            <p className="product__category">
              <Link href={`/catalog/${category.id}/`}>{category.name}</Link>
            </p>
            <h1 className="product__title">{product.name}</h1>
            <PriceTag product={product} size="lg" />
            <p className="product__vat">Preț final, TVA inclus.</p>

            <p className="product__description">{product.description}</p>

            <dl className="specs">
              <div>
                <dt>Unitate de vânzare</dt>
                <dd>{product.unit.replace(/(\d)\.(\d)/g, "$1,$2")}</dd>
              </div>
              <div>
                <dt>Ambalare</dt>
                <dd>{product.packaging}</dd>
              </div>
            </dl>

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
              title={`Tot din ${category.name.toLowerCase()}`}
              link={{ href: `/catalog/${category.id}/`, label: "Toată categoria" }}
            />
            <ProductGrid products={related.slice(0, 4)} />
          </div>
        </section>
      )}
    </>
  );
}
