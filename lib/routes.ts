import type { Locale } from "@/lib/i18n/config";

export const route = (locale: Locale, path = "") => `/${locale}${path}`;
