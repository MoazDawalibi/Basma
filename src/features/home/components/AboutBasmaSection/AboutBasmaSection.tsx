import { homeContent } from '@/features/home/data/homeContent'
import styles from './AboutBasmaSection.module.css'

export function AboutBasmaSection() {
  const { basma } = homeContent

  return (
    <section id="about-basma" className={styles.section} aria-labelledby="basma-title">
      <div className={styles.copy}>
        <h2 id="basma-title" className='gradiant_text'>{basma.title}</h2>
        <p>{basma.body}</p>
      </div>

      <img className={styles.artwork} src={basma.artwork} alt="Basma visual identity" loading="eager" />
    </section>
  )
}
