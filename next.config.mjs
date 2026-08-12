/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Gera um servidor Node mínimo em .next/standalone para deploy em container
  // (Render, Railway, VPS). Ver Dockerfile e README (seção Deploy).
  output: "standalone",
  images: {
    // Coloque as fotos reais em /public/produtos e referencie por caminho local.
    // Se optar por um CDN de imagens no futuro, libere o domínio aqui:
    remotePatterns: [
      // { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
