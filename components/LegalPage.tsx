import Reveal from "@/components/Reveal";

export default function LegalPage({ title, body }: { title: string; body: string[] }) {
  return (
    <>
      <section className="bg-ink pb-16 pt-40 text-white">
        <div className="shell">
          <Reveal>
            <h1 className="max-w-4xl font-display text-4xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
              {title}
            </h1>
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-20 md:py-28">
        <div className="shell max-w-3xl">
          {body.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-base leading-relaxed text-ink/70">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
