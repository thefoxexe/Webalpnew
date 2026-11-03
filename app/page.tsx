import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import TechStack from '@/components/TechStack'
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

export const metadata: Metadata = {
  alternates: { canonical: 'https://webalp.ch' },
}

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

      <Services />
      <Divider />
      <TechStack />
      <Divider />
      <Process />
      <Portfolio />
      <Pricing />
      <Divider />
      <Testimonials />

      <About />

      <FAQ />

      <Contact />

      <CTA />

      <Footer />
      <FloatingCTA />
    </main>
  )
}
