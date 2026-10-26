import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Product } from "@/data/products";
import { getCategory } from "./catalog";

/**
 * Imaginea unui produs, aleasă la build (site-ul e static, deci nu se fac cereri care pot da 404):
 * 1. `image` din data/products.ts, dacă fișierul există;
 * 2. public/products/<slug>.webp, apoi public/products/<slug>.jpg;
 * 3. ilustrația SVG a categoriei.
 * Doar pe server (citește discul). Componentele client primesc rezultatul gata calculat.
 */

export const PHOTO_DIR = "products";
export const PHOTO_EXTENSIONS = ["webp", "jpg"] as const;

export interface ResolvedImage {
  src: string;
  isPhoto: boolean;
}

export type ProductWithImage = Product & { img: ResolvedImage };

const DEFAULT_PUBLIC = join(process.cwd(), "public");

export function resolveProductImage(product: Product, publicDir = DEFAULT_PUBLIC): ResolvedImage {
  const exists = (src: string) => existsSync(join(publicDir, src.replace(/^\//, "")));
  if (product.image && exists(product.image)) return { src: product.image, isPhoto: true };
  for (const ext of PHOTO_EXTENSIONS) {
    const src = `/${PHOTO_DIR}/${product.slug}.${ext}`;
    if (exists(src)) return { src, isPhoto: true };
  }
  return { src: getCategory(product.category).illustration, isPhoto: false };
}

export function withImage(product: Product, publicDir?: string): ProductWithImage {
  return { ...product, img: resolveProductImage(product, publicDir) };
}

export function withImages(list: Product[], publicDir?: string): ProductWithImage[] {
  return list.map((p) => withImage(p, publicDir));
}
