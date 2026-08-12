export type Category = "moveis" | "eletromoveis";

export type ProductLine =
  | "sala"
  | "cozinha"
  | "quarto"
  | "escritorio"
  | "area-externa";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  code: string; // código de referência
  name: string;
  category: Category;
  line: ProductLine;
  brand: string;
  shortDescription: string;
  description: string;
  specs: Spec[];
  available: boolean;
  featured: boolean;
  sellerId: string; // vendedor responsável pelo CTA
  /** Caminho da foto em /public/produtos. Se ausente, mostra placeholder. */
  image?: string;
}

export interface Seller {
  id: string;
  name: string;
  role: string;
  /** Número no formato internacional sem "+", ex.: 5562999999999 */
  phone: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  moveis: "Móveis",
  eletromoveis: "Eletromóveis",
};

export const LINE_LABELS: Record<ProductLine, string> = {
  sala: "Sala",
  cozinha: "Cozinha",
  quarto: "Quarto",
  escritorio: "Escritório",
  "area-externa": "Área externa",
};
