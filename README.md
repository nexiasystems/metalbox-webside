# Metalbox Prefabricados Modulares — Web corporativa

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · App Router.
Trilingüe (ES/CA/EN) · SEO completo · Formulario de presupuesto con SMTP · Listo para Vercel.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # rellenar credenciales SMTP
npm run dev                  # http://localhost:3000 → redirige a /es /ca /en según navegador
npm run build && npm start   # producción
```

## Variables de entorno (.env.local)

| Variable | Uso |
|---|---|
| `SMTP_HOST / SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS` | Envío del formulario. Sin credenciales, la API registra la solicitud en logs y no bloquea la web (útil en staging). |
| `QUOTE_TO` | Destinatario (por defecto `administracion@metalboxprefabricados.com`). |
| `NEXT_PUBLIC_SITE_URL` | Dominio público — canónicas, sitemap, hreflang y Open Graph. |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` | Analítica. Solo se cargan si el usuario acepta cookies. |

## Deploy en Vercel

1. Subir el repositorio a GitHub (`git init && git add -A && git commit -m "v1" && git push`).
2. Importar en Vercel → framework detectado automáticamente (Next.js).
3. Añadir las variables de entorno anteriores en *Project Settings → Environment Variables*.
4. Deploy. El sitemap queda en `/sitemap.xml` y robots en `/robots.txt` para Search Console.

## Arquitectura

- `app/[lang]/` — rutas por idioma; `middleware.ts` detecta el idioma del navegador y redirige.
- `lib/i18n/dictionaries/` — todo el contenido editable (ES/CA/EN). Añadir textos aquí, no en componentes.
- `lib/solutions.ts` — datos de las 10 páginas de producto; se generan estáticamente.
- `app/api/quote/route.ts` — endpoint del formulario (nodemailer).
- JSON-LD: Organization (global), FAQPage (/faq), BreadcrumbList (soluciones). Schema FAQ listo para rich snippets.

## Editar contenido

- **Textos**: `lib/i18n/dictionaries/{es,ca,en}.json`
- **Imágenes**: `public/images/` (referenciadas desde diccionarios y `lib/solutions.ts`)
- **Datos de contacto**: `lib/site.ts`
- **Nueva solución**: añadir entrada en `lib/solutions.ts` + clave en los 3 diccionarios bajo `solutions`.
