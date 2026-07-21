import { useEffect, useMemo, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from 'react'
import {
  apiBaseUrl,
  deleteMedia,
  getContactSubmissions,
  getContent,
  getMedia,
  getSession,
  login,
  logout,
  saveContent,
  updateContactStatus,
  uploadImage,
  websiteBaseUrl,
  type AdminUser,
} from './api'
import type {
  BasmaContent,
  ContactSubmission,
  Locale,
  MediaAsset,
  MediaLibraryItem,
  Project,
  PublicationStatus,
  Service,
  SocialLink,
  Statistic,
} from './types'

type Page = 'dashboard' | 'hero' | 'about' | 'statistics' | 'services' | 'projects' | 'contact' | 'social' | 'marketing' | 'media' | 'settings' | 'profile'
type Theme = 'light' | 'dark'
type UiLocale = 'en' | 'ar'
type Toast = { id: number; kind: 'success' | 'error'; message: string }

const contentPages: Array<{ id: Page; label: string; labelAr: string; icon: string }> = [
  { id: 'hero', label: 'Hero', labelAr: 'الواجهة الرئيسية', icon: '✦' },
  { id: 'about', label: 'About', labelAr: 'عن بصمة', icon: '◉' },
  { id: 'statistics', label: 'Statistics', labelAr: 'الإحصائيات', icon: '↗' },
  { id: 'services', label: 'Services', labelAr: 'الخدمات', icon: '◇' },
  { id: 'projects', label: 'Projects', labelAr: 'المشاريع', icon: '▦' },
  { id: 'contact', label: 'Contact', labelAr: 'التواصل', icon: '✉' },
  { id: 'social', label: 'Social Media', labelAr: 'التواصل الاجتماعي', icon: '◎' },
  { id: 'marketing', label: 'Marketing Texts', labelAr: 'النصوص التسويقية', icon: '✎' },
]

const pageMeta: Record<Page, { title: string; titleAr: string; description: string; descriptionAr: string }> = {
  dashboard: { title: 'Dashboard', titleAr: 'لوحة التحكم', description: 'A clear view of your website content and activity.', descriptionAr: 'نظرة واضحة على محتوى الموقع ونشاطه.' },
  hero: { title: 'Hero', titleAr: 'الواجهة الرئيسية', description: 'Manage the first message visitors see.', descriptionAr: 'إدارة أول رسالة يراها زوار الموقع.' },
  about: { title: 'About', titleAr: 'عن بصمة', description: 'Edit both About sections currently shown on the website.', descriptionAr: 'تعديل قسمي التعريف الظاهرين في الموقع.' },
  statistics: { title: 'Statistics', titleAr: 'الإحصائيات', description: 'Create, order, publish, or hide website statistics.', descriptionAr: 'إنشاء وترتيب ونشر أو إخفاء إحصائيات الموقع.' },
  services: { title: 'Services', titleAr: 'الخدمات', description: 'Keep your service offering current and ordered.', descriptionAr: 'إدارة الخدمات وترتيبها بسهولة.' },
  projects: { title: 'Projects', titleAr: 'المشاريع', description: 'Manage every detail used by the Selected Projects cards.', descriptionAr: 'إدارة كل تفاصيل بطاقات المشاريع المختارة.' },
  contact: { title: 'Contact', titleAr: 'التواصل', description: 'Edit the contact section and manage incoming enquiries.', descriptionAr: 'تعديل قسم التواصل وإدارة الرسائل الواردة.' },
  social: { title: 'Social Media', titleAr: 'التواصل الاجتماعي', description: 'Update the three social links shown in the footer.', descriptionAr: 'تحديث روابط التواصل الثلاثة في تذييل الموقع.' },
  marketing: { title: 'Marketing Texts', titleAr: 'النصوص التسويقية', description: 'Manage the partnership, process, and Why Basma stories.', descriptionAr: 'إدارة نصوص الشراكة والمنهجية ولماذا بصمة.' },
  media: { title: 'Media Library', titleAr: 'مكتبة الوسائط', description: 'Upload, preview, reuse, and remove uploaded images.', descriptionAr: 'رفع ومعاينة وإعادة استخدام وحذف الصور.' },
  settings: { title: 'Settings', titleAr: 'الإعدادات', description: 'Dashboard appearance, language, and API connection.', descriptionAr: 'مظهر اللوحة واللغة والاتصال بالخادم.' },
  profile: { title: 'Profile', titleAr: 'الملف الشخصي', description: 'Your current administration session.', descriptionAr: 'جلسة الإدارة الحالية.' },
}

const emptyLocalized = () => ({ en: '', ar: '' })
const emptyMedia = (): MediaAsset => ({ url: '', alt: emptyLocalized() })
const newId = () => crypto.randomUUID()

function mediaPreviewUrl(url: string) {
  if (!url || url.startsWith('http') || url.startsWith('data:')) return url
  if (url.startsWith('/media/')) return `${websiteBaseUrl}${url}`
  return `${apiBaseUrl}${url}`
}

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= items.length) return items
  const next = [...items]
  const [item] = next.splice(index, 1)
  if (item) next.splice(target, 0, item)
  return next
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return <label className="field"><span>{label}</span>{children}{hint ? <small>{hint}</small> : null}</label>
}

function TextField({ label, value, onChange, multiline = false, rows = 4, placeholder }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; rows?: number; placeholder?: string }) {
  return <Field label={label}>{multiline ? <textarea rows={rows} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /> : <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />}</Field>
}

