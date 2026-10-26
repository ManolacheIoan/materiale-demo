import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section">
      <p className="eyebrow">Eroare 404</p>
      <h1>Pagina nu a fost găsită</h1>
      <p className="muted">Este posibil ca produsul să fi fost mutat sau scos din catalog.</p>
      <Link href="/catalog/" className="btn btn--primary">
        Înapoi la catalog
      </Link>
    </div>
  );
}
