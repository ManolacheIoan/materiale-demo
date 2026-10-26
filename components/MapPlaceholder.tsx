import { site } from "@/config/site";

/** Hartă schematică desenată local (fără scripturi sau imagini externe). */
export function MapPlaceholder() {
  return (
    <figure className="map">
      <svg viewBox="0 0 600 420" role="img" aria-labelledby="map-title map-desc" className="map__svg">
        <title id="map-title">{`Hartă schematică ${site.city}`}</title>
        <desc id="map-desc">{`Schiță a zonei: ${site.area}. Adresa exactă se comunică la telefon.`}</desc>
        <rect width="600" height="420" fill="#F6F3EF" />
        <g fill="#ECE4D9">
          <rect x="40" y="40" width="120" height="80" rx="6" />
          <rect x="190" y="40" width="150" height="80" rx="6" />
          <rect x="370" y="40" width="190" height="80" rx="6" />
          <rect x="40" y="150" width="120" height="110" rx="6" />
          <rect x="370" y="150" width="190" height="110" rx="6" />
          <rect x="40" y="290" width="300" height="40" rx="6" />
        </g>
        <rect x="190" y="150" width="150" height="110" rx="6" fill="#E3EADB" />
        <path d="M0 365c90-22 170 18 270 4s200-36 330-10v61H0z" fill="#C9D3F0" />
        <path d="M0 382c100-18 180 14 280 2s190-28 320-6" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".7" />
        <g stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round">
          <path d="M20 135h560" />
          <path d="M175 20v320" />
          <path d="M355 20v320" />
        </g>
        <path d="M20 275h560" stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round" />
        <path d="M20 275h560" stroke="#E2D8CC" strokeWidth="2" strokeDasharray="10 10" />
        <text x="470" y="268" textAnchor="middle" fontSize="13" fontWeight="700" fill="#55504A" fontFamily="inherit">
          Calea Prutului
        </text>
        <text x="300" y="404" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1F3FA3" fontFamily="inherit">
          Dunărea
        </text>
        <g transform="translate(265 160)">
          <circle cx="0" cy="62" r="26" fill="#8B1E1E" opacity=".15" />
          <path d="M0 62c-6-14-26-26-26-44a26 26 0 0 1 52 0c0 18-20 30-26 44z" fill="#8B1E1E" />
          <circle cx="0" cy="18" r="9" fill="#FFFFFF" />
        </g>
      </svg>
      <figcaption className="map__caption">
        Schiță a zonei, nu la scară. Pentru adresa exactă, sunați-ne.
      </figcaption>
    </figure>
  );
}
