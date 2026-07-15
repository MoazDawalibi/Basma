import type { HomeContent } from '@/features/home/data/homeContent'
import {
  defaultContentCatalog,
  type Locale,
  type LocalizedContentCatalog,
} from '@/i18n/catalog'

type LocalizedText = Record<Locale, string>

type MediaAsset = {
  url: string
  alt: LocalizedText
}

type BackendFounder = {
  id: string
  name: LocalizedText
  role: LocalizedText
  bio: LocalizedText
  image: MediaAsset
}

type BackendService = {
  id: string
  title: LocalizedText
  body: LocalizedText
}

type BackendProject = {
  id: string
  title: LocalizedText
  body: LocalizedText
  image: MediaAsset
  projectUrl: string
  features: Record<Locale, string[]>
}

type BackendContent = {
  whoWeAre: {
    body: LocalizedText
  }
  founders: {
    cards: BackendFounder[]
  }
  aboutBasma: {
    body: LocalizedText
    image: MediaAsset
  }
  numbers: {
    yearsOfExperience: number
    clientSatisfactionRate: number
    projectsDelivered: number
  }
  services: {
    body: LocalizedText
    items: BackendService[]
  }
  projects: {
    body: LocalizedText
    cards: BackendProject[]
  }
  footer: {
    socialLinks: HomeContent['footer']['socialLinks']
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
  if (!url || url.startsWith('http') || url.startsWith('data:')) {
    return url
  }

  return `${backendBaseUrl}${url}`
}

function mapBackendContentForLocale(
  backendContent: BackendContent,
  locale: Locale,
): HomeContent {
  const fallbackContent = defaultContentCatalog[locale] ?? defaultContentCatalog.en

  if (!fallbackContent) {
    throw new Error('Missing fallback website content.')
  }

  const stats = [
    {
      ...fallbackContent.stats[0],
      value: backendContent.numbers.yearsOfExperience,
    },
    {
      ...fallbackContent.stats[1],
      value: backendContent.numbers.clientSatisfactionRate,
    },
    {
      ...fallbackContent.stats[2],
      value: backendContent.numbers.projectsDelivered,
    },
  ]

  return {
    ...fallbackContent,
    about: {
      ...fallbackContent.about,
      body: backendContent.whoWeAre.body[locale],
    },
    founders: {
      ...fallbackContent.founders,
      people: backendContent.founders.cards.map((founder) => ({
        name: founder.name[locale],
        role: founder.role[locale],
        bio: founder.bio[locale],
        image: mediaUrl(founder.image.url),
        imageAlt: founder.image.alt[locale],
      })),
    },
    basma: {
      ...fallbackContent.basma,
      body: backendContent.aboutBasma.body[locale],
      artwork: mediaUrl(backendContent.aboutBasma.image.url),
      imageAlt: backendContent.aboutBasma.image.alt[locale],
    },
    stats,
    services: {
      ...fallbackContent.services,
      body: backendContent.services.body[locale],
      items: backendContent.services.items.map((service) => ({
        title: service.title[locale],
        description: service.body[locale],
      })),
    },
    work: {
      ...fallbackContent.work,
      subtitle: backendContent.projects.body[locale],
      projects: backendContent.projects.cards.map((project) => ({
        title: project.title[locale],
        description: project.body[locale],
        image: mediaUrl(project.image.url),
        imageAlt: project.image.alt[locale],
        projectUrl: project.projectUrl,
        features: project.features[locale],
      })),
    },
    footer: {
      ...fallbackContent.footer,
      socialLinks: backendContent.footer.socialLinks,
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

  if (!response.ok) {
    throw new Error('Could not load backend content.')
  }

  return mapBackendContent(await response.json() as BackendContent)
}

export async function submitContactSubmission(input: ContactSubmissionInput) {
  const response = await fetch(`${backendBaseUrl}/api/contact-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error('Could not send contact submission.')
  }

  return response.json()
}
