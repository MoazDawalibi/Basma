import { useEffect, useRef, useState } from 'react'
import type { HomeContent } from '@/features/home/data/homeContent'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './ServicesSection.module.css'

type Stat = HomeContent['stats'][number]

function AnimatedStat({ stat, shouldAnimate, index }: { stat: Stat; shouldAnimate: boolean; index: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayValue(0)
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      setDisplayValue(stat.value)
      return
    }

    let animationFrame = 0
    const duration = 1100
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3

      setDisplayValue(Math.round(stat.value * easedProgress))

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick)
      }
    }

    animationFrame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [shouldAnimate, stat.value])

  return (
    <li data-reveal data-reveal-delay={Math.min(index, 4)} className={styles.stat}>
      <strong>
        {displayValue}
        {stat.suffix}
      </strong>
      <span>{stat.label}</span>
    </li>
  )
}

export function ServicesSection() {
  const { services, stats, ui } = useHomeContent()
  const statsRef = useRef<HTMLUListElement>(null)
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false)

  useEffect(() => {
    const node = statsRef.current

    if (!node) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      setShouldAnimateStats(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldAnimateStats(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <ul ref={statsRef} className={styles.stats} aria-label={ui.statistics}>
        {stats.map((stat, index) => (
          <AnimatedStat key={stat.label} stat={stat} shouldAnimate={shouldAnimateStats} index={index} />
        ))}
      </ul>

      <div data-reveal className={styles.header}>
        <h2 id="services-title" className="section-title gradient-text">{services.title}</h2>
        <p>{services.body}</p>
      </div>

      <ol className={styles.timeline}>
        {services.items.map((service, index) => (
          <li
            key={service.title}
            data-reveal
            data-reveal-delay={Math.min(index, 4)}
            className={styles.service}
          >
            <h3>
              {index + 1}. {service.title}
            </h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
