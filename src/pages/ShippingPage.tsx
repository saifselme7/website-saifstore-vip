import Footer from '@/components/Footer'

export default function ShippingPage() {
  return (
    <div className="animate-[pageIn_0.6s_ease] pt-28 px-6 lg:px-10 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-[clamp(36px,6vw,72px)] font-black tracking-tighter text-saif-text mb-10">Shipping & Returns</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-saif-text mb-3">Shipping</h2>
            <p className="text-sm text-saif-dim leading-relaxed">Orders are processed within 1-2 business days. Digital products are delivered instantly. Physical product delivery times vary by location.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-saif-text mb-3">Returns</h2>
            <p className="text-sm text-saif-dim leading-relaxed">Physical items may be returned within 30 days of delivery. Items must be unused and in original packaging. Digital products are non-refundable.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-saif-text mb-3">Need Help?</h2>
            <p className="text-sm text-saif-dim leading-relaxed">Contact us at hello@saifstore.com for any shipping or return inquiries.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
