import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Terms</h1>
        <p className="text-sm text-saif-dim leading-relaxed">
          By using SAIF STORE, you agree to our terms of service. All sales are subject to availability. We reserve the right to refuse service to anyone.
        </p>
      </div>
      <Footer />
    </div>
  )
}
