import { useRef } from 'react'
import { AboutBasmaSection } from '@/features/home/components/AboutBasmaSection/AboutBasmaSection'
import { CollaborationSection } from '@/features/home/components/CollaborationSection/CollaborationSection'
import { ContactSection } from '@/features/home/components/ContactSection/ContactSection'
import { HeroSection } from '@/features/home/components/HeroSection/HeroSection'
import { HowWeWorkSection } from '@/features/home/components/HowWeWorkSection/HowWeWorkSection'
import { ServicesSection } from '@/features/home/components/ServicesSection/ServicesSection'
import { SiteFooter } from '@/features/home/components/SiteFooter/SiteFooter'
import { SiteHeader } from '@/features/home/components/SiteHeader/SiteHeader'
import { WhoWeAreSection } from '@/features/home/components/WhoWeAreSection/WhoWeAreSection'
import { WorkSection } from '@/features/home/components/WorkSection/WorkSection'
import { WhyBasmaSection } from '@/features/home/components/WhyBasmaSection/WhyBasmaSection'
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
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <WhoWeAreSection />
        <AboutBasmaSection />
        <ServicesSection />
        <div className={styles.partnershipStory}>
          <CollaborationSection />
          <HowWeWorkSection />
        </div>
        <WorkSection />
        <WhyBasmaSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
