import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Privacy</h1>
        <p className="text-sm text-saif-dim leading-relaxed">
          SAIF STORE respects your privacy. We collect only the information necessary to process your orders and improve your experience. We do not sell your data to third parties.
        </p>
      </div>
      <Footer />
    </div>
  )
}
