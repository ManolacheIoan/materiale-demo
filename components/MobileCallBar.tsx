import { site } from "@/config/site";
import { PhoneIcon } from "./icons";

/** Bară fixă pe telefon: comanda se face doar telefonic, deci butonul rămâne la îndemână. */
export function MobileCallBar() {
  return (
    <div className="callbar">
      <a href={site.phone.href} className="callbar__link">
        <PhoneIcon />
        <span>Sună acum</span>
        <span className="callbar__number">{site.phone.display}</span>
      </a>
    </div>
  );
}
