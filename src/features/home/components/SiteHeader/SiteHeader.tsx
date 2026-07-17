import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLocale } from '@/i18n/useLocale'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { content: { brand, navigation, ui }, locale } = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 48rem)')
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        setIsMenuOpen(false)
      }
    }

    mobileQuery.addEventListener('change', closeMenuOnDesktop)

    return () => mobileQuery.removeEventListener('change', closeMenuOnDesktop)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const closeFromOutside = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (
        menuButtonRef.current?.contains(target)
        || mobileMenuRef.current?.contains(target)
      ) {
        return
      }

      setIsMenuOpen(false)
    }

    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromKeyboard)

    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromKeyboard)
    }
  }, [isMenuOpen])

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label={ui.primaryNavigation}>
        <a data-reveal className={styles.brand} href="#top" aria-label={`${brand.name} ${ui.home}`}>
          <img className={styles.mark} src={brand.mark} alt="" aria-hidden="true" />
          <span className={styles.wordmark} aria-hidden="true">
            {locale === 'ar' ? (
              <span className={styles.wordmarkText}>{brand.name}</span>
            ) : (
              Array.from(brand.name).map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className={styles.wordmarkLetter}
                  style={{ animationDelay: `${140 + index * 95}ms` } as CSSProperties}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))
            )}
          </span>
        </a>

        <div className={styles.links}>
          <div className={styles.desktopLinks}>
            {navigation.map((item, index) => (
              <a
                key={item.href}
                data-reveal
                data-reveal-delay={Math.min(index + 1, 4)}
                className={styles.link}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
          <LanguageToggle />
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? ui.closeMenu : ui.openMenu}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          className={styles.mobileMenu}
          data-open={isMenuOpen}
          hidden={!isMenuOpen}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              className={styles.link}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
