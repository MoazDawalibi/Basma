import { useRef } from 'react'
import { AboutBasmaSection } from '@/features/home/components/AboutBasmaSection/AboutBasmaSection'
import { ContactSection } from '@/features/home/components/ContactSection/ContactSection'
import { FoundersSection } from '@/features/home/components/FoundersSection/FoundersSection'
import { HeroSection } from '@/features/home/components/HeroSection/HeroSection'
import { ServicesSection } from '@/features/home/components/ServicesSection/ServicesSection'
import { SiteFooter } from '@/features/home/components/SiteFooter/SiteFooter'
import { SiteHeader } from '@/features/home/components/SiteHeader/SiteHeader'
import { WhoWeAreSection } from '@/features/home/components/WhoWeAreSection/WhoWeAreSection'
import { WorkSection } from '@/features/home/components/WorkSection/WorkSection'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './HomePage.module.css'

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const { ui } = useHomeContent()

  useRevealOnScroll(pageRef)

  return (
    <div ref={pageRef} id="top" className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        {ui.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <WhoWeAreSection />
        <FoundersSection />
        <AboutBasmaSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
