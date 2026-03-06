import { Navigation } from "@/components/landing/navigation"
import { Hero } from "@/components/landing/hero"
import { InteractiveChatDemo } from "@/components/landing/interactive-chat-demo"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { BenefitsShowcase } from "@/components/landing/benefits-showcase"
import { Testimonials } from "@/components/landing/testimonials"
import { Pricing } from "@/components/landing/pricing"
import { FAQ } from "@/components/landing/faq"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <InteractiveChatDemo />
      <Features />
      <HowItWorks />
      <BenefitsShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
