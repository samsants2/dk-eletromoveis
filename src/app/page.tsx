import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { getFeatured } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/types";
import { ArrowRight, CheckIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeatured();

  return (
    <>
      <Hero />

      <Highlights products={featured} />

      {/* Atalhos de categoria */}
      <section className="py-8">
        <div className="container-dk grid gap-4 sm:grid-cols-2">
          {(["moveis", "eletromoveis"] as const).map((cat) => (
            <Link
              key={cat}
              href={`/catalogo?cat=${cat}`}
              className="card group flex items-center justify-between gap-4 p-7 shadow-e1 transition-shadow hover:shadow-e3"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {cat === "eletromoveis" ? "Eletro" : CATEGORY_LABELS[cat]}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {cat === "moveis"
                    ? "Salas, quartos, cozinhas e escritório."
                    : "Geladeiras, fogões, lavadoras e mais."}
                </p>
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/12 text-primary transition-transform group-hover:translate-x-1">
                <ArrowRight width={20} height={20} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Por que a DK — resolve o gargalo */}
      <section className="py-14">
        <div className="container-dk">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">Por que comprar com a DK</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Da fábrica ao seu ponto de venda, sem intermediários
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "Estoque sempre à mão",
                "O catálogo mostra o que temos disponível. O cliente escolhe e já fala com o vendedor.",
              ],
              [
                "Preço de distribuidora",
                "Móveis e eletromóveis novos, adquiridos direto de fábrica, para lojistas pequenos e médios.",
              ],
              [
                "Atendimento por WhatsApp",
                "Contato rápido com mensagem pronta, sem depender de dezenas de fotos avulsas.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="card p-6 shadow-e1">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary/15 text-secondary">
                  <CheckIcon width={20} height={20} />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faixa CTA final */}
      <section className="py-8">
        <div className="container-dk">
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-14 text-center"
            style={{
              background: "linear-gradient(135deg, #3E632F, #234A29)",
            }}
          >
            <h2 className="text-balance text-2xl font-extrabold text-[#F3F2EA] sm:text-3xl">
              Pronto para ver o catálogo completo?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[#F3F2EA]/80">
              Explore móveis e eletromóveis com filtros por categoria, linha e marca.
            </p>
            <Link
              href="/catalogo"
              className="btn mt-7 bg-[#ABB369] text-ink hover:brightness-105"
            >
              Explorar catálogo
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
