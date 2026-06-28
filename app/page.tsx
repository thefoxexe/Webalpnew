import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import TechStack from '@/components/TechStack'
import Stats from '@/components/Stats'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

// Narrow gradient seam — only used at high-contrast color boundaries
function Blend({ from, to }: { from: string; to: string }) {
  return (
    <div
      style={{ height: '32px', background: `linear-gradient(to bottom, ${from}, ${to})` }}
      aria-hidden="true"
    />
  )
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      {/* #0A0A0A → #F5F4F0 */}
      <Blend from="#0A0A0A" to="#F5F4F0" />
      <Services />
      <TechStack />
      <Stats />
      <Process />
      <Portfolio />
      <Pricing />
      <Testimonials />
      {/* #F5F4F0 → #0A0A0A */}
      <Blend from="#F5F4F0" to="#0A0A0A" />
      <About />
      {/* #0A0A0A → #FFFFFF */}
      <Blend from="#0A0A0A" to="#FFFFFF" />
      <FAQ />
      {/* #FFFFFF → #0A0A0A */}
      <Blend from="#FFFFFF" to="#0A0A0A" />
      <Contact />
      {/* #0A0A0A → #B3FF47 */}
      <Blend from="#0A0A0A" to="#B3FF47" />
      <CTA />
      {/* #B3FF47 → #0A0A0A */}
      <Blend from="#B3FF47" to="#0A0A0A" />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
