import type { FormEvent } from 'react'
import { homeContent } from '@/features/home/data/homeContent'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const { contact } = homeContent

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.header}>
        <h2 id="contact-title" className="gradiant_text">
          <span>{contact.titleStart} </span> 
        </h2>
        <p>{contact.subtitle}</p>
      </div>

      <div className={styles.panel}>
        <div className={styles.formWrap}>
          <h3>{contact.formTitle}</h3>
          <p>{contact.formBody}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameRow}>
              <label>
                <span>First Name</span>
                <input name="firstName" type="text" placeholder="First Name" autoComplete="given-name" />
              </label>
              <label>
                <span>Last Name</span>
                <input name="lastName" type="text" placeholder="Last Name" autoComplete="family-name" />
              </label>
            </div>

            <label>
              <span>Email</span>
              <input name="email" type="email" placeholder="Email" autoComplete="email" />
            </label>

            <label>
              <span>Phone Number</span>
              <input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" />
            </label>

            <label>
              <span>Message</span>
              <textarea name="message" placeholder="Message" rows={5} />
            </label>

            <button type="submit">{contact.submitLabel}</button>
          </form>
        </div>

        <div className={styles.imageFrame}>
          <img src={contact.image} alt={contact.imageAlt} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}
