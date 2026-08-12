import Link from "next/link";
import { ArrowRight, WhatsAppIcon } from "./icons";
import { WhatsAppButton } from "./WhatsAppButton";
import { generalMessage } from "@/lib/whatsapp";
import { defaultSeller } from "@/data/sellers";

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
      <div className="container-dk grid items-center gap-6 py-6 sm:py-8 md:grid-cols-2 md:gap-10 md:py-10">
        <div className="animate-fade-up">
          <span className="eyebrow">Distribuidora · Móveis &amp; Eletromóveis</span>
          <h1 className="mt-2.5 text-balance text-3xl font-extrabold leading-[1.06] tracking-tight sm:text-4xl lg:text-5xl">
            O catálogo da fábrica,{" "}
            <span className="text-primary">na palma da mão do lojista.</span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted">
            Seus clientes navegam o estoque, filtram por categoria e falam com o
            vendedor pelo WhatsApp — com a mensagem já pronta.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/catalogo" className="btn btn-primary">
              Ver catálogo
              <ArrowRight width={18} height={18} />
            </Link>
            <WhatsAppButton
              phone={defaultSeller.phone}
              message={generalMessage()}
              label="Falar com um vendedor"
              variant="outline"
            />
          </div>
        </div>

        {/* Painel visual — mock do fluxo (some no mobile p/ liberar o carrossel) */}
        <div className="hidden animate-fade-up [animation-delay:120ms] md:block">
          <div className="card relative mx-auto max-w-sm p-5 shadow-e3">
            <div className="flex items-center gap-3 border-b border-line/10 pb-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-ink">
                <WhatsAppIcon width={20} height={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Contato qualificado</p>
                <p className="text-xs text-muted">gerado pelo próprio cliente</p>
              </div>
            </div>
            <div className="mt-3 space-y-2.5">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-ink">
                Olá! Tenho interesse na <b>Geladeira Frost Free 375L</b> (cód.
                ELE-2001).
              </div>
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2 text-sm">
                Claro! Temos pronta entrega. Vou te enviar as condições. 🌿
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
