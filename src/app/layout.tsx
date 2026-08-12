import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Móveis e Eletromóveis`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "móveis",
    "eletromóveis",
    "distribuidora de móveis",
    "catálogo de móveis",
    "atacado de móveis",
    site.name,
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} — Móveis e Eletromóveis`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3E632F",
  width: "device-width",
  initialScale: 1,
};

// Evita "flash" de tema errado: aplica a preferência antes da hidratação.
const themeScript = `
(function(){
  try{
    var s = localStorage.getItem('dk-theme');
    var d = s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(d) document.documentElement.classList.add('dark');
  }catch(e){}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
