import { useEffect } from 'react'
import { HomePage } from '@/features/home/pages/HomePage'

export function App() {
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

  return <HomePage />
}
