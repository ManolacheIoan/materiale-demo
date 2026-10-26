import { site } from "@/config/site";
import { CallButton } from "./CallButton";

/** Bandă de final de pagină: îndemn la apel, cu programul. */
export function CtaBand({ title, text }: { title: string; text: string }) {
  const weekdays = site.hours[0];
  return (
    <section className="cta-band reveal" aria-label="Comandă telefonică">
      <div className="cta-band__text">
        <p className="cta-band__title">{title}</p>
        <p className="cta-band__body">{text}</p>
      </div>
      <div className="cta-band__action">
        <CallButton variant="light" size="lg" showNumber />
        <p className="cta-band__hours">
          {weekdays.days}, {weekdays.time}
        </p>
      </div>
    </section>
  );
}
