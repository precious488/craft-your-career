/**
 * TemplateForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Check } from 'lucide-react'
// import ResumeThumbnail from '@/components/dashboard/ResumeThumbnail';
import ResumePreview from '@/components/builder/ResumePreview'
import type { ResumeData } from '@/contexts/ResumeContext'

interface Props {
  resume: ResumeData
  value: ResumeData['template']
  onChange: (template: ResumeData['template']) => void
}

const TEMPLATES: Array<{
  id: ResumeData['template']
  label: string
  description: string
}> = [
  {
    id: 'modern',
    label: 'Modern',
    description: 'Bold gradient header, great for tech & creative roles',
  },
  {
    id: 'classic',
    label: 'Classic',
    description: 'Centered, traditional layout — safe for any industry',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Clean and airy, lets your content do the talking',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Sidebar layout, ideal for senior & executive roles',
  },
]

export default function TemplateForm({ resume, value, onChange }: Props) {
  return (
    <div className='max-w-3xl'>
      <h2 className='text-lg font-semibold text-foreground mb-1'>
        Choose a Template
      </h2>
      <p className='text-sm text-muted-foreground mb-6'>
        Switch anytime — your content stays the same, only the layout changes.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {TEMPLATES.map((tpl) => {
          const isActive = value === tpl.id
          return (
            <button
              key={tpl.id}
              type='button'
              onClick={() => onChange(tpl.id)}
              className={`group rounded-2xl border-2 overflow-hidden transition-all text-left ${
                isActive
                  ? 'border-primary shadow-glow'
                  : 'border-border hover:border-primary/40'
              }`}
            >
              <div className='aspect-[3/4] bg-muted/40 relative'>
                <div
                  className='absolute inset-2 rounded-lg border border-border shadow-sm overflow-hidden bg-white'
                  style={{
                    transform: 'scale(0.35)',
                    transformOrigin: 'top left',
                    width: '286%',
                    height: '286%',
                  }}
                >
                  <ResumePreview resume={{ ...resume, template: tpl.id }} />
                </div>
                {isActive && (
                  <div className='absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md'>
                    <Check className='w-3.5 h-3.5 text-primary-foreground' />
                  </div>
                )}
              </div>
              <div className='p-3 border-t border-border'>
                <p className='font-medium text-sm text-foreground'>
                  {tpl.label}
                </p>
                <p className='text-xs text-muted-foreground mt-0.5 leading-relaxed'>
                  {tpl.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
