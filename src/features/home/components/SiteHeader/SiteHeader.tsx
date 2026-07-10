import { homeContent } from '@/features/home/data/homeContent'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { brand, navigation } = homeContent

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.brand} href="#top" aria-label={`${brand.name} home`}>
          <img className={styles.mark} src={brand.mark} alt="" aria-hidden="true" />
          <img className={styles.wordmark} src={brand.wordmark} alt={brand.name} />
        </a>

        <div className={styles.links}>
          {navigation.map((item) => (
            <a key={item.href} className={styles.link} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
