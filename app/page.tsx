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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Services />
      <TechStack />
      <Stats />
      <Process />
      <Portfolio />
      <Pricing />
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
