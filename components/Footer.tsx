import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { solutions } from "@/lib/solutions";
import { route } from "@/lib/routes";
import { site } from "@/lib/site";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const featured = solutions.slice(0, 6);

  return (
    <footer className="bg-ink text-white/70">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-white p-1">
              <Image src="/images/logo-metalbox.png" alt="Metalbox Prefabricados Modulares" width={44} height={44} />
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-wider text-white">Metalbox</span>
          </span>
          <p className="mt-5 text-sm leading-relaxed">{dict.footer.description}</p>
        </div>

        <div>
          <h3 className="eyebrow">{dict.footer.quickLinks}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link className="hover:text-white" href={route(locale)}>{dict.nav.home}</Link></li>
            <li><Link className="hover:text-white" href={route(locale, "/empresa")}>{dict.nav.company}</Link></li>
            <li><Link className="hover:text-white" href={route(locale, "/soluciones")}>{dict.nav.solutions}</Link></li>
            <li><Link className="hover:text-white" href={route(locale, "/proyectos")}>{dict.nav.projects}</Link></li>
            <li><Link className="hover:text-white" href={route(locale, "/faq")}>{dict.nav.faq}</Link></li>
            <li><Link className="hover:text-white" href={route(locale, "/contacto")}>{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{dict.footer.solutions}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {featured.map((s) => (
              <li key={s.slug}>
                <Link className="hover:text-white" href={route(locale, `/soluciones/${s.slug}`)}>
                  {dict.solutions[s.slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{dict.nav.contact}</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a className="hover:text-white" href={`tel:${site.phone}`}>{site.phoneDisplay}</a></li>
            <li><a className="hover:text-white" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{site.city}, España</li>
            <li className="pt-2">
              <span className="eyebrow !text-white/40">{dict.footer.follow}</span>
              <span className="mt-2 flex gap-3">
                <a href="https://www.linkedin.com/in/jesus-rabadan" aria-label="LinkedIn" className="hover:text-white" rel="noopener noreferrer" target="_blank">LinkedIn</a>
                <a href="https://www.instagram.com/metalboxprefabricados" aria-label="Instagram" className="hover:text-white" rel="noopener noreferrer" target="_blank">Instagram</a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 text-xs md:flex-row">
          <p>© {year} {site.name} · {dict.footer.rights}</p>
          <nav className="flex gap-6" aria-label={dict.footer.legal}>
            <Link className="hover:text-white" href={route(locale, "/aviso-legal")}>{dict.footer.legalNotice}</Link>
            <Link className="hover:text-white" href={route(locale, "/politica-privacidad")}>{dict.footer.privacy}</Link>
            <Link className="hover:text-white" href={route(locale, "/politica-cookies")}>{dict.footer.cookiesPolicy}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
