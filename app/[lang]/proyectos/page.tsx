import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import ProjectsGallery from "@/components/ProjectsGallery";
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
  return buildMetadata(lang, "/proyectos", dict.meta.proyectos.title, dict.meta.proyectos.description);
}

export default async function ProyectosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="bg-ink pb-20 pt-40 text-white md:pb-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{dict.projects.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
              {dict.projects.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">{dict.projects.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="shell">
          <ProjectsGallery filters={dict.projects.filters} items={dict.projects.items} />
        </div>
      </section>

      <CTASection cta={dict.cta} />
    </>
  );
}
