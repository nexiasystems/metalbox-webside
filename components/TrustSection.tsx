import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export default function TrustSection({ trust }: { trust: Dictionary["trust"] }) {
  return (
    <section className="bg-mist py-24 md:py-32">
      <div className="shell">
        <SectionHeading eyebrow={trust.eyebrow} title={trust.title} />
        <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {trust.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="bg-white p-8 transition-colors duration-300 hover:bg-ink hover:text-white group">
              <span className="block h-0.5 w-8 bg-metal-red" aria-hidden="true" />
              <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-white/70">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
