import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkPassword, sessionValue, COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = (body as { password?: string }).password ?? "";

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  cookies().set(COOKIE, sessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });

  return NextResponse.json({ ok: true });
}
