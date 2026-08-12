import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-dk grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-6xl font-black text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
        <p className="mx-auto mt-2 max-w-md text-muted">
          O endereço que você tentou acessar não existe ou foi movido. Volte ao
          início ou explore o catálogo.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn btn-outline">
            Início
          </Link>
          <Link href="/catalogo" className="btn btn-primary">
            Ver catálogo
            <ArrowRight width={18} height={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
