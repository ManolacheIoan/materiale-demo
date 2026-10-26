import Link from "next/link";

type Crumb = { href?: string; label: string };

export function PageHeader({ crumbs, title, intro }: { crumbs: Crumb[]; title: string; intro?: string }) {
  return (
    <div className="page-header">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            {crumbs.map((c, i) => (
              <li key={i}>
                {c.href ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        {intro && <p className="page-header__intro">{intro}</p>}
      </div>
    </div>
  );
}
