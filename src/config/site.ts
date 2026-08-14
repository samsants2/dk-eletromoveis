/**
 * Configuração central do site DK Eletromóveis.
 */
export const site = {
  name: "DK Eletromóveis",
  legalName: "DK Distribuidora de Móveis", // confirmar razão social
  tagline: "Móveis e eletromóveis de fábrica para o seu ponto de venda.",
  description:
    "Catálogo digital da DK Eletromóveis — móveis e eletromóveis novos, direto da fábrica, para lojistas. Navegue, filtre e fale com um vendedor pelo WhatsApp.",
  url: "https://www.dkeletromoveis.com.br", // domínio a definir
  email: "contato@dkeletromoveis.com.br",
  phoneDisplay: "(62) 98250-9798", // Walter (gerente)
  address: {
    street: "R. Monte Castelo, 462 — Jardim Planalto",
    city: "Goiânia",
    state: "GO",
    zip: "74333-200",
    // URL de incorporação (embed) do Google Maps.
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.236579214113!2d-49.30137642393081!3d-16.71504344630006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef72849039b85%3A0x52522ccfb6f94940!2sja%20distribuidora!5e0!3m2!1spt-BR!2sbr!4v1786717722900!5m2!1spt-BR!2sbr",
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

export const businessHours = "Seg. a Sex., 8h às 17h";
