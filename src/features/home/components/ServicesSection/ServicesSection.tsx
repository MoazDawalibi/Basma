import { useEffect, useRef, useState } from 'react'
import { homeContent } from '@/features/home/data/homeContent'
import styles from './ServicesSection.module.css'

type Stat = (typeof homeContent.stats)[number]

function AnimatedStat({ stat, shouldAnimate }: { stat: Stat; shouldAnimate: boolean }) {
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
    <li className={styles.stat}>
      <strong>
        {displayValue}
        {stat.suffix}
      </strong>
      <span>{stat.label}</span>
    </li>
  )
}

export function ServicesSection() {
  const { services, stats } = homeContent
  const statsRef = useRef<HTMLUListElement>(null)
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false)

  useEffect(() => {
    const node = statsRef.current

    if (!node) {
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
      <ul ref={statsRef} className={styles.stats} aria-label="Basma statistics">
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} stat={stat} shouldAnimate={shouldAnimateStats} />
        ))}
      </ul>

      <div className={styles.header}>
        <h2 id="services-title" className='gradiant_text'>{services.title}</h2>
        <p>{services.body}</p>
      </div>

      <ol className={styles.timeline}>
        {services.items.map((service, index) => (
          <li key={service.title} className={styles.service}>
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
