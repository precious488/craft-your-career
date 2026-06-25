/**
 * CertificationsForm.tsx
 * Drop into src/components/builder/sections/
 */
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, Award } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { Certification } from '@/contexts/ResumeContext';

interface Props {
  value: Certification[];
  onChange: (value: Certification[]) => void;
}

function emptyCertification(): Certification {
  return { id: uuidv4(), name: '', issuer: '', date: '' };
}

export default function CertificationsForm({ value, onChange }: Props) {
  function update(id: string, patch: Partial<Certification>) {
    onChange(value.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function remove(id: string) {
    onChange(value.filter((c) => c.id !== id));
  }

  function add() {
    onChange([...value, emptyCertification()]);
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-1">Certifications</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Professional certifications, licenses, or completed training programs.
      </p>

      {value.length === 0 && (
        <div className="text-center py-10 border border-dashed border-border rounded-xl mb-4">
          <Award className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No certifications added yet</p>
        </div>
      )}

      <div className="space-y-3">
        {value.map((cert, i) => (
          <div key={cert.id} className="border border-border rounded-xl p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <GripVertical className="w-3.5 h-3.5" />
                Certification {i + 1}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                onClick={() => remove(cert.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Label className="text-xs">Name</Label>
                <Input
                  value={cert.name}
                  onChange={(e) => update(cert.id, { name: e.target.value })}
                  placeholder="AWS Certified Solutions Architect"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Date</Label>
                <Input
                  value={cert.date}
                  onChange={(e) => update(cert.id, { date: e.target.value })}
                  placeholder="Mar 2024"
                  className="mt-1"
                />
              </div>
              <div className="sm:col-span-3">
                <Label className="text-xs">Issuer</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => update(cert.id, { issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={add} className="mt-4 gap-2">
        <Plus className="w-4 h-4" />
        Add Certification
      </Button>
    </div>
  );
}
