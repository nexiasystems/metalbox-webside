import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
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
  return buildMetadata(lang, "/faq", dict.meta.faq.title, dict.meta.faq.description);
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dict = getDictionary(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-ink pb-20 pt-40 text-white md:pb-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{dict.faq.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
              {dict.faq.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="shell max-w-4xl">
          <FAQAccordion items={dict.faq.items} />
        </div>
      </section>

      <CTASection cta={dict.cta} />
    </>
  );
}
