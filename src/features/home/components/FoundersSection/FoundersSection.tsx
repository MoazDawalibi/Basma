import foundersNav from '@/assets/Founders-nav.png'
import foundersRibbon from '@/assets/Founders-nav2.png'
import { homeContent } from '@/features/home/data/homeContent'
import styles from './FoundersSection.module.css'

type Founder = (typeof homeContent.founders.people)[number]

function FounderProfile({ founder, mirrored = false }: { founder: Founder; mirrored?: boolean }) {
  return (
    <article className={`${styles.profile} ${mirrored ? styles.profileMirrored : ''}`}>
      <img className={styles.portrait} src={founder.image} alt={founder.imageAlt} loading="lazy" />
      <div className={styles.copy}>
        <h3>{founder.name}</h3>
        <p className={styles.role}>{founder.role}</p>
        <p className={styles.bio}>{founder.bio}</p>
      </div>
    </article>
  )
}

export function FoundersSection() {
  const { founders } = homeContent

  return (
    <section id="founders" className={styles.section} aria-labelledby="founders-title">
      <img className={styles.ribbon} src={foundersRibbon} alt="" aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.titleBand}>
          <img className={styles.titleArtwork} src={foundersNav} alt="" aria-hidden="true" />
          <h2 id="founders-title">{founders.title}</h2>
        </div>

        <div className={styles.list}>
          {founders.people.map((founder, index) => (
            <FounderProfile key={`${founder.name}-${index}`} founder={founder} mirrored={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
