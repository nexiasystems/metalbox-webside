"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuoteModal } from "@/components/QuoteModalProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { route } from "@/lib/routes";

export default function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const { openQuote } = useQuoteModal();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const links = [
    { href: route(locale), label: nav.home },
    { href: route(locale, "/empresa"), label: nav.company },
    { href: route(locale, "/soluciones"), label: nav.solutions },
    { href: route(locale, "/proyectos"), label: nav.projects },
    { href: route(locale, "/faq"), label: nav.faq },
    { href: route(locale, "/contacto"), label: nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-ink/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Link href={route(locale)} className="flex items-center gap-3" aria-label="Metalbox — inicio">
          <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-white p-1">
            <Image src="/images/logo-metalbox.png" alt="Metalbox Prefabricados Modulares" width={44} height={44} priority />
          </span>
          <span className="hidden font-display text-lg font-bold uppercase tracking-wider text-white sm:block">
            Metalbox
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  active ? "text-metal-red" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />
          <button type="button" onClick={() => openQuote()} className="btn-primary hidden !px-5 !py-3 md:inline-flex">
            {nav.quote}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Menú"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-ink lg:hidden" aria-label="Menú móvil">
          <div className="shell flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium uppercase tracking-wider text-white/85 hover:text-metal-red"
              >
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={() => { setMenuOpen(false); openQuote(); }} className="btn-primary mt-3">
              {nav.quote}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
