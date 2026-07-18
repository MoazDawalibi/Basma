import { useEffect, useRef, useState } from 'react'
import { useHomeContent } from '@/i18n/useLocale'
import basmaAboutDark from '@/assets/images/basma-about-dark.png'
import styles from './AboutBasmaSection.module.css'

export function AboutBasmaSection() {
  const { basma } = useHomeContent()
  const [isDark, setIsDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const [isArtworkVisible, setIsArtworkVisible] = useState(false)
  const artworkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      setIsDark((event as CustomEvent<'light' | 'dark'>).detail === 'dark')
    }

    window.addEventListener('basma-theme-change', handleThemeChange)
    return () => window.removeEventListener('basma-theme-change', handleThemeChange)
  }, [])

  useEffect(() => {
    const artwork = artworkRef.current

    if (!artwork || !('IntersectionObserver' in window)) {
      setIsArtworkVisible(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsArtworkVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '100px' })

    observer.observe(artwork)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about-basma" className={styles.section} aria-labelledby="basma-title">
      <div data-reveal className={styles.copy}>
        <h2 id="basma-title" className="section-title gradient-text">{basma.title}</h2>
        <p>{basma.body}</p>
      </div>

      <div ref={artworkRef} data-reveal data-reveal-delay="1" className={styles.artworkFrame}>
        {isArtworkVisible ? (
          <img
            className={`${styles.artwork} ${isDark ? styles.artworkDark : styles.artworkLight}`}
            src={isDark ? basmaAboutDark : basma.artwork}
            alt={basma.imageAlt}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
    </section>
  )
}
