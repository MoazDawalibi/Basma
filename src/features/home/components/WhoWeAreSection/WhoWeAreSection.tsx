import { LinkButton } from '@/components/ui/LinkButton/LinkButton'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './WhoWeAreSection.module.css'

export function WhoWeAreSection() {
  const { about } = useHomeContent()

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <h2 data-reveal id="about-title" className={`${styles.title} section-title gradient-text`}>
          {about.title}
        </h2>
        <p data-reveal data-reveal-delay="1" className={styles.body}>{about.body}</p>
        <LinkButton data-reveal-delay="2" className={styles.action} href={about.action.href} variant="dark">
          {about.action.label}
        </LinkButton>
      </div>
    </section>
  )
}
