import { site } from "@/config/site";
import { PhoneIcon } from "./icons";

type Props = {
  variant?: "primary" | "light" | "outline";
  size?: "md" | "lg";
  showNumber?: boolean;
  className?: string;
};

/** Butonul „Sună acum” — singurul mod de a comanda. */
export function CallButton({ variant = "primary", size = "md", showNumber = false, className = "" }: Props) {
  return (
    <a
      href={site.phone.href}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      aria-label={`Sună acum la ${site.phone.display}`}
    >
      <PhoneIcon />
      <span>Sună acum</span>
      {showNumber && <span className="btn__number">{site.phone.display}</span>}
    </a>
  );
}
