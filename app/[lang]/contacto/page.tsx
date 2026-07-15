import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo";
import { route } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return buildMetadata(lang, "/contacto", dict.meta.contacto.title, dict.meta.contacto.description);
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "es") as Locale;
  const dict = getDictionary(locale);
  const contact = dict.contact;

  return (
    <>
      <section className="bg-ink pb-20 pt-40 text-white md:pb-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
              {contact.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">{contact.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="shell grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <dl className="space-y-8">
                <div>
                  <dt className="eyebrow">{contact.phoneLabel}</dt>
                  <dd className="mt-2">
                    <a href={`tel:${site.phone}`} className="font-display text-2xl font-bold text-ink hover:text-metal-red">
                      {site.phoneDisplay}
                    </a>
                    <span className="mt-1 block text-sm text-ink/50">{contact.person}</span>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">{contact.emailLabel}</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${site.email}`} className="text-lg font-medium text-ink underline decoration-metal-red underline-offset-4 hover:text-metal-red">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">{contact.addressLabel}</dt>
                  <dd className="mt-2 text-lg text-ink/70">{site.city}, España</dd>
                </div>
                <div>
                  <dt className="eyebrow">{contact.scheduleLabel}</dt>
                  <dd className="mt-2 text-lg text-ink/70">{contact.schedule}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={`tel:${site.phone}`} className="btn-dark !px-6 !py-3.5">{contact.call}</a>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark !px-6 !py-3.5"
                >
                  {contact.whatsapp}
                </a>
                <a href={`mailto:${site.email}`} className="btn-dark !px-6 !py-3.5">{contact.sendEmail}</a>
              </div>

              <div className="mt-12 aspect-[4/3] w-full overflow-hidden border border-ink/10">
                <iframe
                  src={site.mapsEmbed}
                  title={`${site.shortName} — ${site.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="border border-ink/10 bg-mist p-6 md:p-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
                {dict.form.title}
              </h2>
              <p className="mt-2 text-sm text-ink/60">{dict.form.subtitle}</p>
              <div className="mt-8">
                <QuoteForm form={dict.form} privacyHref={route(locale, "/politica-privacidad")} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
