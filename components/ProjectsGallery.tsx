"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Filters = Dictionary["projects"]["filters"];
type Item = Dictionary["projects"]["items"][number];

export default function ProjectsGallery({ filters, items }: { filters: Filters; items: Item[] }) {
  const [active, setActive] = useState<keyof Filters>("all");
  const [lightbox, setLightbox] = useState<Item | null>(null);

  const visible = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.category === active)),
    [active, items]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const filterKeys = Object.keys(filters) as (keyof Filters)[];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={filters.all}>
        {filterKeys.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={`border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              active === key
                ? "border-metal-red bg-metal-red text-white"
                : "border-ink/15 text-ink/60 hover:border-ink hover:text-ink"
            }`}
          >
            {filters[key]}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.button
              layout
              key={item.title}
              type="button"
              onClick={() => setLightbox(item)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="group relative block aspect-[4/3] overflow-hidden bg-ink text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-metal-red"
              aria-label={item.title}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-14">
                <span className="block h-0.5 w-6 bg-metal-red" aria-hidden="true" />
                <span className="mt-2 block font-display text-sm font-bold uppercase tracking-tight text-white">
                  {item.title}
                </span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.figure
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
                <Image src={lightbox.image} alt={lightbox.title} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-4 text-center font-display text-sm font-bold uppercase tracking-wider text-white">
                {lightbox.title}
              </figcaption>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Cerrar"
                className="absolute -top-2 right-0 flex h-11 w-11 -translate-y-full items-center justify-center text-white/70 hover:text-white"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
