import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "../data/products";
import { resolveProductImage } from "../lib/images";
import { imageSize } from "../lib/imageSize";

const product = products.find((p) => p.slug === "pelet-lemn-sac-15kg")!;

function publicDir(files: string[]) {
  const dir = mkdtempSync(join(tmpdir(), "md-public-"));
  mkdirSync(join(dir, "products"));
  for (const f of files) writeFileSync(join(dir, f), "");
  return dir;
}

describe("resolveProductImage", () => {
  it("folosește ilustrația categoriei când lipsește fotografia", () => {
    expect(resolveProductImage(product, publicDir([]))).toEqual({
      src: "/images/categorii/pelet-si-combustibil.svg",
      isPhoto: false,
    });
  });

  it("preferă .webp, apoi .jpg", () => {
    const both = publicDir([`products/${product.slug}.jpg`, `products/${product.slug}.webp`]);
    expect(resolveProductImage(product, both).src).toBe(`/products/${product.slug}.webp`);
    const jpg = publicDir([`products/${product.slug}.jpg`]);
    expect(resolveProductImage(product, jpg)).toEqual({ src: `/products/${product.slug}.jpg`, isPhoto: true });
  });

  it("câmpul image are prioritate doar dacă fișierul există", () => {
    const custom = { ...product, image: "/products/alt-nume.jpg" };
    expect(resolveProductImage(custom, publicDir(["products/alt-nume.jpg"])).src).toBe("/products/alt-nume.jpg");
    expect(resolveProductImage(custom, publicDir([])).isPhoto).toBe(false);
  });
});

describe("imageSize", () => {
  it("citește un antet JPEG", () => {
    const jpg = Uint8Array.from([
      0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, ...new Array(14).fill(0),
      0xff, 0xc0, 0x00, 0x11, 0x08, 0x03, 0x84, 0x04, 0xb0, 0x03, ...new Array(9).fill(0),
    ]);
    expect(imageSize(jpg)).toEqual({ width: 1200, height: 900, type: "jpg" });
  });

  it("citește un antet WebP (VP8X)", () => {
    const enc = (s: string) => [...s].map((c) => c.charCodeAt(0));
    const u24 = (n: number) => [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff];
    const webp = Uint8Array.from([
      ...enc("RIFF"), 0, 0, 0, 0, ...enc("WEBP"), ...enc("VP8X"), 10, 0, 0, 0, 0, 0, 0, 0,
      ...u24(1199), ...u24(899),
    ]);
    expect(imageSize(webp)).toEqual({ width: 1200, height: 900, type: "webp" });
  });

  it("întoarce null pentru alte formate", () => {
    expect(imageSize(Uint8Array.from([0x89, 0x50, 0x4e, 0x47]))).toBeNull();
  });
});
