import { AboutBasmaSection } from '@/features/home/components/AboutBasmaSection/AboutBasmaSection'
import { FoundersSection } from '@/features/home/components/FoundersSection/FoundersSection'
import { HeroSection } from '@/features/home/components/HeroSection/HeroSection'
import { ServicesSection } from '@/features/home/components/ServicesSection/ServicesSection'
import { SiteHeader } from '@/features/home/components/SiteHeader/SiteHeader'
import { WhoWeAreSection } from '@/features/home/components/WhoWeAreSection/WhoWeAreSection'
import { WorkSection } from '@/features/home/components/WorkSection/WorkSection'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div id="top" className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <WhoWeAreSection />
        <FoundersSection />
        <AboutBasmaSection />
        <ServicesSection />
        <WorkSection />
      </main>
    </div>
  )
}
