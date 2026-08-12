import type { Product } from "@/lib/types";

/**
 * Catálogo de exemplo. Substituir por dados reais (ou pelo CMS) na Fase 1/2.
 * As fotos podem ser adicionadas em /public/produtos e referenciadas em `image`.
 */
export const products: Product[] = [
  {
    id: "guarda-roupa-serrano-6-portas",
    code: "MOV-1001",
    name: "Guarda-roupa Serrano 6 Portas",
    category: "moveis",
    line: "quarto",
    brand: "Bertolini",
    shortDescription: "Amplo guarda-roupa com 6 portas e 4 gavetas, acabamento amadeirado.",
    description:
      "Guarda-roupa espaçoso pensado para quartos de casal, com 6 portas, 4 gavetas internas e cabideiros amplos. Estrutura em MDP de alta resistência com pintura UV.",
    specs: [
      { label: "Dimensões (L×A×P)", value: "270 × 210 × 55 cm" },
      { label: "Material", value: "MDP 15 mm com pintura UV" },
      { label: "Portas", value: "6 (2 com espelho)" },
      { label: "Gavetas", value: "4" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: true,
    sellerId: "walter",
  },
  {
    id: "cama-box-casal-conforto",
    code: "MOV-1002",
    name: "Cama Box Casal Conforto Plus",
    category: "moveis",
    line: "quarto",
    brand: "Ortobom",
    shortDescription: "Conjunto box casal com colchão de molas ensacadas.",
    description:
      "Conjunto cama box casal com colchão de molas ensacadas e pillow top, oferecendo suporte firme e conforto. Base reforçada com tecido antiácaro.",
    specs: [
      { label: "Dimensões", value: "138 × 188 cm" },
      { label: "Altura total", value: "62 cm" },
      { label: "Tipo de molejo", value: "Molas ensacadas" },
      { label: "Densidade", value: "Pillow top D33" },
      { label: "Garantia", value: "36 meses" },
    ],
    available: true,
    featured: true,
    sellerId: "eduardo",
  },
  {
    id: "sofa-retratil-3-lugares",
    code: "MOV-1003",
    name: "Sofá Retrátil e Reclinável 3 Lugares",
    category: "moveis",
    line: "sala",
    brand: "EstofaBras",
    shortDescription: "Sofá retrátil e reclinável revestido em suede.",
    description:
      "Sofá de 3 lugares com assentos retráteis e encostos reclináveis, revestimento em suede de fácil limpeza e espuma de alta densidade. Ideal para salas de estar.",
    specs: [
      { label: "Dimensões", value: "210 × 100 × 90 cm" },
      { label: "Revestimento", value: "Suede antimanchas" },
      { label: "Assentos", value: "3 retráteis" },
      { label: "Espuma", value: "Alta densidade D28" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: true,
    sellerId: "walter",
  },
  {
    id: "mesa-jantar-6-cadeiras",
    code: "MOV-1004",
    name: "Mesa de Jantar 6 Cadeiras Áspen",
    category: "moveis",
    line: "cozinha",
    brand: "Móveis Real",
    shortDescription: "Mesa de jantar com tampo de vidro e 6 cadeiras estofadas.",
    description:
      "Conjunto de mesa de jantar com tampo de vidro temperado e 6 cadeiras estofadas. Estrutura em MDF com pés robustos, perfeita para cozinhas e salas de jantar.",
    specs: [
      { label: "Dimensões da mesa", value: "160 × 90 × 78 cm" },
      { label: "Tampo", value: "Vidro temperado 8 mm" },
      { label: "Cadeiras", value: "6 estofadas" },
      { label: "Material", value: "MDF revestido" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "eduardo",
  },
  {
    id: "geladeira-frost-free-375l",
    code: "ELE-2001",
    name: "Geladeira Frost Free 375L Inox",
    category: "eletromoveis",
    line: "cozinha",
    brand: "Electrolux",
    shortDescription: "Refrigerador duplex frost free, 375 litros, acabamento inox.",
    description:
      "Refrigerador duplex com tecnologia frost free, 375 litros de capacidade, controle de temperatura eletrônico e prateleiras reguláveis. Acabamento inox antimanchas.",
    specs: [
      { label: "Capacidade", value: "375 litros" },
      { label: "Tipo", value: "Duplex Frost Free" },
      { label: "Eficiência", value: "Selo Procel A" },
      { label: "Tensão", value: "127V / 220V" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: true,
    sellerId: "walter",
  },
  {
    id: "fogao-5-bocas-inox",
    code: "ELE-2002",
    name: "Fogão 5 Bocas Inox com Forno",
    category: "eletromoveis",
    line: "cozinha",
    brand: "Atlas",
    shortDescription: "Fogão de piso 5 bocas com forno autolimpante e acendimento automático.",
    description:
      "Fogão de piso com 5 bocas, mesa em inox, forno amplo autolimpante e acendimento automático. Grades individuais de ferro fundido.",
    specs: [
      { label: "Bocas", value: "5 (1 tripla chama)" },
      { label: "Forno", value: "Autolimpante, 66 litros" },
      { label: "Acendimento", value: "Automático" },
      { label: "Mesa", value: "Inox" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: false,
    featured: false,
    sellerId: "eduardo",
  },
  {
    id: "maquina-lavar-12kg",
    code: "ELE-2003",
    name: "Máquina de Lavar 12kg",
    category: "eletromoveis",
    line: "area-externa",
    brand: "Brastemp",
    shortDescription: "Lavadora automática 12kg com 12 programas de lavagem.",
    description:
      "Lavadora de roupas automática com 12kg de capacidade, 12 programas de lavagem, dispenser inteligente e ciclo econômico. Baixo consumo de água e energia.",
    specs: [
      { label: "Capacidade", value: "12 kg" },
      { label: "Programas", value: "12" },
      { label: "Eficiência", value: "Selo Procel A" },
      { label: "Tensão", value: "127V / 220V" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "walter",
  },
  {
    id: "escrivaninha-home-office",
    code: "MOV-1005",
    name: "Escrivaninha Home Office Compacta",
    category: "moveis",
    line: "escritorio",
    brand: "Móveis Real",
    shortDescription: "Escrivaninha compacta com gavetas e nicho para organização.",
    description:
      "Escrivaninha ideal para home office, com duas gavetas, nicho aberto e passagem de cabos. Estrutura em MDP resistente com acabamento amadeirado.",
    specs: [
      { label: "Dimensões", value: "120 × 75 × 50 cm" },
      { label: "Gavetas", value: "2" },
      { label: "Material", value: "MDP 15 mm" },
      { label: "Passagem de cabos", value: "Sim" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "eduardo",
  },
  {
    id: "rack-tv-onix-65",
    code: "MOV-1006",
    name: 'Rack para TV até 65" Onix',
    category: "moveis",
    line: "sala",
    brand: "Bertolini",
    shortDescription: "Rack amplo com painel para TV, LED e nichos para acessórios.",
    description:
      "Rack com painel integrado para TVs de até 65 polegadas, iluminação em LED, portas basculantes e nichos para aparelhos. Acabamento amadeirado com detalhes off-white.",
    specs: [
      { label: "Dimensões", value: "180 × 180 × 40 cm" },
      { label: "Suporta TV", value: 'Até 65"' },
      { label: "Iluminação", value: "LED integrado" },
      { label: "Material", value: "MDP 15 mm" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: true,
    sellerId: "walter",
  },
  {
    id: "poltrona-decorativa-giratoria",
    code: "MOV-1007",
    name: "Poltrona Decorativa Base Giratória",
    category: "moveis",
    line: "sala",
    brand: "EstofaBras",
    shortDescription: "Poltrona giratória revestida em veludo, base em aço.",
    description:
      "Poltrona decorativa com base giratória em aço cromado e revestimento em veludo. Assento ergonômico com espuma de alta densidade, ideal para salas e recepções.",
    specs: [
      { label: "Dimensões", value: "72 × 90 × 70 cm" },
      { label: "Revestimento", value: "Veludo" },
      { label: "Base", value: "Aço cromado giratória" },
      { label: "Capacidade", value: "120 kg" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "eduardo",
  },
  {
    id: "comoda-5-gavetas-amendoa",
    code: "MOV-1008",
    name: "Cômoda 5 Gavetas Amêndoa",
    category: "moveis",
    line: "quarto",
    brand: "Móveis Real",
    shortDescription: "Cômoda com 5 gavetas amplas e corrediças metálicas.",
    description:
      "Cômoda espaçosa com 5 gavetas de fácil deslize em corrediças metálicas, puxadores em metal e acabamento amadeirado amêndoa. Ideal para quartos de casal e solteiro.",
    specs: [
      { label: "Dimensões", value: "90 × 80 × 45 cm" },
      { label: "Gavetas", value: "5" },
      { label: "Corrediças", value: "Metálicas" },
      { label: "Material", value: "MDP 15 mm" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "walter",
  },
  {
    id: "cadeira-escritorio-presidente",
    code: "MOV-1009",
    name: "Cadeira de Escritório Presidente",
    category: "moveis",
    line: "escritorio",
    brand: "Móveis Real",
    shortDescription: "Cadeira presidente com apoio lombar e regulagem de altura.",
    description:
      "Cadeira de escritório modelo presidente, com encosto alto, apoio lombar, braços reguláveis e mecanismo relax. Revestimento em couro sintético e base com rodízios.",
    specs: [
      { label: "Altura do encosto", value: "Alta (presidente)" },
      { label: "Regulagens", value: "Altura, braços, relax" },
      { label: "Revestimento", value: "Couro sintético" },
      { label: "Capacidade", value: "130 kg" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "eduardo",
  },
  {
    id: "estante-livros-5-prateleiras",
    code: "MOV-1010",
    name: "Estante para Livros 5 Prateleiras",
    category: "moveis",
    line: "escritorio",
    brand: "Bertolini",
    shortDescription: "Estante alta com 5 prateleiras para livros e organização.",
    description:
      "Estante alta com 5 prateleiras reguláveis, estrutura reforçada em MDP e acabamento amadeirado. Ideal para escritórios, home office e ambientes comerciais.",
    specs: [
      { label: "Dimensões", value: "80 × 180 × 30 cm" },
      { label: "Prateleiras", value: "5 reguláveis" },
      { label: "Material", value: "MDP 15 mm" },
      { label: "Carga por prateleira", value: "Até 15 kg" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "walter",
  },
  {
    id: "conjunto-mesa-area-externa",
    code: "MOV-1011",
    name: "Conjunto Mesa + 4 Cadeiras Área Externa",
    category: "moveis",
    line: "area-externa",
    brand: "EstofaBras",
    shortDescription: "Conjunto em fibra sintética resistente para área externa.",
    description:
      "Conjunto de mesa com tampo de vidro e 4 cadeiras em fibra sintética tratada, resistente a sol e chuva. Estrutura em alumínio, perfeito para varandas e áreas de lazer.",
    specs: [
      { label: "Mesa", value: "90 × 90 cm, tampo de vidro" },
      { label: "Cadeiras", value: "4 em fibra sintética" },
      { label: "Estrutura", value: "Alumínio" },
      { label: "Uso", value: "Interno e externo" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "eduardo",
  },
  {
    id: "microondas-30l-espelhado",
    code: "ELE-2004",
    name: "Micro-ondas 30L Espelhado",
    category: "eletromoveis",
    line: "cozinha",
    brand: "Electrolux",
    shortDescription: "Micro-ondas 30 litros com painel espelhado e receitas prontas.",
    description:
      "Micro-ondas de 30 litros com acabamento espelhado, painel de fácil leitura, funções pré-programadas e trava de segurança. Prato giratório e desligamento automático.",
    specs: [
      { label: "Capacidade", value: "30 litros" },
      { label: "Potência", value: "1400 W" },
      { label: "Funções", value: "Receitas pré-programadas" },
      { label: "Tensão", value: "127V / 220V" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: false,
    sellerId: "walter",
  },
  {
    id: "freezer-horizontal-300l",
    code: "ELE-2005",
    name: "Freezer Horizontal 300L",
    category: "eletromoveis",
    line: "area-externa",
    brand: "Brastemp",
    shortDescription: "Freezer horizontal com dupla função e dreno de degelo.",
    description:
      "Freezer horizontal de 300 litros com dupla função (freezer ou refrigerador), dreno frontal para degelo, rodízios e cesto organizador. Ideal para estoque e comércios.",
    specs: [
      { label: "Capacidade", value: "300 litros" },
      { label: "Função", value: "Freezer / Refrigerador" },
      { label: "Eficiência", value: "Selo Procel A" },
      { label: "Tensão", value: "127V / 220V" },
      { label: "Garantia", value: "12 meses" },
    ],
    available: true,
    featured: true,
    sellerId: "eduardo",
  },
];

// -------- Consultas auxiliares --------

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
