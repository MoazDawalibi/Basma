import { useHomeContent } from '@/i18n/useLocale'
import styles from './WhyBasmaSection.module.css'

function BenefitIcon({ kind }: { kind: string }) {
  const paths = {
    speed: <path d="M5 15a9 9 0 1 1 14 0M12 12l5-4M8 19h8" />,
    business: <path d="M4 20V8h16v12M8 8V4h8v4M8 12h2M14 12h2M8 16h2M14 16h2" />,
    experience: <path d="M4 5h16v12H4zM8 21h8M12 17v4M8 9h8M8 13h5" />,
    partnership: <path d="M8 12 4 9l4-4 4 3M16 12l4-3-4-4-4 3M6 11l5 5c.7.7 1.3.7 2 0l5-5M9 18l1 1c1.1 1.1 2.9 1.1 4 0l1-1" />,
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[kind as keyof typeof paths] ?? paths.business}
    </svg>
  )
}

export function WhyBasmaSection() {
  const { whyBasma } = useHomeContent()

  return (
    <section id="why-basma" className={styles.section} aria-labelledby="why-basma-title">
      <div data-reveal className={styles.header}>
        <p className="section-eyebrow">{whyBasma.eyebrow}</p>
        <h2 id="why-basma-title" className="section-title gradient-text">{whyBasma.title}</h2>
        <p>{whyBasma.subtitle}</p>
      </div>

      <ul className={styles.grid}>
        {whyBasma.items.map((item, index) => (
          <li key={item.title} data-reveal data-reveal-delay={Math.min(index + 1, 4)} className={styles.card}>
            <div className={styles.icon}><BenefitIcon kind={item.kind} /></div>
            <div className={styles.cardCopy}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
