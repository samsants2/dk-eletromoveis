import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { CheckIcon, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre a Empresa",
  description:
    "Conheça a DK Eletromóveis — distribuidora de móveis e eletromóveis novos de fábrica para lojistas.",
};

export default function SobrePage() {
  return (
    <div className="container-dk py-12">
      <header className="max-w-2xl">
        <span className="eyebrow">Sobre a empresa</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Distribuindo móveis e eletromóveis com quem revende
        </h1>
        <p className="mt-4 text-lg text-muted">
          A {site.name} nasceu para abastecer lojistas pequenos e médios com
          móveis e eletromóveis novos, adquiridos direto de fábrica. Nosso foco é
          entregar variedade, preço de distribuidora e um atendimento ágil.
        </p>
      </header>

      {/* Placeholder da foto do galpão */}
      <div
        className="mt-10 grid aspect-[21/9] w-full place-items-center rounded-2xl text-[#F3F2EA]/80 shadow-e2"
        style={{ background: "linear-gradient(135deg, #5B7A3A, #234A29)" }}
      >
        <span className="text-sm font-medium uppercase tracking-widest">
          Foto do galpão / estoque (a inserir)
        </span>
      </div>

      {/* Missão, Visão, Valores */}
      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          [
            "Missão",
            "Facilitar o abastecimento de lojistas com móveis e eletromóveis de qualidade, com agilidade e preço justo.",
          ],
          [
            "Visão",
            "Ser a distribuidora de referência para o pequeno e médio lojista da região, reconhecida pela variedade e pelo atendimento.",
          ],
          [
            "Valores",
            "Transparência, compromisso com o prazo, relacionamento próximo e respeito ao cliente revendedor.",
          ],
        ].map(([title, desc]) => (
          <div key={title} className="card p-6 shadow-e1">
            <h2 className="text-lg font-bold text-primary">{title}</h2>
            <p className="mt-2 text-sm text-muted">{desc}</p>
          </div>
        ))}
      </section>

      {/* Diferenciais */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Por que trabalhar com a gente</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Produtos novos, direto de fábrica",
            "Variedade de móveis e eletromóveis",
            "Condições especiais para revendedores",
            "Atendimento rápido pelo WhatsApp",
            "Catálogo sempre atualizado",
            "Foco no lojista pequeno e médio",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary">
                <CheckIcon width={18} height={18} />
              </span>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14">
        <Link href="/catalogo" className="btn btn-primary">
          Ver o catálogo
          <ArrowRight width={18} height={18} />
        </Link>
      </div>
    </div>
  );
}
