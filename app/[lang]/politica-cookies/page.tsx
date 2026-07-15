import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    ...buildMetadata(lang, "/politica-cookies", `${dict.legalPages.cookies.title} | Metalbox`, dict.legalPages.cookies.body[0]),
    robots: { index: false },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dict = getDictionary(locale);
  return <LegalPage title={dict.legalPages.cookies.title} body={dict.legalPages.cookies.body} />;
}
