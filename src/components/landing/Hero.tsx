// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ArrowRight, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Hero = () => {
//   return (
//     <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
//       {/* Decorative elements */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 relative">
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
//               <Sparkles className="w-4 h-4" />
//               AI-Powered Resume Builder
//             </div>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground"
//           >
//             Build Your Perfect{" "}
//             <span className="text-gradient-primary">Resume</span>{" "}
//             in Minutes
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
//           >
//             Create ATS-optimized, professional resumes with AI assistance.
//             Stand out from the crowd and land your dream job faster.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <Link to="/dashboard">
//               <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 px-8 h-12 text-base shadow-glow">
//                 Build Your Resume
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </Link>
//             <a href="#templates">
//               <Button size="lg" variant="outline" className="h-12 text-base px-8">
//                 View Templates
//               </Button>
//             </a>
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="mt-6 text-sm text-muted-foreground"
//           >
//             ✓ Free forever &nbsp; ✓ No credit card required &nbsp; ✓ ATS-friendly templates
//           </motion.p>
//         </div>

//         {/* Resume Preview Mock */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="mt-16 max-w-4xl mx-auto"
//         >
//           <div className="relative">
//             <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-10 scale-105" />
//             <div className="relative bg-card rounded-2xl shadow-elegant border border-border overflow-hidden">
//               <div className="h-8 bg-muted flex items-center px-4 gap-2">
//                 <div className="w-3 h-3 rounded-full bg-destructive/60" />
//                 <div className="w-3 h-3 rounded-full bg-warning/60" />
//                 <div className="w-3 h-3 rounded-full bg-success/60" />
//               </div>
//               <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//                 <div className="md:col-span-1 space-y-4">
//                   <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto" />
//                   <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
//                   <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
//                   <div className="space-y-2 mt-6">
//                     <div className="h-3 bg-primary/20 rounded w-full" />
//                     <div className="h-3 bg-primary/15 rounded w-4/5" />
//                     <div className="h-3 bg-primary/10 rounded w-3/5" />
//                   </div>
//                 </div>
//                 <div className="md:col-span-2 space-y-6">
//                   <div>
//                     <div className="h-5 bg-foreground/10 rounded w-1/3 mb-3" />
//                     <div className="h-3 bg-muted rounded w-full mb-2" />
//                     <div className="h-3 bg-muted rounded w-5/6 mb-2" />
//                     <div className="h-3 bg-muted rounded w-4/6" />
//                   </div>
//                   <div>
//                     <div className="h-5 bg-foreground/10 rounded w-1/4 mb-3" />
//                     <div className="h-3 bg-muted rounded w-full mb-2" />
//                     <div className="h-3 bg-muted rounded w-3/4 mb-2" />
//                     <div className="h-3 bg-muted rounded w-5/6" />
//                   </div>
//                   <div>
//                     <div className="h-5 bg-foreground/10 rounded w-1/5 mb-3" />
//                     <div className="flex gap-2 flex-wrap">
//                       {["React", "TypeScript", "Node.js", "Python"].map((s) => (
//                         <div key={s} className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
//                           {s}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import { ArrowRight } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// const keywords = ['React', 'TypeScript', 'Leadership', 'Node.js']

// const Hero = () => {
//   return (
//     <section className='relative overflow-hidden bg-desk pt-32 pb-24'>
//       <div
//         className='pointer-events-none absolute inset-0 opacity-40'
//         style={{
//           background:
//             'radial-gradient(ellipse 900px 500px at 20% 0%, #3A2A1B 0%, transparent 60%)',
//         }}
//       />

