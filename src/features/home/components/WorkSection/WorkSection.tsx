import { useRef, useState } from 'react'
import type { HomeContent } from '@/features/home/data/homeContent'
import { useLocale } from '@/i18n/useLocale'
import styles from './WorkSection.module.css'

type Project = HomeContent['work']['projects'][number]

function ProjectCard({ project, index, viewProject, keyFeatures, categoryLabel }: { project: Project; index: number; viewProject: string; keyFeatures: string; categoryLabel: string }) {
  return (
    <article data-reveal data-reveal-delay={Math.min(index, 4)} className={styles.card}>
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
            loading="lazy"
            decoding="async"
          />
          <span className={styles.imageOverlay}>{viewProject}</span>
          <span className={styles.categoryBadge}>{categoryLabel}</span>
        </a>
      ) : (
        <img
          className={styles.image}
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
      )}

      <div className={styles.cardBody}>
        <h3>{project.title}</h3>

        <p className={styles.description}>
          {project.description}
        </p>

        <p className={styles.featuresLabel}>
          {keyFeatures}
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
  const { content: { work, ui } } = useLocale()
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const visibleProjects = activeCategory === 'all'
    ? work.projects
    : work.projects.filter((project) => project.category === activeCategory)

  const selectCategory = (category: string) => {
    setActiveCategory(category)
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  const scrollSlider = (directionStep: -1 | 1) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const firstCard = track.querySelector<HTMLElement>(`.${styles.card}`)
    const distance = firstCard ? firstCard.offsetWidth + 36 : track.clientWidth * 0.8

    const directionMultiplier = getComputedStyle(track).direction === 'rtl' ? -1 : 1

    track.scrollBy({ left: directionStep * distance * directionMultiplier, behavior: 'smooth' })
  }

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div data-reveal className={styles.header}>
        <h2 id="work-title" className='gradiant_text'>
          <span>{work.titleStart}</span> <span className={styles.titleAccent}>{work.titleAccent}</span>
        </h2>
        <p>{work.subtitle}</p>
      </div>

      <div data-reveal className={styles.filters} role="group" aria-label={work.filtersLabel}>
        {work.filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={activeCategory === filter.value}
            onClick={() => selectCategory(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.slider} aria-label={ui.projectSlider}>
        <div ref={trackRef} className={styles.track} tabIndex={0} aria-live="polite">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={`${activeCategory}-${project.title}`}
              project={project}
              index={index}
              viewProject={ui.viewProject}
              keyFeatures={ui.keyFeatures}
              categoryLabel={work.filters.find((filter) => filter.value === project.category)?.label ?? project.category}
            />
          ))}
        </div>

        <div className={styles.controls} aria-label={ui.projectSliderControls}>
          <button data-reveal type="button" aria-label={ui.previousProject} onClick={() => scrollSlider(-1)}>
            <span aria-hidden="true">‹</span>
          </button>
          <button data-reveal data-reveal-delay="1" type="button" aria-label={ui.nextProject} onClick={() => scrollSlider(1)}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
