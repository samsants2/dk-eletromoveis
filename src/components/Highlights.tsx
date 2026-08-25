"use client";

import { useRef } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ArrowRight } from "./icons";

/** Carrossel de destaques (scroll-snap nativo, sem dependências). */
export function Highlights({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="pb-8 pt-1 sm:pt-2">
      <div className="container-dk">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Destaques</span>
            <h2 className="mt-1.5 text-xl font-bold sm:text-2xl">Lançamentos e promoções</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line/25 hover:bg-surface-2"
              aria-label="Anterior"
            >
              <ArrowRight width={18} height={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line/25 hover:bg-surface-2"
              aria-label="Próximo"
            >
              <ArrowRight width={18} height={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="w-[280px] shrink-0 snap-start sm:w-[320px]"
            >
              <ProductCard product={p} showCta={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
