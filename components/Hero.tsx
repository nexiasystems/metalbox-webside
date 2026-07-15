"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useQuoteModal } from "@/components/QuoteModalProvider";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export default function Hero({ hero, projectsHref }: { hero: Dictionary["hero"]; projectsHref: string }) {
  const { openQuote } = useQuoteModal();
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-ink" aria-label={hero.title}>
      {!reduce && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/vivienda-modular-2.jpg"
          aria-hidden="true"
        >
          <source src="/videos/instalacion-modular.mp4" type="video/mp4" />
        </video>
      )}
      {reduce && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/vivienda-modular-2.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" aria-hidden="true" />

      <div className="shell relative z-10 pb-28 pt-40">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Metalbox Prefabricados Modulares
        </motion.p>
        <motion.h1
          className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {hero.title}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {hero.subtitle}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <button type="button" onClick={() => openQuote()} className="btn-primary">
            {hero.ctaPrimary}
          </button>
          <Link href={projectsHref} className="btn-ghost">
            {hero.ctaSecondary}
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest2">{hero.scroll}</span>
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-metal-red to-transparent"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
