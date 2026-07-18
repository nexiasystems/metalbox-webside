import { NextResponse } from "next/server";
import { Resend } from "resend";

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string): string {
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#f5f5f4;font-weight:600;white-space:nowrap;">${label}</td>
    <td style="padding:8px 12px;border:1px solid #e5e5e5;">${value ? escapeHtml(value) : "—"}</td>
  </tr>`;
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

  const { RESEND_API_KEY, MAIL_FROM, MAIL_TO } = process.env;

  if (!RESEND_API_KEY || !MAIL_FROM || !MAIL_TO) {
    console.error("[quote] Resend no configurado: faltan RESEND_API_KEY, MAIL_FROM o MAIL_TO");
    return NextResponse.json({ ok: false, error: "resend_not_configured" }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  const adminHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0b;max-width:640px;">
    <h2 style="margin:0 0 4px;">Nueva solicitud de presupuesto</h2>
    <p style="margin:0 0 20px;color:#555;">Recibida desde el formulario web de Metalbox.</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${row("Nombre", data.name)}
      ${row("Email", data.email)}
      ${row("Teléfono", data.phone)}
      ${row("Tipo de cliente", data.clientType)}
      ${row("Empresa", data.companyName)}
      ${row("Dirección empresa", data.companyAddress)}
      ${row("Ubicación", data.location)}
      ${row("Provincia", data.province)}
      ${row("Tipo de proyecto", data.projectType)}
      ${row("Área", data.area)}
      ${row("RGPD aceptado", data.rgpd ? "Sí" : "No")}
      ${row("Mensaje", data.message)}
    </table>
  </div>`;

  const confirmationHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0a0a0b;max-width:640px;line-height:1.6;">
    <p>Gracias por contactar con Metalbox.</p>
    <p>Hemos recibido correctamente su solicitud de presupuesto.</p>
    <p>Nuestro equipo revisará la información y se pondrá en contacto con usted lo antes posible.</p>
    <p>Atentamente,<br/>Metalbox Prefabricados</p>
  </div>`;

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: data.email,
      subject: "Nueva solicitud de presupuesto - Metalbox",
      html: adminHtml,
    });

    if (error) {
      console.error("[quote] Error de Resend enviando al administrador", error);
      return NextResponse.json({ ok: false, error: "resend_error" }, { status: 500 });
    }
  } catch (error) {
    console.error("[quote] Error enviando email al administrador", error);
    return NextResponse.json({ ok: false, error: "resend_error" }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: MAIL_FROM,
      to: data.email,
      subject: "Hemos recibido su solicitud",
      html: confirmationHtml,
    });
  } catch (error) {
    // La solicitud ya está entregada al equipo; el fallo de la confirmación no debe perder el lead.
    console.error("[quote] Error enviando confirmación al cliente", error);
  }

  return NextResponse.json({ ok: true });
}
