// /**
//  * ResumeThumbnail.tsx — V2
//  * Renders a real, readable miniature preview of the resume (actual text,
//  * scaled down), matching the reference screenshot style — not abstract bars.
//  * Drop into src/components/dashboard/ (overwrite existing file)
//  */
// import type { ResumeData } from '@/contexts/ResumeContext'

// interface Props {
//   resume: ResumeData
// }

// function hasAnyContent(r: ResumeData): boolean {
//   return (
//     !!r.personalInfo.fullName ||
//     !!r.summary ||
//     r.experience.length > 0 ||
//     r.education.length > 0 ||
//     r.skills.length > 0
//   )
// }

// export default function ResumeThumbnail({ resume }: Props) {
//   const {
//     personalInfo: p,
//     summary,
//     experience,
//     education,
//     skills,
//     projects,
//     certifications,
//   } = resume

//   if (!hasAnyContent(resume)) {
//     return (
//       <div className='w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/40 bg-white'>
//         <svg
//           width='28'
//           height='28'
//           viewBox='0 0 24 24'
//           fill='none'
//           stroke='currentColor'
//           strokeWidth='1.5'
//         >
//           <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
//           <path d='M14 2v6h6' />
//         </svg>
//         <span className='text-[9px] font-medium'>Empty resume</span>
//       </div>
//     )
//   }

//   return (
//     <div
//       className='w-full h-full bg-white text-[#1a1a2e] overflow-hidden select-none p-3'
//       style={{
//         fontFamily: "'Inter', system-ui, sans-serif",
//         fontSize: '5.2px',
//         lineHeight: 1.5,
//       }}
//     >
//       {/* Header */}
//       <div className='text-center mb-1.5'>
//         <p
//           className='font-bold uppercase tracking-wide'
//           style={{ fontSize: '9px' }}
//         >
//           {p.fullName || 'Your Name'}
//         </p>
//         <div
//           className='flex items-center justify-center gap-1.5 mt-0.5 text-gray-500'
//           style={{ fontSize: '4.6px' }}
//         >
//           {p.email && <span>{p.email}</span>}
//           {p.phone && <span>{p.phone}</span>}
//           {p.location && <span>{p.location}</span>}
//         </div>
//       </div>

//       {/* Summary */}
//       {summary && (
//         <Section title='Summary'>
//           <p className='text-gray-600 line-clamp-4'>{summary}</p>
//         </Section>
//       )}

//       {/* Experience */}
//       {experience.length > 0 && (
//         <Section title='Experience'>
//           {experience.slice(0, 2).map((e) => (
//             <div key={e.id} className='mb-1'>
//               <p className='font-semibold'>{e.position || 'Position'}</p>
//               <div
//                 className='flex justify-between text-gray-500'
//                 style={{ fontSize: '4.6px' }}
//               >
//                 <span>{e.company}</span>
//                 <span>
//                   {e.startDate} · {e.current ? 'Present' : e.endDate}
//                 </span>
//               </div>
//               {e.description && (
//                 <ul className='mt-0.5 text-gray-600'>
//                   {e.description
//                     .split('\n')
//                     .filter(Boolean)
//                     .slice(0, 2)
//                     .map((line, i) => (
//                       <li key={i} className='truncate'>
//                         · {line.replace(/^[•\-]\s*/, '')}
//                       </li>
//                     ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Projects */}
//       {projects.length > 0 && (
//         <Section title='Projects'>
//           {projects.slice(0, 1).map((proj) => (
//             <div key={proj.id} className='mb-1'>
//               <p className='font-semibold'>{proj.name || 'Project'}</p>
//               {proj.description && (
//                 <p className='text-gray-600 line-clamp-2'>{proj.description}</p>
//               )}
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Education */}
//       {education.length > 0 && (
//         <Section title='Education'>
//           {education.slice(0, 1).map((e) => (
//             <div key={e.id} className='mb-1'>
//               <p className='font-semibold'>
//                 {e.degree || 'Degree'}
//                 {e.field && ` in ${e.field}`}
//               </p>
//               <div
//                 className='flex justify-between text-gray-500'
//                 style={{ fontSize: '4.6px' }}
//               >
//                 <span>{e.school}</span>
//                 <span>{e.endDate}</span>
//               </div>
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* Certifications */}
//       {certifications.length > 0 && (
//         <Section title='Certifications'>
//           {certifications.slice(0, 1).map((c) => (
//             <p key={c.id} className='text-gray-600 truncate'>
//               {c.name}
//             </p>
//           ))}
//         </Section>
//       )}

//       {/* Skills */}
//       {skills.length > 0 && (
//         <Section title='Skills'>
//           <p className='text-gray-600 truncate'>
//             {skills.slice(0, 8).join(' · ')}
//           </p>
//         </Section>
//       )}
//     </div>
//   )
// }

// function Section({
//   title,
//   children,
// }: {
//   title: string
//   children: React.ReactNode
// }) {
//   return (
//     <div className='mb-1.5'>
//       <p
//         className='font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-0.5'
//         style={{ fontSize: '5.2px' }}
//       >
//         {title}
//       </p>
//       {children}
//     </div>
//   )
// }
/**
 * ResumeThumbnail.tsx — V3
 * Uses scaled-down ResumePreview for accurate template rendering on dashboard cards.
 */
import ResumePreview from '@/components/builder/ResumePreview'
import type { ResumeData } from '@/contexts/ResumeContext'

interface Props {
  resume: ResumeData
}

function hasAnyContent(r: ResumeData): boolean {
  return (
    !!r.personalInfo.fullName ||
    !!r.summary ||
    r.experience.length > 0 ||
    r.education.length > 0 ||
    r.skills.length > 0
  )
}

export default function ResumeThumbnail({ resume }: Props) {
  if (!hasAnyContent(resume)) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/40 bg-white'>
        <svg
          width='28'
          height='28'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
        >
          <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
          <path d='M14 2v6h6' />
        </svg>
        <span className='text-[9px] font-medium'>Empty resume</span>
      </div>
    )
  }

  return (
    <div className='w-full h-full overflow-hidden bg-white relative'>
      <div
        style={{
          transform: 'scale(0.35)',
          transformOrigin: 'top left',
          width: '286%',
          height: '286%',
          pointerEvents: 'none',
        }}
      >
        <ResumePreview resume={resume} />
      </div>
    </div>
  )
}
