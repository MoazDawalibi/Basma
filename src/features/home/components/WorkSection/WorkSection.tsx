import { useCallback, useEffect, useRef, useState } from 'react'
import type { HomeContent } from '@/features/home/data/homeContent'
import { useLocale } from '@/i18n/useLocale'
import styles from './WorkSection.module.css'

type Project = HomeContent['work']['projects'][number]

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

function ProjectCard({ project, index, viewProject, keyFeatures, categoryLabel }: { project: Project; index: number; viewProject: string; keyFeatures: string; categoryLabel: string }) {
  const projectImage = (
    <>
      <img
        className={styles.image}
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        decoding="async"
      />
      <span className={styles.categoryBadge}>{categoryLabel}</span>
    </>
  )

  return (
    <article data-reveal data-reveal-delay={Math.min(index, 4)} className={styles.card}>
      {'projectUrl' in project && project.projectUrl ? (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageLink}
        >
          {projectImage}
          <span className={styles.imageOverlay}>{viewProject}</span>
        </a>
      ) : (
        <div className={styles.imageMedia}>{projectImage}</div>
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
  const [scrollAvailability, setScrollAvailability] = useState({ left: false, right: true })
  const visibleProjects = activeCategory === 'all'
    ? work.projects
    : work.projects.filter((project) => project.category === activeCategory)

  const selectCategory = (category: string) => {
    setActiveCategory(category)
    trackRef.current?.scrollTo({ left: 0, behavior: getScrollBehavior() })
  }

  const updateScrollAvailability = useCallback(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const trackRect = track.getBoundingClientRect()
    const cards = Array.from(track.querySelectorAll<HTMLElement>(`.${styles.card}`))
    const tolerance = 2

    setScrollAvailability({
      left: cards.some((card) => card.getBoundingClientRect().left < trackRect.left - tolerance),
      right: cards.some((card) => card.getBoundingClientRect().right > trackRect.right + tolerance),
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const animationFrame = window.requestAnimationFrame(updateScrollAvailability)
    const resizeObserver = new ResizeObserver(updateScrollAvailability)
    resizeObserver.observe(track)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [activeCategory, updateScrollAvailability])

  const scrollSlider = (directionStep: -1 | 1) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const firstCard = track.querySelector<HTMLElement>(`.${styles.card}`)
    const distance = firstCard ? firstCard.offsetWidth + 36 : track.clientWidth * 0.8

    track.scrollBy({
      left: directionStep * distance,
      behavior: getScrollBehavior(),
    })
  }

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div data-reveal className={styles.header}>
        <h2 id="work-title" className="section-title gradient-text">
          <span>{work.titleStart}</span> <span>{work.titleAccent}</span>
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

      <p className="sr-only" role="status" aria-live="polite">
        {visibleProjects.length} {ui.projectsShown}
      </p>

      <div className={styles.slider} role="region" aria-label={ui.projectSlider}>
        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          onScroll={updateScrollAvailability}
        >
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

        <div className={styles.controls} role="group" aria-label={ui.projectSliderControls}>
          <button
            type="button"
            aria-label={ui.previousProject}
            disabled={!scrollAvailability.left}
            onClick={() => scrollSlider(-1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            aria-label={ui.nextProject}
            disabled={!scrollAvailability.right}
            onClick={() => scrollSlider(1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
