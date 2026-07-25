// import { motion } from "framer-motion";
// import { Sparkles, Target, Layout, Eye, Download } from "lucide-react";

// const features = [
//   {
//     icon: Sparkles,
//     title: "AI Resume Writing",
//     description: "Let AI craft compelling bullet points and professional summaries tailored to your experience.",
//   },
//   {
//     icon: Target,
//     title: "ATS Optimization",
//     description: "Ensure your resume passes Applicant Tracking Systems with keyword optimization and scoring.",
//   },
//   {
//     icon: Layout,
//     title: "Professional Templates",
//     description: "Choose from beautifully designed templates that recruiters love. Modern, classic, and minimal styles.",
//   },
//   {
//     icon: Eye,
//     title: "Real-time Preview",
//     description: "See changes instantly as you type. What you see is exactly what recruiters will see.",
//   },
//   {
//     icon: Download,
//     title: "Instant PDF Export",
//     description: "Download your resume as a perfectly formatted PDF, ready to send to employers.",
//   },
// ];

// const Features = () => {
//   return (
//     <section id="features" className="py-24 bg-background">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-foreground mb-4">
//             Everything You Need to Land the Job
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Powerful features designed to help you create the perfect resume in minutes, not hours.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {features.map((feature, i) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300"
//             >
//               <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5">
//                 <feature.icon className="w-6 h-6 text-primary-foreground" />
//               </div>
//               <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
//               <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
import { motion } from 'framer-motion'
import { Sparkles, Target, Layout, Eye, Download } from 'lucide-react'

const Features = () => {
  return (
    <section id='features' className='py-24 bg-paper'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-2xl mb-16'
        >
          <div className='font-mono text-xs tracking-[0.18em] text-rust uppercase mb-4'>
            What's on the page
          </div>
          <h2 className='font-serif text-4xl font-semibold text-ink mb-4'>
            Everything a recruiter reads, handled.
          </h2>
          <p className='text-lg text-ink/60 leading-relaxed'>
            Five things stand between a first draft and an interview. ResumeAI
            handles all five.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto'>
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='md:col-span-2 bg-white rounded-2xl border border-ink/10 p-8 md:p-10 flex flex-col justify-between min-h-[280px] hover:shadow-lg transition-shadow duration-300'
          >
            <div>
              <div className='w-12 h-12 rounded-xl bg-rust/10 flex items-center justify-center mb-6'>
                <Sparkles className='w-6 h-6 text-rust' strokeWidth={1.75} />
              </div>
              <span className='font-mono text-[10px] tracking-widest text-rust uppercase'>
                AI Writing
              </span>
              <h3 className='font-serif text-2xl md:text-3xl font-semibold text-ink mt-2 mb-3'>
                Every line, drafted for you
              </h3>
              <p className='text-ink/60 leading-relaxed text-[15px] max-w-md'>
                Let AI turn your raw experience into compelling bullet points
                and professional summaries — tailored to the role you're
                actually applying for.
              </p>
            </div>

            {/* Mini preview strip */}
            <div className='mt-8 bg-paper rounded-xl border border-ink/10 p-4 space-y-2'>
              <div className='h-2 bg-ink/15 rounded-sm w-full' />
              <div className='h-2 bg-ink/15 rounded-sm w-5/6' />
              <div className='h-2 bg-rust/25 rounded-sm w-2/3' />
            </div>
          </motion.div>

          {/* ATS card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className='bg-desk rounded-2xl p-8 flex flex-col justify-between min-h-[280px] hover:shadow-lg transition-shadow duration-300'
          >
            <div>
              <div className='w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-6'>
                <Target className='w-6 h-6 text-gold' strokeWidth={1.75} />
              </div>
              <span className='font-mono text-[10px] tracking-widest text-gold uppercase'>
                ATS Check
              </span>
              <h3 className='font-serif text-xl font-semibold text-paper mt-2 mb-3'>
                Built to pass the scan
              </h3>
              <p className='text-paper/60 leading-relaxed text-sm'>
                Keyword scoring against real Applicant Tracking Systems.
              </p>
            </div>
            <div className='mt-6 w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center self-end'>
              <span className='font-serif text-xl font-semibold text-gold'>
                98
              </span>
            </div>
          </motion.div>

          {/* Templates card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className='bg-white rounded-2xl border border-ink/10 p-8 hover:shadow-lg transition-shadow duration-300'
          >
            <div className='w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center mb-6'>
              <Layout className='w-6 h-6 text-ink/70' strokeWidth={1.75} />
            </div>
            <span className='font-mono text-[10px] tracking-widest text-ink/40 uppercase'>
              Templates
            </span>
            <h3 className='font-serif text-xl font-semibold text-ink mt-2 mb-3'>
              A frame recruiters trust
            </h3>
            <p className='text-ink/60 leading-relaxed text-sm'>
              Modern, classic, minimal, or corporate — pick the shape that fits
              the room.
            </p>
          </motion.div>

          {/* Preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className='bg-white rounded-2xl border border-ink/10 p-8 hover:shadow-lg transition-shadow duration-300'
          >
            <div className='w-12 h-12 rounded-xl bg-rust/10 flex items-center justify-center mb-6'>
              <Eye className='w-6 h-6 text-rust' strokeWidth={1.75} />
            </div>
            <span className='font-mono text-[10px] tracking-widest text-rust uppercase'>
              Preview
            </span>
            <h3 className='font-serif text-xl font-semibold text-ink mt-2 mb-3'>
              What you see is final
            </h3>
            <p className='text-ink/60 leading-relaxed text-sm'>
              Every edit renders instantly — no surprises when it lands in an
              inbox.
            </p>
          </motion.div>

          {/* Export card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32 }}
            className='bg-gold/10 rounded-2xl border border-gold/20 p-8 hover:shadow-lg transition-shadow duration-300'
          >
            <div className='w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-6'>
              <Download className='w-6 h-6 text-gold' strokeWidth={1.75} />
            </div>
            <span className='font-mono text-[10px] tracking-widest text-gold uppercase'>
              Export
            </span>
            <h3 className='font-serif text-xl font-semibold text-ink mt-2 mb-3'>
              One clean PDF, done
            </h3>
            <p className='text-ink/60 leading-relaxed text-sm'>
              Perfectly formatted, ready to attach, in seconds.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Features