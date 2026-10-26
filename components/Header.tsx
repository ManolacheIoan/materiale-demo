import Link from "next/link";
import { site, STORE_NAME } from "@/config/site";
import { CallButton } from "./CallButton";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Header() {
  const weekdays = site.hours[0];
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          <span>{site.orderNote}</span>
          <span className="topbar__hours">
            {weekdays.days}: {weekdays.time}
          </span>
        </div>
      </div>
      <div className="container site-header__main">
        <Link href="/" className="site-header__brand" aria-label={`${STORE_NAME} — pagina principală`}>
          <Logo />
        </Link>
        <nav className="nav" aria-label="Navigare principală">
          <NavLinks />
        </nav>
        <CallButton className="site-header__call" />
      </div>
    </header>
  );
}
