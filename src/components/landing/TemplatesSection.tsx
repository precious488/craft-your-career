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

import { motion } from 'framer-motion'
import { ImageOff } from 'lucide-react'
import { useState } from 'react'

// Drop your template preview images into: public/templates/
// Suggested size: 600x800px (3:4 ratio), matching filenames below.
const templates = [
  {
    name: 'Modern',
    description: 'Clean and contemporary design with a bold header.',
    image: '/templates/modern.png',
  },
  {
    name: 'Classic',
    description: 'Traditional layout trusted by Fortune 500 companies.',
    image: '/templates/classic.png',
  },
  {
    name: 'Minimal',
    description: 'Simple, elegant design that lets your content shine.',
    image: '/templates/minimal.png',
  },
  {
    name: 'Corporate',
    description: 'Professional format optimized for corporate roles.',
    image: '/templates/corporate.png',
  },
]

function TemplateImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className='w-full h-full rounded-lg border border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 text-muted-foreground'>
        <ImageOff className='w-6 h-6' />
        <span className='text-xs px-4 text-center'>
          Add image at <code className='text-[10px]'>{src}</code>
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className='w-full h-full object-cover rounded-lg border border-border'
    />
  )
}

const TemplatesSection = () => {
  return (
    <section id='templates' className='py-24 bg-muted/30'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            Professional Templates
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Choose from our collection of ATS-friendly, recruiter-approved
            templates.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {templates.map((template, i) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className='group cursor-pointer'
            >
              <div className='bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elegant hover:border-primary/30 transition-all duration-300'>
                <div className='aspect-[3/4] p-4 relative'>
                  <TemplateImage
                    src={template.image}
                    alt={`${template.name} resume template preview`}
                  />
                </div>
                <div className='p-4 border-t border-border'>
                  <h3 className='font-semibold text-foreground'>
                    {template.name}
                  </h3>
                  <p className='text-sm text-muted-foreground mt-1'>
                    {template.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TemplatesSection
