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

// Smooth color gradient bridges between sections
function Blend({ from, to, size = 'md' }: { from: string; to: string; size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'sm' ? '40px' : size === 'lg' ? '100px' : '72px'
  return (
    <div
      style={{ height: h, background: `linear-gradient(to bottom, ${from}, ${to})` }}
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
      {/* dark → beige */}
      <Blend from="#0A0A0A" to="#F5F4F0" size="lg" />
      <Services />
      <TechStack />
      <Stats />
      <Process />
      <Portfolio />
      <Pricing />
      {/* white → beige */}
      <Blend from="#FFFFFF" to="#F5F4F0" size="sm" />
      <Testimonials />
      {/* beige → dark */}
      <Blend from="#F5F4F0" to="#0A0A0A" size="lg" />
      <About />
      {/* dark → white */}
      <Blend from="#0A0A0A" to="#FFFFFF" size="lg" />
      <FAQ />
      {/* white → dark */}
      <Blend from="#FFFFFF" to="#0A0A0A" size="lg" />
      <Contact />
      {/* dark → accent green */}
      <Blend from="#0A0A0A" to="#B3FF47" size="lg" />
      <CTA />
      {/* accent green → dark */}
      <Blend from="#B3FF47" to="#0A0A0A" size="lg" />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
