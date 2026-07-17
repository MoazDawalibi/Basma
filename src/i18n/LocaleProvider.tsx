import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import {
  defaultContentCatalog,
  resolveLocalizedContent,
  type Locale,
  type LocalizedContentCatalog,
} from './catalog'
import { LocaleContext, type LocaleContextValue } from './LocaleContext'

type LocaleProviderProps = PropsWithChildren<{
  contentCatalog?: LocalizedContentCatalog
}>

export function LocaleProvider({
  children,
  contentCatalog = defaultContentCatalog,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    document.documentElement.lang === 'ar' ? 'ar' : 'en',
  )

  const setLocale = (nextLocale: Locale) => {
    const direction = nextLocale === 'ar' ? 'rtl' : 'ltr'

    document.documentElement.lang = nextLocale
    document.documentElement.dir = direction
    localStorage.setItem('basma-locale', nextLocale)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', nextLocale)
    window.history.replaceState(window.history.state, '', url)
    setLocaleState(nextLocale)
  }

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    content: resolveLocalizedContent(contentCatalog, locale),
    setLocale,
  }), [contentCatalog, locale])

  useEffect(() => {
    document.title = value.content.ui.pageTitle
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute(
      'content',
      value.content.ui.pageDescription,
    )
  }, [value.content])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
