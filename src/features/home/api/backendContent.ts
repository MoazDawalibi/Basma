import type { HomeContent } from '@/features/home/data/homeContent'
import {
  defaultContentCatalog,
  type Locale,
  type LocalizedContentCatalog,
} from '@/i18n/catalog'

type LocalizedText = Record<Locale, string>
type MediaAsset = { url: string; alt: LocalizedText }
type LocalizedLink = { label: LocalizedText; href: string }
type Status = 'published' | 'draft'

type BackendContent = {
  hero: {
    title: LocalizedText
    subtitle: LocalizedText
    artwork: MediaAsset
    primaryAction: LocalizedLink
    secondaryAction: LocalizedLink
  }
  about: { title: LocalizedText; body: LocalizedText; action: LocalizedLink }
  aboutBasma: { title: LocalizedText; body: LocalizedText; image: MediaAsset }
  statistics: {
    items: Array<{ id: string; value: number; suffix: string; label: LocalizedText; sortOrder: number; status: Status }>
  }
  services: {
    title: LocalizedText
    body: LocalizedText
    items: Array<{ id: string; title: LocalizedText; body: LocalizedText; sortOrder: number; status: Status }>
  }
  projects: {
    titleStart: LocalizedText
    titleAccent: LocalizedText
    body: LocalizedText
    cards: Array<{
      id: string
      title: LocalizedText
      body: LocalizedText
      image: MediaAsset
      projectUrl: string
      category: string
      features: Record<Locale, string[]>
      featured: boolean
      sortOrder: number
      status: Status
    }>
  }
  contact: {
    title: LocalizedText
    subtitle: LocalizedText
    formTitle: LocalizedText
    formBody: LocalizedText
    image: MediaAsset
    submitLabel: LocalizedText
    responseTime: LocalizedText
  }
  socialLinks: Array<{ id: string; label: string; href: string; icon: 'instagram' | 'linkedin' | 'x'; enabled: boolean }>
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
    process: {
      eyebrow: LocalizedText
      title: LocalizedText
      subtitle: LocalizedText
      steps: Array<{ id: string; kind: string; title: LocalizedText; body: LocalizedText }>
    }
    whyBasma: {
      eyebrow: LocalizedText
      title: LocalizedText
      subtitle: LocalizedText
      items: Array<{ id: string; kind: string; title: LocalizedText; body: LocalizedText }>
    }
  }
}

export type ContactSubmissionInput = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
}

export const backendBaseUrl = import.meta.env.VITE_API_URL
  || `${window.location.protocol}//${window.location.hostname}:4000`

function mediaUrl(url: string) {
  if (!url || url.startsWith('http') || url.startsWith('data:')) return url
  return `${backendBaseUrl}${url}`
}

function value(localized: LocalizedText, locale: Locale) {
  return localized[locale] || localized.en
}

function titleCase(valueToFormat: string) {
  return valueToFormat.split('-').map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ')
}

