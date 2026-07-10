import { LinkButton } from '@/components/ui/LinkButton/LinkButton'
import { homeContent } from '@/features/home/data/homeContent'
import styles from './WhoWeAreSection.module.css'

export function WhoWeAreSection() {
  const { about } = homeContent

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <h2 id="about-title" className={styles.title}>
          {about.title}
        </h2>
        <p className={styles.body}>{about.body}</p>
        <LinkButton className={styles.action} href={about.action.href} variant="dark">
          {about.action.label}
        </LinkButton>
      </div>
    </section>
  )
}
