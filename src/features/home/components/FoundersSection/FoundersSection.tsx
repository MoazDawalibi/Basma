import foundersNav from '@/assets/Founders-nav.png'
import foundersRibbon from '@/assets/Founders-nav2.png'
import type { HomeContent } from '@/features/home/data/homeContent'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './FoundersSection.module.css'

type Founder = HomeContent['founders']['people'][number]

type FounderProfileProps = {
  founder: Founder
  mirrored?: boolean
}

function FounderProfile({
  founder,
  mirrored = false,
}: FounderProfileProps) {
  return (
    <article
      className={`${styles.profile} ${
        mirrored ? styles.profileMirrored : ''
      }`}
    >
      <div data-reveal data-reveal-delay="1" className={styles.copy}>
        <h3>{founder.name}</h3>

        <p className={styles.role}>
          {founder.role}
        </p>

        <p className={styles.bio}>
          {founder.bio}
        </p>
      </div>

      <img
        data-reveal
        className={styles.portrait}
        src={founder.image}
        alt={founder.imageAlt}
        loading="lazy"
        decoding="async"
      />
    </article>
  )
}

export function FoundersSection() {
  const { founders } = useHomeContent()

  return (
    <section
      id="founders"
      className={styles.section}
      aria-labelledby="founders-title"
    >
      <img
        className={styles.ribbon}
        src={foundersRibbon}
        alt=""
        aria-hidden="true"
      />

      <div className={styles.titleBand}>
        <img
          className={styles.titleArtwork}
          src={foundersNav}
          alt=""
          aria-hidden="true"
        />

        <h2 data-reveal id="founders-title">
          {founders.title}
        </h2>
      </div>

      <div className={styles.inner}>
        <div className={styles.list}>
          {founders.people.map((founder, index) => (
            <FounderProfile
              key={index}
              founder={founder}
              mirrored={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
