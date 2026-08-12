import Link from "next/link";
import type { Product } from "@/lib/types";
import { LINE_LABELS } from "@/lib/types";
import { ProductImage } from "./ProductImage";
import { WhatsAppButton } from "./WhatsAppButton";
import { productMessage } from "@/lib/whatsapp";
import { getSeller } from "@/data/sellers";

export function ProductCard({ product }: { product: Product }) {
  const seller = getSeller(product.sellerId);

  return (
    <article className="card group flex flex-col overflow-hidden shadow-e1 transition-shadow duration-200 hover:shadow-e3">
      <Link
        href={`/catalogo/${product.id}`}
        className="block"
        aria-label={`Ver ${product.name}`}
      >
        <ProductImage
          product={product}
          className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-surface-2 px-2 py-0.5 font-medium">
            {LINE_LABELS[product.line]}
          </span>
          <span>{product.brand}</span>
          {!product.available && (
            <span className="ml-auto rounded-full bg-sand/30 px-2 py-0.5 font-medium text-ink">
              Sob consulta
            </span>
          )}
        </div>

        <h3 className="text-balance text-base font-semibold leading-snug">
          <Link href={`/catalogo/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-muted">{product.shortDescription}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-xs text-muted">Cód. {product.code}</span>
          <WhatsAppButton
            sellerId={seller.id}
            message={productMessage(product)}
            label="Consultar"
            className="!px-4 !py-2 text-sm"
          />
        </div>
      </div>
    </article>
  );
}
