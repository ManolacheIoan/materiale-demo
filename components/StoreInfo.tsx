import Link from "next/link";
import { site } from "@/config/site";
import { CallButton } from "./CallButton";
import { ClockIcon, PhoneIcon, PinIcon } from "./icons";

export function HoursList() {
  return (
    <dl className="hours">
      {site.hours.map((h) => (
        <div key={h.days}>
          <dt>{h.days}</dt>
          <dd>{h.time}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StoreInfo() {
  return (
    <div className="store-info">
      <div className="info-card reveal">
        <span className="info-card__icon">
          <PinIcon />
        </span>
        <h3>Unde ne găsiți</h3>
        <p className="info-card__strong">{site.area}</p>
        <p className="muted">{site.areaNote}</p>
        <Link href="/contact/" className="text-link">
          Vezi pagina de contact
        </Link>
      </div>
      <div className="info-card reveal">
        <span className="info-card__icon">
          <ClockIcon />
        </span>
        <h3>Program</h3>
        <HoursList />
      </div>
      <div className="info-card info-card--accent reveal">
        <span className="info-card__icon">
          <PhoneIcon />
        </span>
        <h3>Comenzi la telefon</h3>
        <p>Spuneți-ne ce vă trebuie și în ce cantitate; vă pregătim comanda.</p>
        <p className="info-card__phone">{site.phone.display}</p>
        <CallButton variant="light" />
      </div>
    </div>
  );
}
