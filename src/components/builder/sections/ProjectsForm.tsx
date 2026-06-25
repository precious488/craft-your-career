/**
 * ProjectsForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, GripVertical, FolderKanban } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import type { Project } from '@/contexts/ResumeContext'
import { BulletAssist } from '@/components/builder/AIAssistPanel'
interface Props {
  value: Project[]
  onChange: (value: Project[]) => void
}

function emptyProject(): Project {
  return { id: uuidv4(), name: '', description: '', technologies: '', link: '' }
}

export default function ProjectsForm({ value, onChange }: Props) {
  function update(id: string, patch: Partial<Project>) {
    onChange(value.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function remove(id: string) {
    onChange(value.filter((p) => p.id !== id))
  }

  function add() {
    onChange([...value, emptyProject()])
  }

  return (
    <div className='max-w-2xl'>
      <h2 className='text-lg font-semibold text-foreground mb-1'>Projects</h2>
      <p className='text-sm text-muted-foreground mb-6'>
        Showcase personal, academic, or open-source projects that demonstrate
        your skills.
      </p>

      {value.length === 0 && (
        <div className='text-center py-10 border border-dashed border-border rounded-xl mb-4'>
          <FolderKanban className='w-8 h-8 text-muted-foreground/50 mx-auto mb-2' />
          <p className='text-sm text-muted-foreground'>No projects added yet</p>
        </div>
      )}

      <div className='space-y-4'>
        {value.map((proj, i) => (
          <div
            key={proj.id}
            className='border border-border rounded-xl p-4 bg-card relative'
          >
            <div className='flex items-center justify-between mb-3'>
              <div className='flex items-center gap-2 text-xs font-medium text-muted-foreground'>
                <GripVertical className='w-3.5 h-3.5' />
                Project {i + 1}
              </div>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-7 w-7 text-destructive hover:text-destructive'
                onClick={() => remove(proj.id)}
              >
                <Trash2 className='w-3.5 h-3.5' />
              </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div>
                <Label className='text-xs'>Project Name</Label>
                <Input
                  value={proj.name}
                  onChange={(e) => update(proj.id, { name: e.target.value })}
                  placeholder='E-commerce Platform'
                  className='mt-1'
                />
              </div>
              <div>
                <Label className='text-xs'>Technologies</Label>
                <Input
                  value={proj.technologies}
                  onChange={(e) =>
                    update(proj.id, { technologies: e.target.value })
                  }
                  placeholder='React, Node.js, PostgreSQL'
                  className='mt-1'
                />
              </div>
              <div className='sm:col-span-2'>
                <Label className='text-xs'>Link (optional)</Label>
                <Input
                  value={proj.link}
                  onChange={(e) => update(proj.id, { link: e.target.value })}
                  placeholder='github.com/you/project'
                  className='mt-1'
                />
              </div>
            </div>

            <div className='mt-3'>
              <Label className='text-xs'>Description</Label>
              <Textarea
                value={proj.description}
                onChange={(e) =>
                  update(proj.id, { description: e.target.value })
                }
                placeholder='Built a full-stack platform that...'
                rows={3}
                className='mt-1 resize-none text-sm'
              />
              <BulletAssist
                position={proj.name}
                company=''
                existingDescription={proj.description}
                onApply={(bullet) =>
                  update(proj.id, {
                    description: proj.description
                      ? `${proj.description}\n${bullet}`
                      : bullet,
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type='button'
        variant='outline'
        onClick={add}
        className='mt-4 gap-2'
      >
        <Plus className='w-4 h-4' />
        Add Project
      </Button>
    </div>
  )
}
