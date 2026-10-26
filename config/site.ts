/**
 * Datele magazinului — singurul loc unde se schimbă numele, telefonul, zona și programul.
 * Toate datele de aici sunt fictive.
 */

/** Numele magazinului. Schimbați aici pentru a redenumi tot site-ul. */
export const STORE_NAME = "Materiale Demo";

export const site = {
  name: STORE_NAME,
  tagline: "Materiale de construcții în Galați",
  city: "Galați",
  /** Zona generală; adresa exactă se comunică la telefon. */
  area: "Zona Calea Prutului, Galați",
  areaNote: "Adresa exactă și indicațiile de acces vi le dăm la telefon.",
  phone: {
    /** Cum se afișează pe site. */
    display: "0236 000 123",
    /** Format internațional pentru linkul tel:. */
    href: "tel:+40236000123",
  },
  hours: [
    { days: "Luni – Vineri", time: "08:00 – 18:00" },
    { days: "Sâmbătă", time: "08:00 – 14:00" },
    { days: "Duminică", time: "Închis" },
  ],
  orderNote: "Comenzile se fac doar telefonic.",
} as const;
