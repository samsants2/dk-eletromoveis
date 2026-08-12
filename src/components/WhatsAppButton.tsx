import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";
import { getSeller } from "@/data/sellers";

/**
 * Botão/CTA de WhatsApp. Renderiza um link wa.me com a mensagem pré-preenchida.
 * É um Server Component simples (apenas um <a>), sem custo de JS no cliente.
 */
export function WhatsAppButton({
  phone,
  sellerId,
  message,
  label = "Falar no WhatsApp",
  showSeller = false,
  variant = "primary",
  className = "",
}: {
  phone?: string;
  sellerId?: string;
  message: string;
  label?: string;
  showSeller?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const seller = sellerId ? getSeller(sellerId) : undefined;
  const targetPhone = phone ?? seller?.phone ?? "";
  const cls = variant === "primary" ? "btn btn-primary" : "btn btn-outline";

  return (
    <a
      href={whatsappLink(targetPhone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} ${className}`}
    >
      <WhatsAppIcon width={18} height={18} />
      <span>
        {label}
        {showSeller && seller ? ` · ${seller.name}` : ""}
      </span>
    </a>
  );
}
