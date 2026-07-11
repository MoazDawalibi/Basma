import { useHomeContent } from '@/i18n/useLocale'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { brand, navigation, ui } = useHomeContent()

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label={ui.primaryNavigation}>
        <a data-reveal className={styles.brand} href="#top" aria-label={`${brand.name} ${ui.home}`}>
          <img className={styles.mark} src={brand.mark} alt="" aria-hidden="true" />
          <img className={styles.wordmark} src={brand.wordmark} alt={brand.name} />
        </a>

        <div className={styles.links}>
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
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
