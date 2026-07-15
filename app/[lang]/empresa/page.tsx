import Image from "next/image";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import CtaButton from "@/components/CtaButton";
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
  return buildMetadata(lang, "/empresa", dict.meta.empresa.title, dict.meta.empresa.description, "/images/jesus-rabadan.jpg");
}

export default async function EmpresaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dict = getDictionary(locale);
  const about = dict.about;

  return (
    <>
      <section className="bg-ink pb-24 pt-40 text-white md:pb-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
              {about.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="shell grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink lg:sticky lg:top-28">
              <Image
                src="/images/jesus-rabadan.jpg"
                alt={about.quoteAuthor}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/70">{about.p1}</p>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">{about.p2}</p>
              <p className="mt-6 text-lg leading-relaxed text-ink/70">{about.p3}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-12 border-l-2 border-metal-red pl-6">
                <p className="text-xl font-medium italic leading-relaxed text-ink">“{about.quote}”</p>
                <cite className="mt-3 block text-xs font-semibold uppercase not-italic tracking-widest2 text-ink/50">
                  {about.quoteAuthor}
                </cite>
              </blockquote>
            </Reveal>

            <Reveal delay={0.15} className="mt-16">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                {about.timelineTitle}
              </h2>
              <ol className="mt-8 space-y-0">
                {about.timeline.map((item) => (
                  <li key={item.year} className="group relative grid gap-2 border-l border-ink/15 pb-10 pl-8 last:pb-0 md:grid-cols-[6rem_1fr] md:gap-6">
                    <span
                      className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-metal-red"
                      aria-hidden="true"
                    />
                    <span className="font-display text-lg font-bold text-metal-red">{item.year}</span>
                    <span>
                      <span className="block font-display text-base font-bold uppercase tracking-tight text-ink">
                        {item.place}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink/60">{item.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.2} className="mt-14">
              <CtaButton>{about.cta}</CtaButton>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection cta={dict.cta} />
    </>
  );
}
