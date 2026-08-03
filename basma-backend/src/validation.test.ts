import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { seedContent } from './seed.js'
import { contentSchema } from './validation.js'

function contentWithNewProject(status: 'draft' | 'published') {
  const content = structuredClone(seedContent)
  content.projects.cards.unshift({
    id: 'al-saad-roaster',
    title: { en: 'Al Saad Roaster', ar: '' },
    body: { en: 'test', ar: '' },
    image: {
      url: '/api/media/file/project.png',
      alt: { en: 'Al Saad Roaster website', ar: '' },
    },
    projectUrl: 'https://alsaad-roaster.vercel.app/',
    category: 'websites',
    features: { en: ['test'], ar: [] },
    featured: false,
    sortOrder: 0,
    status,
  })
  content.projects.cards.forEach((project, sortOrder) => { project.sortOrder = sortOrder })
  return content
}

describe('content validation for new projects', () => {
  it('accepts an incomplete bilingual project while it is a draft', () => {
    assert.equal(contentSchema.safeParse(contentWithNewProject('draft')).success, true)
  })

  it('requires the missing Arabic fields before the project is published', () => {
    const result = contentSchema.safeParse(contentWithNewProject('published'))
    assert.equal(result.success, false)
    if (result.success) return

    const issueFields = result.error.issues.map((issue) => issue.path.join('.'))
    assert.deepEqual(issueFields, [
      'projects.cards.0.title.ar',
      'projects.cards.0.body.ar',
      'projects.cards.0.image.alt.ar',
    ])
  })
})
