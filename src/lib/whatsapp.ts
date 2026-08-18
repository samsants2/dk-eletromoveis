import type { Product, Seller } from "./types";

/** Monta um link wa.me com mensagem pré-preenchida (custo zero, sem API paga). */
export function whatsappLink(phone: string, message: string): string {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão para interesse em um produto específico. */
export function productMessage(product: Pick<Product, "name" | "code">): string {
  return `Olá! Tenho interesse no produto ${product.name} (cód. ${product.code}). Pode me passar mais informações e disponibilidade?`;
}

/** Mensagem genérica de contato. */
export function generalMessage(): string {
  return "Olá! Vim pelo site da DK Eletromóveis e gostaria de mais informações sobre os produtos.";
}

/** Link direto para falar com um vendedor sobre um produto. */
export function productWhatsappLink(product: Product, seller: Seller): string {
  return whatsappLink(seller.phone, productMessage(product));
}

/** Formata um número E.164 brasileiro (5562982509798) para exibição: (62) 98250-9798. */
export function formatBRPhone(phone: string): string {
  const d = phone.replace(/\D/g, "").replace(/^55/, "");
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length === 9) return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
  if (rest.length === 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return phone;
}
