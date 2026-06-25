/**
 * Testimonial.tsx — UPDATED
 * Uses real photoUrl from feedback if present, falls back to DiceBear avatar.
 * Replace src/components/landing/Testimonials.tsx (or wherever it lives).
 * Styling is 100% unchanged from the original you provided.
 */
import { useRef, useState, useEffect } from 'react'
import { feedbackAPI, FeedbackEntry } from '@/lib/api'

function avatarUrl(name: string): string {
  const seed = encodeURIComponent(name.trim().toLowerCase())
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=2563eb,4f46e5,7c3aed&backgroundType=gradientLinear`
}

function photoFor(item: FeedbackEntry): string {
  return item.photoUrl ?? avatarUrl(item.name)
}

export default function Testimonial() {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [testimonials, setTestimonials] = useState<FeedbackEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    feedbackAPI
      .published()
      .then(({ data }) => setTestimonials(data))
      .catch(() => setTestimonials([]))
      .finally(() => setIsLoading(false))
  }, [])

  const updateButtonStates = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    const slider = scrollRef.current
    if (!slider) return
    updateButtonStates()
    slider.addEventListener('scroll', updateButtonStates)
    window.addEventListener('resize', updateButtonStates)
    return () => {
      slider.removeEventListener('scroll', updateButtonStates)
      window.removeEventListener('resize', updateButtonStates)
    }
  }, [testimonials])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const slider = scrollRef.current
      const card = slider.querySelector('figure')
      const container = slider.querySelector('.flex')
      if (card && container) {
        const style = window.getComputedStyle(container)
        const gap = parseInt(style.gap) || 0
        const scrollAmount = card.offsetWidth + gap
        slider.scrollBy({
          left: direction === 'next' ? scrollAmount : -scrollAmount,
          behavior: 'smooth',
        })
      }
    }
  }

  if (!isLoading && testimonials.length === 0) return null

  return (
    <section className='px-4 md:px-8 mt-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid lg:grid-cols-3 gap-6 max-lg:max-w-2xl mb-12 md:mb-16'>
          <div className='col-span-2'>
            <h2 className='text-3xl font-bold text-slate-900 mb-6 md:text-4xl dark:text-slate-50'>
              What our happy client say
            </h2>
            <p className='text-base leading-relaxed text-slate-600 dark:text-slate-400'>
              See what our happy clients have to say. They've shared how our
              templates helped them launch quickly.
            </p>
          </div>

          <div className='flex space-x-4 items-end justify-end'>
            {/* Prev Button */}
            <button
              onClick={() => scroll('prev')}
              disabled={!canScrollLeft}
              type='button'
              className={`w-10 h-10 grid items-center justify-center border rounded-full rotate-180 shrink-0 transition-all
               bg-gray-200 border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 ${
                 canScrollLeft
                   ? 'cursor-pointer opacity-100'
                   : 'cursor-default opacity-50'
               }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='fill-slate-600 size-3.5 dark:fill-slate-50'
                viewBox='0 0 451.846 451.847'
              >
                <path d='M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373' />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={() => scroll('next')}
              disabled={!canScrollRight}
              type='button'
              className={`w-10 h-10 grid items-center justify-center border rounded-full shrink-0 transition-all
               bg-blue-600 border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                 canScrollRight
                   ? 'cursor-pointer opacity-100'
                   : 'cursor-default opacity-50'
               }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='fill-white size-3.5'
                viewBox='0 0 451.846 451.847'
              >
                <path d='M345.441 248.292 151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373' />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Area */}
        <div ref={scrollRef} className='overflow-hidden px-2 sm:px-10'>
          <div className='flex gap-6 sm:gap-14'>
            {isLoading
              ? // Skeleton placeholders while loading
                [1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className='max-w-[330px] h-48 shrink-0 rounded-3xl bg-slate-100 dark:bg-neutral-800 animate-pulse'
                  />
                ))
              : testimonials.map((item) => (
                  <figure
                    key={item._id}
                    className='max-w-[330px] h-auto shrink-0 py-4 pl-4 pr-4 bg-white border-2 border-slate-200 rounded-3xl relative dark:bg-neutral-800 dark:border-neutral-700 sm:pl-14'
                  >
                    <img
                      src={photoFor(item)}
                      className='w-12 h-12 rounded-full relative mb-4 border-2 border-slate-200 object-cover dark:border-neutral-700 sm:w-20 sm:h-20 sm:absolute sm:-left-10 sm:top-0 sm:bottom-0 sm:my-auto'
                      alt={item.name}
                    />

                    <figcaption>
                      <p className='text-sm font-semibold text-slate-900 dark:text-slate-50'>
                        {item.name}
                      </p>
                      <span className='mt-1 block text-xs text-slate-500'>
                        {item.jobTitle}
                        {item.jobTitle && item.location ? ' · ' : ''}
                        {item.location}
                      </span>
                    </figcaption>

                    <blockquote className='mt-4'>
                      <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-400'>
                        {item.message}
                      </p>
                    </blockquote>

                    <div className='flex gap-2 mt-4'>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns='http://www.w3.org/2000/svg'
                          className={`size-3.5 ${
                            i < (item.rating ?? 5)
                              ? 'fill-blue-600'
                              : 'fill-[#b5bdc0] dark:fill-neutral-600'
                          }`}
                          viewBox='0 0 24 24'
                        >
                          <path d='m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z' />
                        </svg>
                      ))}
                    </div>
                  </figure>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