//       <div className='container relative mx-auto px-4'>
//         <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
//           {/* Left: copy */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className='inline-flex items-center gap-2 mb-7 font-mono text-xs tracking-[0.18em] text-gold uppercase'
//             >
//               <span className='w-6 h-px bg-gold/60' />
//               AI resume builder
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.08 }}
//               className='font-serif text-5xl md:text-6xl font-semibold leading-[1.08] text-paper mb-6'
//             >
//               Every career has a
//               <br />
//               <span className='italic text-rust'>first draft.</span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.16 }}
//               className='text-lg text-paper/65 mb-10 max-w-md leading-relaxed'
//             >
//               ResumeAI turns your experience into a resume recruiters actually
//               read — written, formatted, and checked against real ATS systems
//               before you hit send.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.24 }}
//               className='flex flex-col sm:flex-row gap-4'
//             >
//               <Link to='/dashboard'>
//                 <Button
//                   size='lg'
//                   className='bg-rust hover:bg-rust-dark text-paper px-7 h-12 text-base rounded-md w-full sm:w-auto'
//                 >
//                   Start your resume
//                   <ArrowRight className='ml-2 w-4 h-4' />
//                 </Button>
//               </Link>
//               <a href='#templates'>
//                 <Button
//                   size='lg'
//                   variant='outline'
//                   className='h-12 text-base px-7 rounded-md border-paper/25 text-paper bg-transparent hover:bg-paper/5 hover:text-paper w-full sm:w-auto'
//                 >
//                   See templates
//                 </Button>
//               </a>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className='mt-8 font-mono text-xs tracking-wide text-paper/40'
//             >
//               Free to start · no credit card · export unlimited PDFs
//             </motion.p>
//           </div>

//           {/* Right: signature element — the resume on the desk */}
//           <motion.div
//             initial={{ opacity: 0, y: 30, rotate: -1 }}
//             animate={{ opacity: 1, y: 0, rotate: -2 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className='relative mx-auto max-w-sm lg:max-w-none'
//           >
//             <div
//               className='relative bg-paper rounded-sm shadow-2xl px-8 pt-9 pb-8'
//               style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)' }}
//             >
//               <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-rust/70' />

//               <div className='pl-4'>
//                 <div className='h-3 w-2/3 bg-ink/85 rounded-sm mb-2' />
//                 <div className='h-2 w-1/3 bg-ink/30 rounded-sm mb-6' />

//                 <div className='font-mono text-[10px] tracking-widest text-ink/40 mb-2'>
//                   SUMMARY
//                 </div>
//                 <div className='space-y-1.5 mb-5'>
//                   <div className='h-1.5 bg-ink/10 rounded-sm w-full' />
//                   <div className='h-1.5 bg-ink/10 rounded-sm w-11/12' />
//                   <div className='h-1.5 bg-ink/10 rounded-sm w-4/5' />
//                 </div>

//                 <div className='font-mono text-[10px] tracking-widest text-ink/40 mb-2'>
//                   EXPERIENCE
//                 </div>
//                 <div className='space-y-1.5 mb-5'>
//                   <div className='h-1.5 bg-ink/10 rounded-sm w-full' />
//                   <div className='h-1.5 bg-ink/10 rounded-sm w-5/6' />
//                   <div className='h-1.5 bg-ink/10 rounded-sm w-3/4' />
//                 </div>

//                 <div className='font-mono text-[10px] tracking-widest text-ink/40 mb-2'>
//                   SKILLS
//                 </div>
//                 <div className='flex flex-wrap gap-1.5'>
//                   {keywords.map((k) => (
//                     <span
//                       key={k}
//                       className='font-mono text-[10px] px-2 py-0.5 border border-ink/15 text-ink/60 rounded-sm'
//                     >
//                       {k}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Wax seal ATS badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
//               animate={{ opacity: 1, scale: 1, rotate: -8 }}
//               transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
//               className='absolute -right-5 -bottom-6 w-24 h-24 rounded-full bg-gold flex flex-col items-center justify-center shadow-lg'
//               style={{ boxShadow: '0 12px 24px -6px rgba(201,162,39,0.5)' }}
//             >
//               <span className='font-mono text-[9px] tracking-widest text-desk/70'>
//                 ATS SCORE
//               </span>
//               <span className='font-serif text-2xl font-semibold text-desk'>
//                 98
//               </span>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const keywords = ['React', 'TypeScript', 'Leadership', 'Node.js']

