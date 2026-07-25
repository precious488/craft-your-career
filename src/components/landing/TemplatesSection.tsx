// import { motion } from "framer-motion";

// const templates = [
//   {
//     name: "Modern",
//     description: "Clean and contemporary design with a bold header.",
//     color: "from-primary to-primary/80",
//   },
//   {
//     name: "Classic",
//     description: "Traditional layout trusted by Fortune 500 companies.",
//     color: "from-foreground/80 to-foreground/60",
//   },
//   {
//     name: "Minimal",
//     description: "Simple, elegant design that lets your content shine.",
//     color: "from-muted-foreground to-muted-foreground/70",
//   },
//   {
//     name: "Corporate",
//     description: "Professional format optimized for corporate roles.",
//     color: "from-accent to-accent/80",
//   },
// ];

// const TemplatesSection = () => {
//   return (
//     <section id="templates" className="py-24 bg-muted/30">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-foreground mb-4">
//             Professional Templates
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Choose from our collection of ATS-friendly, recruiter-approved templates.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {templates.map((template, i) => (
//             <motion.div
//               key={template.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="group cursor-pointer"
//             >
//               <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elegant hover:border-primary/30 transition-all duration-300">
//                 {/* Template preview mock */}
//                 <div className="aspect-[3/4] p-4 relative">
//                   <div className="w-full h-full bg-background rounded-lg border border-border p-4 space-y-3">
//                     <div className={`h-8 rounded bg-gradient-to-r ${template.color} opacity-80`} />
//                     <div className="h-2 bg-muted rounded w-3/4" />
//                     <div className="h-2 bg-muted rounded w-1/2" />
//                     <div className="border-t border-border pt-3 mt-3 space-y-2">
//                       <div className="h-2 bg-muted rounded" />
//                       <div className="h-2 bg-muted rounded w-5/6" />
//                       <div className="h-2 bg-muted rounded w-4/6" />
//                     </div>
//                     <div className="border-t border-border pt-3 mt-3 space-y-2">
//                       <div className="h-2 bg-muted rounded w-2/3" />
//                       <div className="h-2 bg-muted rounded" />
//                       <div className="h-2 bg-muted rounded w-3/4" />
//                     </div>
//                     <div className="flex gap-1 flex-wrap pt-2">
//                       {[1, 2, 3].map((n) => (
//                         <div key={n} className="px-2 py-0.5 bg-muted rounded-full h-4 w-12" />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-4 border-t border-border">
//                   <h3 className="font-semibold text-foreground">{template.name}</h3>
//                   <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TemplatesSection;
import { motion, AnimatePresence } from 'framer-motion'
import { ImageOff } from 'lucide-react'
import { useState } from 'react'

// Drop your template preview images into: public/templates/
// Use real, high-resolution PNGs (at least 900x1200px) — small/compressed
// source images will always look blurry once stretched to fill the frame.
const templates = [
  {
    name: 'Modern',
    tag: '01',
    description:
      'Clean and contemporary, with a bold header and confident use of color.',
    image: '/templates/modern.png',
  },
  {
    name: 'Classic',
    tag: '02',
    description:
      'The traditional layout trusted by Fortune 500 hiring managers.',
    image: '/templates/classic.png',
  },
  {
    name: 'Minimal',
    tag: '03',
    description:
      'Simple and elegant — generous whitespace lets your content shine.',
    image: '/templates/minimal.png',
  },
  {
    name: 'Corporate',
    tag: '04',
    description:
      'A professional two-tone format optimized for corporate roles.',
    image: '/templates/corporate.png',
  },
]

const TemplatesSection = () => {
  const [active, setActive] = useState(0)
  const [imgFailed, setImgFailed] = useState<Record<number, boolean>>({})
  const current = templates[active]

  return (
    <section id='templates' className='py-24 bg-paper'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-2xl mx-auto text-center mb-16'
        >
          <div className='font-mono text-xs tracking-[0.18em] text-rust uppercase mb-4'>
            Choose your frame
          </div>
          <h2 className='font-serif text-4xl font-semibold text-ink mb-4'>
            Professional templates
          </h2>
          <p className='text-lg text-ink/60 leading-relaxed'>
            Choose from a collection of ATS-friendly, recruiter-approved
            templates.
          </p>
        </motion.div>

        <div className='max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-14 items-center md:items-stretch'>
          {/* Selector list */}
          <div className='flex md:flex-col gap-2 overflow-x-auto md:overflow-visible w-full md:w-56 shrink-0'>
            {templates.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`group text-left shrink-0 px-4 py-3.5 rounded-lg border transition-colors duration-200 ${
                  active === i
                    ? 'bg-desk border-desk'
                    : 'bg-transparent border-ink/10 hover:border-ink/25'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <span
                    className={`font-mono text-[10px] ${
                      active === i ? 'text-gold' : 'text-ink/35'
                    }`}
                  >
                    {t.tag}
                  </span>
                  <span
                    className={`font-serif text-base font-semibold whitespace-nowrap ${
                      active === i ? 'text-paper' : 'text-ink'
                    }`}
                  >
                    {t.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Stage */}
          <div className='flex-1 flex flex-col items-center'>
            <div className='relative w-full max-w-sm'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className='aspect-[3/4] rounded-lg overflow-hidden border border-ink/10 shadow-xl bg-white'
                >
                  {imgFailed[active] ? (
                    <div className='w-full h-full flex flex-col items-center justify-center gap-2 text-ink/40 bg-ink/[0.03]'>
                      <ImageOff className='w-6 h-6' />
                      <span className='font-mono text-[10px] px-4 text-center'>
                        Add image at {current.image}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={current.image}
                      alt={`${current.name} resume template preview`}
                      onError={() =>
                        setImgFailed((prev) => ({ ...prev, [active]: true }))
                      }
                      className='w-full h-full object-cover object-top'
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Wax seal, echoing the hero */}
              <div className='absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-gold flex flex-col items-center justify-center shadow-lg'>
                <span className='font-mono text-[7px] tracking-widest text-desk/70'>
                  ATS
                </span>
                <span className='font-serif text-base font-semibold text-desk'>
                  98
                </span>
              </div>
            </div>

            <AnimatePresence mode='wait'>
              <motion.p
                key={current.name + '-desc'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className='text-ink/60 leading-relaxed text-[15px] text-center max-w-xs mt-8'
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TemplatesSection