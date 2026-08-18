import Link from "next/link";
import { site, businessHours } from "@/config/site";
import { sellers } from "@/data/sellers";
import { formatBRPhone } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { MapPinIcon, PhoneIcon, MailIcon } from "./icons";

export function Footer() {
  const mapSrc = site.address.mapsEmbedUrl;

  return (
    <footer className="mt-24 border-t border-line/10 bg-surface-2/60">
      <div className="container-dk grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1.4fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="font-display text-lg font-extrabold">
              DK <span className="text-primary">Eletromóveis</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Navegação</h4>
          <ul className="flex flex-col gap-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Contato &amp; Localização</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted">
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
            <li className="flex items-center gap-2.5">
              <MailIcon width={18} height={18} className="shrink-0 text-secondary" />
              <span>{site.email}</span>
            </li>
            <li className="text-xs">{businessHours}</li>
          </ul>

          <div className="mt-4 overflow-hidden rounded-lg border border-line/15">
            <iframe
              title="Mapa da localização"
              src={mapSrc}
              className="h-40 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-line/10">
        <div className="container-dk flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.
          </span>
          <span>Site vitrine · dados de exemplo (a confirmar na Fase 0).</span>
        </div>
      </div>
    </footer>
  );
}
