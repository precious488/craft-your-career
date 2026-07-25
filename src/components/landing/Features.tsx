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

// export default Features;
import { motion } from 'framer-motion'
import { Sparkles, Target, Layout, Eye, Download } from 'lucide-react'

const features = [
  {
    tag: 'SUMMARY',
    icon: Sparkles,
    title: 'AI resume writing',
    description:
      'Let AI draft compelling bullet points and professional summaries tailored to your actual experience.',
  },
  {
    tag: 'SCREENING',
    icon: Target,
    title: 'ATS optimization',
    description:
      'Every resume is checked against real Applicant Tracking Systems with keyword scoring before you export.',
  },
  {
    tag: 'TEMPLATES',
    icon: Layout,
    title: 'Professional templates',
    description:
      'Choose from templates recruiters actually respond to — modern, classic, minimal, and corporate styles.',
  },
  {
    tag: 'PREVIEW',
    icon: Eye,
    title: 'Real-time preview',
    description:
      'See changes instantly as you type. What you see is exactly what a recruiter will open.',
  },
  {
    tag: 'EXPORT',
    icon: Download,
    title: 'Instant PDF export',
    description:
      'Download a perfectly formatted PDF, ready to attach to any application in seconds.',
  },
]

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

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 max-w-6xl mx-auto border border-ink/10'>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className='group bg-paper p-8 hover:bg-ink/[0.02] transition-colors duration-300'
            >
              <div className='flex items-center justify-between mb-6'>
                <span className='font-mono text-[10px] tracking-widest text-ink/35'>
                  {feature.tag}
                </span>
                <feature.icon
                  className='w-4 h-4 text-rust'
                  strokeWidth={1.75}
                />
              </div>
              <h3 className='font-serif text-xl font-semibold text-ink mb-2.5'>
                {feature.title}
              </h3>
              <p className='text-ink/60 leading-relaxed text-[15px]'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
