import type { Locale } from '@/i18n/catalog'
import { useLocale } from '@/i18n/useLocale'
import styles from './SiteHeader.module.css'

const options: Array<{ locale: Locale; label: string; accessibleLabel: string }> = [
  { locale: 'en', label: 'EN', accessibleLabel: 'Switch to English' },
  { locale: 'ar', label: 'AR', accessibleLabel: 'التبديل إلى العربية' },
]

export function LanguageToggle() {
  const { locale, setLocale, content } = useLocale()

  return (
    <div className={styles.languageToggle} role="group" aria-label={content.ui.languageSelection}>
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          className={styles.languageOption}
          data-active={locale === option.locale}
          aria-label={option.accessibleLabel}
          aria-pressed={locale === option.locale}
          lang={option.locale}
          onClick={() => setLocale(option.locale)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
