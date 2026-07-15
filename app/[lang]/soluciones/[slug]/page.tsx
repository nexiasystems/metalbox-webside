import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CtaButton from "@/components/CtaButton";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getSolution, solutions } from "@/lib/solutions";
import { buildMetadata } from "@/lib/seo";
import { route } from "@/lib/routes";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((lang) => solutions.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const solution = getSolution(slug);
  if (!solution) return {};
  const dict = getDictionary(lang);
  const copy = dict.solutions[solution.slug];
  return buildMetadata(
    lang,
    `/soluciones/${slug}`,
    `${copy.name} | Metalbox`,
    copy.description,
    solution.image
  );
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const dict = getDictionary(locale);
  const copy = dict.solutions[solution.slug];
  const sp = dict.solutionPage;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.nav.home, item: `${site.url}${route(locale)}` },
      { "@type": "ListItem", position: 2, name: dict.nav.solutions, item: `${site.url}${route(locale, "/soluciones")}` },
      { "@type": "ListItem", position: 3, name: copy.name, item: `${site.url}${route(locale, `/soluciones/${slug}`)}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink">
        <Image
          src={solution.image}
          alt={copy.name}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" aria-hidden="true" />
        <div className="shell relative z-10 pb-20 pt-44">
          <Reveal>
            <nav aria-label="breadcrumb" className="mb-5 text-xs uppercase tracking-widest2 text-white/50">
              <Link href={route(locale, "/soluciones")} className="hover:text-white">
                {sp.backToSolutions}
              </Link>
              <span className="mx-2 text-metal-red">/</span>
              <span className="text-white/80">{copy.name}</span>
            </nav>
            <h1 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
              {copy.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">{copy.tagline}</p>
            <div className="mt-9">
              <CtaButton projectType={solution.projectType}>{dict.nav.quote}</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="block h-0.5 w-12 bg-metal-red" aria-hidden="true" />
            <p className="mt-7 text-xl leading-relaxed text-ink/70">{copy.description}</p>
            <h2 className="eyebrow mt-12">{sp.useCases}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {copy.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="border border-ink/10 bg-mist px-5 py-4 text-sm font-medium leading-relaxed text-ink"
                >
                  {useCase}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <h2 className="eyebrow">{sp.advantages}</h2>
              <ul className="mt-6 space-y-4">
                {copy.advantages.map((advantage) => (
                  <li key={advantage} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-metal-red" aria-hidden="true" />
                    {advantage}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="eyebrow">{sp.benefits}</h2>
              <ul className="mt-6 space-y-4">
                {copy.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <h2 className="eyebrow">{sp.gallery}</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {solution.video && (
              <Reveal className="md:col-span-3">
                <video
                  className="aspect-video w-full bg-ink object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  poster={solution.image}
                  aria-label={copy.name}
                >
                  <source src={solution.video} type="video/mp4" />
                </video>
              </Reveal>
            )}
            {solution.gallery.map((image, i) => (
              <Reveal key={image + i} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                <div className={`relative overflow-hidden bg-ink ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-auto md:h-full"}`}>
                  <Image
                    src={image}
                    alt={`${copy.name} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="block h-0.5 w-12 bg-metal-red" aria-hidden="true" />
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
              {sp.ctaTitle}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">{sp.ctaText}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-white p-6 md:p-10">
              <QuoteForm
                form={dict.form}
                privacyHref={route(locale, "/politica-privacidad")}
                defaultProjectType={solution.projectType}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
