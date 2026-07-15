"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const STORAGE_KEY = "metalbox-cookie-consent";

export default function CookieBanner({
  labels,
  policyHref,
}: {
  labels: Dictionary["cookies"];
  policyHref: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      window.dispatchEvent(new CustomEvent("metalbox:consent", { detail: value }));
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-ink/95 p-5 text-white backdrop-blur" role="region" aria-label="Cookies">
      <div className="shell flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-white/80">
          {labels.text}{" "}
          <Link href={policyHref} className="underline decoration-metal-red underline-offset-2 hover:text-white">
            {labels.more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => decide("rejected")} className="btn-ghost !px-5 !py-3 text-xs">
            {labels.reject}
          </button>
          <button type="button" onClick={() => decide("accepted")} className="btn-primary !px-5 !py-3 text-xs">
            {labels.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
