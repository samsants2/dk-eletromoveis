import { promises as fs } from "fs";
import path from "path";
import type { Category, Product, ProductLine, Spec } from "./types";
import { products as seed } from "@/data/products";
import { PRODUCTS_FILE } from "./paths";

/**
 * Camada de dados do site (server-only).
 * Persiste os produtos em <DATA_DIR>/content/products.json — assim a área
 * administrativa consegue cadastrar novos itens que aparecem no catálogo.
 *
 * Observação: usa o sistema de arquivos, o que funciona em `npm run dev` e em
 * um servidor Node (`npm start`, Render/Railway, VPS). Em hospedagem serverless
 * (Vercel) o disco é somente-leitura — nesse caso migre para um CMS + banco.
 */
const FILE = PRODUCTS_FILE;

// Auto-seed dos produtos de exemplo: permitido apenas em desenvolvimento
// (ou se SEED_PRODUCTS=true for definido explicitamente). Em produção, um
// armazenamento vazio NÃO é preenchido com exemplos — evita que dados reais
// sejam mascarados/sobrescritos por engano.
const SEED_ALLOWED =
  process.env.NODE_ENV !== "production" || process.env.SEED_PRODUCTS === "true";

// Normaliza registros antigos que usavam `image` (string) para `images` (array).
function normalize(p: Product & { image?: string }): Product {
  if (!p.images && p.image) return { ...p, images: [p.image] };
  return p;
}

// Lê o arquivo de produtos.
//   - Sucesso → lista de produtos
//   - ENOENT (arquivo não existe) → null
//   - Qualquer outro erro (permissão, JSON inválido, disco) → LANÇA,
//     para nunca arriscar sobrescrever dados que existem no disco.
async function readFileOrNull(): Promise<Product[] | null> {
  let raw: string;
  try {
    raw = await fs.readFile(FILE, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
  return (JSON.parse(raw) as (Product & { image?: string })[]).map(normalize);
}

async function writeStore(list: Product[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf8");
}

// Leitura para EXIBIÇÃO: tolerante e nunca sobrescreve dados existentes.
// Só cria o arquivo (com o seed) quando ele realmente não existe.
async function readForDisplay(): Promise<Product[]> {
  try {
    const data = await readFileOrNull();
    if (data !== null) return data;
    // Arquivo não existe.
    if (!SEED_ALLOWED) return []; // produção: catálogo vazio, sem escrever nada
    try {
      await writeStore(seed); // dev: cria o arquivo com os exemplos
    } catch {
      /* somente-leitura: segue com o seed em memória */
    }
    return seed;
  } catch {
    // Erro real de leitura: mostra o seed em memória SEM tocar no arquivo,
    // preservando os produtos já salvos no disco.
    return SEED_ALLOWED ? seed : [];
  }
}

// Leitura para GRAVAÇÃO: estrita. Se o arquivo existe mas não pode ser lido,
// LANÇA — é melhor abortar a operação do que sobrescrever os produtos salvos.
async function readForMutation(): Promise<Product[]> {
  const data = await readFileOrNull();
  if (data !== null) return data;
  return SEED_ALLOWED ? [...seed] : []; // produção parte de lista vazia
}

export async function getProducts(): Promise<Product[]> {
  return readForDisplay();
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return (await readForDisplay()).find((p) => p.id === id);
}

export async function getFeatured(): Promise<Product[]> {
  return (await readForDisplay()).filter((p) => p.featured);
}

export async function getBrands(): Promise<string[]> {
  return Array.from(new Set((await readForDisplay()).map((p) => p.brand))).sort();
}

export interface NewProductInput {
  name: string;
  category: Category;
  line: ProductLine;
  brand: string;
  code?: string;
  shortDescription: string;
  description: string;
  specs?: Spec[];
  available: boolean;
  featured: boolean;
  sellerId: string;
  images?: string[];
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export async function addProduct(input: NewProductInput): Promise<Product> {
  const list = await readForMutation();

  let id = slugify(input.name) || `produto-${Date.now()}`;
  if (list.some((p) => p.id === id)) id = `${id}-${Date.now().toString(36)}`;

  const code =
    input.code?.trim() ||
    `DK-${Math.floor(1000 + Math.random() * 9000)}`;

  const product: Product = {
    id,
    code,
    name: input.name.trim(),
    category: input.category,
    line: input.line,
    brand: input.brand.trim(),
    shortDescription: input.shortDescription.trim(),
    description: input.description.trim(),
    specs: (input.specs ?? []).filter((s) => s.label && s.value),
    available: input.available,
    featured: input.featured,
    sellerId: input.sellerId,
    images: (input.images ?? []).filter(Boolean),
  };

  list.unshift(product);
  await writeStore(list);
  return product;
}

export type UpdateProductInput = Partial<NewProductInput>;

export async function updateProduct(
  id: string,
  patch: UpdateProductInput,
): Promise<Product | null> {
  const list = await readForMutation();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = list[idx];
  const updated: Product = {
    ...current,
    name: patch.name?.trim() || current.name,
    code: patch.code?.trim() || current.code,
    category: patch.category ?? current.category,
    line: patch.line ?? current.line,
    brand: patch.brand?.trim() || current.brand,
    shortDescription: patch.shortDescription?.trim() || current.shortDescription,
    description: patch.description?.trim() ?? current.description,
    specs: patch.specs
      ? patch.specs.filter((s) => s.label && s.value)
      : current.specs,
    available: patch.available ?? current.available,
    featured: patch.featured ?? current.featured,
    sellerId: patch.sellerId ?? current.sellerId,
    // images: se a chave vier, substitui a galeria inteira.
    images:
      patch.images !== undefined ? patch.images.filter(Boolean) : current.images,
  };

  list[idx] = updated;
  await writeStore(list);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const list = await readForMutation();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  await writeStore(next);
  return true;
}
