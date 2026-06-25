/**
 * LanguagesForm.tsx
 * Drop into src/components/builder/sections/
 */
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { X, Languages as LanguagesIcon } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function LanguagesForm({ value, onChange }: Props) {
  const [input, setInput] = useState('');

  function add(lang: string) {
    const trimmed = lang.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(input);
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function remove(lang: string) {
    onChange(value.filter((l) => l !== lang));
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Languages</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Languages you speak, with proficiency if relevant (e.g. "Spanish (Fluent)").
      </p>

      <Label htmlFor="languages">Languages</Label>
      <div className="mt-1 flex flex-wrap gap-2 p-2 border border-input rounded-md min-h-[44px] focus-within:ring-2 focus-within:ring-ring">
        {value.map((lang) => (
          <span
            key={lang}
            className="flex items-center gap-1 bg-primary/10 text-primary text-sm px-2.5 py-1 rounded-full"
          >
            {lang}
            <button type="button" onClick={() => remove(lang)} className="hover:text-destructive">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          id="languages"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (input.trim()) {
              add(input);
              setInput('');
            }
          }}
          placeholder={value.length === 0 ? 'e.g. English (Native), Spanish (Fluent)' : ''}
          className="flex-1 min-w-[160px] bg-transparent outline-none text-sm py-1"
        />
      </div>

      {value.length === 0 && (
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <LanguagesIcon className="w-3.5 h-3.5" />
          Optional — add if relevant to the role
        </div>
      )}
    </div>
  );
}
