/**
 * ATSBadge.tsx
 * Compact circular ATS score indicator for the dashboard card.
 * Lazily fetches the score on mount and caches it in sessionStorage
 * (the backend already caches via Redis, this just avoids re-render flicker).
 * Drop into src/components/dashboard/
 */
import { useEffect, useState } from 'react'
import { Loader2, Target } from 'lucide-react'
import { atsAPI } from '@/lib/api'
import type { ResumeData } from '@/contexts/ResumeContext'

interface Props {
  resume: ResumeData
}

function scoreColor(score: number): { ring: string; text: string; bg: string } {
  if (score >= 70)
    return {
      ring: '#22c55e',
      text: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
    }
  if (score >= 50)
    return {
      ring: '#f59e0b',
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    }
  return {
    ring: '#ef4444',
    text: 'text-red-500 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
  }
}

export default function ATSBadge({ resume }: Props) {
  const [score, setScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const hasContent =
    !!resume.personalInfo.fullName ||
    !!resume.summary ||
    resume.experience.length > 0

  useEffect(() => {
    if (!hasContent) return

    const cacheKey = `ats-score:${resume.id}:${resume.updatedAt}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      setScore(Number(cached))
      return
    }

    let cancelled = false
    setIsLoading(true)
    atsAPI
      .analyze(resume, undefined, resume.id)
      .then(({ data }) => {
        if (cancelled) return
        setScore(data.overallScore)
        sessionStorage.setItem(cacheKey, String(data.overallScore))
      })
      .catch(() => {
        if (!cancelled) setScore(null)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume.id, resume.updatedAt, hasContent])

  if (!hasContent) return null

  if (isLoading) {
    return (
      <div className='flex items-center gap-1.5 text-[11px] text-muted-foreground'>
        <Loader2 className='w-3 h-3 animate-spin' />
        <span>Scoring…</span>
      </div>
    )
  }

  if (score === null) return null

  const { ring, text, bg } = scoreColor(score)
  const r = 8
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div
      className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full ${bg}`}
    >
      <svg width='20' height='20' className='-rotate-90 shrink-0'>
        <circle
          cx='10'
          cy='10'
          r={r}
          fill='none'
          stroke='currentColor'
          strokeWidth='2.5'
          className='text-current opacity-15'
        />
        <circle
          cx='10'
          cy='10'
          r={r}
          fill='none'
          stroke={ring}
          strokeWidth='2.5'
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap='round'
        />
      </svg>
      <span className={`text-[11px] font-semibold ${text}`}>{score}</span>
      <Target className={`w-3 h-3 ${text} opacity-60`} />
    </div>
  )
}
