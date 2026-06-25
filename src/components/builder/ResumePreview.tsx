/**
 * ResumePreview.tsx
 * Full-size live preview of the resume, mirroring the 4 backend PDF templates
 * (modern, classic, minimal, corporate) so what users see matches their download.
 * Drop into src/components/builder/
 */
import type { ResumeData } from '@/contexts/ResumeContext'

interface Props {
  resume: ResumeData
}

const ACCENT: Record<ResumeData['template'], string> = {
  modern: '#4f46e5',
  classic: '#1a1a2e',
  minimal: '#9ca3af',
  corporate: '#1e293b',
}

export default function ResumePreview({ resume }: Props) {
  switch (resume.template) {
    case 'classic':
      return <ClassicPreview resume={resume} />
    case 'minimal':
      return <MinimalPreview resume={resume} />
    case 'corporate':
      return <CorporatePreview resume={resume} />
    default:
      return <ModernPreview resume={resume} />
  }
}

function SectionTitle({
  children,
  color,
}: {
  children: React.ReactNode
  color: string
}) {
  return (
    <div
      className='text-[12px] font-bold uppercase tracking-widest border-b pb-1 mb-2'
      style={{ color, borderColor: `${color}33` }}
    >
      {children}
    </div>
  )
}

function Empty() {
  return (
    <div className='flex flex-col items-center justify-center text-center py-20 px-6 text-gray-400'>
      <p className='text-sm font-medium'>
        Your resume preview will appear here
      </p>
      <p className='text-xs mt-1'>Start filling in your details on the left</p>
    </div>
  )
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

// ─── MODERN ─────────────────────────────────────────────────────
function ModernPreview({ resume }: Props) {
  const {
    personalInfo: p,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume
  const accent = ACCENT.modern

  if (!hasAnyContent(resume)) return <Empty />

  return (
    <div
      className='text-[#1a1a2e]'
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className='p-6 pb-7 rounded-b-xl text-white'
        style={{ background: `linear-gradient(135deg, ${accent}, #7c3aed)` }}
      >
        <h1 className='text-xl font-bold'>{p.fullName || 'Your Name'}</h1>
        <p className='text-sm text-white/85 mt-0.5'>
          {p.title || 'Professional Title'}
        </p>
        <div className='flex flex-wrap gap-3 mt-3 text-[12px] text-white/75'>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.website && <span>{p.website}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      <div className='p-6 space-y-5 text-[12px] leading-relaxed'>
        {summary && (
          <section>
            <SectionTitle color={accent}>Summary</SectionTitle>
            <p className='text-gray-600'>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <SectionTitle color={accent}>Experience</SectionTitle>
            <div className='space-y-3'>
              {experience.map((e) => (
                <div key={e.id}>
                  <div className='flex justify-between items-baseline'>
                    <div>
                      <p className='font-semibold'>
                        {e.position || 'Position'}
                      </p>
                      <p className='text-gray-500 text-[12px]'>
                        {e.company || 'Company'}
                      </p>
                    </div>
                    <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                      {e.startDate} — {e.current ? 'Present' : e.endDate}
                    </p>
                  </div>
                  {e.description && (
                    <p className='text-gray-600 mt-1 whitespace-pre-line text-[12px]'>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionTitle color={accent}>Education</SectionTitle>
            <div className='space-y-2'>
              {education.map((e) => (
                <div key={e.id} className='flex justify-between items-baseline'>
                  <div>
                    <p className='font-semibold'>
                      {e.degree || 'Degree'} {e.field && `in ${e.field}`}
                    </p>
                    <p className='text-gray-500 text-[12px]'>
                      {e.school || 'School'}
                    </p>
                  </div>
                  <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                    {e.startDate} — {e.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SectionTitle color={accent}>Skills</SectionTitle>
            <div className='flex flex-wrap gap-1.5'>
              {skills.map((s) => (
                <span
                  key={s}
                  className='text-[12px] px-2 py-0.5 rounded-full'
                  style={{ background: `${accent}1A`, color: accent }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SectionTitle color={accent}>Projects</SectionTitle>
            <div className='space-y-2'>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className='flex justify-between items-baseline'>
                    <p className='font-semibold'>{proj.name || 'Project'}</p>
                    {proj.link && (
                      <span className='text-[12px]' style={{ color: accent }}>
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className='text-gray-500 text-[12px]'>
                      {proj.technologies}
                    </p>
                  )}
                  {proj.description && (
                    <p className='text-gray-600 text-[12px] mt-0.5'>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <SectionTitle color={accent}>Certifications</SectionTitle>
            <div className='space-y-1.5'>
              {certifications.map((c) => (
                <div key={c.id} className='flex justify-between items-baseline'>
                  <div>
                    <p className='font-semibold'>{c.name || 'Certification'}</p>
                    <p className='text-gray-500 text-[12px]'>{c.issuer}</p>
                  </div>
                  <p className='text-[12px] text-gray-400'>{c.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <SectionTitle color={accent}>Languages</SectionTitle>
            <div className='flex flex-wrap gap-1.5'>
              {languages.map((l) => (
                <span
                  key={l}
                  className='text-[12px] px-2 py-0.5 rounded-full'
                  style={{ background: `${accent}1A`, color: accent }}
                >
                  {l}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// ─── CLASSIC ────────────────────────────────────────────────────
function ClassicPreview({ resume }: Props) {
  const {
    personalInfo: p,
    summary,
    experience,
    education,
    skills,
    certifications,
  } = resume
  const accent = ACCENT.classic

  if (!hasAnyContent(resume)) return <Empty />

  return (
    <div
      className='text-[#1a1a2e] p-7'
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className='text-center border-b-2 pb-3 mb-4'
        style={{ borderColor: accent }}
      >
        <h1 className='text-2xl font-bold tracking-wide'>
          {p.fullName || 'Your Name'}
        </h1>
        {p.title && <p className='text-sm text-gray-500 mt-1'>{p.title}</p>}
        <div className='flex justify-center gap-3 mt-2 text-[12px] text-gray-500'>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
        </div>
      </div>

      <div className='space-y-4 text-[12px] leading-relaxed'>
        {summary && (
          <section>
            <SectionTitle color={accent}>Professional Summary</SectionTitle>
            <p className='text-gray-700'>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <SectionTitle color={accent}>Work Experience</SectionTitle>
            <div className='space-y-3'>
              {experience.map((e) => (
                <div key={e.id}>
                  <div className='flex justify-between items-baseline'>
                    <p className='font-semibold'>
                      {e.position || 'Position'},{' '}
                      <em className='font-normal'>{e.company || 'Company'}</em>
                    </p>
                    <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                      {e.startDate} – {e.current ? 'Present' : e.endDate}
                    </p>
                  </div>
                  {e.description && (
                    <p className='text-gray-600 mt-1 whitespace-pre-line text-[12px]'>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionTitle color={accent}>Education</SectionTitle>
            <div className='space-y-2'>
              {education.map((e) => (
                <div key={e.id} className='flex justify-between items-baseline'>
                  <div>
                    <p className='font-semibold'>{e.school || 'School'}</p>
                    <p className='text-gray-500 text-[12px]'>
                      {e.degree}
                      {e.field && `, ${e.field}`}
                    </p>
                  </div>
                  <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                    {e.startDate} – {e.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <SectionTitle color={accent}>Skills</SectionTitle>
            <div className='flex flex-wrap gap-1.5'>
              {skills.map((s) => (
                <span
                  key={s}
                  className='text-[12px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700'
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <SectionTitle color={accent}>Certifications</SectionTitle>
            <div className='space-y-1.5'>
              {certifications.map((c) => (
                <div key={c.id} className='flex justify-between items-baseline'>
                  <div>
                    <p className='font-semibold'>{c.name}</p>
                    <p className='text-gray-500 text-[12px]'>{c.issuer}</p>
                  </div>
                  <p className='text-[12px] text-gray-400'>{c.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// ─── MINIMAL ────────────────────────────────────────────────────
function MinimalPreview({ resume }: Props) {
  const { personalInfo: p, summary, experience, education, skills } = resume

  if (!hasAnyContent(resume)) return <Empty />

  return (
    <div
      className='text-[#1a1a2e] p-8'
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className='mb-5'>
        <h1 className='text-2xl font-light tracking-wide'>
          {p.fullName || 'Your Name'}
        </h1>
        {p.title && <p className='text-sm text-gray-400 mt-0.5'>{p.title}</p>}
        <div className='flex gap-3 mt-2 text-[12px] text-gray-400'>
          {[p.email, p.phone, p.location, p.website]
            .filter(Boolean)
            .map((v) => (
              <span key={v}>{v}</span>
            ))}
        </div>
      </div>

      <div className='space-y-4 text-[12px] leading-relaxed'>
        {summary && (
          <section>
            <p className='text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 mb-2'>
              About
            </p>
            <p className='text-gray-600'>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <p className='text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 mb-2'>
              Experience
            </p>
            <div className='space-y-3'>
              {experience.map((e) => (
                <div key={e.id}>
                  <div className='flex justify-between items-baseline'>
                    <p className='font-medium'>
                      {e.position || 'Position'} · {e.company || 'Company'}
                    </p>
                    <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                      {e.startDate} – {e.current ? 'Now' : e.endDate}
                    </p>
                  </div>
                  {e.description && (
                    <p className='text-gray-600 mt-1 whitespace-pre-line text-[12px]'>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <p className='text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 mb-2'>
              Education
            </p>
            <div className='space-y-2'>
              {education.map((e) => (
                <div key={e.id} className='flex justify-between items-baseline'>
                  <div>
                    <p className='font-medium'>{e.school || 'School'}</p>
                    <p className='text-gray-500 text-[12px]'>
                      {e.degree}
                      {e.field && ` · ${e.field}`}
                    </p>
                  </div>
                  <p className='text-[12px] text-gray-400'>{e.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <p className='text-[11px] uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-1 mb-2'>
              Skills
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {skills.map((s) => (
                <span
                  key={s}
                  className='text-[12px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-600'
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

// ─── CORPORATE ──────────────────────────────────────────────────
function CorporatePreview({ resume }: Props) {
  const {
    personalInfo: p,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume
  const accent = ACCENT.corporate

  if (!hasAnyContent(resume)) return <Empty />

  return (
    <div
      className='flex text-[#1a1a2e] min-h-[400px]'
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className='w-[34%] p-5 text-white' style={{ background: accent }}>
        <h1 className='text-base font-bold leading-snug'>
          {p.fullName || 'Your Name'}
        </h1>
        {p.title && (
          <p className='text-[12px] text-white/60 mt-1 mb-4'>{p.title}</p>
        )}

        <div className='space-y-1 text-[12px] text-white/80 mb-4'>
          <p className='text-[11px] uppercase tracking-widest text-white/40 border-b border-white/15 pb-1 mb-1.5'>
            Contact
          </p>
          {p.email && <p>{p.email}</p>}
          {p.phone && <p>{p.phone}</p>}
          {p.location && <p>{p.location}</p>}
          {p.linkedin && <p>{p.linkedin}</p>}
        </div>

        {skills.length > 0 && (
          <div className='space-y-1 text-[12px] text-white/80 mb-4'>
            <p className='text-[11px] uppercase tracking-widest text-white/40 border-b border-white/15 pb-1 mb-1.5'>
              Skills
            </p>
            {skills.map((s) => (
              <p key={s}>• {s}</p>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className='space-y-1 text-[12px] text-white/80 mb-4'>
            <p className='text-[11px] uppercase tracking-widest text-white/40 border-b border-white/15 pb-1 mb-1.5'>
              Languages
            </p>
            {languages.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className='space-y-1 text-[12px] text-white/80'>
            <p className='text-[11px] uppercase tracking-widest text-white/40 border-b border-white/15 pb-1 mb-1.5'>
              Certifications
            </p>
            {certifications.map((c) => (
              <p key={c.id}>{c.name}</p>
            ))}
          </div>
        )}
      </div>

      <div className='flex-1 p-5 space-y-4 text-[12px] leading-relaxed'>
        {summary && (
          <section>
            <SectionTitle color={accent}>Executive Summary</SectionTitle>
            <p className='text-gray-600'>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <SectionTitle color={accent}>Professional Experience</SectionTitle>
            <div className='space-y-3'>
              {experience.map((e) => (
                <div key={e.id}>
                  <div className='flex justify-between items-baseline'>
                    <div>
                      <p className='font-semibold'>
                        {e.position || 'Position'}
                      </p>
                      <p className='text-gray-500 text-[12px]'>
                        {e.company || 'Company'}
                      </p>
                    </div>
                    <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                      {e.startDate} — {e.current ? 'Present' : e.endDate}
                    </p>
                  </div>
                  {e.description && (
                    <p className='text-gray-600 mt-1 whitespace-pre-line text-[12px]'>
                      {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <SectionTitle color={accent}>Education</SectionTitle>
            <div className='space-y-2'>
              {education.map((e) => (
                <div key={e.id} className='flex justify-between items-baseline'>
                  <div>
                    <p className='font-semibold'>
                      {e.degree}
                      {e.field && ` — ${e.field}`}
                    </p>
                    <p className='text-gray-500 text-[12px]'>{e.school}</p>
                  </div>
                  <p className='text-[12px] text-gray-400 whitespace-nowrap'>
                    {e.startDate} – {e.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <SectionTitle color={accent}>Key Projects</SectionTitle>
            <div className='space-y-2'>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p className='font-semibold'>{proj.name}</p>
                  {proj.technologies && (
                    <p className='text-gray-500 text-[12px]'>
                      {proj.technologies}
                    </p>
                  )}
                  {proj.description && (
                    <p className='text-gray-600 text-[12px] mt-0.5'>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
