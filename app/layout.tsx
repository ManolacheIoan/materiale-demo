import type { Metadata, Viewport } from "next";
import { site, STORE_NAME } from "@/config/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${STORE_NAME} — ${site.tagline}`, template: `%s | ${STORE_NAME}` },
  description: `${STORE_NAME}: ciment, adezivi, vopsele, izolații, pelet, scule și tâmplărie în ${site.city}. ${site.orderNote}`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#8B1E1E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <link
          rel="preload"
          href="/fonts/source-sans-3-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body>
        <a href="#continut" className="skip-link">
          Sari la conținut
        </a>
        <Header />
        <main id="continut" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
