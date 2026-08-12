import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthed } from "@/lib/auth";
import { UPLOADS_DIR, UPLOAD_FOLDERS, type UploadFolder } from "@/lib/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase() || ".jpg";
  const base =
    path
      .basename(original, path.extname(original))
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50) || "arquivo";
  const stamp = Date.now().toString(36);
  return `${base}-${stamp}${ext}`;
}

export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Envio inválido." }, { status: 400 });
  }

  const file = form.get("file");
  const folderKey = String(form.get("folder") ?? "produtos");
  const folder: UploadFolder = UPLOAD_FOLDERS.includes(folderKey as UploadFolder)
    ? (folderKey as UploadFolder)
    : "produtos";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Formato não suportado. Use JPG, PNG, WEBP, AVIF ou GIF." },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Arquivo acima de 8 MB." }, { status: 413 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const filename = safeName(file.name);
  const dir = path.join(UPLOADS_DIR, folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), bytes);

  // Servido pela rota /uploads/[...] (funciona local e com volume persistente).
  const publicPath = `/uploads/${folder}/${filename}`;
  return NextResponse.json({ ok: true, path: publicPath });
}
