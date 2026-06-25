import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import TemplatesSection from '@/components/landing/TemplatesSection'
import HowItWorks from '@/components/landing/HowItWorks'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'
import Testimonial from '@/components/landing/Testimonial'
import Contact from '@/components/landing/Contact'
import AdaptedHero from '@/components/landing/Ahero'
const Index = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <AdaptedHero />
      {/* <Hero /> */}
      <Features />
      <TemplatesSection />
      <HowItWorks />
      <Testimonial />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <CTASection />
      <Contact />
      <Footer />
    </div>
  )
}

export default Index
