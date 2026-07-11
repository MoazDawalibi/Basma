import { createContext } from 'react'
import type { HomeContent } from '@/features/home/data/homeContent'
import type { Locale } from './catalog'

export type LocaleContextValue = {
  locale: Locale
  direction: 'ltr' | 'rtl'
  content: HomeContent
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)
