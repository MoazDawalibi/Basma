import { useState } from 'react'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './SiteHeader.module.css'

type Theme = 'light' | 'dark'

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('basma-theme', theme)
  window.dispatchEvent(new CustomEvent<Theme>('basma-theme-change', { detail: theme }))
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-white')
    .trim()
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
    'content',
    themeColor,
  )
}

export function ThemeToggle() {
  const { ui } = useHomeContent()
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  const isDark = theme === 'dark'
  const accessibleLabel = isDark ? ui.switchToLightMode : ui.switchToDarkMode

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <svg className={styles.themeIcon} viewBox="0 0 24 24" aria-hidden="true">
        {isDark ? (
          <path d="M12 3.25v2M12 18.75v2M3.25 12h2M18.75 12h2M5.81 5.81l1.42 1.42M16.77 16.77l1.42 1.42M18.19 5.81l-1.42 1.42M7.23 16.77l-1.42 1.42M16.25 12A4.25 4.25 0 1 1 7.75 12a4.25 4.25 0 0 1 8.5 0Z" />
        ) : (
          <path d="M19.55 15.62A8.1 8.1 0 0 1 8.38 4.45 8.1 8.1 0 1 0 19.55 15.62Z" />
        )}
      </svg>
      <span className={styles.themeLabel}>{isDark ? ui.lightMode : ui.darkMode}</span>
    </button>
  )
}
