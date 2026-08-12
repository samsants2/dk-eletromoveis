import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { addProduct, getProducts, type NewProductInput } from "@/lib/store";
import type { Category, ProductLine } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES: Category[] = ["moveis", "eletromoveis"];
const LINES: ProductLine[] = [
  "sala",
  "cozinha",
  "quarto",
  "escritorio",
  "area-externa",
];

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Partial<NewProductInput> | null;
  if (!body) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  // Validação mínima
  const errors: string[] = [];
  if (!body.name || body.name.trim().length < 2) errors.push("Informe o nome.");
  if (!body.category || !CATEGORIES.includes(body.category))
    errors.push("Categoria inválida.");
  if (!body.line || !LINES.includes(body.line)) errors.push("Linha inválida.");
  if (!body.brand || !body.brand.trim()) errors.push("Informe a marca.");
  if (!body.shortDescription || !body.shortDescription.trim())
    errors.push("Informe a descrição curta.");
  if (!body.sellerId) errors.push("Selecione o vendedor.");

  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const product = await addProduct({
    name: body.name!,
    category: body.category!,
    line: body.line!,
    brand: body.brand!,
    code: body.code,
    shortDescription: body.shortDescription!,
    description: body.description ?? "",
    specs: body.specs,
    available: body.available ?? true,
    featured: body.featured ?? false,
    sellerId: body.sellerId!,
    image: body.image,
  });

  return NextResponse.json({ ok: true, product }, { status: 201 });
}
