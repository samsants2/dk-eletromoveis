"use client";

import { useState } from "react";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

/**
 * Galeria de imagens da página do produto: foto principal grande + miniaturas
 * clicáveis. Sem imagens, mostra o placeholder da marca.
 */
export function ProductGallery({
  images,
  name,
  category,
  code,
}: {
  images: string[];
  name: string;
  category: Category;
  code: string;
}) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    const seed = code.charCodeAt(code.length - 1);
    const palettes = [
      ["#D9B698", "#ABB369"],
      ["#ABB369", "#5B7A3A"],
      ["#5B7A3A", "#3E632F"],
      ["#3E632F", "#234A29"],
    ];
    const [from, to] = palettes[seed % palettes.length];
    return (
      <div
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl shadow-e2"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        role="img"
        aria-label={name}
      >
        <span className="absolute left-4 top-4 rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="text-sm font-medium uppercase tracking-widest text-white/80">
          Foto em breve
        </span>
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-2 shadow-e2">
        <Image
          src={current}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === active}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border transition ${
                i === active
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-line/20 opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
