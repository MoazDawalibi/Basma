import { useState, type CSSProperties } from 'react'
import { useHomeContent } from '@/i18n/useLocale'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { brand, navigation, ui } = useHomeContent()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label={ui.primaryNavigation}>
        <a data-reveal className={styles.brand} href="#top" aria-label={`${brand.name} ${ui.home}`}>
          <img className={styles.mark} src={brand.mark} alt="" aria-hidden="true" />
          <span className={styles.wordmark} aria-hidden="true">
            {Array.from(brand.name).map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={styles.wordmarkLetter}
                style={{ animationDelay: `${140 + index * 95}ms` } as CSSProperties}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
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
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <div className={styles.mobileMenu} data-open={isMenuOpen}>
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
