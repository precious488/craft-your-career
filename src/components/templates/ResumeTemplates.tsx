import { ResumeData } from "@/contexts/ResumeContext";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
}

export const ModernTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-background text-foreground p-8 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="bg-gradient-primary rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-base mt-1" style={{ color: "hsl(0, 0%, 90%)" }}>
          {personalInfo.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs" style={{ color: "hsl(0, 0%, 85%)" }}>
          {personalInfo.email && (
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Summary</h2>
          <p className="text-muted-foreground">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{exp.position}</p>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">
                  {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              {exp.description && <p className="text-muted-foreground mt-1 text-xs">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground">{edu.degree} in {edu.field}</p>
                  <p className="text-muted-foreground">{edu.school}</p>
                </div>
                <p className="text-xs text-muted-foreground">{edu.startDate} — {edu.endDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={i} className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Projects</h2>
          {projects.map((p) => (
            <div key={p.id} className="mb-2">
              <p className="font-semibold text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
              {p.technologies && <p className="text-xs text-primary mt-0.5">{p.technologies}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Certifications</h2>
          {certifications.map((c) => (
            <div key={c.id} className="mb-1">
              <span className="font-medium text-foreground">{c.name}</span>
              <span className="text-muted-foreground"> — {c.issuer}, {c.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 border-b border-border pb-1">Languages</h2>
          <p className="text-muted-foreground">{languages.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export const ClassicTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = data;

  return (
    <div className="bg-background text-foreground p-8 text-sm" style={{ fontFamily: "Georgia, serif" }}>
      <div className="text-center border-b-2 border-foreground pb-4 mb-6">
        <h1 className="text-3xl font-bold text-foreground">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-muted-foreground mt-1">{personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-muted-foreground">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Professional Summary</h2>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Professional Experience</h2>
          <div className="border-t border-foreground/20" />
          {experience.map((exp) => (
            <div key={exp.id} className="mt-3">
              <p className="font-bold text-foreground">{exp.position}</p>
              <p className="italic text-muted-foreground">{exp.company} | {exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
              {exp.description && <p className="text-muted-foreground mt-1 text-xs">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Education</h2>
          <div className="border-t border-foreground/20" />
          {education.map((edu) => (
            <div key={edu.id} className="mt-3">
              <p className="font-bold text-foreground">{edu.degree} in {edu.field}</p>
              <p className="italic text-muted-foreground">{edu.school} | {edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Skills</h2>
          <div className="border-t border-foreground/20 pt-2" />
          <p className="text-muted-foreground">{skills.join(" • ")}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Projects</h2>
          <div className="border-t border-foreground/20" />
          {projects.map((p) => (
            <div key={p.id} className="mt-2">
              <p className="font-bold text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Certifications</h2>
          <div className="border-t border-foreground/20 pt-2" />
          {certifications.map((c) => (
            <p key={c.id} className="text-muted-foreground">{c.name} — {c.issuer} ({c.date})</p>
          ))}
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Languages</h2>
          <div className="border-t border-foreground/20 pt-2" />
          <p className="text-muted-foreground">{languages.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export const MinimalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-background text-foreground p-8 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="mb-8">
        <h1 className="text-3xl font-light text-foreground tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-muted-foreground mt-1 font-light">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <p className="text-muted-foreground leading-relaxed font-light">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4 pl-4 border-l-2 border-border">
              <p className="font-medium text-foreground">{exp.position}</p>
              <p className="text-muted-foreground text-xs">{exp.company} · {exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
              {exp.description && <p className="text-muted-foreground mt-1 text-xs font-light">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 pl-4 border-l-2 border-border">
              <p className="font-medium text-foreground">{edu.degree} in {edu.field}</p>
              <p className="text-xs text-muted-foreground">{edu.school} · {edu.startDate} — {edu.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-3">Skills</h2>
          <p className="text-muted-foreground font-light">{skills.join(" · ")}</p>
        </div>
      )}
    </div>
  );
};

export const CorporateTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, summary, experience, education, skills, certifications } = data;

  return (
    <div className="bg-background text-foreground text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header bar */}
      <div className="bg-foreground p-6">
        <h1 className="text-2xl font-bold" style={{ color: "hsl(var(--background))" }}>{personalInfo.fullName || "Your Name"}</h1>
        <p style={{ color: "hsl(var(--muted))" }}>{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-xs" style={{ color: "hsl(var(--muted))" }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-8 grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-5">
          {summary && (
            <div>
              <h2 className="text-sm font-bold text-foreground mb-2 pb-1 border-b-2 border-accent">Summary</h2>
              <p className="text-muted-foreground">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-foreground mb-2 pb-1 border-b-2 border-accent">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <p className="font-semibold text-foreground">{exp.position}</p>
                  <p className="text-xs text-accent font-medium">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</p>
                  {exp.description && <p className="text-xs text-muted-foreground mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-foreground mb-2 pb-1 border-b-2 border-accent">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold text-foreground">{edu.degree} in {edu.field}</p>
                  <p className="text-xs text-muted-foreground">{edu.school} · {edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-foreground mb-2 pb-1 border-b-2 border-accent">Skills</h2>
              <div className="space-y-1">
                {skills.map((s, i) => (
                  <p key={i} className="text-xs text-muted-foreground">• {s}</p>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-foreground mb-2 pb-1 border-b-2 border-accent">Certifications</h2>
              {certifications.map((c) => (
                <div key={c.id} className="mb-1">
                  <p className="text-xs font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
