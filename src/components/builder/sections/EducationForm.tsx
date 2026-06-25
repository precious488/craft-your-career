/**
 * EducationForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, GraduationCap } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { Education } from '@/contexts/ResumeContext';

interface Props {
  value: Education[];
  onChange: (value: Education[]) => void;
}

function emptyEducation(): Education {
  return {
    id: uuidv4(),
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  };
}

export default function EducationForm({ value, onChange }: Props) {
  function update(id: string, patch: Partial<Education>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }

  function add() {
    onChange([...value, emptyEducation()]);
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Education</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Add your degrees, certifications programs, or relevant coursework.
      </p>

      {value.length === 0 && (
        <div className="text-center py-10 border border-dashed border-border rounded-xl mb-4">
          <GraduationCap className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No education added yet</p>
        </div>
      )}

      <div className="space-y-4">
        {value.map((edu, i) => (
          <div key={edu.id} className="border border-border rounded-xl p-4 bg-card relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <GripVertical className="w-3.5 h-3.5" />
                Education {i + 1}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => remove(edu.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <Label className="text-xs">School / University</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => update(edu.id, { school: e.target.value })}
                  placeholder="Stanford University"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => update(edu.id, { degree: e.target.value })}
                  placeholder="Bachelor of Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => update(edu.id, { field: e.target.value })}
                  placeholder="Computer Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Start Date</Label>
                <Input
                  value={edu.startDate}
                  onChange={(e) => update(edu.id, { startDate: e.target.value })}
                  placeholder="Sep 2018"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">End Date</Label>
                <Input
                  value={edu.endDate}
                  onChange={(e) => update(edu.id, { endDate: e.target.value })}
                  placeholder="May 2022"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-3">
              <Label className="text-xs">Additional Details (optional)</Label>
              <Textarea
                value={edu.description}
                onChange={(e) => update(edu.id, { description: e.target.value })}
                placeholder="Relevant coursework, honors, GPA..."
                rows={2}
                className="mt-1 resize-none text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={add} className="mt-4 gap-2">
        <Plus className="w-4 h-4" />
        Add Education
      </Button>
    </div>
  );
}
