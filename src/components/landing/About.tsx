/**
 * About.tsx
 * Drop into src/components/landing/
 * Add to Index.tsx below Features or above HowItWorks
 */
export default function About() {
  return (
    <section className='py-20 px-4 md:px-8'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12'>
        {/* Image side */}
        <div className='relative shadow-elegant rounded-2xl overflow-hidden shrink-0 max-w-md w-full'>
          <img
            className='w-full aspect-square object-cover'
            src='https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop'
            alt='Person reviewing their resume on a laptop'
          />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white/80 w-16 h-16 flex items-center justify-center backdrop-blur-sm rounded-full bg-white/10'>
            <svg
              width='15'
              height='18'
              viewBox='0 0 15 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.027 3.371c0-1.374 1.512-2.213 2.678-1.484l9.11 5.693a1.75 1.75 0 0 1 0 2.969l-9.11 5.693c-1.166.729-2.678-.11-2.678-1.484z'
                fill='#fff'
                stroke='#fff'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        {/* Text side */}
        <div className='text-sm text-muted-foreground max-w-lg'>
          <h2 className='text-xl uppercase font-semibold text-foreground tracking-wide'>
            What we do
          </h2>
          <div className='w-24 h-[3px] rounded-full bg-gradient-primary mt-2' />

          <p className='mt-8 text-base leading-relaxed'>
            ResumeAI helps you turn your experience into a resume that actually
            gets read — by both people and the software standing between you and
            your next interview.
          </p>
          <p className='mt-4 text-base leading-relaxed'>
            Build your resume section by section, get AI-assisted suggestions
            for your summary and bullet points, and check your ATS score against
            a real job description before you hit send. Choose from four
            professionally designed templates and switch anytime without losing
            your content.
          </p>
          <p className='mt-4 text-base leading-relaxed'>
            No design skills required, no bloated software to learn — just a
            focused tool built around one goal: helping you land the interview.
          </p>

          <a
            href='/register'
            className='flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition-transform bg-gradient-primary py-3 px-8 rounded-full text-primary-foreground font-medium'
          >
            <span>Get started free</span>
            <svg
              width='13'
              height='12'
              viewBox='0 0 13 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z'
                fill='currentColor'
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
