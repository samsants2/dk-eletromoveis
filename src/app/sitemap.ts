import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getProducts } from "@/lib/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/catalogo", "/sobre", "/contato"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = (await getProducts()).map((p) => ({
    url: `${site.url}/catalogo/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
