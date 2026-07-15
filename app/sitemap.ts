import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/empresa", "/soluciones", "/proyectos", "/faq", "/contacto"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const solution of solutions) {
      entries.push({
        url: `${site.url}/${locale}/soluciones/${solution.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return entries;
}
