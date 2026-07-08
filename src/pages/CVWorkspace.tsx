/**
 * CVWorkspace.tsx
 * Replaces the old Builder.tsx page.
 * Persistent sidebar (via DashboardLayout) + internal section nav + live preview.
 * Route: /builder/:id  ->  <ProtectedRoute><CVWorkspace /></ProtectedRoute>
 */
import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  Loader2,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import CVSectionNav, {
  CVSection,
  SECTIONS,
} from '@/components/builder/CVSectionNav'
import ATSScorePanel from '@/components/builder/ATSScorePanel'
import { useResume, ResumeData } from '@/contexts/ResumeContext'
import { useDownloadPDF } from '@/hooks/useDownloadPDF'
import { APIError } from '@/lib/api'
import PersonalInfoForm from '@/components/builder/sections/PersonalInfoForm'
import SummaryForm from '@/components/builder/sections/SummaryForm'
import ExperienceForm from '@/components/builder/sections/ExperienceForm'
import EducationForm from '@/components/builder/sections/EducationForm'
import SkillsForm from '@/components/builder/sections/SkillsForm'
import ProjectsForm from '@/components/builder/sections/ProjectsForm'
import CertificationsForm from '@/components/builder/sections/CertificationsForm'
import LanguagesForm from '@/components/builder/sections/LanguagesForm'
import TemplateForm from '@/components/builder/sections/TemplateForm'

// Render the actual full preview using the same logic as the thumbnail,
// but full-size — we reuse the templates module pattern via dynamic import.
import ResumePreview from '@/components/builder/ResumePreview'
const SAVE_DEBOUNCE_MS = 900

