import type { Locale } from "./config";
import es from "./dictionaries/es.json";
import ca from "./dictionaries/ca.json";
import en from "./dictionaries/en.json";

const dictionaries = { es, ca, en } as const;

export type Dictionary = typeof es;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