function mapBackendContentForLocale(backend: BackendContent, locale: Locale): HomeContent {
  const fallback = defaultContentCatalog[locale] ?? defaultContentCatalog.en
  if (!fallback) throw new Error('Missing fallback website content.')

  const projects = backend.projects.cards
    .filter((project) => project.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder)
  const existingFilters = new Map(fallback.work.filters.map((filter) => [filter.value, filter.label]))
  const categories = [...new Set(projects.map((project) => project.category))]

  return {
    ...fallback,
    hero: {
      title: value(backend.hero.title, locale),
      subtitle: value(backend.hero.subtitle, locale),
      artwork: mediaUrl(backend.hero.artwork.url),
      primaryAction: { label: value(backend.hero.primaryAction.label, locale), href: backend.hero.primaryAction.href },
      secondaryAction: { label: value(backend.hero.secondaryAction.label, locale), href: backend.hero.secondaryAction.href },
    },
    about: {
      title: value(backend.about.title, locale),
      body: value(backend.about.body, locale),
      action: { label: value(backend.about.action.label, locale), href: backend.about.action.href },
    },
    basma: {
      title: value(backend.aboutBasma.title, locale),
      body: value(backend.aboutBasma.body, locale),
      artwork: mediaUrl(backend.aboutBasma.image.url),
      imageAlt: value(backend.aboutBasma.image.alt, locale),
    },
    stats: backend.statistics.items
      .filter((stat) => stat.status === 'published')
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((stat) => ({ value: stat.value, suffix: stat.suffix, label: value(stat.label, locale) })),
    services: {
      title: value(backend.services.title, locale),
      body: value(backend.services.body, locale),
      items: backend.services.items
        .filter((service) => service.status === 'published')
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((service) => ({ title: value(service.title, locale), description: value(service.body, locale) })),
    },
    work: {
      ...fallback.work,
      titleStart: value(backend.projects.titleStart, locale),
      titleAccent: value(backend.projects.titleAccent, locale),
      subtitle: value(backend.projects.body, locale),
      filters: [
        fallback.work.filters[0] ?? { value: 'all', label: locale === 'ar' ? 'الكل' : 'All' },
        ...categories.map((category) => ({ value: category, label: existingFilters.get(category) ?? titleCase(category) })),
      ],
      projects: projects.map((project) => ({
        title: value(project.title, locale),
        description: value(project.body, locale),
        image: mediaUrl(project.image.url),
        imageAlt: value(project.image.alt, locale),
        projectUrl: project.projectUrl,
        category: project.category,
        features: project.features[locale],
      })),
    },
    contact: {
      titleStart: value(backend.contact.title, locale),
      subtitle: value(backend.contact.subtitle, locale),
      formTitle: value(backend.contact.formTitle, locale),
      formBody: value(backend.contact.formBody, locale),
      image: mediaUrl(backend.contact.image.url),
      imageAlt: value(backend.contact.image.alt, locale),
      submitLabel: value(backend.contact.submitLabel, locale),
      responseTime: value(backend.contact.responseTime, locale),
    },
    collaboration: {
      eyebrow: value(backend.marketing.collaboration.eyebrow, locale),
      titleLead: value(backend.marketing.collaboration.titleLead, locale),
      titleAccent: value(backend.marketing.collaboration.titleAccent, locale),
      subtitle: value(backend.marketing.collaboration.subtitle, locale),
      areas: backend.marketing.collaboration.areas.map((area) => ({
        kind: area.kind,
        title: value(area.title, locale),
        description: value(area.body, locale),
        items: area.items[locale],
      })),
      statementLead: value(backend.marketing.collaboration.statementLead, locale),
      statementAccent: value(backend.marketing.collaboration.statementAccent, locale),
    },
    process: {
      eyebrow: value(backend.marketing.process.eyebrow, locale),
      title: value(backend.marketing.process.title, locale),
      subtitle: value(backend.marketing.process.subtitle, locale),
      steps: backend.marketing.process.steps.map((step) => ({ title: value(step.title, locale), description: value(step.body, locale) })),
    },
    whyBasma: {
      eyebrow: value(backend.marketing.whyBasma.eyebrow, locale),
      title: value(backend.marketing.whyBasma.title, locale),
      subtitle: value(backend.marketing.whyBasma.subtitle, locale),
      items: backend.marketing.whyBasma.items.map((item) => ({ kind: item.kind, title: value(item.title, locale), description: value(item.body, locale) })),
    },
    footer: {
      ...fallback.footer,
      socialLinks: backend.socialLinks.filter((link) => link.enabled).map(({ label, href, icon }) => ({ label, href, icon })),
    },
  }
}

function mapBackendContent(backendContent: BackendContent): LocalizedContentCatalog {
  return {
    en: mapBackendContentForLocale(backendContent, 'en'),
    ar: mapBackendContentForLocale(backendContent, 'ar'),
  }
}

export async function fetchBackendContent(signal?: AbortSignal) {
  const response = await fetch(`${backendBaseUrl}/api/content`, { signal })
  if (!response.ok) throw new Error('Could not load backend content.')
  return mapBackendContent(await response.json() as BackendContent)
}

export async function submitContactSubmission(input: ContactSubmissionInput) {
  const response = await fetch(`${backendBaseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error('Could not send contact submission.')
  return response.json()
}
