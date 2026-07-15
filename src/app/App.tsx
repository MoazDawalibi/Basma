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
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    if (window.location.search || window.location.hash) {
      window.history.replaceState(window.history.state, '', window.location.pathname)
    }

    const scrollToHero = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    scrollToHero()

    const timeoutId = window.setTimeout(() => {
      scrollToHero()
    }, 50)

    return () => {
      window.clearTimeout(timeoutId)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    let timeoutId: number | undefined

    const releaseHoverAfterClick = (event: MouseEvent) => {
      if (event.detail === 0) {
        return
      }

      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>('a, button, [role="button"]')
        : null

      if (!target) {
        return
      }

      target.blur()
      window.clearTimeout(timeoutId)

      window.setTimeout(() => {
        document.documentElement.dataset.releaseHover = 'true'

        timeoutId = window.setTimeout(() => {
          delete document.documentElement.dataset.releaseHover
        }, 450)
      }, 0)
    }

    document.addEventListener('click', releaseHoverAfterClick, true)

    return () => {
      document.removeEventListener('click', releaseHoverAfterClick, true)
      window.clearTimeout(timeoutId)
      delete document.documentElement.dataset.releaseHover
    }
  }, [])

  return (
    <LocaleProvider contentCatalog={contentCatalog}>
      <HomePage />
    </LocaleProvider>
  )
}
