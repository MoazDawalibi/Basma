import type { FormEvent } from 'react'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const { contact, ui } = useHomeContent()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div data-reveal className={styles.header}>
        <h2 id="contact-title" className="gradiant_text">
          <span>{contact.titleStart} </span> 
        </h2>
        <p>{contact.subtitle}</p>
      </div>

      <div className={styles.panel}>
        <div data-reveal className={styles.formWrap}>
          <h3>{contact.formTitle}</h3>
          <p>{contact.formBody}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameRow}>
              <label>
                <span>{ui.firstName}</span>
                <input name="firstName" type="text" placeholder={ui.firstName} autoComplete="given-name" />
              </label>
              <label>
                <span>{ui.lastName}</span>
                <input name="lastName" type="text" placeholder={ui.lastName} autoComplete="family-name" />
              </label>
            </div>

            <label>
              <span>{ui.email}</span>
              <input name="email" type="email" placeholder={ui.email} autoComplete="email" />
            </label>

            <label>
              <span>{ui.phoneNumber}</span>
              <input name="phone" type="tel" placeholder={ui.phoneNumber} autoComplete="tel" />
            </label>

            <label>
              <span>{ui.message}</span>
              <textarea name="message" placeholder={ui.message} rows={5} />
            </label>

            <button data-reveal data-reveal-delay="1" type="submit">{contact.submitLabel}</button>
          </form>
        </div>

        <div data-reveal data-reveal-delay="1" className={styles.imageFrame}>
          <img src={contact.image} alt={contact.imageAlt} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}
