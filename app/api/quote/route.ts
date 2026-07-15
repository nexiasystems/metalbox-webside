import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

interface QuotePayload {
  name?: string;
  email?: string;
  phone?: string;
  clientType?: string;
  companyName?: string;
  companyAddress?: string;
  location?: string;
  province?: string;
  projectType?: string;
  area?: string;
  message?: string;
  rgpd?: string;
}

export async function POST(request: Request) {
  let data: QuotePayload;
  try {
    data = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!data.name || !data.email || !data.phone || !data.rgpd) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const lines = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone}`,
    `Tipo de cliente: ${data.clientType ?? "-"}`,
    data.companyName ? `Empresa: ${data.companyName}` : null,
    data.companyAddress ? `Dirección empresa: ${data.companyAddress}` : null,
    `Ubicación: ${data.location ?? "-"}`,
    `Provincia: ${data.province ?? "-"}`,
    `Tipo de proyecto: ${data.projectType ?? "-"}`,
    `Área: ${data.area ?? "-"}`,
    "",
    "Mensaje:",
    data.message ?? "-",
  ].filter(Boolean);

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, QUOTE_TO } = process.env;

  // SMTP preparado: si no hay credenciales configuradas, registramos la solicitud
  // y devolvemos OK para no bloquear el negocio en entornos de staging.
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.info("[quote] SMTP no configurado. Solicitud recibida:\n" + lines.join("\n"));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: (SMTP_SECURE ?? "true") === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Web Metalbox" <${SMTP_USER}>`,
      to: QUOTE_TO ?? site.email,
      replyTo: data.email,
      subject: `Solicitud de presupuesto — ${data.projectType ?? "proyecto"} (${data.name})`,
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[quote] Error enviando email", error);
    return NextResponse.json({ ok: false, error: "smtp_error" }, { status: 502 });
  }
}
