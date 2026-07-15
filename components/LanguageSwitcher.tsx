"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(es|ca|en)(?=\/|$)/, "");

  return (
    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider" aria-label="Idioma">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-white/30">/</span>}
          <Link
            href={`/${l}${rest}`}
            aria-current={l === locale ? "true" : undefined}
            className={l === locale ? "text-metal-red" : "text-white/60 hover:text-white"}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
