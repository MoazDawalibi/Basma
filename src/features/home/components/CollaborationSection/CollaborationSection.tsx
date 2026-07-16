import type { HomeContent } from '@/features/home/data/homeContent'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './CollaborationSection.module.css'

type CollaborationArea = HomeContent['collaboration']['areas'][number]

function AreaIcon({ kind }: { kind: string }) {
  if (kind === 'technology') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="8" width="34" height="25" rx="3" />
        <path d="M17 40h14M24 33v7M19 16l-5 5 5 5M29 16l5 5-5 5M26.5 14 21.5 28" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m30 7 11 11-18 18-13 3 3-13L30 7Z" />
      <path d="m26 11 11 11M13 26l10 10M8 41h32M34 36v5M14 39v2" />
    </svg>
  )
}

function ItemIcon({ kind, index }: { kind: string; index: number }) {
  const technologyIcons = [
    <path key="code" d="m9 8-4 4 4 4M15 8l4 4-4 4M13.5 5l-3 14" />,
    <path key="phone" d="M8 3h8v18H8zM11 6h2M11 18h2" />,
    <path key="layers" d="m4 9 8-5 8 5-8 5-8-5Zm0 4 8 5 8-5M7 16l5 3 5-3" />,
    <path key="plan" d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" />,
    <path key="shield" d="M12 3 5 6v5c0 4.6 2.8 8.2 7 10 4.2-1.8 7-5.4 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
  ]
  const designIcons = [
    <path key="ui" d="M3 5h18v12H3zM8 21h8M12 17v4M6 8h5M6 11h9" />,
    <path key="brand" d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4h-1a1.5 1.5 0 0 1 0-3H15a6 6 0 0 0 0-12h-3Zm-4 7h.01M10 6.5h.01M7 14h.01" />,
    <path key="diamond" d="m12 3 8 7-8 11-8-11 8-7ZM4 10h16M12 3v18" />,
    <path key="research" d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5M8 12c1-2 5-2 6 0M9 9h.01M13 9h.01" />,
    <path key="idea" d="M9 18h6M10 21h4M8 14c-1.4-1.2-2-2.8-2-4.5a6 6 0 0 1 12 0c0 1.7-.6 3.3-2 4.5-1 .9-1.3 1.6-1.3 2H9.3c0-.4-.3-1.1-1.3-2Z" />,
  ]

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {(kind === 'technology' ? technologyIcons : designIcons)[index]}
    </svg>
  )
}

function ConnectionIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="m13 19-2 2a5 5 0 0 1-7-7l4-4a5 5 0 0 1 7 0M19 13l2-2a5 5 0 0 1 7 7l-4 4a5 5 0 0 1-7 0M11 16h10" />
    </svg>
  )
}

function StatementIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="18" cy="22" r="12" />
      <circle cx="18" cy="22" r="7" />
      <circle cx="18" cy="22" r="2" />
      <path d="m19 21 13-13M27 8h5v5" />
    </svg>
  )
}

function CollaborationCard({ area, index }: { area: CollaborationArea; index: number }) {
  return (
    <article className={`${styles.card} ${area.kind === 'technology' ? styles.technologyCard : styles.designCard}`}>
      <div className={styles.cardHeading}>
        <span className={styles.cardNumber} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3>{area.title}</h3>
        <span className={styles.areaIcon}>
          <AreaIcon kind={area.kind} />
        </span>
      </div>

      <p className={styles.cardDescription}>{area.description}</p>

      <ul className={styles.capabilities}>
        {area.items.map((item, itemIndex) => (
          <li key={item}>
            <span className={styles.itemIcon}>
              <ItemIcon kind={area.kind} index={itemIndex} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export function CollaborationSection() {
  const { collaboration } = useHomeContent()

  return (
    <section id="collaboration" className={styles.section} aria-labelledby="collaboration-title">
      <div className={styles.ribbon} aria-hidden="true" />

      <div className={styles.inner}>
        <header data-reveal className={styles.header}>
          <p className={styles.eyebrow}>{collaboration.eyebrow}</p>
          <h2 id="collaboration-title" className="gradiant_text">
            <span>{collaboration.titleLead}</span>{' '}
            <span className={styles.titleAccent}>{collaboration.titleAccent}</span>
          </h2>
          <p className={styles.subtitle}>{collaboration.subtitle}</p>
          <span className={styles.headerRule} aria-hidden="true" />
        </header>

        <div data-reveal="collaboration-sequence" className={styles.sequence}>
          <div className={styles.cards}>
            <CollaborationCard area={collaboration.areas[0]} index={0} />

            <div className={styles.connector} aria-hidden="true">
              <span className={styles.connectorLine} />
              <span className={styles.connectorBadge}>
                <ConnectionIcon />
              </span>
            </div>

            <CollaborationCard area={collaboration.areas[1]} index={1} />
          </div>

          <div className={styles.statement}>
            <span className={styles.statementIcon}><StatementIcon /></span>
            <p>
              <span>{collaboration.statementLead}</span>{' '}
              <strong>{collaboration.statementAccent}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
