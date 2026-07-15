import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { solutions } from "@/lib/solutions";
import { route } from "@/lib/routes";

export default function ServicesGrid({
  locale,
  dict,
  limit,
  cardLabel,
}: {
  locale: Locale;
  dict: Dictionary;
  limit?: number;
  cardLabel: string;
}) {
  const items = limit ? solutions.slice(0, limit) : solutions;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((solution, i) => {
        const copy = dict.solutions[solution.slug];
        return (
          <Reveal key={solution.slug} delay={(i % 3) * 0.08}>
            <Link
              href={route(locale, `/soluciones/${solution.slug}`)}
              className="group relative block aspect-[4/5] overflow-hidden bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-metal-red"
            >
              <Image
                src={solution.image}
                alt={copy.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="block h-0.5 w-8 bg-metal-red transition-all duration-500 group-hover:w-14" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-white">
                  {copy.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/70">{copy.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-metal-red opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {cardLabel}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
