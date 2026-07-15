import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import Hero from "@/components/Hero";
import ProcessSection from "@/components/ProcessSection";
import ProjectsGallery from "@/components/ProjectsGallery";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServicesGrid from "@/components/ServicesGrid";
import TrustSection from "@/components/TrustSection";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { route } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata(lang, "", dict.meta.home.title, dict.meta.home.description);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero hero={dict.hero} projectsHref={route(locale, "/proyectos")} />

      <TrustSection trust={dict.trust} />

      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading eyebrow={dict.services.eyebrow} title={dict.services.title} intro={dict.services.intro} />
          <div className="mt-14">
            <ServicesGrid locale={locale} dict={dict} limit={6} cardLabel={dict.services.card} />
          </div>
          <Reveal className="mt-12">
            <Link href={route(locale, "/soluciones")} className="btn-dark">
              {dict.services.viewAll}
            </Link>
          </Reveal>
        </div>
      </section>

      <ProcessSection process={dict.process} />

      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading eyebrow={dict.projects.eyebrow} title={dict.projects.title} intro={dict.projects.intro} />
          <div className="mt-14">
            <ProjectsGallery filters={dict.projects.filters} items={dict.projects.items} />
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Image
                src="/images/jesus-rabadan.jpg"
                alt={dict.about.quoteAuthor}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{dict.about.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ink md:text-4xl">
              {dict.about.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/60">{dict.about.p1}</p>
            <blockquote className="mt-8 border-l-2 border-metal-red pl-6">
              <p className="text-lg font-medium italic leading-relaxed text-ink">“{dict.about.quote}”</p>
              <cite className="mt-3 block text-xs font-semibold uppercase not-italic tracking-widest2 text-ink/50">
                {dict.about.quoteAuthor}
              </cite>
            </blockquote>
            <Link href={route(locale, "/empresa")} className="btn-dark mt-10">
              {dict.nav.company}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.faq.title} />
          <div className="mt-14 max-w-4xl">
            <FAQAccordion items={dict.faq.items.slice(0, 5)} />
          </div>
          <Reveal className="mt-10">
            <Link href={route(locale, "/faq")} className="btn-dark">
              {dict.nav.faq} →
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection cta={dict.cta} />
    </>
  );
}
