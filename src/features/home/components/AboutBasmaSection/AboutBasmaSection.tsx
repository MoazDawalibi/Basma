import { useHomeContent } from '@/i18n/useLocale'
import styles from './AboutBasmaSection.module.css'

export function AboutBasmaSection() {
  const { basma } = useHomeContent()

  return (
    <section id="about-basma" className={styles.section} aria-labelledby="basma-title">
      <div data-reveal className={styles.copy}>
        <h2 id="basma-title" className='gradiant_text'>{basma.title}</h2>
        <p>{basma.body}</p>
      </div>

      <img data-reveal data-reveal-delay="1" className={styles.artwork} src={basma.artwork} alt={basma.imageAlt} loading="eager" />
    </section>
  )
}
