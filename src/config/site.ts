/**
 * Configuração central do site DK Eletromóveis.
 * Ajuste estes valores na Fase 0 (dados a confirmar com o cliente).
 */
export const site = {
  name: "DK Eletromóveis",
  legalName: "DK Distribuidora de Móveis", // confirmar razão social
  tagline: "Móveis e eletromóveis de fábrica para o seu ponto de venda.",
  description:
    "Catálogo digital da DK Eletromóveis — móveis e eletromóveis novos, direto da fábrica, para lojistas. Navegue, filtre e fale com um vendedor pelo WhatsApp.",
  url: "https://www.dkeletromoveis.com.br", // domínio a definir
  email: "contato@dkeletromoveis.com.br",
  phoneDisplay: "(62) 90000-0000", // a confirmar
  address: {
    street: "Av. Exemplo, 1000 — Setor Industrial",
    city: "Goiânia",
    state: "GO",
    zip: "74000-000",
    // Substitua pela query real do endereço para o mapa embutido:
    mapsQuery: "DK Distribuidora de Móveis, Goiânia - GO",
  },
  social: {
    instagram: "", // sem redes sociais no momento (briefing)
  },
  nav: [
    { label: "Início", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
} as const;

export const businessHours = "Seg. a Sex., 8h às 18h · Sáb., 8h às 12h";
