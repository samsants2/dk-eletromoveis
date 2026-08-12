import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";
import { getProducts, getBrands } from "@/lib/store";

export const metadata: Metadata = {
  title: "Catálogo de Produtos",
  description:
    "Navegue o catálogo de móveis e eletromóveis da DK Eletromóveis. Filtre por categoria, linha e marca e fale com um vendedor pelo WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div className="container-dk py-12">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Catálogo</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Nossos produtos
        </h1>
        <p className="mt-3 text-muted">
          Móveis e eletromóveis novos, direto da fábrica. Use os filtros para
          encontrar o que procura e fale com um vendedor em dois toques.
        </p>
      </header>

      <Suspense fallback={<p className="text-muted">Carregando catálogo…</p>}>
        <CatalogView products={products} brands={brands} />
      </Suspense>
    </div>
  );
}
