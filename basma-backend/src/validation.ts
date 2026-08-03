import { z } from 'zod'

const localizedTextSchema = z.object({
  en: z.string(),
  ar: z.string(),
})

const requiredLocalizedTextSchema = localizedTextSchema.refine(
  (value) => value.en.trim() && value.ar.trim(),
  { message: 'English and Arabic values are required.' },
)

const mediaAssetSchema = z.object({
  url: z.string().min(1),
  alt: requiredLocalizedTextSchema,
})

const localizedLinkSchema = z.object({
  label: requiredLocalizedTextSchema,
  href: z.string().min(1),
})

const statusSchema = z.enum(['published', 'draft'])
const orderedSchema = {
  sortOrder: z.number().int().min(0),
  status: statusSchema,
}

type ValidationContext = z.RefinementCtx

function requireLocalizedText(
  value: z.infer<typeof localizedTextSchema>,
  context: ValidationContext,
  path: string[],
) {
  if (!value.en.trim()) {
    context.addIssue({ code: 'custom', path: [...path, 'en'], message: 'English value is required.' })
  }
  if (!value.ar.trim()) {
    context.addIssue({ code: 'custom', path: [...path, 'ar'], message: 'Arabic value is required.' })
  }
}

function requireProjectText(
  value: z.infer<typeof localizedTextSchema>,
  context: ValidationContext,
  path: string[],
) {
  if (!value.en.trim() && !value.ar.trim()) {
    context.addIssue({ code: 'custom', path, message: 'English or Arabic value is required.' })
  }
}

const statisticSchema = z.object({
  id: z.string().min(1),
  value: z.number().min(0),
  suffix: z.string().max(8),
  label: localizedTextSchema,
  ...orderedSchema,
}).superRefine((statistic, context) => {
  if (statistic.status === 'published') requireLocalizedText(statistic.label, context, ['label'])
})

const serviceSchema = z.object({
  id: z.string().min(1),
  title: localizedTextSchema,
  body: localizedTextSchema,
  icon: z.string().max(80),
  ...orderedSchema,
}).superRefine((service, context) => {
  if (service.status !== 'published') return
  requireLocalizedText(service.title, context, ['title'])
  requireLocalizedText(service.body, context, ['body'])
})

const projectSchema = z.object({
  id: z.string().min(1),
  title: localizedTextSchema,
  body: localizedTextSchema,
  image: z.object({
    url: z.string(),
    alt: localizedTextSchema,
  }),
  projectUrl: z.string().url().or(z.literal('')),
  category: z.string().min(1),
  features: z.object({
    en: z.array(z.string().trim().min(1)),
    ar: z.array(z.string().trim().min(1)),
  }),
  featured: z.boolean(),
  ...orderedSchema,
}).superRefine((project, context) => {
  if (project.status !== 'published') return

  requireProjectText(project.title, context, ['title'])
  requireProjectText(project.body, context, ['body'])
  if (!project.image.url.trim()) {
    context.addIssue({ code: 'custom', path: ['image', 'url'], message: 'Project image is required.' })
  }
  requireProjectText(project.image.alt, context, ['image', 'alt'])
})

const marketingItemSchema = z.object({
  id: z.string().min(1),
  kind: z.string().min(1),
  title: requiredLocalizedTextSchema,
  body: requiredLocalizedTextSchema,
})

export const contentSchema = z.object({
  hero: z.object({
    title: requiredLocalizedTextSchema,
    subtitle: requiredLocalizedTextSchema,
    artwork: mediaAssetSchema,
    primaryAction: localizedLinkSchema,
    secondaryAction: localizedLinkSchema,
  }),
  about: z.object({
    title: requiredLocalizedTextSchema,
    body: requiredLocalizedTextSchema,
    action: localizedLinkSchema,
  }),
  aboutBasma: z.object({
    title: requiredLocalizedTextSchema,
    body: requiredLocalizedTextSchema,
    image: mediaAssetSchema,
  }),
  statistics: z.object({ items: z.array(statisticSchema) }),
  services: z.object({
    title: requiredLocalizedTextSchema,
    body: requiredLocalizedTextSchema,
    items: z.array(serviceSchema),
  }),
  projects: z.object({
    titleStart: requiredLocalizedTextSchema,
    titleAccent: requiredLocalizedTextSchema,
    body: requiredLocalizedTextSchema,
    cards: z.array(projectSchema),
  }),
  contact: z.object({
    title: requiredLocalizedTextSchema,
    subtitle: requiredLocalizedTextSchema,
    formTitle: requiredLocalizedTextSchema,
    formBody: requiredLocalizedTextSchema,
    image: mediaAssetSchema,
    submitLabel: requiredLocalizedTextSchema,
    responseTime: requiredLocalizedTextSchema,
  }),
  socialLinks: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    href: z.string().url(),
    icon: z.enum(['instagram', 'linkedin', 'x']),
    enabled: z.boolean(),
  })),
  marketing: z.object({
    collaboration: z.object({
      eyebrow: requiredLocalizedTextSchema,
      titleLead: requiredLocalizedTextSchema,
      titleAccent: requiredLocalizedTextSchema,
      subtitle: requiredLocalizedTextSchema,
      areas: z.array(z.object({
        id: z.string().min(1),
        kind: z.enum(['technology', 'design']),
        title: requiredLocalizedTextSchema,
        body: requiredLocalizedTextSchema,
        items: z.object({ en: z.array(z.string()), ar: z.array(z.string()) }),
      })),
      statementLead: requiredLocalizedTextSchema,
      statementAccent: requiredLocalizedTextSchema,
    }),
    process: z.object({
      eyebrow: requiredLocalizedTextSchema,
      title: requiredLocalizedTextSchema,
      subtitle: requiredLocalizedTextSchema,
      steps: z.array(marketingItemSchema),
    }),
    whyBasma: z.object({
      eyebrow: requiredLocalizedTextSchema,
      title: requiredLocalizedTextSchema,
      subtitle: requiredLocalizedTextSchema,
      items: z.array(marketingItemSchema),
    }),
  }),
})

export const contentPatchSchema = contentSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: 'At least one content section is required.' },
)

export const contactSubmissionSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(180).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(3000),
})

export const contactStatusSchema = z.object({
  status: z.enum(['new', 'read', 'archived']),
})

export const adminLoginSchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(200),
})