const Hero = () => {
  return (
    <section className='relative overflow-hidden public\1.jfif pt-32 pb-24'>
      <div
        className='absolute inset-0 bg-cover'
        style={{
          backgroundImage: "url('public/2.jpg')",
          backgroundPosition: 'center 20%',
          filter: 'sepia(0.35) saturate(1.1) brightness(0.9)',
        }}
      />
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            'linear-gradient(100deg, rgba(22,15,10,0.75) 0%, rgba(22,15,10,0.65) 40%, rgba(36,27,20,0.45) 62%, rgba(36,27,20,0.2) 100%)',
        }}
      />
      <div
        className='pointer-events-none absolute inset-0 opacity-40'
        style={{
          background:
            'radial-gradient(ellipse 900px 500px at 20% 0%, #3A2A1B 0%, transparent 60%)',
        }}
      />

      <div className='container relative mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='inline-flex items-center gap-2 mb-7 font-mono text-xs tracking-[0.18em] text-gold uppercase'
            >
              <span className='w-6 h-px bg-gold/60' />
              AI resume builder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className='font-serif text-5xl md:text-6xl font-semibold leading-[1.08] text-paper mb-6'
            >
              Every career has a
              <br />
              <span className='italic text-rust'>first draft.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className='text-lg text-paper/65 mb-10 max-w-md leading-relaxed'
            >
              ResumeAI turns your experience into a resume recruiters actually
              read — written, formatted, and checked against real ATS systems
              before you hit send.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Link to='/dashboard'>
                <Button
                  size='lg'
                  className='bg-rust hover:bg-rust-dark text-paper px-7 h-12 text-base rounded-md w-full sm:w-auto'
                >
                  Start your resume
                  <ArrowRight className='ml-2 w-4 h-4' />
                </Button>
              </Link>
              <a href='#templates'>
                <Button
                  size='lg'
                  variant='outline'
                  className='h-12 text-base px-7 rounded-md border-paper/25 text-paper bg-transparent hover:bg-paper/5 hover:text-paper w-full sm:w-auto'
                >
                  See templates
                </Button>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='mt-8 font-mono text-xs tracking-wide text-paper/40'
            >
              Free to start · no credit card · export unlimited PDFs
            </motion.p>
          </div>

          {/* Right: signature element — the resume on the desk */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='relative mx-auto max-w-sm lg:max-w-none'
          >
            <div
              className='relative bg-paper rounded-sm shadow-2xl px-8 pt-7 pb-8'
              style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)' }}
            >
              <div className='absolute left-0 top-0 bottom-0 w-[3px] bg-rust/70' />

              <div className='pl-4'>
                {/* Name + title */}
                <div className='font-serif text-lg font-semibold text-ink mb-0.5'>
                  Alex Morgan
                </div>
                <div className='font-mono text-[9px] tracking-widest text-ink/45 uppercase mb-1'>
                  Product Designer
                </div>
                <div className='font-mono text-[8px] text-ink/35 mb-5'>
                  alex.morgan@email.com · San Francisco, CA
                </div>

                {/* Summary */}
                <div className='font-mono text-[10px] tracking-widest text-ink/40 mb-1.5'>
                  SUMMARY
                </div>
                <p className='text-[10px] leading-relaxed text-ink/60 mb-4'>
                  Product designer with 6+ years in B2B SaaS.
                </p>

                {/* Experience */}
                <div className='font-mono text-[10px] tracking-widest text-ink/40 mb-1.5'>
                  EXPERIENCE
                </div>
                <div className='mb-4'>
                  <div className='flex items-baseline justify-between'>
                    <span className='text-[11px] font-semibold text-ink/80'>
                      Senior Designer
                    </span>
                    <span className='font-mono text-[8px] text-ink/35'>
                      2022–Present
                    </span>
                  </div>
                  <div className='text-[9px] text-ink/45 mb-1'>
                    Northwind Co.
                  </div>
                  <p className='text-[9.5px] leading-relaxed text-ink/55'>
                    Led redesign of core dashboard, improving task completion by
                    32%.
                  </p>
                </div>

                {/* Skills */}
                <div className='font-mono text-[10px] tracking-widest text-ink/40 mb-2'>
                  SKILLS
                </div>
                <div className='flex flex-wrap gap-1.5'>
                  {keywords.map((k) => (
                    <span
                      key={k}
                      className='font-mono text-[10px] px-2 py-0.5 border border-ink/15 text-ink/60 rounded-sm'
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Wax seal ATS badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
              className='absolute -right-5 -bottom-6 w-24 h-24 rounded-full bg-gold flex flex-col items-center justify-center shadow-lg'
              style={{ boxShadow: '0 12px 24px -6px rgba(201,162,39,0.5)' }}
            >
              <span className='font-mono text-[9px] tracking-widest text-desk/70'>
                ATS SCORE
              </span>
              <span className='font-serif text-2xl font-semibold text-desk'>
                98
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
