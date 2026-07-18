import { useEffect, useState } from 'react'
import { fetchBackendContent } from '@/features/home/api/backendContent'
import { HomePage } from '@/features/home/pages/HomePage'
import type { LocalizedContentCatalog } from '@/i18n/catalog'
import { LocaleProvider } from '@/i18n/LocaleProvider'

export function App() {
  const [contentCatalog, setContentCatalog] = useState<LocalizedContentCatalog | undefined>()
  const [isContentResolved, setIsContentResolved] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const requestTimer = window.setTimeout(() => {
      void fetchBackendContent(controller.signal)
        .then(setContentCatalog)
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) {
            setContentCatalog(undefined)
          }
        })
        .finally(() => setIsContentResolved(true))
    }, 0)

    return () => {
      window.clearTimeout(requestTimer)
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    const scrollToInitialLocation = () => {
      const targetId = decodeURIComponent(window.location.hash.slice(1))
      const target = targetId ? document.getElementById(targetId) : null

      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
        return
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    const animationFrameId = window.requestAnimationFrame(scrollToInitialLocation)
    const timeoutId = window.setTimeout(scrollToInitialLocation, 100)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.clearTimeout(timeoutId)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  if (!isContentResolved) {
    return null
  }

  return (
    <LocaleProvider contentCatalog={contentCatalog}>
      <HomePage />
    </LocaleProvider>
  )
}
