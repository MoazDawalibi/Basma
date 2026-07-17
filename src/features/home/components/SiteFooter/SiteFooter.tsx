import { useHomeContent } from '@/i18n/useLocale'
import styles from './SiteFooter.module.css'

type IconProps = {
  className: string
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.75" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.15" cy="6.85" r="1.15" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M5.2 9.35h3.35v9.7H5.2v-9.7ZM6.88 4.95a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM10.65 9.35h3.2v1.32c.6-.93 1.66-1.58 3.2-1.58 2.34 0 3.95 1.52 3.95 4.78v5.18h-3.34v-4.62c0-1.54-.56-2.38-1.75-2.38-1.25 0-1.92.87-1.92 2.38v4.62h-3.34v-9.7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function XIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="m5.1 4.75 5.85 7.67-5.5 6.83h2.3l4.27-5.3 4.04 5.3h2.84l-6.1-8.02 5.16-6.48h-2.27l-3.94 4.94-3.78-4.94H5.1Zm3.02 1.5 7.78 11.5h-1.02L7.06 6.25h1.06Z"
        fill="currentColor"
      />
    </svg>
  )
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M14.2 8.15h2.25V4.9c-.39-.05-1.73-.17-3.28-.17-3.24 0-5.46 2.03-5.46 5.76v3.24H4.05v3.64h3.66v9.18h4.49v-9.18h3.51l.56-3.64H12.2v-2.88c0-1.05.29-1.77 2-1.77Z"
        fill="currentColor"
        transform="translate(0 -3.55)"
      />
    </svg>
  )
}

function WebsiteIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.9 12h16.2M12 3.6c2.05 2.24 3.1 5.05 3.1 8.4s-1.05 6.16-3.1 8.4c-2.05-2.24-3.1-5.05-3.1-8.4S9.95 5.84 12 3.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  facebook: FacebookIcon,
  website: WebsiteIcon,
} as const

function getSocialIcon(icon: string) {
  return socialIcons[icon as keyof typeof socialIcons] ?? WebsiteIcon
}

export function SiteFooter() {
  const { footer, ui } = useHomeContent()

  return (
    <footer className={styles.footer} aria-labelledby="footer-title">
      <img
        data-reveal="from-left"
        className={styles.artwork}
        src={footer.artwork}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      <div className={styles.inner}>
        <div data-reveal className={styles.brandBlock}>
          <a id="footer-title" className={styles.brandName} href="#top">
            {footer.brandName}
          </a>
          <p className={styles.description}>{footer.description}</p>

          <ul className={styles.socialList} aria-label={ui.socialLinks}>
            {footer.socialLinks.map((item) => {
              const Icon = getSocialIcon(item.icon)
              const isExternal = item.href.startsWith('http')

              return (
                <li key={item.label}>
                  <a
                    className={styles.socialLink}
                    href={item.href}
                    aria-label={item.label}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <Icon className={styles.socialIcon} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav className={styles.linksGrid} aria-label={ui.footerNavigation}>
          {footer.columns.map((column, index) => (
            <div
              key={column.title}
              data-reveal
              data-reveal-delay={Math.min(index + 1, 4)}
              className={styles.linkColumn}
            >
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  )
}
