import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center bg-ink text-white">
      <div className="shell py-32">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">
          Página no encontrada
        </h1>
        <Link href="/es" className="btn-primary mt-10">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
