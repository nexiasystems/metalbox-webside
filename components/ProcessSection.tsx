import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export default function ProcessSection({ process }: { process: Dictionary["process"] }) {
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <div className="shell">
        <SectionHeading eyebrow={process.eyebrow} title={process.title} light />
        <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative border-t border-white/15 pt-6">
                <span className="absolute -top-px left-0 h-px w-10 bg-metal-red" aria-hidden="true" />
                <span className="font-display text-sm font-bold text-metal-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
