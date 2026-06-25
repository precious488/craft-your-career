/**
 * SummaryForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SummaryAssist } from '@/components/builder/AIAssistPanel';

interface Props {
  value: string;
  jobTitle?: string;
  skills?: string[];
  onChange: (value: string) => void;
}

export default function SummaryForm({ value, jobTitle, skills, onChange }: Props) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Professional Summary</h2>
      <p className="text-sm text-muted-foreground mb-6">
        A short, punchy overview of who you are and what you bring. 2–4 sentences works best.
      </p>

      <Label htmlFor="summary">Summary</Label>
      <Textarea
        id="summary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        rows={6}
        className="mt-1 resize-none"
      />
      <p className="text-xs text-muted-foreground mt-1">{value.length} / 2000 characters</p>

      <SummaryAssist currentSummary={value} jobTitle={jobTitle} skills={skills} onApply={onChange} />
    </div>
  );
}
