import { arabicHomeContent } from '@/features/home/data/homeContent.ar'
import { homeContent, type HomeContent } from '@/features/home/data/homeContent'

export const supportedLocales = ['en', 'ar'] as const
export type Locale = (typeof supportedLocales)[number]

/*
 * Backend-ready contract: an API can return one or both locale payloads.
 * Missing locales safely fall back to English, then to the first available payload.
 */
export type LocalizedContentCatalog = Partial<Record<Locale, HomeContent>>

export const defaultContentCatalog: LocalizedContentCatalog = {
  en: homeContent,
  ar: arabicHomeContent,
}

export function resolveLocalizedContent(
  catalog: LocalizedContentCatalog,
  locale: Locale,
): HomeContent {
  const content = catalog[locale] ?? catalog.en ?? Object.values(catalog)[0]

  if (!content) {
    throw new Error('At least one localized content payload is required.')
  }

  return content
}
