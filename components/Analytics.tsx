"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    try {
      setConsented(localStorage.getItem("metalbox-cookie-consent") === "accepted");
    } catch {
      /* storage unavailable */
    }
    const onConsent = (e: Event) =>
      setConsented((e as CustomEvent).detail === "accepted");
    window.addEventListener("metalbox:consent", onConsent);
    return () => window.removeEventListener("metalbox:consent", onConsent);
  }, []);

  if (!consented) return null;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}'); fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}
