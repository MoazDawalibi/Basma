import { useHomeContent } from '@/i18n/useLocale'
import basmaAboutDark from '@/assets/images/basma-about-dark.png'
import styles from './AboutBasmaSection.module.css'

export function AboutBasmaSection() {
  const { basma } = useHomeContent()

  return (
    <section id="about-basma" className={styles.section} aria-labelledby="basma-title">
      <div data-reveal className={styles.copy}>
        <h2 id="basma-title" className="section-title gradient-text">{basma.title}</h2>
        <p>{basma.body}</p>
      </div>

      <div data-reveal data-reveal-delay="1" className={styles.artworkFrame}>
        <img className={`${styles.artwork} ${styles.artworkLight}`} src={basma.artwork} alt={basma.imageAlt} loading="lazy" decoding="async" />
        <img className={`${styles.artwork} ${styles.artworkDark}`} src={basmaAboutDark} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </div>
    </section>
  )
}
