/**
 * CVSectionNav.tsx
 * Horizontal section switcher inside the CV workspace.
 * Drop into src/components/builder/
 */
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderKanban,
  Award,
  Languages,
  Palette,
} from 'lucide-react'

export type CVSection =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'template'

interface SectionDef {
  id: CVSection
  label: string
  icon: React.ReactNode
}

const SECTIONS: SectionDef[] = [
  {
    id: 'personal',
    label: 'Personal Info',
    icon: <User className='w-4 h-4' />,
  },
  { id: 'summary', label: 'Summary', icon: <FileText className='w-4 h-4' /> },
  {
    id: 'experience',
    label: 'Experience',
    icon: <Briefcase className='w-4 h-4' />,
  },
  {
    id: 'education',
    label: 'Education',
    icon: <GraduationCap className='w-4 h-4' />,
  },
  { id: 'skills', label: 'Skills', icon: <Sparkles className='w-4 h-4' /> },
  {
    id: 'projects',
    label: 'Projects',
    icon: <FolderKanban className='w-4 h-4' />,
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: <Award className='w-4 h-4' />,
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: <Languages className='w-4 h-4' />,
  },
  { id: 'template', label: 'Template', icon: <Palette className='w-4 h-4' /> },
]

interface Props {
  active: CVSection
  onChange: (section: CVSection) => void
  completed?: Partial<Record<CVSection, boolean>>
}

export default function CVSectionNav({
  active,
  onChange,
  completed = {},
}: Props) {
  return (
    <div className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10'>
      <div className='flex items-center gap-1 px-4 overflow-x-auto scrollbar-thin'>
        {SECTIONS.map((section) => {
          const isActive = active === section.id
          const isDone = completed[section.id]
          return (
            <button
              key={section.id}
              onClick={() => onChange(section.id)}
              className={`relative flex items-center gap-2 px-3.5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className='relative'>
                {section.icon}
                {isDone && !isActive && (
                  <span className='absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500' />
                )}
              </span>
              {section.label}
              {isActive && (
                <span className='absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary' />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { SECTIONS }
