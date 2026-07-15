import CtaButton from "@/components/CtaButton";
import Reveal from "@/components/Reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export default function CTASection({ cta, projectType }: { cta: Dictionary["cta"]; projectType?: string }) {
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-white md:py-32">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(115deg,transparent_45%,rgba(255,49,49,0.12)_45%,rgba(255,49,49,0.12)_55%,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Reveal>
          <span className="block h-0.5 w-12 bg-metal-red" aria-hidden="true" />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
            {cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{cta.text}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <CtaButton projectType={projectType}>{cta.button}</CtaButton>
            <CtaButton variant="ghost" projectType={projectType}>{cta.secondary}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
