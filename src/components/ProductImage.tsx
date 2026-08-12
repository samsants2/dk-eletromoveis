import Image from "next/image";
import type { Product } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

/**
 * Mostra a foto do produto quando existir em /public/produtos,
 * ou um placeholder elegante com a paleta da marca (para o MVP,
 * antes das fotos reais entrarem).
 */
export function ProductImage({
  product,
  className = "",
  sizes,
}: {
  product: Product;
  className?: string;
  sizes?: string;
}) {
  if (product.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          className="object-cover"
        />
      </div>
    );
  }

  // Placeholder determinístico: gradiente da paleta + iniciais.
  const seed = product.code.charCodeAt(product.code.length - 1);
  const palettes = [
    ["#D9B698", "#ABB369"],
    ["#ABB369", "#5B7A3A"],
    ["#5B7A3A", "#3E632F"],
    ["#3E632F", "#234A29"],
  ];
  const [from, to] = palettes[seed % palettes.length];
  const initials = product.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-label={product.name}
      role="img"
    >
      <span className="absolute left-3 top-3 rounded-full bg-black/20 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur">
        {CATEGORY_LABELS[product.category]}
      </span>
      <span className="select-none text-5xl font-black text-white/85 drop-shadow-sm">
        {initials}
      </span>
      <span className="absolute bottom-3 text-[11px] font-medium uppercase tracking-widest text-white/70">
        Foto em breve
      </span>
    </div>
  );
}
