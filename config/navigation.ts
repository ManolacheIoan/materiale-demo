/** Meniul principal. `short` (opțional) este eticheta din antet, unde spațiul e limitat. */
export const navItems: { href: string; label: string; short?: string }[] = [
  { href: "/", label: "Acasă" },
  { href: "/catalog/", label: "Catalog" },
  { href: "/cele-mai-cautate/", label: "Cele mai căutate" },
  { href: "/servicii/", label: "Servicii" },
  { href: "/despre-noi/", label: "Despre noi" },
  { href: "/intrebari-frecvente/", label: "Întrebări frecvente", short: "Întrebări" },
  { href: "/contact/", label: "Contact" },
];
