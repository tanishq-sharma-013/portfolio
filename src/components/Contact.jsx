import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

// You can move these to .env as VITE_EMAILJS_* vars, but using given values for demo
const EMAILJS_PUBLIC_KEY = 'Inw8S1-kwI-ZqfxP_'
const EMAILJS_SERVICE_ID = 'service_k2xodpz'
const EMAILJS_TEMPLATE_ID = 'template_1ueojux'

export default function Contact() {
  const [status, setStatus] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const subject = form.subject.value.trim()
    const message = form.message.value.trim()
    if (!name || !email || !subject || !message) { setStatus('⚠️ Please fill all fields.'); return }
    setStatus('⏳ Sending...')

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY)
      const payload = { name, time: new Date().toLocaleString(), message, reply_to: email, subject }
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, payload)
      setStatus('✅ Message sent — thank you!')
      form.reset()
      setTimeout(() => setStatus(''), 4200)
    } catch (err) {
      console.warn('EmailJS failed:', err)
      setStatus('⚠️ Could not send. Please email me directly.')
      setTimeout(() => setStatus(''), 4200)
    }
  }

  return (
    <section id="contact" data-section="contact" className="reveal" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <div className="contact-grid">
        <form id="contact-form" className="card" aria-label="Contact form" onSubmit={onSubmit}>
          <h3 style={{marginTop:0}}>Let's collaborate</h3>
          <input name="name" placeholder="Your name" required aria-label="Name" />
          <input name="email" type="email" placeholder="Your email" required aria-label="Email" />
          <input name="subject" placeholder="Subject" required aria-label="Subject" />
          <textarea name="message" placeholder="Tell me about your project..." required rows="6" aria-label="Message"></textarea>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <button className="submit" type="submit">Send message</button>
            <div style={{color:'var(--muted)',fontSize:13}} aria-live="polite">{status}</div>
          </div>
        </form>

        <aside className="card" aria-label="Other contact methods">
          <h3 style={{marginTop:0}}>Other ways to connect</h3>
          <p style={{color:'var(--muted)'}}>Email: <a href="mailto:sharmatanishq013@gmail.com">sharmatanishq013@gmail.com</a></p>
          <p style={{color:'var(--muted)'}}>Location: Bhopal, India</p>
          <div style={{display:'flex',gap:10,marginTop:10}}>
            <a className="link" href="https://github.com/tanishq-sharma-013" target="_blank" aria-label="GitHub" rel="noreferrer">GitHub</a>
            <a className="link" href="https://www.linkedin.com/in/tanishq013/" target="_blank" aria-label="LinkedIn" rel="noreferrer">LinkedIn</a>
          </div>
        </aside>
      </div>
    </section>
  )
}
