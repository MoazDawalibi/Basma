import { useRef } from 'react'
import { homeContent } from '@/features/home/data/homeContent'
import styles from './WorkSection.module.css'

type Project = (typeof homeContent.work.projects)[number]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      {'projectUrl' in project && project.projectUrl ? (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageLink}
        >
          <img
            className={styles.image}
            src={project.image}
            alt={project.imageAlt}
          />
          <span className={styles.imageOverlay}>View Project</span>
        </a>
      ) : (
        <img
          className={styles.image}
          src={project.image}
          alt={project.imageAlt}
        />
      )}

      <div className={styles.cardBody}>
        <h3>{project.title}</h3>

        <p className={styles.description}>
          {project.description}
        </p>

        <p className={styles.featuresLabel}>
          Key Features :
        </p>

        <ul className={styles.features}>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function WorkSection() {
  const { work } = homeContent
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: -1 | 1) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const firstCard = track.querySelector<HTMLElement>(`.${styles.card}`)
    const distance = firstCard ? firstCard.offsetWidth + 36 : track.clientWidth * 0.8

    track.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className={styles.header}>
        <h2 id="work-title" className='gradiant_text'>
          <span>{work.titleStart}</span> <span className={styles.titleAccent}>{work.titleAccent}</span>
        </h2>
        <p>{work.subtitle}</p>
      </div>

      <div className={styles.slider} aria-label="Project slider">
        <div ref={trackRef} className={styles.track} tabIndex={0}>
          {work.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className={styles.controls} aria-label="Project slider controls">
          <button type="button" aria-label="Previous project" onClick={() => scrollSlider(-1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" aria-label="Next project" onClick={() => scrollSlider(1)}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
