import { LinkButton } from '@/components/ui/LinkButton/LinkButton'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const { hero, ui } = useHomeContent()

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.artwork}
        src={hero.artwork}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <h1 data-reveal id="hero-title" className={styles.title}>
          {hero.title}
        </h1>

        <div className={styles.lowerRow}>
          <p data-reveal data-reveal-delay="1" className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.actions} role="group" aria-label={ui.projectActions}>
            <LinkButton data-reveal-delay="2" className={styles.actionButton} href={hero.primaryAction.href}>
              {hero.primaryAction.label}
            </LinkButton>
            <LinkButton data-reveal-delay="3" className={styles.actionButton} href={hero.secondaryAction.href} variant="dark">
              {hero.secondaryAction.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
