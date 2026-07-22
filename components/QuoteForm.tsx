"use client";

import { useState, type FormEvent } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_CONVERSION_SEND_TO = "AW-18339447748/ltaxCNTS0dQcEMSH96He";

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm({
  form,
  privacyHref,
  defaultProjectType,
}: {
  form: Dictionary["form"];
  privacyHref: string;
  defaultProjectType?: string;
}) {
  const [clientType, setClientType] = useState<"particular" | "empresa">("particular");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        sendGAEvent("event", "generate_lead", {
          form_id: "quote_form",
          project_type: data.projectType,
          client_type: data.clientType,
        });
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
          });
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="border border-ink/10 bg-mist p-6 text-sm font-medium text-ink">
        {form.success}
      </p>
    );
  }

  const projectTypeEntries = Object.entries(form.projectTypes);
  const areaEntries = Object.entries(form.areas);

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.name} *
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.email} *
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.phone} *
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
        <fieldset className="grid gap-1.5">
          <legend className="text-xs font-semibold uppercase tracking-wider text-ink/70">
            {form.clientType} *
          </legend>
          <div className="flex gap-6 pt-3">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name="clientType"
                value="particular"
                checked={clientType === "particular"}
                onChange={() => setClientType("particular")}
                className="h-4 w-4 accent-metal-red"
              />
              {form.clientParticular}
            </label>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="radio"
                name="clientType"
                value="empresa"
                checked={clientType === "empresa"}
                onChange={() => setClientType("empresa")}
                className="h-4 w-4 accent-metal-red"
              />
              {form.clientCompany}
            </label>
          </div>
        </fieldset>
      </div>

      {clientType === "empresa" && (
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
            {form.companyName} *
            <input name="companyName" type="text" required autoComplete="organization" />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
            {form.address}
            <input name="companyAddress" type="text" autoComplete="street-address" />
          </label>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.location} *
          <input name="location" type="text" required />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.province} *
          <input name="province" type="text" required />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.projectType} *
          <select name="projectType" required defaultValue={defaultProjectType ?? projectTypeEntries[0][0]}>
            {projectTypeEntries.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
          {form.area} *
          <select name="area" required defaultValue={areaEntries[0][0]}>
            {areaEntries.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/70">
        {form.message}
        <textarea name="message" rows={4} />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-ink/70">
        <input type="checkbox" name="rgpd" required className="mt-0.5 h-4 w-4 shrink-0 accent-metal-red" />
        <span>
          {form.rgpd}{" "}
          <a href={privacyHref} className="underline decoration-metal-red underline-offset-2" target="_blank">
            RGPD
          </a>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="border border-metal-red/40 bg-metal-red/5 p-4 text-sm text-metal-dark">
          {form.error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
        {status === "sending" ? form.sending : form.submit}
      </button>
    </form>
  );
}
