"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, Category, ProductLine } from "@/lib/types";
import { CATEGORY_LABELS, LINE_LABELS } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { SearchIcon } from "./icons";

const CATEGORIES: Category[] = ["moveis", "eletromoveis"];
const LINES: ProductLine[] = ["sala", "cozinha", "quarto", "escritorio", "area-externa"];

export function CatalogView({
  products,
  brands,
}: {
  products: Product[];
  brands: string[];
}) {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const catParam = params.get("cat");
  const initialCategory: Category | "all" =
    catParam === "moveis" || catParam === "eletromoveis" ? catParam : "all";

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<Category | "all">(initialCategory);
  const [line, setLine] = useState<ProductLine | "all">("all");
  const [brand, setBrand] = useState<string>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (line !== "all" && p.line !== line) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (onlyAvailable && !p.available) return false;
      if (q) {
        const haystack = `${p.name} ${p.code} ${p.brand} ${p.shortDescription}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [products, query, category, line, brand, onlyAvailable]);

  function reset() {
    setQuery("");
    setCategory("all");
    setLine("all");
    setBrand("all");
    setOnlyAvailable(false);
  }

  const hasFilters =
    query || category !== "all" || line !== "all" || brand !== "all" || onlyAvailable;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Painel de filtros */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-5">
          <div className="flex items-center rounded-full border border-line/20 px-3">
            <SearchIcon width={18} height={18} className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Nome ou código…"
              className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted"
              aria-label="Buscar no catálogo"
            />
          </div>

          <FilterGroup label="Categoria">
            <Chip active={category === "all"} onClick={() => setCategory("all")}>
              Todas
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {CATEGORY_LABELS[c]}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Linha">
            <Chip active={line === "all"} onClick={() => setLine("all")}>
              Todas
            </Chip>
            {LINES.map((l) => (
              <Chip key={l} active={line === l} onClick={() => setLine(l)}>
                {LINE_LABELS[l]}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Marca">
            <Chip active={brand === "all"} onClick={() => setBrand("all")}>
              Todas
            </Chip>
            {brands.map((b) => (
              <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>
                {b}
              </Chip>
            ))}
          </FilterGroup>

          <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="h-4 w-4 rounded accent-[color:rgb(var(--primary))]"
            />
            Somente disponíveis
          </label>

          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="mt-5 w-full rounded-full border border-line/25 py-2 text-sm font-medium hover:bg-surface-2"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </aside>

      {/* Resultados */}
      <div>
        <p className="mb-4 text-sm text-muted" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* 3 produtos por fileira (2 no tablet, 1 no celular) */}
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="card grid place-items-center gap-3 p-12 text-center">
            <p className="text-lg font-semibold">Nenhum produto encontrado</p>
            <p className="max-w-sm text-sm text-muted">
              Tente ajustar a busca ou limpar os filtros. Se não achar o que procura,
              fale com um vendedor pelo WhatsApp.
            </p>
            <button type="button" onClick={reset} className="btn btn-outline mt-2">
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <h3 className="eyebrow mb-2.5">{label}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="chip" data-active={active} onClick={onClick}>
      {children}
    </button>
  );
}
