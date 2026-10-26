import type { Metadata } from "next";
import { site } from "@/config/site";
import { CallButton } from "@/components/CallButton";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { PageHeader } from "@/components/PageHeader";
import { HoursList } from "@/components/StoreInfo";

export const metadata: Metadata = {
  title: "Contact",
  description: `Telefon, zonă și program — ${site.name}, ${site.city}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Contact" }]}
        title="Contact"
        intro={`${site.orderNote} Vă răspundem în timpul programului.`}
      />
      <div className="container contact">
        <div className="contact__info">
          <section className="info-card info-card--accent" aria-labelledby="c-tel">
            <span className="info-card__icon">
              <PhoneIcon />
            </span>
            <h2 id="c-tel" className="contact__title">
              Telefon
            </h2>
            <p className="info-card__phone">
              <a href={site.phone.href} className="contact__phone">
                {site.phone.display}
              </a>
            </p>
            <CallButton variant="light" size="lg" />
          </section>
          <section className="info-card" aria-labelledby="c-zona">
            <span className="info-card__icon">
              <PinIcon />
            </span>
            <h2 id="c-zona" className="contact__title">
              Zonă
            </h2>
            <p className="info-card__strong">{site.area}</p>
            <p className="muted">{site.areaNote}</p>
          </section>
          <section className="info-card" aria-labelledby="c-program">
            <span className="info-card__icon">
              <ClockIcon />
            </span>
            <h2 id="c-program" className="contact__title">
              Program
            </h2>
            <HoursList />
          </section>
        </div>
        <MapPlaceholder />
      </div>
    </>
  );
}
