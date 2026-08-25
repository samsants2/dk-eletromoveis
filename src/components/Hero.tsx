import Link from "next/link";
import { ArrowRight } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Camada decorativa com a paleta da marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 85% 0%, rgb(171 179 105 / 0.20), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgb(62 99 47 / 0.12), transparent 60%)",
        }}
      />
      <div className="container-dk py-16 sm:py-20 md:py-28">
        <div className="max-w-3xl animate-fade-up">
          <span className="eyebrow">Distribuidora · Móveis &amp; Eletromóveis</span>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            O catálogo da fábrica,{" "}
            <span className="text-primary">na palma da mão do lojista.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            Seus clientes navegam o estoque, filtram por categoria e falam com o
            vendedor pelo WhatsApp — com a mensagem já pronta.
          </p>
          <div className="mt-9">
            <Link href="/catalogo" className="btn btn-primary px-9 py-4 text-lg">
              Ver catálogo
              <ArrowRight width={22} height={22} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
