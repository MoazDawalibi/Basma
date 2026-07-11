import { useEffect, type RefObject } from 'react'

const REVEAL_SELECTOR = '[data-reveal]'

export function useRevealOnScroll(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const elements = Array.from(container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    const observeElement = (element: HTMLElement) => {
      if (!element.classList.contains('is-revealed')) {
        observer.observe(element)
      }
    }

    elements.forEach(observeElement)

    // Also supports sections or list items rendered later from an API response.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return
          }

          if (node.matches(REVEAL_SELECTOR)) {
            observeElement(node)
          }

          node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(observeElement)
        })
      })
    })

    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [containerRef])
}
