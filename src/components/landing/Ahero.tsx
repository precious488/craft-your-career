import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const AdaptedHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  }

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

          * {
            font-family: "Poppins", sans-serif;
          }
        `}
      </style>

      <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#D9D9FF] via-[#F5F0FB] to-[#F8F3F9] px-4 py-20'>
        {/* Decorative blur elements */}
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl pointer-events-none' />
        <div className='absolute bottom-0 right-1/4 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl pointer-events-none' />

        <motion.div
          className='relative z-10 max-w-4xl mx-auto text-center'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className='mb-6'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 backdrop-blur-sm'>
              <Sparkles className='w-4 h-4 text-violet-600' />
              <p className='text-sm text-violet-600 font-medium'>
                AI-Powered Resume Builder
              </p>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className='text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6'
          >
            Build Your Perfect{' '}
            <span className='bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent'>
              Resume
            </span>{' '}
            in Minutes
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed'
          >
            Create ATS-optimized, professional resumes with AI assistance. Stand
            out from the crowd and land your dream job faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-4 justify-center mb-12'
          >
            <Link to='/dashboard'>
              <Button
                size='lg'
                className='bg-gradient-primary text-primary-foreground hover:opacity-90 px-8 h-12 text-base shadow-glow'
              >
                Build Your Resume
                <ArrowRight className='ml-2 w-4 h-4' />
              </Button>
            </Link>
            <a href='#templates'>
              <Button
                size='lg'
                variant='outline'
                className='h-12 text-base px-8'
              >
                View Templates
              </Button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            variants={itemVariants}
            className='text-sm text-gray-500 mb-12'
          >
            ✓ Free forever &nbsp; ✓ No credit card required &nbsp; ✓
            ATS-friendly templates
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className='w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-12'
          />

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12'
          >
            {/* {[
              { number: '20+', label: 'Years Experience' },
              { number: '12k+', label: 'Projects Completed' },
              { number: '5k+', label: 'Happy Customers' },
              { number: '5+', label: 'Countries' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='text-center'
              >
                <h3 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                  {stat.number}
                </h3>
                <p className='text-sm md:text-base text-gray-600 font-medium'>
                  {stat.label}
                </p>
              </motion.div>
            ))} */}
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default AdaptedHero
