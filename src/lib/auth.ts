import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Portão de acesso simples da área administrativa.
 *
 * ⚠️ Segurança: é uma proteção básica por senha compartilhada, adequada para
 * desenvolvimento e um primeiro ambiente interno. Para produção, troque por
 * autenticação real (NextAuth/Auth.js ou o login do CMS headless) com usuários,
 * senhas com hash e, idealmente, 2FA. Defina ADMIN_PASSWORD e ADMIN_SECRET em
 * variáveis de ambiente (veja .env.example).
 */
const PASSWORD = process.env.ADMIN_PASSWORD || "dkadmin";
const SECRET = process.env.ADMIN_SECRET || "troque-este-segredo-em-producao";

export const COOKIE = "dk_admin";

function token(): string {
  return crypto.createHash("sha256").update(`${PASSWORD}|${SECRET}`).digest("hex");
}

export function checkPassword(password: string): boolean {
  return typeof password === "string" && password === PASSWORD;
}

export function sessionValue(): string {
  return token();
}

export function isAuthed(): boolean {
  return cookies().get(COOKIE)?.value === token();
}
