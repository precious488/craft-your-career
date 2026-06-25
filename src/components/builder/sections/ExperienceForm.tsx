/**
 * ExperienceForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical, Briefcase } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { BulletAssist } from '@/components/builder/AIAssistPanel';
import type { Experience } from '@/contexts/ResumeContext';

interface Props {
  value: Experience[];
  onChange: (value: Experience[]) => void;
}

function emptyExperience(): Experience {
  return {
    id: uuidv4(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  };
}

export default function ExperienceForm({ value, onChange }: Props) {
  function update(id: string, patch: Partial<Experience>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }

  function add() {
    onChange([...value, emptyExperience()]);
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Work Experience</h2>
      <p className="text-sm text-muted-foreground mb-6">
        List your roles from most recent to oldest. Use action verbs and quantify results where possible.
      </p>

      {value.length === 0 && (
        <div className="text-center py-10 border border-dashed border-border rounded-xl mb-4">
          <Briefcase className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No work experience added yet</p>
        </div>
      )}

      <div className="space-y-4">
        {value.map((exp, i) => (
          <div key={exp.id} className="border border-border rounded-xl p-4 bg-card relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <GripVertical className="w-3.5 h-3.5" />
                Position {i + 1}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => remove(exp.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Job Title</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => update(exp.id, { position: e.target.value })}
                  placeholder="Senior Software Engineer"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => update(exp.id, { company: e.target.value })}
                  placeholder="Acme Inc."
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Start Date</Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => update(exp.id, { startDate: e.target.value })}
                  placeholder="Jan 2022"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">End Date</Label>
                <Input
                  value={exp.endDate}
                  onChange={(e) => update(exp.id, { endDate: e.target.value })}
                  placeholder="Present"
                  disabled={exp.current}
                  className="mt-1"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <Checkbox
                checked={exp.current}
                onCheckedChange={(checked) => update(exp.id, { current: !!checked, endDate: checked ? '' : exp.endDate })}
              />
              <span className="text-xs text-muted-foreground">I currently work here</span>
            </label>

            <div className="mt-3">
              <Label className="text-xs">Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => update(exp.id, { description: e.target.value })}
                placeholder="• Led a team of 5 engineers to deliver...&#10;• Reduced API latency by 40% through..."
                rows={4}
                className="mt-1 resize-none text-sm"
              />
              <BulletAssist
                position={exp.position}
                company={exp.company}
                existingDescription={exp.description}
                onApply={(bullet) =>
                  update(exp.id, { description: exp.description ? `${exp.description}\n${bullet}` : bullet })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={add} className="mt-4 gap-2">
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
}
