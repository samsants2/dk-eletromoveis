import type { Seller } from "@/lib/types";

/**
 * Vendedores com CTA de WhatsApp.
 * Formato do telefone: código do país (55) + DDD + número, apenas dígitos.
 */
export const sellers: Seller[] = [
  {
    id: "walter",
    name: "Walter",
    role: "Consultor de vendas",
    phone: "5562982509798",
  },
  {
    id: "eduardo",
    name: "Eduardo",
    role: "Consultor de vendas",
    phone: "5562982507675",
  },
];

export const defaultSeller = sellers[0];

export function getSeller(id: string): Seller {
  return sellers.find((s) => s.id === id) ?? defaultSeller;
}
