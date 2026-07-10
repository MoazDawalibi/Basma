import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'
import styles from './LinkButton.module.css'

type LinkButtonVariant = 'light' | 'dark'

type LinkButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: LinkButtonVariant
  }
>

export function LinkButton({
  children,
  className,
  variant = 'light',
  ...anchorProps
}: LinkButtonProps) {
  const classes = [styles.root, styles[variant], className].filter(Boolean).join(' ')

  return (
    <a className={classes} {...anchorProps}>
      {children}
    </a>
  )
}
