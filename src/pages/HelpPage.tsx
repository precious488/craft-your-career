/**
 * HelpPage.tsx
 * Route: /help -> <ProtectedRoute><HelpPage /></ProtectedRoute>
 * Drop into src/pages/
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  Target,
  Download,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Star,
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

// ─── Types ────────────────────────────────────────────────────
interface AccordionItem {
  question: string
  answer: React.ReactNode
}

interface TipCard {
  icon: React.ReactNode
  title: string
  tips: string[]
  color: string
}

// ─── Accordion component ──────────────────────────────────────
function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className='space-y-2'>
      {items.map((item, i) => (
        <div
          key={i}
          className='border border-border rounded-xl overflow-hidden bg-card'
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className='w-full flex items-center justify-between px-5 py-4 text-left'
          >
            <span className='text-sm font-medium text-foreground'>
              {item.question}
            </span>
            {open === i ? (
              <ChevronUp className='w-4 h-4 text-muted-foreground shrink-0' />
            ) : (
              <ChevronDown className='w-4 h-4 text-muted-foreground shrink-0' />
            )}
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='overflow-hidden'
              >
                <div className='px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3'>
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ─── Step component ───────────────────────────────────────────
function Step({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className='flex gap-4'>
      <div className='w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 mt-0.5'>
        {number}
      </div>
      <div>
        <p className='font-medium text-foreground text-sm'>{title}</p>
        <p className='text-sm text-muted-foreground mt-0.5 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  )
}

// ─── Tip card ─────────────────────────────────────────────────
function TipCardComponent({ card }: { card: TipCard }) {
  return (
    <div className={`rounded-2xl p-5 border ${card.color}`}>
      <div className='flex items-center gap-2 mb-3'>
        {card.icon}
        <h3 className='font-semibold text-sm text-foreground'>{card.title}</h3>
      </div>
      <ul className='space-y-2'>
        {card.tips.map((tip, i) => (
          <li
            key={i}
            className='flex items-start gap-2 text-sm text-muted-foreground'
          >
            <CheckCircle2 className='w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0' />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────
const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: 'Create a resume',
    description:
      'Click "Create New Resume" in the sidebar or dashboard. Each resume gets its own workspace — you can have multiple resumes tailored to different roles.',
  },
  {
    number: 2,
    title: 'Fill in your sections',
    description:
      'Use the section tabs (Personal Info, Summary, Experience, Education, Skills, Projects, Certifications, Languages) to fill in your details. Your progress is saved automatically every second.',
  },
  {
    number: 3,
    title: 'Use AI assistance',
    description:
      'Click "Improve with AI" on the Summary section or "Suggest bullet points" on Experience and Projects to get AI-generated content tailored to your role. Use "Suggest skills" in the Skills section to discover relevant skills.',
  },
  {
    number: 4,
    title: 'Check your ATS score',
    description:
      'Scroll down to the ATS Score Analyzer in any section. Paste a job description for the best results — it will show matched keywords, missing keywords, and improvement suggestions.',
  },
  {
    number: 5,
    title: 'Pick a template',
    description:
      'Click the "Template" tab to choose from Modern, Classic, Minimal, or Corporate. The live preview on the right updates instantly. Your content stays the same when you switch templates.',
  },
  {
    number: 6,
    title: 'Download your PDF',
    description:
      'Click "Download PDF" in the top bar. Your resume is rendered server-side for pixel-perfect quality. The file will download automatically.',
  },
]

const FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'How many resumes can I create?',
    answer:
      'Free plan users can create up to 3 resumes. Pro plan users get unlimited resumes. You can see your current count in the sidebar. Each resume is fully independent with its own content and template.',
  },
  {
    question: 'Is my data saved automatically?',
    answer:
      'Yes — every change you make is auto-saved to the server within 1 second. You\'ll see a "Saving…" indicator in the top bar, followed by "Saved" when it completes. There\'s no need to press a save button.',
  },
  {
    question: 'What is an ATS score and why does it matter?',
    answer: (
      <div className='space-y-2'>
        <p>
          ATS stands for Applicant Tracking System — software that most
          companies use to automatically screen resumes before a human ever sees
          them. Your ATS score estimates how well your resume would perform
          against these systems.
        </p>
        <p>The score is made up of five components:</p>
        <ul className='space-y-1 mt-1'>
          <li>
            • <strong>Keyword Match (35%)</strong> — how many job-description
            keywords appear in your resume
          </li>
          <li>
            • <strong>Section Completeness (25%)</strong> — whether all key
            sections are filled in
          </li>
          <li>
            • <strong>Action Verbs (15%)</strong> — use of strong verbs like
            "built", "led", "increased"
          </li>
          <li>
            • <strong>Quantifiable Achievements (15%)</strong> — numbers like
            "40% faster", "team of 8"
          </li>
          <li>
            • <strong>Formatting (10%)</strong> — overall completeness and
            structure
          </li>
        </ul>
        <p>
          Aim for a score of 70+ for the best chance of passing automated
          screening.
        </p>
      </div>
    ),
  },
  {
    question: 'How do I get the best ATS score?',
    answer: (
      <div className='space-y-2'>
        <p>
          Paste the exact job description into the ATS analyzer for the most
          accurate keyword matching. Then:
        </p>
        <ul className='space-y-1'>
          <li>
            • Mirror the exact wording from the job posting in your experience
            descriptions
          </li>
          <li>
            • Add the specific skills mentioned in the job posting to your
            Skills section
          </li>
          <li>
            • Make sure Personal Info, Summary, Experience, Education, and
            Skills are all filled in
          </li>
          <li>
            • Use numbers — "Improved performance by 30%" scores better than
            "Improved performance"
          </li>
          <li>• Start each bullet point with a strong action verb</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Which template should I choose?',
    answer: (
      <div className='space-y-1'>
        <p>
          <strong>Modern</strong> — Bold gradient header. Best for tech, design,
          and creative roles.
        </p>
        <p>
          <strong>Classic</strong> — Centered, traditional. Safe choice for any
          industry, especially finance, law, and academia.
        </p>
        <p>
          <strong>Minimal</strong> — Clean and airy. Great for roles where less
          is more — consulting, strategy, writing.
        </p>
        <p>
          <strong>Corporate</strong> — Sidebar layout. Ideal for senior,
          executive, or business development roles where you want to stand out.
        </p>
      </div>
    ),
  },
  {
    question: 'How does the AI assistance work?',
    answer:
      'The AI is powered by Llama 3.1 (via Groq). It uses the context you provide — your job title, existing content, and skills — to generate relevant, professional content. For bullet points, it creates achievement-focused statements starting with strong action verbs. For the summary, it rewrites your text to be concise and ATS-friendly. Results are cached so repeated requests with the same input are instant.',
  },
  {
    question: 'How do I enable two-factor authentication?',
    answer:
      'Go to Settings in the sidebar and toggle "Two-factor authentication (OTP)" on. After that, every login will send a 6-digit code to your email. Enter the code within 10 minutes to complete sign-in. You can disable it at any time from the same Settings page.',
  },
  {
    question: 'Can I duplicate a resume?',
    answer:
      'Yes — on the dashboard, click the three-dot menu (⋮) on any resume card and select "Duplicate". This creates an exact copy you can customise for a different role without starting from scratch.',
  },
  {
    question: 'Why does my downloaded PDF look different from the preview?',
    answer:
      'The preview and PDF both use the same templates. Minor differences can appear due to font rendering or page margins. If something looks off, try increasing the font size slightly in your descriptions, or switching to the Classic template which renders most consistently across PDF viewers.',
  },
]

const CV_TIPS: TipCard[] = [
  {
    icon: <User className='w-4 h-4 text-blue-600' />,
    title: 'Personal Info',
    color:
      'border-blue-100 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/10',
    tips: [
      'Use a professional email address (firstname.lastname@gmail.com)',
      'Include your LinkedIn URL — many recruiters check it before your CV',
      'Add your city and country — not your full street address',
      "Your job title should match the role you're applying for, not just your current one",
    ],
  },
  {
    icon: <FileText className='w-4 h-4 text-violet-600' />,
    title: 'Professional Summary',
    color:
      'border-violet-100 bg-violet-50/50 dark:border-violet-900/30 dark:bg-violet-900/10',
    tips: [
      'Keep it to 3–4 sentences maximum',
      'Lead with your years of experience and primary expertise',
      'Mention 2–3 key skills that match the role',
      'Avoid clichés like "team player" or "detail-oriented" — show, don\'t tell',
      'Tailor this section for every application',
    ],
  },
  {
    icon: <Briefcase className='w-4 h-4 text-emerald-600' />,
    title: 'Work Experience',
    color:
      'border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10',
    tips: [
      'List roles in reverse chronological order (most recent first)',
      'Start each bullet with an action verb: Built, Led, Reduced, Increased, Launched',
      'Quantify wherever possible — "Reduced load time by 40%" beats "Improved performance"',
      'Aim for 3–5 bullet points per role, not more',
      'Focus on impact and achievements, not just duties',
      'Use the same keywords from the job description',
    ],
  },
  {
    icon: <GraduationCap className='w-4 h-4 text-amber-600' />,
    title: 'Education',
    color:
      'border-amber-100 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10',
    tips: [
      'If you have 5+ years of experience, keep education brief — just school, degree, year',
      "Include relevant coursework only if you're a recent graduate",
      'Certifications count — add them in the Certifications section',
      "GPA is optional — only include it if it's above 3.5 and you graduated recently",
    ],
  },
  {
    icon: <Sparkles className='w-4 h-4 text-pink-600' />,
    title: 'Skills',
    color:
      'border-pink-100 bg-pink-50/50 dark:border-pink-900/30 dark:bg-pink-900/10',
    tips: [
      'List both technical skills (tools, languages, platforms) and relevant soft skills',
      'Mirror the exact skill names from the job posting for ATS matching',
      'Aim for 8–15 skills — enough to be thorough, not overwhelming',
      'Don\'t list basic skills like "Microsoft Word" unless specifically required',
      'Use the "Suggest skills with AI" button to discover skills you might have missed',
    ],
  },
  {
    icon: <Target className='w-4 h-4 text-red-600' />,
    title: 'ATS Optimisation',
    color:
      'border-red-100 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10',
    tips: [
      'Always paste the job description into the ATS analyzer before applying',
      'A score of 70+ gives you a strong chance of passing automated screening',
      "Add missing keywords naturally — don't keyword-stuff",
      "Avoid tables, columns, headers/footers in your content — ATS often can't read them",
      'Spell out acronyms at least once: "Search Engine Optimization (SEO)"',
    ],
  },
]

const DO_DONTS = {
  dos: [
    'Tailor your resume for each job application',
    'Use a clean, readable font and consistent formatting',
    'Keep your resume to 1 page (2 pages max for 10+ years experience)',
    'Use bullet points for experience descriptions',
    'Proofread carefully — typos are an instant rejection',
    'Save as PDF to preserve formatting',
    'Include only relevant experience for the role',
  ],
  donts: [
    "Don't use photos (in most Western countries)",
    "Don't include personal info like age, marital status, or religion",
    "Don't use the same resume for every application",
    "Don't use fancy graphics, charts, or icons in the content",
    'Don\'t list references on the resume — "Available on request" is enough',
    'Don\'t use passive voice — "Was responsible for" → "Led"',
    "Don't go back more than 10–15 years in work history",
  ],
}

// ─── Main component ───────────────────────────────────────────
export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<'guide' | 'tips' | 'faq'>('guide')

  return (
    <DashboardLayout>
      <div className='py-10 px-6'>
        <div className='max-w-3xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-2xl font-bold text-foreground flex items-center gap-2'>
              <HelpCircle className='w-6 h-6 text-primary' />
              Help & Guide
            </h1>
            <p className='text-muted-foreground mt-1'>
              Everything you need to know to create a standout resume.
            </p>
          </div>

          {/* Tabs */}
          <div className='flex items-center gap-1 border-b border-border mb-6'>
            {(['guide', 'tips', 'faq'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'guide'
                  ? 'How It Works'
                  : tab === 'tips'
                    ? 'CV Writing Tips'
                    : 'FAQ'}
              </button>
            ))}
          </div>

          {/* How It Works */}
          {activeTab === 'guide' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-8'
            >
              <div className='bg-card border border-border rounded-2xl p-6'>
                <h2 className='font-semibold text-foreground mb-5 flex items-center gap-2'>
                  <FileText className='w-4 h-4 text-primary' />
                  Getting started — 6 steps
                </h2>
                <div className='space-y-5'>
                  {HOW_IT_WORKS_STEPS.map((step) => (
                    <Step key={step.number} {...step} />
                  ))}
                </div>
              </div>

              {/* Do's and Don'ts */}
              <div className='grid sm:grid-cols-2 gap-4'>
                <div className='bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-5'>
                  <h3 className='font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-3 text-sm'>
                    <CheckCircle2 className='w-4 h-4' />
                    Do's
                  </h3>
                  <ul className='space-y-2'>
                    {DO_DONTS.dos.map((item, i) => (
                      <li
                        key={i}
                        className='text-sm text-muted-foreground flex items-start gap-2'
                      >
                        <span className='text-emerald-500 mt-0.5 shrink-0'>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5'>
                  <h3 className='font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-3 text-sm'>
                    <AlertCircle className='w-4 h-4' />
                    Don'ts
                  </h3>
                  <ul className='space-y-2'>
                    {DO_DONTS.donts.map((item, i) => (
                      <li
                        key={i}
                        className='text-sm text-muted-foreground flex items-start gap-2'
                      >
                        <span className='text-red-500 mt-0.5 shrink-0'>✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pro tip callout */}
              <div className='bg-primary/5 border border-primary/20 rounded-2xl p-5 flex gap-3'>
                <Lightbulb className='w-5 h-5 text-primary shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm font-semibold text-foreground mb-1'>
                    Pro tip
                  </p>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    Create a separate resume for each type of role you're
                    applying for — not each individual company. For example, one
                    resume for "Frontend Developer" roles and another for
                    "Full-stack Engineer" roles. This saves time while keeping
                    your resume highly relevant.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CV Writing Tips */}
          {activeTab === 'tips' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-4'
            >
              <div className='bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-4 flex gap-3 mb-2'>
                <Star className='w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5' />
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  These tips are based on what actually works with modern ATS
                  systems and human recruiters. Follow them and your ATS score
                  will reflect it.
                </p>
              </div>
              <div className='grid gap-4'>
                {CV_TIPS.map((card, i) => (
                  <TipCardComponent key={i} card={card} />
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ */}
          {activeTab === 'faq' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Accordion items={FAQ_ITEMS} />
              <div className='mt-6 bg-card border border-border rounded-2xl p-5 text-center'>
                <p className='text-sm text-muted-foreground'>
                  Still have questions?{' '}
                  <a
                    href='mailto:support@resumeai.com'
                    className='text-primary font-medium hover:underline'
                  >
                    Email our support team
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
