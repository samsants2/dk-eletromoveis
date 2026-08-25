import type { Metadata } from "next";
import { site, businessHours } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalMessage, formatBRPhone } from "@/lib/whatsapp";
import { sellers } from "@/data/sellers";
import { MapPinIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contato e Localização",
  description:
    "Fale com a DK Eletromóveis pelo WhatsApp, e-mail ou telefone. Veja o endereço e o mapa da distribuidora.",
};

export default function ContatoPage() {
  const mapSrc = site.address.mapsEmbedUrl;

  return (
    <div className="container-dk py-12">
      <header className="max-w-2xl">
        <span className="eyebrow">Contato</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Vamos conversar
        </h1>
        <p className="mt-3 text-muted">
          Prefere ir direto ao ponto? Fale com um vendedor pelo WhatsApp. Ou
          deixe sua mensagem no formulário que retornamos.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Coluna de informações */}
        <div className="flex flex-col gap-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold">Fale com nossos vendedores</h2>
            <div className="mt-4 flex flex-col gap-3">
              {sellers.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line/12 p-3"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted">{s.role}</p>
                  </div>
                  <WhatsAppButton
                    sellerId={s.id}
                    message={generalMessage()}
                    label="WhatsApp"
                    className="!px-4 !py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <ul className="card flex flex-col gap-3 p-6 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <MapPinIcon width={18} height={18} className="mt-0.5 shrink-0 text-secondary" />
              <span>
                {site.address.street}
                <br />
                {site.address.city} — {site.address.state}, {site.address.zip}
              </span>
            </li>
            {sellers.map((s) => (
              <li key={s.id} className="flex items-center gap-2.5">
                <PhoneIcon width={18} height={18} className="shrink-0 text-secondary" />
                <span>
                  {s.name}: {formatBRPhone(s.phone)}
                </span>
              </li>
            ))}
            <li className="pt-1 text-xs">{businessHours}</li>
          </ul>

          <div className="card overflow-hidden">
            <iframe
              title="Mapa da localização da DK Eletromóveis"
              src={mapSrc}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Formulário */}
        <ContactForm />
      </div>
    </div>
  );
}
