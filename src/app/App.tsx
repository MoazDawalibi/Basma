import { useEffect, useState } from 'react'
import { fetchBackendContent } from '@/features/home/api/backendContent'
import { HomePage } from '@/features/home/pages/HomePage'
import type { LocalizedContentCatalog } from '@/i18n/catalog'
import { LocaleProvider } from '@/i18n/LocaleProvider'

const contentCacheKey = 'basma-content-cache-v1'
const contentCacheLifetime = 7 * 24 * 60 * 60 * 1000

type CachedContent = {
  savedAt: number
  catalog: LocalizedContentCatalog
}

function readCachedContent() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(contentCacheKey) ?? 'null') as CachedContent | null
    if (!cached?.catalog || Date.now() - cached.savedAt > contentCacheLifetime) return undefined
    return cached.catalog
  } catch {
    return undefined
  }
}

function cacheContent(catalog: LocalizedContentCatalog) {
  try {
    window.localStorage.setItem(contentCacheKey, JSON.stringify({
      savedAt: Date.now(),
      catalog,
    } satisfies CachedContent))
  } catch {
    // Storage can be unavailable in private browsing. The bundled content remains the fallback.
  }
}

export function App() {
  const [contentCatalog, setContentCatalog] = useState<LocalizedContentCatalog | undefined>(readCachedContent)

  useEffect(() => {
    const controller = new AbortController()
    const requestTimer = window.setTimeout(() => {
      void fetchBackendContent(controller.signal)
        .then((catalog) => {
          setContentCatalog(catalog)
          cacheContent(catalog)
        })
        .catch(() => {
          // Keep rendering cached or bundled content when the API is unavailable.
        })
    }, 100)

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

  return (
    <LocaleProvider contentCatalog={contentCatalog}>
      <HomePage />
    </LocaleProvider>
  )
}
