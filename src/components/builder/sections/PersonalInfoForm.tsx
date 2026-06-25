/**
 * PersonalInfoForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PersonalInfo } from '@/contexts/ResumeContext';

interface Props {
  value: PersonalInfo;
  onChange: (value: PersonalInfo) => void;
}

const FIELDS: Array<{ key: keyof PersonalInfo; label: string; placeholder: string; type?: string }> = [
  { key: 'fullName', label: 'Full Name', placeholder: 'Jane Smith' },
  { key: 'title', label: 'Professional Title', placeholder: 'Senior Software Engineer' },
  { key: 'email', label: 'Email', placeholder: 'jane@example.com', type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567' },
  { key: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
  { key: 'website', label: 'Website', placeholder: 'janesmith.dev' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/janesmith' },
];

export default function PersonalInfoForm({ value, onChange }: Props) {
  function set(key: keyof PersonalInfo, v: string) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Personal Information</h2>
      <p className="text-sm text-muted-foreground mb-6">
        This is the first thing recruiters see — make sure it's accurate and up to date.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map((field) => (
          <div key={field.key} className={field.key === 'fullName' || field.key === 'title' ? 'sm:col-span-2' : ''}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              value={value[field.key]}
              onChange={(e) => set(field.key, e.target.value)}
              className="mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
