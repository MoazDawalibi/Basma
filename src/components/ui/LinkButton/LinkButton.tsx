import { useEffect, useRef, useState, type AnchorHTMLAttributes, type PointerEvent, type PropsWithChildren } from 'react'
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
  onPointerCancel,
  onPointerDown,
  onPointerLeave,
  onPointerUp,
  variant = 'light',
  ...anchorProps
}: LinkButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const pressTimeoutRef = useRef<number | undefined>(undefined)
  const classes = [styles.root, styles[variant], isPressed ? styles.pressed : null, className].filter(Boolean).join(' ')

  useEffect(() => () => {
    window.clearTimeout(pressTimeoutRef.current)
  }, [])

  const releasePressed = () => {
    window.clearTimeout(pressTimeoutRef.current)
    pressTimeoutRef.current = window.setTimeout(() => {
      setIsPressed(false)
    }, 220)
  }

  return (
    <a
      data-reveal
      className={classes}
      onPointerCancel={(event: PointerEvent<HTMLAnchorElement>) => {
        releasePressed()
        onPointerCancel?.(event)
      }}
      onPointerDown={(event: PointerEvent<HTMLAnchorElement>) => {
        setIsPressed(true)
        onPointerDown?.(event)
      }}
      onPointerLeave={(event: PointerEvent<HTMLAnchorElement>) => {
        releasePressed()
        onPointerLeave?.(event)
      }}
      onPointerUp={(event: PointerEvent<HTMLAnchorElement>) => {
        releasePressed()
        onPointerUp?.(event)
      }}
      {...anchorProps}
    >
      {children}
    </a>
  )
}
