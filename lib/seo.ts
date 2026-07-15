import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export function buildMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = "/images/vivienda-modular-2.jpg"
): Metadata {
  const url = `${site.url}/${locale}${path}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${site.url}/${l}${path}`])
  );

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale,
      type: "website",
      images: [{ url: image, width: 1600, height: 1000, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
