/**
 * SkillsForm.tsx
 * Drop into src/components/builder/sections/
 */
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { SkillSuggest } from '@/components/builder/AIAssistPanel';

interface Props {
  value: string[];
  jobTitle?: string;
  onChange: (value: string[]) => void;
}

export default function SkillsForm({ value, jobTitle, onChange }: Props) {
  const [input, setInput] = useState('');

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(input);
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function remove(skill: string) {
    onChange(value.filter((s) => s !== skill));
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Skills</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Add technical and soft skills. Press Enter or comma to add each one.
      </p>

      <Label htmlFor="skills">Skills</Label>
      <div className="mt-1 flex flex-wrap gap-2 p-2 border border-input rounded-md min-h-[44px] focus-within:ring-2 focus-within:ring-ring">
        {value.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 bg-primary/10 text-primary text-sm px-2.5 py-1 rounded-full"
          >
            {skill}
            <button type="button" onClick={() => remove(skill)} className="hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          id="skills"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (input.trim()) {
              addSkill(input);
              setInput('');
            }
          }}
          placeholder={value.length === 0 ? 'e.g. JavaScript, Project Management, Figma' : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1"
        />
      </div>

      <SkillSuggest jobTitle={jobTitle ?? ''} existingSkills={value} onAddSkill={addSkill} />
    </div>
  );
}
