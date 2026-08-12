import type { Seller } from "@/lib/types";

/**
 * Vendedores com CTA de WhatsApp.
 * ⚠️ Números fictícios — substituir pelos reais na Fase 0.
 * Formato: código do país (55) + DDD + número, apenas dígitos.
 */
export const sellers: Seller[] = [
  {
    id: "walter",
    name: "Walter",
    role: "Gerente comercial",
    phone: "5562900000001",
  },
  {
    id: "eduardo",
    name: "Eduardo",
    role: "Consultor de vendas",
    phone: "5562900000002",
  },
];

export const defaultSeller = sellers[0];

export function getSeller(id: string): Seller {
  return sellers.find((s) => s.id === id) ?? defaultSeller;
}
