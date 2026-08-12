import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthed } from "@/lib/auth";
import { UPLOADS_DIR } from "@/lib/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMG = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Lista as mídias enviadas (em <DATA_DIR>/uploads/midia). */
export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const dir = path.join(UPLOADS_DIR, "midia");
  try {
    const entries = await fs.readdir(dir);
    const files = entries
      .filter((f) => IMG.test(f))
      .map((f) => `/uploads/midia/${f}`)
      .sort()
      .reverse();
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
