import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@/lib/store";
import { getSeller, sellers } from "@/data/sellers";
import { CATEGORY_LABELS, LINE_LABELS } from "@/lib/types";
import { ProductGallery } from "@/components/ProductGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ProductCard } from "@/components/ProductCard";
import { productMessage } from "@/lib/whatsapp";
import { ArrowRight, CheckIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const seller = getSeller(product.sellerId);
  const related = (await getProducts())
    .filter((p) => p.id !== product.id && p.line === product.line)
    .slice(0, 3);

  return (
    <div className="container-dk py-8">
      {/* Trilha de navegação */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted" aria-label="Trilha">
        <Link href="/" className="hover:text-primary">
          Início
        </Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-primary">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-content">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images ?? []}
          name={product.name}
          category={product.category}
          code={product.code}
        />

        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full bg-primary/12 px-2.5 py-1 font-medium text-primary">
              {CATEGORY_LABELS[product.category]}
            </span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium">
              {LINE_LABELS[product.line]}
            </span>
            <span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium">
              {product.brand}
            </span>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-muted">Cód. {product.code}</p>

          <p className="mt-5 text-muted">{product.description}</p>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium ${
                product.available
                  ? "bg-secondary/15 text-secondary"
                  : "bg-sand/30 text-ink"
              }`}
            >
              <CheckIcon width={16} height={16} />
              {product.available ? "Disponível em estoque" : "Sob consulta"}
            </span>
          </div>

          {/* Especificações */}
          <div className="mt-7 overflow-hidden rounded-xl border border-line/12">
            <table className="w-full text-sm">
              <caption className="sr-only">Especificações técnicas</caption>
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i % 2 === 0 ? "bg-surface" : "bg-surface-2/60"}
                  >
                    <th
                      scope="row"
                      className="w-1/2 px-4 py-2.5 text-left font-medium text-muted"
                    >
                      {spec.label}
                    </th>
                    <td className="px-4 py-2.5">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-8 card p-5">
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton
                sellerId={seller.id}
                message={productMessage(product)}
                label={`Falar com ${seller.name}`}
              />
              {sellers
                .filter((s) => s.id !== seller.id)
                .map((s) => (
                  <WhatsAppButton
                    key={s.id}
                    sellerId={s.id}
                    message={productMessage(product)}
                    label={`Falar com ${s.name}`}
                    variant="primary"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Produtos da mesma linha</h2>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver tudo <ArrowRight width={16} height={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
