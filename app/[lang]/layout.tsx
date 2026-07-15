import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "@/app/globals.css";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";
import FloatingWidgets from "@/components/FloatingWidgets";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteModalProvider from "@/components/QuoteModalProvider";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { route } from "@/lib/routes";
import { site } from "@/lib/site";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    ...buildMetadata(lang, "", dict.meta.home.title, dict.meta.home.description),
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo-metalbox.png`,
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.country,
    },
    sameAs: [],
  };

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <QuoteModalProvider form={dict.form} privacyHref={route(locale, "/politica-privacidad")}>
          <Header locale={locale} nav={dict.nav} />
          <main id="main">{children}</main>
          <Footer locale={locale} dict={dict} />
          <FloatingWidgets labels={dict.widgets} />
          <CookieBanner labels={dict.cookies} policyHref={route(locale, "/politica-cookies")} />
          <Analytics />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
