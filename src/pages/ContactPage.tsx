import { useState } from 'react'
import { useApp } from '@/context/AppContext'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const { addToast } = useApp()
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    addToast('Message sent! We will get back to you soon.')
  }

  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Contact</h1>
        {sent ? (
          <p className="text-saif-dim">Thank you for reaching out. We will respond shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="text" placeholder="Name" className="input" />
            <input required type="email" placeholder="Email" className="input" />
            <textarea required rows={5} placeholder="Message" className="input resize-none" />
            <button type="submit" className="btn btn-primary w-full">Send Message</button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  )
}