export default function CVWorkspace() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentResume, setCurrentResume, updateResume } = useResume()
  const { downloadPDF, isDownloading } = useDownloadPDF()

  const [section, setSection] = useState<CVSection>('personal')
  const [draft, setDraft] = useState<ResumeData | null>(null)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>(
    'idle',
  )
  const [saveError, setSaveError] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout>>()

  // Load resume on mount / id change
  useEffect(() => {
    if (!id) return
    setCurrentResume(id)
  }, [id, setCurrentResume])

  // Sync local draft when the loaded resume changes (e.g. first load)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    if (currentResume && currentResume.id === id && !hasLoadedRef.current) {
      setDraft(currentResume)
      hasLoadedRef.current = true
    }
  }, [currentResume, id])

  useEffect(() => {
    hasLoadedRef.current = false
  }, [id])
  // Debounced autosave whenever draft changes
  const persist = useCallback(
    (next: ResumeData) => {
      if (!id) return
      setSaveState('saving')
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(async () => {
        try {
          await updateResume(id, next)
          setSaveState('saved')
          setTimeout(() => setSaveState('idle'), 1500)
        } catch (err) {
          setSaveState('idle')
          if (
            err instanceof APIError &&
            err.body &&
            typeof err.body === 'object' &&
            'details' in err.body
          ) {
            const details = (err.body as { details?: Record<string, string[]> })
              .details
            if (details) {
              const firstError = Object.values(details)[0]?.[0]
              setSaveError(
                firstError ?? 'Please check your input and try again.',
              )
            }
          } else {
            setSaveError('Failed to save. Check your connection and try again.')
          }
          setTimeout(() => setSaveError(''), 5000)
        }
      }, SAVE_DEBOUNCE_MS)
    },
    [id, updateResume],
  )

  function patch(updates: Partial<ResumeData>) {
    if (!draft) return
    const next = { ...draft, ...updates }
    setDraft(next)
    persist(next)
  }

  if (!draft) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-screen'>
          <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
        </div>
      </DashboardLayout>
    )
  }

  const sectionIndex = SECTIONS.findIndex((s) => s.id === section)
  const goPrev = () =>
    sectionIndex > 0 && setSection(SECTIONS[sectionIndex - 1].id)
  const goNext = () =>
    sectionIndex < SECTIONS.length - 1 &&
    setSection(SECTIONS[sectionIndex + 1].id)

  const completed: Partial<Record<CVSection, boolean>> = {
    personal: !!draft.personalInfo.fullName && !!draft.personalInfo.email,
    summary: draft.summary.length > 20,
    experience: draft.experience.length > 0,
    education: draft.education.length > 0,
    skills: draft.skills.length >= 3,
    projects: draft.projects.length > 0,
    certifications: draft.certifications.length > 0,
    languages: draft.languages.length > 0,
    template: true,
  }

  return (
    <DashboardLayout>
      <div className='flex flex-col h-screen'>
        {/* Top bar */}
        <div className='border-b border-border px-4 py-3 flex items-center justify-between gap-3 bg-card/50'>
          <div className='flex items-center gap-3 min-w-0'>
            <Link to='/dashboard'>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <ArrowLeft className='w-4 h-4' />
              </Button>
            </Link>
            <Input
              value={draft.title}
              onChange={(e) => patch({ title: e.target.value })}
              className='h-8 max-w-[220px] font-medium border-transparent hover:border-input focus:border-input bg-transparent'
            />
            <SaveIndicator state={saveState} />
            {saveError && (
              <span className='text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-md'>
                {saveError}
              </span>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='lg:hidden gap-1.5'
              onClick={() => setPreviewOpen((v) => !v)}
            >
              {previewOpen ? 'Edit' : 'Preview'}
            </Button>
            <Button
              size='sm'
              onClick={() => downloadPDF(draft)}
              disabled={isDownloading}
              className='bg-gradient-primary text-primary-foreground hover:opacity-90 gap-1.5'
            >
              {isDownloading ? (
                <Loader2 className='w-3.5 h-3.5 animate-spin' />
              ) : (
                <Download className='w-3.5 h-3.5' />
              )}
              Download PDF
            </Button>
          </div>
        </div>

        {/* Section nav */}
        <CVSectionNav
          active={section}
          onChange={setSection}
          completed={completed}
        />

        {/* Main split */}
        <div className='flex-1 overflow-hidden flex'>
          {/* Form column */}
          <div
            className={`flex-1 overflow-y-auto p-6 ${previewOpen ? 'hidden lg:block' : 'block'}`}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {section === 'personal' && (
                  <PersonalInfoForm
                    value={draft.personalInfo}
                    onChange={(personalInfo) => patch({ personalInfo })}
                  />
                )}
                {section === 'summary' && (
                  <SummaryForm
                    value={draft.summary}
                    jobTitle={draft.personalInfo.title}
                    skills={draft.skills}
                    onChange={(summary) => patch({ summary })}
                  />
                )}
                {section === 'experience' && (
                  <ExperienceForm
                    value={draft.experience}
                    onChange={(experience) => patch({ experience })}
                  />
                )}
                {section === 'education' && (
                  <EducationForm
                    value={draft.education}
                    onChange={(education) => patch({ education })}
                  />
                )}
                {section === 'skills' && (
                  <SkillsForm
                    value={draft.skills}
                    jobTitle={draft.personalInfo.title}
                    onChange={(skills) => patch({ skills })}
                  />
                )}
                {section === 'projects' && (
                  <ProjectsForm
                    value={draft.projects}
                    onChange={(projects) => patch({ projects })}
                  />
                )}
                {section === 'certifications' && (
                  <CertificationsForm
                    value={draft.certifications}
                    onChange={(certifications) => patch({ certifications })}
                  />
                )}
                {section === 'languages' && (
                  <LanguagesForm
                    value={draft.languages}
                    onChange={(languages) => patch({ languages })}
                  />
                )}
                {section === 'template' && (
                  <TemplateForm
                    resume={draft}
                    value={draft.template}
                    onChange={(template) => patch({ template })}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* ATS panel below the form, always accessible */}
            <div className='max-w-2xl mt-8'>
              <ATSScorePanel resumeData={draft} cvId={draft.id} />
            </div>

            {/* Prev / next section controls */}
            <div className='max-w-2xl mt-6 flex items-center justify-between'>
              <Button
                variant='ghost'
                size='sm'
                onClick={goPrev}
                disabled={sectionIndex === 0}
                className='gap-1.5'
              >
                <ChevronLeft className='w-4 h-4' />
                {sectionIndex > 0 ? SECTIONS[sectionIndex - 1].label : ''}
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={goNext}
                disabled={sectionIndex === SECTIONS.length - 1}
                className='gap-1.5'
              >
                {sectionIndex < SECTIONS.length - 1
                  ? SECTIONS[sectionIndex + 1].label
                  : ''}
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          </div>

          {/* Preview column */}
          <div
            className={`w-full lg:w-[42%] lg:max-w-[520px] border-l border-border overflow-y-auto bg-muted/30 ${
              previewOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className='p-6'>
              <div
                className='bg-white rounded-xl shadow-elegant overflow-hidden mx-auto'
                style={{ maxWidth: 480 }}
              >
                <ResumePreview resume={draft} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function SaveIndicator({ state }: { state: 'idle' | 'saving' | 'saved' }) {
  if (state === 'saving') {
    return (
      <span className='flex items-center gap-1 text-xs text-muted-foreground'>
        <Loader2 className='w-3 h-3 animate-spin' />
        Saving…
      </span>
    )
  }
  if (state === 'saved') {
    return (
      <span className='flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400'>
        <Check className='w-3 h-3' />
        Saved
      </span>
    )
  }
  return null
}
