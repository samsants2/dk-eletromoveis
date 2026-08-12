import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import {
  updateProduct,
  deleteProduct,
  type UpdateProductInput,
} from "@/lib/store";
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as UpdateProductInput | null;
  if (!body) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  // Validação leve apenas dos campos enviados.
  if (body.category && !CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: "Categoria inválida." }, { status: 400 });
  }
  if (body.line && !LINES.includes(body.line)) {
    return NextResponse.json({ error: "Linha inválida." }, { status: 400 });
  }
  if (body.name !== undefined && body.name.trim().length < 2) {
    return NextResponse.json({ error: "Nome muito curto." }, { status: 400 });
  }

  const updated = await updateProduct(params.id, body);
  if (!updated) {
    return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, product: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const ok = await deleteProduct(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
