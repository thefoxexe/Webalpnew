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

// Subtle radial line — fades in from centre, invisible at edges.
// Only used between same-palette sections (beige ↔ white).
// High-contrast boundaries (dark ↔ light) need no separator: the colour shift speaks for itself.
function Divider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'radial-gradient(ellipse 55% 100% at 50% 0%, rgba(0,0,0,0.10) 0%, transparent 100%)',
      }}
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
      {/* #0A0A0A → #F5F4F0 : hard cut, contrast carries it */}
      <Services />
      <Divider />
      <TechStack />
      <Divider />
      <Stats />
      <Divider />
      <Process />
      <Portfolio />
      <Pricing />
      <Divider />
      <Testimonials />
      {/* #F5F4F0 → #0A0A0A : hard cut */}
      <About />
      {/* #0A0A0A → #FFFFFF : hard cut */}
      <FAQ />
      {/* #FFFFFF → #0A0A0A : hard cut */}
      <Contact />
      {/* #0A0A0A → #B3FF47 : hard cut */}
      <CTA />
      {/* #B3FF47 → #0A0A0A : hard cut */}
      <Footer />
      <FloatingCTA />
    </main>
  )
}
