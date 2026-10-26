import { categories, products, type Category, type CategoryId, type Product } from "@/data/products";

const priceFormat = new Intl.NumberFormat("ro-RO", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

/** 1690 → „1.690,00”. */
export function formatPrice(value: number): string {
  // Grupăm manual miile, ca rezultatul să nu depindă de versiunea ICU (unele nu grupează 4 cifre).
  const [int, dec] = priceFormat.format(value).split(",");
  const grouped = int.replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${grouped},${dec}`;
}

/** „sac 40 kg” → „lei/sac 40 kg”; zecimalele din unitate apar cu virgulă. */
export function formatUnit(unit: Product["unit"]): string {
  return `lei/${unit.replace(/(\d)\.(\d)/g, "$1,$2")}`;
}

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) throw new Error(`Categorie necunoscută: ${id}`);
  return category;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsIn(id: CategoryId): Product[] {
  return products.filter((p) => p.category === id);
}

export function topProducts(): Product[] {
  return products.filter((p) => p.top);
}

/** Produsele de top primele, apoi restul, păstrând ordinea din fișier. */
export function productsTopFirst(): Product[] {
  return [...products.filter((p) => p.top), ...products.filter((p) => !p.top)];
}

/** Fotografia produsului dacă există, altfel ilustrația categoriei. */
export function productImage(product: Product): string {
  return product.image ?? getCategory(product.category).illustration;
}

export { categories, products };
