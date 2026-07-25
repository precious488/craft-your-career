import { motion } from 'framer-motion'
import { Layout, UserPlus, Sparkles, Download } from 'lucide-react'

const steps = [
  {
    icon: Layout,
    title: 'Choose a template',
    description:
      'Pick from professionally designed, ATS-friendly resume templates.',
  },
  {
    icon: UserPlus,
    title: 'Add your information',
    description: 'Fill in your experience, education, skills, and more.',
  },
  {
    icon: Sparkles,
    title: 'AI improves your resume',
    description: 'Let AI sharpen your wording and optimize for maximum impact.',
  },
  {
    icon: Download,
    title: 'Download and apply',
    description:
      'Export as a polished PDF and start applying to your dream jobs.',
  },
]

const HowItWorks = () => {
  return (
    <section id='how-it-works' className='py-24 bg-paper'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-2xl mx-auto text-center mb-20'
        >
          <div className='font-mono text-xs tracking-[0.18em] text-rust uppercase mb-4'>
            The process
          </div>
          <h2 className='font-serif text-4xl font-semibold text-ink mb-4'>
            How it works
          </h2>
          <p className='text-lg text-ink/60 leading-relaxed'>
            Four steps stand between you and your next interview.
          </p>
        </motion.div>

        <div className='relative max-w-5xl mx-auto'>
          {/* Connecting line — desktop only */}
          <div className='hidden md:block absolute top-8 left-0 right-0 h-px bg-ink/15'>
            <div className='h-full bg-rust/40' style={{ width: '75%' }} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6'>
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className='relative flex flex-col items-center text-center'
              >
                {/* Node */}
                <div className='relative z-10 w-16 h-16 rounded-full bg-white border-2 border-ink/15 flex items-center justify-center mb-5'>
                  <step.icon className='w-6 h-6 text-rust' strokeWidth={1.75} />
                  <span className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-desk flex items-center justify-center'>
                    <span className='font-mono text-[10px] font-semibold text-gold'>
                      {i + 1}
                    </span>
                  </span>
                </div>

                <h3 className='font-serif text-lg font-semibold text-ink mb-2'>
                  {step.title}
                </h3>
                <p className='text-ink/60 leading-relaxed text-sm max-w-[220px]'>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
