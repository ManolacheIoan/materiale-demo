"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/config/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href) || (href === "/catalog/" && pathname.startsWith("/produs/"));
}

export function NavLinks() {
  const pathname = usePathname() ?? "/";
  return (
    <ul className="nav__list">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="nav__link"
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            aria-label={item.short ? item.label : undefined}
          >
            {item.short ?? item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
