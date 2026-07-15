import { useEffect, useState } from 'react'
import { fetchBackendContent } from '@/features/home/api/backendContent'
import { HomePage } from '@/features/home/pages/HomePage'
import type { LocalizedContentCatalog } from '@/i18n/catalog'
import { LocaleProvider } from '@/i18n/LocaleProvider'

export function App() {
  const [contentCatalog, setContentCatalog] = useState<LocalizedContentCatalog | undefined>()

  useEffect(() => {
    const controller = new AbortController()

    void fetchBackendContent(controller.signal)
      .then(setContentCatalog)
      .catch(() => {
        setContentCatalog(undefined)
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const hash = window.location.hash

    if (!hash) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(hash)

      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: 'auto' })
      }
    }, 50)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <LocaleProvider contentCatalog={contentCatalog}>
      <HomePage />
    </LocaleProvider>
  )
}
