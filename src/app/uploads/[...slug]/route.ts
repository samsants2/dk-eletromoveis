import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { UPLOADS_DIR } from "@/lib/paths";

export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

/**
 * Serve as imagens enviadas pela área administrativa a partir de <DATA_DIR>/uploads.
 * Público (imagens de produtos aparecem no site), mas protegido contra
 * path traversal — só entrega arquivos dentro de UPLOADS_DIR.
 */
export async function GET(
  _request: Request,
  { params }: { params: { slug: string[] } },
) {
  const rel = (params.slug ?? []).join("/");
  const target = path.normalize(path.join(UPLOADS_DIR, rel));

  const root = path.normalize(UPLOADS_DIR + path.sep);
  if (!target.startsWith(root)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(target).toLowerCase();
  const type = TYPES[ext];
  if (!type) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(target);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