function Panel({ title, eyebrow, children, actions, className = '' }: { title: string; eyebrow?: string; children: ReactNode; actions?: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>
    <div className="panelHeader"><div>{eyebrow ? <p>{eyebrow}</p> : null}<h2>{title}</h2></div>{actions ? <div className="panelActions">{actions}</div> : null}</div>
    {children}
  </section>
}

function ItemActions({ index, total, onMove, onRemove }: { index: number; total: number; onMove: (direction: -1 | 1) => void; onRemove: () => void }) {
  return <div className="itemActions">
    <button className="iconButton" type="button" disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move up">↑</button>
    <button className="iconButton" type="button" disabled={index === total - 1} onClick={() => onMove(1)} aria-label="Move down">↓</button>
    <button className="iconButton danger" type="button" onClick={onRemove} aria-label="Delete">×</button>
  </div>
}

function StatusSelect({ value, onChange }: { value: PublicationStatus; onChange: (value: PublicationStatus) => void }) {
  return <select className={`statusSelect ${value}`} value={value} onChange={(event) => onChange(event.target.value as PublicationStatus)}><option value="published">Published</option><option value="draft">Draft</option></select>
}

function MediaEditor({ label, value, token, locale, onChange, notify }: { label: string; value: MediaAsset; token: string; locale: Locale; onChange: (value: MediaAsset) => void; notify: (kind: Toast['kind'], message: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const upload = async (file?: File) => {
    if (!file) return
    setUploading(true)
    try {
      const result = await uploadImage(file, token)
      onChange({ ...value, url: result.url })
      notify('success', 'Image uploaded successfully')
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    void upload(event.dataTransfer.files[0])
  }

  return <div className="mediaEditor">
    <div className={`dropZone ${dragging ? 'dragging' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={drop}>
      {value.url ? <img src={mediaPreviewUrl(value.url)} alt={value.alt[locale] || label} /> : <div className="mediaEmpty"><strong>Drop image here</strong><span>PNG, JPG, WEBP · max 4 MB</span></div>}
      <label className="uploadButton"><input type="file" accept="image/*" disabled={uploading} onChange={(event: ChangeEvent<HTMLInputElement>) => { void upload(event.target.files?.[0]); event.target.value = '' }} />{uploading ? 'Uploading…' : value.url ? 'Replace image' : 'Choose image'}</label>
    </div>
    <div className="mediaInputs">
      <TextField label={`${label} URL`} value={value.url} onChange={(url) => onChange({ ...value, url })} />
      <TextField label={`Alt text · ${locale.toUpperCase()}`} value={value.alt[locale]} onChange={(alt) => onChange({ ...value, alt: { ...value.alt, [locale]: alt } })} />
      {value.url ? <button type="button" className="textButton danger" onClick={() => onChange({ ...value, url: '' })}>Remove from section</button> : null}
    </div>
  </div>
}

function LanguageTabs({ value, onChange }: { value: Locale; onChange: (locale: Locale) => void }) {
  return <div className="languageTabs" role="group" aria-label="Content language"><button type="button" className={value === 'en' ? 'active' : ''} onClick={() => onChange('en')}>EN</button><button type="button" className={value === 'ar' ? 'active' : ''} onClick={() => onChange('ar')}>عربي</button></div>
}

function LoginScreen({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await onLogin(email, password)
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Could not sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="loginScreen">
    <section className="loginCard">
      <div className="loginBrand"><span>B</span><div><strong>Basma</strong><small>Content studio</small></div></div>
      <div className="loginHeading"><p>ADMIN DASHBOARD</p><h1>Welcome back</h1><span>Sign in to manage the Basma website.</span></div>
      <form onSubmit={(event) => void submit(event)}>
        <Field label="Email address"><input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" /></Field>
        <Field label="Password"><input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /></Field>
        {error ? <div className="loginError" role="alert"><span>!</span>{error}</div> : null}
        <button className="loginButton" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <small className="loginFooter">Protected administrator access</small>
    </section>
  </main>
}

function App() {
  const [content, setContent] = useState<BasmaContent | null>(null)
  const [page, setPage] = useState<Page>('dashboard')
  const [contentLocale, setContentLocale] = useState<Locale>('en')
  const [uiLocale, setUiLocale] = useState<UiLocale>(() => localStorage.getItem('basma-dashboard-ui-locale') === 'ar' ? 'ar' : 'en')
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('basma-dashboard-theme') as Theme) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [token, setToken] = useState(() => sessionStorage.getItem('basma-dashboard-session') ?? '')
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [media, setMedia] = useState<MediaLibraryItem[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [dirty, setDirty] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [contactFilter, setContactFilter] = useState<'all' | ContactSubmission['status']>('all')
  const [projectPage, setProjectPage] = useState(1)
  const [toasts, setToasts] = useState<Toast[]>([])

  const isArabic = uiLocale === 'ar'
  const t = (en: string, ar: string) => isArabic ? ar : en
  const meta = pageMeta[page]

  const notify = (kind: Toast['kind'], message: string) => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, kind, message }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3800)
  }

  const edit = (mutator: (draft: BasmaContent) => void) => {
    setContent((current) => {
      if (!current) return current
      const next = structuredClone(current)
      mutator(next)
      return next
    })
    setDirty(true)
  }

  const localized = (value: Record<Locale, string>, next: string) => ({ ...value, [contentLocale]: next })

  const loadContent = async () => {
    setLoading(true)
    try {
      setContent(await getContent())
    } catch (error) {
      notify('error', error instanceof Error ? error.message : 'Could not load content')
    } finally {
      setLoading(false)
    }
  }

  const loadContacts = async () => {
    try { setContacts(await getContactSubmissions(token)) } catch (error) { notify('error', error instanceof Error ? error.message : 'Could not load contacts') }
  }

  const loadMedia = async () => {
    try { setMedia(await getMedia(token)) } catch (error) { notify('error', error instanceof Error ? error.message : 'Could not load media') }
  }

  useEffect(() => {
    let active = true

    if (!token) {
      setAdminUser(null)
      setContent(null)
      setLoading(false)
      setAuthLoading(false)
      return () => { active = false }
    }

    setAuthLoading(true)
    void getSession(token)
      .then(({ user }) => {
        if (!active) return
        setAdminUser(user)
        return loadContent()
      })
      .catch(() => {
        if (!active) return
        sessionStorage.removeItem('basma-dashboard-session')
        setToken('')
        setAdminUser(null)
      })
      .finally(() => { if (active) setAuthLoading(false) })

    return () => { active = false }
  }, [token])
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('basma-dashboard-theme', theme) }, [theme])
  useEffect(() => {
    localStorage.removeItem('basma-dashboard-token')
    if (token) sessionStorage.setItem('basma-dashboard-session', token)
    else sessionStorage.removeItem('basma-dashboard-session')
  }, [token])
  useEffect(() => { localStorage.setItem('basma-dashboard-ui-locale', uiLocale) }, [uiLocale])
  useEffect(() => { if (!adminUser) return; if (page === 'contact' || page === 'dashboard') void loadContacts(); if (page === 'media') void loadMedia() }, [page, adminUser, token])
  useEffect(() => { setQuery(''); setProjectPage(1); setSidebarOpen(false) }, [page])
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const save = async () => {
    if (!content) return
    setIsSaving(true)
    try {
      setContent(await saveContent(content, token))
      setDirty(false)
      notify('success', t('Changes saved', 'تم حفظ التغييرات'))
    } catch (error) {
      notify('error', error instanceof Error ? error.message : t('Validation failed', 'فشل التحقق من البيانات'))
    } finally { setIsSaving(false) }
  }

  const signIn = async (email: string, password: string) => {
    const session = await login(email, password)
    sessionStorage.setItem('basma-dashboard-session', session.token)
    setToken(session.token)
    setAdminUser(session.user)
  }

  const signOut = async () => {
    if (dirty && !window.confirm(t('You have unsaved changes. Sign out anyway?', 'لديك تغييرات غير محفوظة. هل تريد تسجيل الخروج؟'))) return
    try { await logout(token) } catch { /* The client-held session is still cleared. */ }
    sessionStorage.removeItem('basma-dashboard-session')
    setToken('')
    setAdminUser(null)
    setDirty(false)
  }

  const navigate = (next: Page) => {
    if (dirty && !window.confirm(t('You have unsaved changes. Leave this section?', 'لديك تغييرات غير محفوظة. هل تريد مغادرة القسم؟'))) return
    setPage(next)
  }

  const confirmRemove = (label: string, action: () => void) => {
    if (window.confirm(t(`Delete ${label}? This change is applied after saving.`, `حذف ${label}؟ سيتم تطبيق التغيير بعد الحفظ.`))) action()
  }

  const unread = contacts.filter((contact) => contact.status === 'new').length
  const publishedProjects = content?.projects.cards.filter((project) => project.status === 'published').length ?? 0
  const publishedServices = content?.services.items.filter((service) => service.status === 'published').length ?? 0

  const filteredProjects = useMemo(() => content?.projects.cards.filter((project) => `${project.title.en} ${project.title.ar} ${project.category}`.toLowerCase().includes(query.toLowerCase())) ?? [], [content, query])
  const pageSize = 6
  const projectPageCount = Math.max(1, Math.ceil(filteredProjects.length / pageSize))
  const visibleProjects = filteredProjects.slice((projectPage - 1) * pageSize, projectPage * pageSize)
  const filteredContacts = contacts.filter((contact) => contactFilter === 'all' || contact.status === contactFilter)

  if (authLoading) return <main className="loadingScreen"><div className="loaderLogo">B</div><div className="skeleton wide" /><div className="skeleton" /></main>
  if (!token || !adminUser) return <LoginScreen onLogin={signIn} />
  if (loading || !content) return <main className="loadingScreen"><div className="loaderLogo">B</div><div className="skeleton wide" /><div className="skeleton" /><button type="button" onClick={() => void loadContent()}>{t('Retry', 'إعادة المحاولة')}</button></main>

  const input = (label: string, value: Record<Locale, string>, onChange: (next: Record<Locale, string>) => void, multiline = false) => <TextField label={`${label} · ${contentLocale.toUpperCase()}`} value={value[contentLocale]} multiline={multiline} onChange={(next) => onChange(localized(value, next))} />

  const renderDashboard = () => <div className="pageStack">
    <div className="metricGrid">
      {[['▦', publishedProjects, t('Published projects', 'مشروع منشور')], ['◇', publishedServices, t('Active services', 'خدمة نشطة')], ['✉', unread, t('New enquiries', 'رسالة جديدة')], ['◎', content.socialLinks.filter((link) => link.enabled).length, t('Social channels', 'قناة تواصل')]].map(([icon, value, label]) => <article className="metricCard" key={String(label)}><span>{icon}</span><strong>{value}</strong><p>{label}</p></article>)}
    </div>
    <div className="dashboardGrid">
      <Panel title={t('Website content', 'محتوى الموقع')} eyebrow={t('Quick access', 'وصول سريع')}>
        <div className="quickGrid">{contentPages.map((item) => <button type="button" key={item.id} onClick={() => navigate(item.id)}><span>{item.icon}</span><div><strong>{isArabic ? item.labelAr : item.label}</strong><small>{t('Open editor', 'فتح المحرر')}</small></div><b>→</b></button>)}</div>
      </Panel>
      <Panel title={t('Recent enquiries', 'أحدث الرسائل')} eyebrow={unread ? t(`${unread} need attention`, `${unread} بحاجة للمراجعة`) : t('All caught up', 'لا رسائل جديدة')} actions={<button className="textButton" type="button" onClick={() => navigate('contact')}>{t('View all', 'عرض الكل')}</button>}>
        <div className="inboxList">{contacts.slice(0, 4).map((contact) => <button type="button" key={contact.id} onClick={() => navigate('contact')}><span className={`avatar ${contact.status}`}>{contact.firstName.charAt(0)}</span><div><strong>{contact.firstName} {contact.lastName}</strong><small>{contact.email}</small></div><time>{new Date(contact.createdAt).toLocaleDateString(uiLocale)}</time></button>)}{!contacts.length ? <div className="emptyCompact">{t('No messages yet.', 'لا توجد رسائل حتى الآن.')}</div> : null}</div>
      </Panel>
    </div>
  </div>

  const renderHero = () => <Panel title={t('Hero content', 'محتوى الواجهة')} eyebrow={t('Website content', 'محتوى الموقع')}>
    <div className="formGrid">{input('Title', content.hero.title, (title) => edit((draft) => { draft.hero.title = title }))}{input('Subtitle', content.hero.subtitle, (subtitle) => edit((draft) => { draft.hero.subtitle = subtitle }), true)}</div>
    <div className="divider" />
    <div className="formGrid">{input('Primary button', content.hero.primaryAction.label, (label) => edit((draft) => { draft.hero.primaryAction.label = label }))}<TextField label="Primary button link" value={content.hero.primaryAction.href} onChange={(href) => edit((draft) => { draft.hero.primaryAction.href = href })} />{input('Secondary button', content.hero.secondaryAction.label, (label) => edit((draft) => { draft.hero.secondaryAction.label = label }))}<TextField label="Secondary button link" value={content.hero.secondaryAction.href} onChange={(href) => edit((draft) => { draft.hero.secondaryAction.href = href })} /></div>
    <MediaEditor label="Hero artwork" value={content.hero.artwork} token={token} locale={contentLocale} notify={notify} onChange={(artwork) => edit((draft) => { draft.hero.artwork = artwork })} />
  </Panel>

  const renderAbout = () => <div className="pageStack">
    <Panel title={t('Business purpose', 'هدف العمل')} eyebrow={t('First About section', 'قسم التعريف الأول')}><div className="formGrid single">{input('Title', content.about.title, (title) => edit((draft) => { draft.about.title = title }))}{input('Body', content.about.body, (body) => edit((draft) => { draft.about.body = body }), true)}</div><div className="formGrid">{input('Button text', content.about.action.label, (label) => edit((draft) => { draft.about.action.label = label }))}<TextField label="Button link" value={content.about.action.href} onChange={(href) => edit((draft) => { draft.about.action.href = href })} /></div></Panel>
    <Panel title={t('About Basma', 'عن بصمة')} eyebrow={t('Second About section', 'قسم التعريف الثاني')}><div className="formGrid single">{input('Title', content.aboutBasma.title, (title) => edit((draft) => { draft.aboutBasma.title = title }))}{input('Body', content.aboutBasma.body, (body) => edit((draft) => { draft.aboutBasma.body = body }), true)}</div><MediaEditor label="About image" value={content.aboutBasma.image} token={token} locale={contentLocale} notify={notify} onChange={(image) => edit((draft) => { draft.aboutBasma.image = image })} /></Panel>
  </div>

  const renderStatistics = () => <div className="pageStack"><div className="listToolbar"><p>{content.statistics.items.length} {t('statistics', 'إحصائيات')}</p><button className="primaryButton" type="button" onClick={() => edit((draft) => { draft.statistics.items.push({ id: newId(), value: 0, suffix: '+', label: emptyLocalized(), sortOrder: draft.statistics.items.length, status: 'draft' }) })}>＋ {t('Add statistic', 'إضافة إحصائية')}</button></div>{content.statistics.items.map((stat, index) => <StatisticCard key={stat.id} stat={stat} index={index} total={content.statistics.items.length} locale={contentLocale} edit={edit} confirmRemove={confirmRemove} />)}</div>

  const renderServices = () => <div className="pageStack">
    <Panel title={t('Services section', 'قسم الخدمات')}><div className="formGrid single">{input('Title', content.services.title, (title) => edit((draft) => { draft.services.title = title }))}{input('Body', content.services.body, (body) => edit((draft) => { draft.services.body = body }), true)}</div></Panel>
    <div className="listToolbar"><p>{content.services.items.length} {t('services', 'خدمات')}</p><button className="primaryButton" type="button" onClick={() => edit((draft) => { draft.services.items.push({ id: newId(), title: emptyLocalized(), body: emptyLocalized(), icon: '', sortOrder: draft.services.items.length, status: 'draft' }) })}>＋ {t('Add service', 'إضافة خدمة')}</button></div>
    {content.services.items.map((service, index) => <ServiceCard key={service.id} service={service} index={index} total={content.services.items.length} locale={contentLocale} edit={edit} confirmRemove={confirmRemove} />)}
  </div>

  const renderProjects = () => <div className="pageStack">
    <Panel title={t('Selected Projects section', 'قسم المشاريع المختارة')}><div className="formGrid">{input('Title start', content.projects.titleStart, (titleStart) => edit((draft) => { draft.projects.titleStart = titleStart }))}{input('Title accent', content.projects.titleAccent, (titleAccent) => edit((draft) => { draft.projects.titleAccent = titleAccent }))}</div>{input('Subtitle', content.projects.body, (body) => edit((draft) => { draft.projects.body = body }), true)}</Panel>
    <div className="listToolbar projectToolbar"><div className="searchBox"><span>⌕</span><input value={query} placeholder={t('Search projects…', 'البحث في المشاريع…')} onChange={(event) => { setQuery(event.target.value); setProjectPage(1) }} /></div><p>{filteredProjects.length} {t('projects', 'مشروع')}</p><button className="primaryButton" type="button" onClick={() => edit((draft) => { draft.projects.cards.unshift({ id: newId(), title: emptyLocalized(), body: emptyLocalized(), image: emptyMedia(), projectUrl: '', category: 'websites', features: { en: [], ar: [] }, featured: false, sortOrder: 0, status: 'draft' }); draft.projects.cards.forEach((project, order) => { project.sortOrder = order }) })}>＋ {t('New project', 'مشروع جديد')}</button></div>
    <div className="projectGrid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} locale={contentLocale} token={token} edit={edit} notify={notify} confirmRemove={confirmRemove} />)}</div>
    <div className="pagination"><button type="button" disabled={projectPage === 1} onClick={() => setProjectPage((current) => current - 1)}>←</button><span>{t('Page', 'صفحة')} {projectPage} / {projectPageCount}</span><button type="button" disabled={projectPage === projectPageCount} onClick={() => setProjectPage((current) => current + 1)}>→</button></div>
  </div>

  const renderContact = () => <div className="pageStack">
    <Panel title={t('Contact section content', 'محتوى قسم التواصل')}><div className="formGrid">{input('Title', content.contact.title, (title) => edit((draft) => { draft.contact.title = title }))}{input('Subtitle', content.contact.subtitle, (subtitle) => edit((draft) => { draft.contact.subtitle = subtitle }), true)}{input('Form title', content.contact.formTitle, (formTitle) => edit((draft) => { draft.contact.formTitle = formTitle }))}{input('Form body', content.contact.formBody, (formBody) => edit((draft) => { draft.contact.formBody = formBody }), true)}{input('Submit button', content.contact.submitLabel, (submitLabel) => edit((draft) => { draft.contact.submitLabel = submitLabel }))}{input('Response time', content.contact.responseTime, (responseTime) => edit((draft) => { draft.contact.responseTime = responseTime }))}</div><MediaEditor label="Contact image" value={content.contact.image} token={token} locale={contentLocale} notify={notify} onChange={(image) => edit((draft) => { draft.contact.image = image })} /></Panel>
    <Panel title={t('Contact inbox', 'صندوق رسائل التواصل')} eyebrow={`${unread} ${t('new', 'جديدة')}`} actions={<button className="textButton" type="button" onClick={() => void loadContacts()}>↻ {t('Refresh', 'تحديث')}</button>}><div className="filterTabs">{(['all', 'new', 'read', 'archived'] as const).map((status) => <button type="button" className={contactFilter === status ? 'active' : ''} key={status} onClick={() => setContactFilter(status)}>{status}</button>)}</div><div className="contactTable">{filteredContacts.map((contact) => <article key={contact.id}><span className={`avatar ${contact.status}`}>{contact.firstName.charAt(0)}</span><div className="contactMain"><strong>{contact.firstName} {contact.lastName}</strong><a href={`mailto:${contact.email}`}>{contact.email}</a><p>{contact.message}</p>{contact.phone ? <small>{contact.phone}</small> : null}</div><time>{new Date(contact.createdAt).toLocaleString(uiLocale)}</time><select value={contact.status} onChange={async (event) => { try { const updated = await updateContactStatus(contact.id, event.target.value as ContactSubmission['status'], token); setContacts((current) => current.map((item) => item.id === updated.id ? updated : item)); notify('success', t('Contact status updated', 'تم تحديث حالة الرسالة')) } catch (error) { notify('error', error instanceof Error ? error.message : 'Update failed') } }}><option value="new">New</option><option value="read">Read</option><option value="archived">Archived</option></select></article>)}{!filteredContacts.length ? <div className="emptyState"><span>✉</span><h3>{t('No enquiries here', 'لا توجد رسائل هنا')}</h3></div> : null}</div></Panel>
  </div>

  const renderSocial = () => <div className="pageStack"><div className="notice"><span>i</span><p>{t('The website currently renders Instagram, LinkedIn, and X. Only those real channels are available here.', 'يعرض الموقع حاليًا إنستغرام ولينكدإن وX، لذلك تظهر هذه القنوات الفعلية فقط.')}</p></div>{content.socialLinks.map((link) => <Panel key={link.id} title={link.label} actions={<label className="switch"><input type="checkbox" checked={link.enabled} onChange={(event) => edit((draft) => { const item = draft.socialLinks.find((value) => value.id === link.id); if (item) item.enabled = event.target.checked })} /><span />{link.enabled ? t('Enabled', 'مفعّل') : t('Disabled', 'معطّل')}</label>}><div className="formGrid"><TextField label="Label" value={link.label} onChange={(label) => edit((draft) => { const item = draft.socialLinks.find((value) => value.id === link.id); if (item) item.label = label })} /><TextField label="URL" value={link.href} onChange={(href) => edit((draft) => { const item = draft.socialLinks.find((value) => value.id === link.id); if (item) item.href = href })} /></div></Panel>)}</div>

  const renderMarketing = () => <div className="pageStack">
    <Panel title="Two Minds. One Vision." eyebrow={t('Partnership section', 'قسم الشراكة')}><div className="formGrid">{input('Eyebrow', content.marketing.collaboration.eyebrow, (eyebrow) => edit((draft) => { draft.marketing.collaboration.eyebrow = eyebrow }))}{input('Title lead', content.marketing.collaboration.titleLead, (titleLead) => edit((draft) => { draft.marketing.collaboration.titleLead = titleLead }))}{input('Title accent', content.marketing.collaboration.titleAccent, (titleAccent) => edit((draft) => { draft.marketing.collaboration.titleAccent = titleAccent }))}{input('Subtitle', content.marketing.collaboration.subtitle, (subtitle) => edit((draft) => { draft.marketing.collaboration.subtitle = subtitle }), true)}{input('Statement lead', content.marketing.collaboration.statementLead, (statementLead) => edit((draft) => { draft.marketing.collaboration.statementLead = statementLead }))}{input('Statement accent', content.marketing.collaboration.statementAccent, (statementAccent) => edit((draft) => { draft.marketing.collaboration.statementAccent = statementAccent }))}</div>{content.marketing.collaboration.areas.map((area) => <div className="nestedCard" key={area.id}><h3>{area.title[contentLocale] || area.kind}</h3><div className="formGrid">{input('Area title', area.title, (title) => edit((draft) => { const item = draft.marketing.collaboration.areas.find((value) => value.id === area.id); if (item) item.title = title }))}{input('Area body', area.body, (body) => edit((draft) => { const item = draft.marketing.collaboration.areas.find((value) => value.id === area.id); if (item) item.body = body }), true)}</div><TextField label={`Items · ${contentLocale.toUpperCase()} · one per line`} multiline value={area.items[contentLocale].join('\n')} onChange={(value) => edit((draft) => { const item = draft.marketing.collaboration.areas.find((entry) => entry.id === area.id); if (item) item.items[contentLocale] = value.split('\n').filter(Boolean) })} /></div>)}</Panel>
    <Panel title="Clarity Before Complexity" eyebrow={t('How We Work section', 'قسم كيف نعمل')}><div className="formGrid">{input('Eyebrow', content.marketing.process.eyebrow, (eyebrow) => edit((draft) => { draft.marketing.process.eyebrow = eyebrow }))}{input('Title', content.marketing.process.title, (title) => edit((draft) => { draft.marketing.process.title = title }))}</div>{input('Subtitle', content.marketing.process.subtitle, (subtitle) => edit((draft) => { draft.marketing.process.subtitle = subtitle }), true)}<MarketingItems items={content.marketing.process.steps} locale={contentLocale} onEdit={(id, key, value) => edit((draft) => { const item = draft.marketing.process.steps.find((entry) => entry.id === id); if (item) item[key] = value })} /></Panel>
    <Panel title="Built Around What Moves You Forward" eyebrow={t('Why Basma section', 'قسم لماذا بصمة')}><div className="formGrid">{input('Eyebrow', content.marketing.whyBasma.eyebrow, (eyebrow) => edit((draft) => { draft.marketing.whyBasma.eyebrow = eyebrow }))}{input('Title', content.marketing.whyBasma.title, (title) => edit((draft) => { draft.marketing.whyBasma.title = title }))}</div>{input('Subtitle', content.marketing.whyBasma.subtitle, (subtitle) => edit((draft) => { draft.marketing.whyBasma.subtitle = subtitle }), true)}<MarketingItems items={content.marketing.whyBasma.items} locale={contentLocale} onEdit={(id, key, value) => edit((draft) => { const item = draft.marketing.whyBasma.items.find((entry) => entry.id === id); if (item) item[key] = value })} /></Panel>
  </div>

  const renderMedia = () => <div className="pageStack"><div className="mediaToolbar"><label className="primaryButton uploadInline"><input type="file" accept="image/*" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { await uploadImage(file, token); await loadMedia(); notify('success', t('Image uploaded successfully', 'تم رفع الصورة بنجاح')) } catch (error) { notify('error', error instanceof Error ? error.message : 'Upload failed') } event.target.value = '' }} />＋ {t('Upload image', 'رفع صورة')}</label><p>{media.length} {t('uploaded assets', 'ملفات مرفوعة')}</p></div><div className="mediaGrid">{media.map((asset) => <article key={asset.name}><img src={mediaPreviewUrl(asset.url)} alt="" /><div><strong title={asset.name}>{asset.name}</strong><small>{(asset.size / 1024).toFixed(1)} KB · {new Date(asset.uploadedAt).toLocaleDateString(uiLocale)}</small></div><div className="mediaCardActions"><button type="button" onClick={() => { void navigator.clipboard.writeText(asset.url); notify('success', t('Media URL copied', 'تم نسخ رابط الصورة')) }}>Copy URL</button><button type="button" className="danger" onClick={() => { if (!window.confirm(t('Delete this uploaded image?', 'حذف هذه الصورة المرفوعة؟'))) return; void deleteMedia(asset.name, token).then(loadMedia).then(() => notify('success', t('Image deleted', 'تم حذف الصورة'))).catch((error: unknown) => notify('error', error instanceof Error ? error.message : 'Delete failed')) }}>Delete</button></div></article>)}</div>{!media.length ? <div className="emptyState panel"><span>▧</span><h3>{t('Your media library is empty', 'مكتبة الوسائط فارغة')}</h3><p>{t('Images uploaded inside any content editor will appear here.', 'ستظهر هنا الصور التي ترفعها من أي محرر محتوى.')}</p></div> : null}</div>

  const renderSettings = () => <div className="settingsGrid"><Panel title={t('Appearance', 'المظهر')}><div className="settingRow"><div><strong>{t('Theme', 'السمة')}</strong><small>{t('Your preference is saved on this device.', 'يتم حفظ اختيارك على هذا الجهاز.')}</small></div><div className="segmented"><button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>☀ Light</button><button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>☾ Dark</button></div></div><div className="settingRow"><div><strong>{t('Dashboard language', 'لغة لوحة التحكم')}</strong><small>English / العربية</small></div><div className="segmented"><button type="button" className={uiLocale === 'en' ? 'active' : ''} onClick={() => setUiLocale('en')}>English</button><button type="button" className={uiLocale === 'ar' ? 'active' : ''} onClick={() => setUiLocale('ar')}>العربية</button></div></div></Panel><Panel title={t('API connection', 'اتصال API')}><TextField label="API URL" value={apiBaseUrl} onChange={() => undefined} /><div className="settingRow"><div><strong>{t('Signed in account', 'الحساب المسجل')}</strong><small>{adminUser.email}</small></div><strong>{t('Authenticated', 'موثّق')}</strong></div><button className="secondaryButton" type="button" onClick={() => void getSession(token).then(() => notify('success', t('Connection successful', 'تم الاتصال بنجاح'))).catch((error: unknown) => notify('error', error instanceof Error ? error.message : 'Connection failed'))}>{t('Test connection', 'اختبار الاتصال')}</button></Panel></div>

  const renderProfile = () => <Panel title={t('Administrator', 'المسؤول')} eyebrow={t('Current profile', 'الملف الحالي')} className="profilePanel"><div className="profileHero"><span>B</span><div><h3>{adminUser.name}</h3><p>{adminUser.email}</p></div></div><div className="profileFacts"><div><span>{t('Access', 'الصلاحية')}</span><strong>{t('Content management', 'إدارة المحتوى')}</strong></div><div><span>{t('Session', 'الجلسة')}</span><strong>{t('Secure session', 'جلسة آمنة')}</strong></div><div><span>{t('Content languages', 'لغات المحتوى')}</span><strong>English · العربية</strong></div></div><button className="secondaryButton profileLogout" type="button" onClick={() => void signOut()}>{t('Sign out', 'تسجيل الخروج')}</button></Panel>

  const renderPage = () => ({ dashboard: renderDashboard, hero: renderHero, about: renderAbout, statistics: renderStatistics, services: renderServices, projects: renderProjects, contact: renderContact, social: renderSocial, marketing: renderMarketing, media: renderMedia, settings: renderSettings, profile: renderProfile }[page]())

  return <main className="appShell" dir={isArabic ? 'rtl' : 'ltr'}>
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brandMark">B</div><div><strong>Basma</strong><span>Content studio</span></div><button type="button" onClick={() => setSidebarOpen(false)}>×</button></div>
      <nav>
        <button type="button" className={page === 'dashboard' ? 'active' : ''} onClick={() => navigate('dashboard')}><span className="navIcon">⌂</span><span>{t('Dashboard', 'لوحة التحكم')}</span></button>
        <div className="navGroup"><p>{t('Website Content', 'محتوى الموقع')}</p>{contentPages.map((item) => <button type="button" key={item.id} className={page === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><span className="navIcon">{item.icon}</span><span>{isArabic ? item.labelAr : item.label}</span>{item.id === 'contact' && unread ? <b>{unread}</b> : null}</button>)}</div>
        <button type="button" className={page === 'media' ? 'active' : ''} onClick={() => navigate('media')}><span className="navIcon">▧</span><span>{t('Media Library', 'مكتبة الوسائط')}</span></button>
      </nav>
      <div className="sidebarBottom"><button type="button" className={page === 'settings' ? 'active' : ''} onClick={() => navigate('settings')}><span className="navIcon">⚙</span><span>{t('Settings', 'الإعدادات')}</span></button><button type="button" className={page === 'profile' ? 'active' : ''} onClick={() => navigate('profile')}><span className="profileAvatar">B</span><span>{t('Profile', 'الملف الشخصي')}</span></button><button type="button" onClick={() => void signOut()}><span className="navIcon">↪</span><span>{t('Sign out', 'تسجيل الخروج')}</span></button></div>
    </aside>
    {sidebarOpen ? <button className="sidebarScrim" type="button" aria-label="Close menu" onClick={() => setSidebarOpen(false)} /> : null}
    <section className="workspace">
      <header className="topbar"><button className="menuButton" type="button" onClick={() => setSidebarOpen(true)}>☰</button><div className="breadcrumbs"><span>{t('Basma CMS', 'نظام بصمة')}</span><b>/</b><strong>{isArabic ? meta.titleAr : meta.title}</strong></div><div className="topActions"><LanguageTabs value={contentLocale} onChange={setContentLocale} /><button className="themeButton" type="button" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? '☀' : '☾'}</button><button className="saveButton" type="button" disabled={!dirty || isSaving} onClick={() => void save()}>{isSaving ? t('Saving…', 'جارٍ الحفظ…') : dirty ? t('Save changes', 'حفظ التغييرات') : t('Saved', 'محفوظ')}</button></div></header>
      <div className="pageHeader"><div><p>{t('Basma CMS', 'نظام بصمة')}</p><h1>{isArabic ? meta.titleAr : meta.title}</h1><span>{isArabic ? meta.descriptionAr : meta.description}</span></div>{page !== 'dashboard' && page !== 'settings' && page !== 'profile' ? <LanguageTabs value={contentLocale} onChange={setContentLocale} /> : null}</div>
      <div className="pageContent" dir={contentLocale === 'ar' && !['dashboard', 'media', 'settings', 'profile'].includes(page) ? 'rtl' : isArabic ? 'rtl' : 'ltr'}>{renderPage()}</div>
    </section>
    <div className="toastStack">{toasts.map((toast) => <div className={`toast ${toast.kind}`} key={toast.id}><span>{toast.kind === 'success' ? '✓' : '!'}</span><p>{toast.message}</p><button type="button" onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}>×</button></div>)}</div>
  </main>
}

function StatisticCard({ stat, index, total, locale, edit, confirmRemove }: { stat: Statistic; index: number; total: number; locale: Locale; edit: (mutator: (draft: BasmaContent) => void) => void; confirmRemove: (label: string, action: () => void) => void }) {
  const update = (mutator: (item: Statistic) => void) => edit((draft) => { const item = draft.statistics.items.find((value) => value.id === stat.id); if (item) mutator(item) })
  return <Panel title={stat.label[locale] || 'New statistic'} eyebrow={`#${String(index + 1).padStart(2, '0')}`} actions={<><StatusSelect value={stat.status} onChange={(status) => update((item) => { item.status = status })} /><ItemActions index={index} total={total} onMove={(direction) => edit((draft) => { draft.statistics.items = moveItem(draft.statistics.items, index, direction); draft.statistics.items.forEach((item, order) => { item.sortOrder = order }) })} onRemove={() => confirmRemove(stat.label[locale] || 'statistic', () => edit((draft) => { draft.statistics.items = draft.statistics.items.filter((item) => item.id !== stat.id) }))} /></>}><div className="threeGrid"><Field label="Number"><input type="number" min="0" value={stat.value} onChange={(event) => update((item) => { item.value = Number(event.target.value) })} /></Field><TextField label="Suffix" value={stat.suffix} onChange={(suffix) => update((item) => { item.suffix = suffix })} /><TextField label={`Label · ${locale.toUpperCase()}`} value={stat.label[locale]} onChange={(label) => update((item) => { item.label[locale] = label })} /></div></Panel>
}

function ServiceCard({ service, index, total, locale, edit, confirmRemove }: { service: Service; index: number; total: number; locale: Locale; edit: (mutator: (draft: BasmaContent) => void) => void; confirmRemove: (label: string, action: () => void) => void }) {
  const update = (mutator: (item: Service) => void) => edit((draft) => { const item = draft.services.items.find((value) => value.id === service.id); if (item) mutator(item) })
  return <Panel title={service.title[locale] || 'New service'} eyebrow={`#${String(index + 1).padStart(2, '0')}`} actions={<><StatusSelect value={service.status} onChange={(status) => update((item) => { item.status = status })} /><ItemActions index={index} total={total} onMove={(direction) => edit((draft) => { draft.services.items = moveItem(draft.services.items, index, direction); draft.services.items.forEach((item, order) => { item.sortOrder = order }) })} onRemove={() => confirmRemove(service.title[locale] || 'service', () => edit((draft) => { draft.services.items = draft.services.items.filter((item) => item.id !== service.id) }))} /></>}><div className="formGrid"><TextField label={`Title · ${locale.toUpperCase()}`} value={service.title[locale]} onChange={(title) => update((item) => { item.title[locale] = title })} /><TextField label={`Description · ${locale.toUpperCase()}`} value={service.body[locale]} multiline onChange={(body) => update((item) => { item.body[locale] = body })} /></div></Panel>
}

function ProjectCard({ project, locale, token, edit, notify, confirmRemove }: { project: Project; locale: Locale; token: string; edit: (mutator: (draft: BasmaContent) => void) => void; notify: (kind: Toast['kind'], message: string) => void; confirmRemove: (label: string, action: () => void) => void }) {
  const [open, setOpen] = useState(false)
  const update = (mutator: (item: Project) => void) => edit((draft) => { const item = draft.projects.cards.find((value) => value.id === project.id); if (item) mutator(item) })
  return <article className={`projectCard ${open ? 'open' : ''}`}>
    <div className="projectImage">{project.image.url ? <img src={mediaPreviewUrl(project.image.url)} alt={project.image.alt[locale]} /> : <span>No image</span>}<StatusSelect value={project.status} onChange={(status) => update((item) => { item.status = status })} /></div>
    <div className="projectSummary"><div><span>{project.category}</span><h2>{project.title[locale] || 'Untitled project'}</h2><p>{project.body[locale] || 'No description yet.'}</p></div><button type="button" className="secondaryButton" onClick={() => setOpen((current) => !current)}>{open ? 'Close editor' : 'Edit project'}</button></div>
    {open ? <div className="projectEditor"><div className="formGrid"><TextField label={`Project name · ${locale.toUpperCase()}`} value={project.title[locale]} onChange={(title) => update((item) => { item.title[locale] = title })} /><TextField label="Project type" value={project.category} onChange={(category) => update((item) => { item.category = category })} /><TextField label={`Description · ${locale.toUpperCase()}`} value={project.body[locale]} multiline onChange={(body) => update((item) => { item.body[locale] = body })} /><TextField label="Project URL" value={project.projectUrl} onChange={(projectUrl) => update((item) => { item.projectUrl = projectUrl })} /><Field label="Sort order"><input type="number" min="0" value={project.sortOrder} onChange={(event) => update((item) => { item.sortOrder = Number(event.target.value) })} /></Field></div><MediaEditor label="Project image" value={project.image} token={token} locale={locale} notify={notify} onChange={(image) => update((item) => { item.image = image })} /><TextField label={`Features · ${locale.toUpperCase()} · one per line`} value={project.features[locale].join('\n')} multiline rows={5} onChange={(features) => update((item) => { item.features[locale] = features.split('\n').filter(Boolean) })} /><div className="projectFooter"><label className="switch"><input type="checkbox" checked={project.featured} onChange={(event) => update((item) => { item.featured = event.target.checked })} /><span />Featured project</label><button className="textButton danger" type="button" onClick={() => confirmRemove(project.title[locale] || 'project', () => edit((draft) => { draft.projects.cards = draft.projects.cards.filter((item) => item.id !== project.id) }))}>Delete project</button></div></div> : null}
  </article>
}

function MarketingItems({ items, locale, onEdit }: { items: BasmaContent['marketing']['process']['steps']; locale: Locale; onEdit: (id: string, key: 'title' | 'body', value: Record<Locale, string>) => void }) {
  return <div className="marketingGrid">{items.map((item, index) => <div className="nestedCard" key={item.id}><span>0{index + 1}</span><TextField label={`Title · ${locale.toUpperCase()}`} value={item.title[locale]} onChange={(value) => onEdit(item.id, 'title', { ...item.title, [locale]: value })} /><TextField label={`Body · ${locale.toUpperCase()}`} value={item.body[locale]} multiline onChange={(value) => onEdit(item.id, 'body', { ...item.body, [locale]: value })} /></div>)}</div>
}

export { App }
