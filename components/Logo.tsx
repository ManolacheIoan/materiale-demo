import { STORE_NAME } from "@/config/site";

/** Semn original: acoperiș în două ape peste doi stâlpi. Fără legătură cu vreo marcă reală. */
export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="8" fill="#8B1E1E" />
      <path d="M8 18.5 20 9l12 9.5" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="11" y="21" width="18" height="3" rx="1" fill="#FFFFFF" />
      <rect x="12.5" y="24" width="4" height="9" fill="#FFFFFF" />
      <rect x="23.5" y="24" width="4" height="9" fill="#FFFFFF" />
      <rect x="10" y="32" width="20" height="2.4" rx="1" fill="#C9D3F0" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [first, ...rest] = STORE_NAME.split(" ");
  return (
    <span className={`logo logo--${tone}`}>
      <LogoMark />
      <span className="logo__text">
        <span className="logo__first">{first}</span>
        {rest.length > 0 && <span className="logo__rest"> {rest.join(" ")}</span>}
      </span>
    </span>
  );
}
