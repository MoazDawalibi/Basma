import { useState, type FormEvent } from 'react'
import { submitContactSubmission } from '@/features/home/api/backendContent'
import { useHomeContent } from '@/i18n/useLocale'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const { contact, ui } = useHomeContent()
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmitStatus('sending')

    try {
      await submitContactSubmission({
        firstName: String(formData.get('firstName') ?? ''),
        lastName: String(formData.get('lastName') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        message: String(formData.get('message') ?? ''),
      })
      form.reset()
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
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
                <input name="firstName" type="text" placeholder={ui.firstName} autoComplete="given-name" required />
              </label>
              <label>
                <span>{ui.lastName}</span>
                <input name="lastName" type="text" placeholder={ui.lastName} autoComplete="organization" required />
              </label>
            </div>

            <label>
              <span>{ui.email}</span>
              <input name="email" type="email" placeholder={ui.email} autoComplete="email" required />
            </label>

            <label>
              <span>{ui.phoneNumber}</span>
              <input name="phone" type="text" placeholder={ui.phoneNumber} autoComplete="off" />
            </label>

            <label>
              <span>{ui.message}</span>
              <textarea name="message" placeholder={ui.message} rows={5} required />
            </label>

            {submitStatus !== 'idle' ? (
              <p className={styles.formStatus} role="status">
                {submitStatus === 'sending' ? ui.contactSending : null}
                {submitStatus === 'success' ? ui.contactSuccess : null}
                {submitStatus === 'error' ? ui.contactError : null}
              </p>
            ) : null}

            <button data-reveal data-reveal-delay="1" type="submit" disabled={submitStatus === 'sending'}>
              {submitStatus === 'sending' ? ui.contactSending : contact.submitLabel}
            </button>
          </form>
        </div>

        <div data-reveal data-reveal-delay="1" className={styles.imageFrame}>
          <img src={contact.image} alt={contact.imageAlt} loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}
