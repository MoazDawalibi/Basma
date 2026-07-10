import { LinkButton } from '@/components/ui/LinkButton/LinkButton'
import { homeContent } from '@/features/home/data/homeContent'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const { hero } = homeContent

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
        <h1 id="hero-title" className={styles.title}>
          {hero.title}
        </h1>

        <div className={styles.lowerRow}>
          <p className={styles.subtitle}>{hero.subtitle}</p>

          <div className={styles.actions} aria-label="Project actions">
            <LinkButton className={styles.actionButton} href={hero.primaryAction.href}>
              {hero.primaryAction.label}
            </LinkButton>
            <LinkButton className={styles.actionButton} href={hero.secondaryAction.href} variant="dark">
              {hero.secondaryAction.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
