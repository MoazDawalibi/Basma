export type Locale = 'en' | 'ar'
export type LocalizedText = Record<Locale, string>
export type PublicationStatus = 'published' | 'draft'

export type MediaAsset = { url: string; alt: LocalizedText }
export type LocalizedLink = { label: LocalizedText; href: string }

export type Statistic = {
  id: string
  value: number
  suffix: string
  label: LocalizedText
  sortOrder: number
  status: PublicationStatus
}

export type Service = {
  id: string
  title: LocalizedText
  body: LocalizedText
  icon: string
  sortOrder: number
  status: PublicationStatus
}

export type Project = {
  id: string
  title: LocalizedText
  body: LocalizedText
  image: MediaAsset
  projectUrl: string
  category: string
  features: Record<Locale, string[]>
  featured: boolean
  sortOrder: number
  status: PublicationStatus
}

export type SocialLink = {
  id: string
  label: string
  href: string
  icon: 'instagram' | 'linkedin' | 'x'
  enabled: boolean
}

export type MarketingItem = { id: string; kind: string; title: LocalizedText; body: LocalizedText }

export type BasmaContent = {
  hero: { title: LocalizedText; subtitle: LocalizedText; artwork: MediaAsset; primaryAction: LocalizedLink; secondaryAction: LocalizedLink }
  about: { title: LocalizedText; body: LocalizedText; action: LocalizedLink }
  aboutBasma: { title: LocalizedText; body: LocalizedText; image: MediaAsset }
  statistics: { items: Statistic[] }
  services: { title: LocalizedText; body: LocalizedText; items: Service[] }
  projects: { titleStart: LocalizedText; titleAccent: LocalizedText; body: LocalizedText; cards: Project[] }
  contact: { title: LocalizedText; subtitle: LocalizedText; formTitle: LocalizedText; formBody: LocalizedText; image: MediaAsset; submitLabel: LocalizedText; responseTime: LocalizedText }
  socialLinks: SocialLink[]
  marketing: {
    collaboration: {
      eyebrow: LocalizedText
      titleLead: LocalizedText
      titleAccent: LocalizedText
      subtitle: LocalizedText
      areas: Array<{ id: string; kind: 'technology' | 'design'; title: LocalizedText; body: LocalizedText; items: Record<Locale, string[]> }>
      statementLead: LocalizedText
      statementAccent: LocalizedText
    }
    process: { eyebrow: LocalizedText; title: LocalizedText; subtitle: LocalizedText; steps: MarketingItem[] }
    whyBasma: { eyebrow: LocalizedText; title: LocalizedText; subtitle: LocalizedText; items: MarketingItem[] }
  }
}

export type ContactSubmission = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'archived'
  createdAt: string
}

export type MediaLibraryItem = { name: string; url: string; size: number; uploadedAt: string }
