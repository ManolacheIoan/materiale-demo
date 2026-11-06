import type { Metadata, Viewport } from "next";
import { site, STORE_NAME } from "@/config/site";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import "./globals.css";
import { withBase } from "@/lib/base-path";

export const metadata: Metadata = {
  title: { default: `${STORE_NAME} — ${site.tagline}`, template: `%s | ${STORE_NAME}` },
  description: `${STORE_NAME}: ciment, adezivi, vopsele, izolații, pelet, scule și tâmplărie în ${site.city}. ${site.orderNote}`,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: "#8B1E1E",
};

/** Self-hosted Source Sans 3 (OFL), split by character set. Declared here so the URLs include the deploy sub-path. */
const fontFace = (file: string, unicodeRange: string) =>
  `@font-face{font-family:"Source Sans 3";font-style:normal;font-display:swap;font-weight:200 900;` +
  `src:url("${withBase(`/fonts/${file}`)}") format("woff2-variations");unicode-range:${unicodeRange}}`;
const fontFaces =
  fontFace("source-sans-3-latin-ext-wght-normal.woff2", "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF") +
  fontFace("source-sans-3-latin-wght-normal.woff2", "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
        <link
          rel="preload"
          href={withBase("/fonts/source-sans-3-latin-wght-normal.woff2")}
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
