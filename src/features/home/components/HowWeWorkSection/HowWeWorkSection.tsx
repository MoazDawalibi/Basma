import { useHomeContent } from '@/i18n/useLocale'
import styles from './HowWeWorkSection.module.css'

export function HowWeWorkSection() {
  const { process } = useHomeContent()

  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div data-reveal className={styles.header}>
        <p className="section-eyebrow">{process.eyebrow}</p>
        <h2 id="process-title" className="section-title gradient-text">{process.title}</h2>
        <p>{process.subtitle}</p>
      </div>

      <ol data-reveal className={styles.timeline}>
        {process.steps.map((step, index) => (
          <li
            key={step.title}
            data-reveal
            data-reveal-delay={Math.min(index, 4)}
            className={styles.step}
          >
            <div className={styles.stepMarker} aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.stepCard}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
