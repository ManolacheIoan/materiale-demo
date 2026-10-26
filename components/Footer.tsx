import Link from "next/link";
import { site, STORE_NAME } from "@/config/site";
import { categories } from "@/data/products";
import { Logo } from "./Logo";
import { navItems } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Logo tone="dark" />
          <p className="site-footer__lead">
            {site.tagline}. {site.orderNote} Prețurile afișate includ TVA.
          </p>
        </div>
        <div>
          <h2 className="site-footer__title">Contact</h2>
          <p>
            <a href={site.phone.href} className="site-footer__phone">
              {site.phone.display}
            </a>
          </p>
          <p>{site.area}</p>
        </div>
        <div>
          <h2 className="site-footer__title">Program</h2>
          <dl className="hours hours--dark">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="site-footer__title">Categorii</h2>
          <ul className="site-footer__links">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/catalog/${c.id}/`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>
          © {new Date().getFullYear()} {STORE_NAME}
        </span>
        <ul className="site-footer__nav">
          {navItems.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
