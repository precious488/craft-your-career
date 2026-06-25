/**
 * FeedbackPage.tsx — UPDATED with photo upload
 * Replace src/pages/FeedbackPage.tsx with this.
 */
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Loader2,
  CheckCircle2,
  Star,
  Camera,
  X,
} from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { feedbackAPI } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

const MAX_SIZE_MB = 1.5

function avatarUrl(name: string): string {
  const seed = encodeURIComponent(name.trim().toLowerCase())
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=2563eb,4f46e5,7c3aed&backgroundType=gradientLinear`
}

export default function FeedbackPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.fullName ?? '')
  const [location, setLocation] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setPhotoError('')
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file (JPG, PNG, WebP, etc.)')
      return
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setPhotoError(`Image must be under ${MAX_SIZE_MB}MB`)
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setPhotoUrl(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  function removePhoto() {
    setPhotoUrl(null)
    setPhotoError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await feedbackAPI.submit({
        name,
        location,
        jobTitle,
        message,
        rating,
        photoUrl: photoUrl ?? undefined,
      })
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewImage = photoUrl ?? (name.trim() ? avatarUrl(name) : null)

  return (
    <DashboardLayout>
      <div className='py-10 px-6'>
        <div className='max-w-xl mx-auto'>
          <div className='mb-8'>
            <h1 className='text-2xl font-bold text-foreground flex items-center gap-2'>
              <MessageSquare className='w-6 h-6 text-primary' />
              Share Your Feedback
            </h1>
            <p className='text-muted-foreground mt-1'>
              Tell us about your experience — your story might be featured on
              our homepage.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-card border border-border rounded-2xl p-8 text-center'
            >
              <div className='w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4'>
                <CheckCircle2 className='w-7 h-7 text-emerald-600 dark:text-emerald-400' />
              </div>
              <h2 className='text-lg font-semibold text-foreground mb-1'>
                Thank you!
              </h2>
              <p className='text-sm text-muted-foreground mb-6'>
                Your feedback has been received. We appreciate you taking the
                time.
              </p>
              <Button
                variant='outline'
                onClick={() => {
                  setSubmitted(false)
                  setPhotoUrl(null)
                  setMessage('')
                }}
              >
                Submit another response
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className='bg-card border border-border rounded-2xl p-6 space-y-5'
            >
              {/* Photo upload */}
              <div className='flex items-center gap-4'>
                <div className='relative shrink-0'>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt='Profile preview'
                      className='w-16 h-16 rounded-full object-cover border-2 border-border'
                    />
                  ) : (
                    <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-border'>
                      <Camera className='w-6 h-6 text-muted-foreground' />
                    </div>
                  )}
                  {photoUrl && (
                    <button
                      type='button'
                      onClick={removePhoto}
                      className='absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive flex items-center justify-center'
                    >
                      <X className='w-3 h-3 text-white' />
                    </button>
                  )}
                </div>

                <div className='flex-1'>
                  <p className='text-sm font-medium text-foreground mb-1'>
                    Profile Photo
                  </p>
                  <p className='text-xs text-muted-foreground mb-2'>
                    Optional — we'll generate an avatar if you skip this
                  </p>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handlePhotoChange}
                    className='hidden'
                    id='photo-upload'
                  />
                  <label
                    htmlFor='photo-upload'
                    className='cursor-pointer inline-flex items-center gap-1.5 text-xs text-primary border border-primary/30 hover:bg-primary/5 transition-colors rounded-lg px-3 py-1.5'
                  >
                    <Camera className='w-3.5 h-3.5' />
                    {photoUrl ? 'Change photo' : 'Upload photo'}
                  </label>
                  {photoError && (
                    <p className='text-xs text-destructive mt-1'>
                      {photoError}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Jane Smith'
                    required
                    className='mt-1'
                  />
                </div>
                <div>
                  <Label htmlFor='jobTitle'>Job Title</Label>
                  <Input
                    id='jobTitle'
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder='Software Engineer'
                    className='mt-1'
                  />
                </div>
              </div>

              <div>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder='San Francisco, CA'
                  className='mt-1'
                />
              </div>

              {/* Star rating */}
              <div>
                <Label>Rating</Label>
                <div className='flex items-center gap-1 mt-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() => setRating(star)}
                      className='p-0.5'
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor='message'>Your Feedback</Label>
                <Textarea
                  id='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Tell us what you liked, what could be better, or how the app helped you land your next role...'
                  rows={5}
                  required
                  minLength={10}
                  className='mt-1 resize-none'
                />
                <p className='text-xs text-muted-foreground mt-1'>
                  {message.length} / 1000 characters
                </p>
              </div>

              {error && (
                <p className='text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2'>
                  {error}
                </p>
              )}

              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gradient-primary text-primary-foreground hover:opacity-90'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Submitting…
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
