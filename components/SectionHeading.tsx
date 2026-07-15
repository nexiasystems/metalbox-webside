import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-3 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed ${light ? "text-white/70" : "text-ink/60"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
