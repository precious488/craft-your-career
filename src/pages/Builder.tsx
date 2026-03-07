import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Download, Eye, User, Briefcase, GraduationCap,
  Code, Award, Globe, FolderOpen, FileText, Plus, Trash2, ChevronDown, ChevronUp, Sparkles
} from "lucide-react";
import { useResume, ResumeData, ExperienceEntry, EducationEntry, ProjectEntry, CertificationEntry } from "@/contexts/ResumeContext";
import { ModernTemplate, ClassicTemplate, MinimalTemplate, CorporateTemplate } from "@/components/templates/ResumeTemplates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Builder = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resumes, updateResume, setCurrentResume } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);

  const resume = resumes.find((r) => r.id === id);

  const [data, setData] = useState<ResumeData | null>(null);

  useEffect(() => {
    if (resume) {
      setData({ ...resume });
      setCurrentResume(resume);
    }
  }, [id]);

  const save = useCallback(
    (updated: ResumeData) => {
      setData(updated);
      updateResume(updated);
    },
    [updateResume]
  );

  const update = (partial: Partial<ResumeData>) => {
    if (!data) return;
    save({ ...data, ...partial });
  };

  const updatePersonal = (field: string, value: string) => {
    if (!data) return;
    save({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const addExperience = () => {
    if (!data) return;
    const entry: ExperienceEntry = {
      id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", current: false, description: "",
    };
    save({ ...data, experience: [...data.experience, entry] });
  };

  const updateExperience = (idx: number, field: string, value: string | boolean) => {
    if (!data) return;
    const exp = [...data.experience];
    exp[idx] = { ...exp[idx], [field]: value };
    save({ ...data, experience: exp });
  };

  const removeExperience = (idx: number) => {
    if (!data) return;
    save({ ...data, experience: data.experience.filter((_, i) => i !== idx) });
  };

  const addEducation = () => {
    if (!data) return;
    const entry: EducationEntry = {
      id: crypto.randomUUID(), school: "", degree: "", field: "", startDate: "", endDate: "", description: "",
    };
    save({ ...data, education: [...data.education, entry] });
  };

  const updateEducation = (idx: number, field: string, value: string) => {
    if (!data) return;
    const edu = [...data.education];
    edu[idx] = { ...edu[idx], [field]: value };
    save({ ...data, education: edu });
  };

  const removeEducation = (idx: number) => {
    if (!data) return;
    save({ ...data, education: data.education.filter((_, i) => i !== idx) });
  };

  const addSkill = () => {
    if (!data) return;
    save({ ...data, skills: [...data.skills, ""] });
  };

  const updateSkill = (idx: number, value: string) => {
    if (!data) return;
    const s = [...data.skills];
    s[idx] = value;
    save({ ...data, skills: s });
  };

  const removeSkill = (idx: number) => {
    if (!data) return;
    save({ ...data, skills: data.skills.filter((_, i) => i !== idx) });
  };

  const addProject = () => {
    if (!data) return;
    const entry: ProjectEntry = { id: crypto.randomUUID(), name: "", description: "", technologies: "", link: "" };
    save({ ...data, projects: [...data.projects, entry] });
  };

  const updateProject = (idx: number, field: string, value: string) => {
    if (!data) return;
    const p = [...data.projects];
    p[idx] = { ...p[idx], [field]: value };
    save({ ...data, projects: p });
  };

  const removeProject = (idx: number) => {
    if (!data) return;
    save({ ...data, projects: data.projects.filter((_, i) => i !== idx) });
  };

  const addCertification = () => {
    if (!data) return;
    const entry: CertificationEntry = { id: crypto.randomUUID(), name: "", issuer: "", date: "" };
    save({ ...data, certifications: [...data.certifications, entry] });
  };

  const updateCertification = (idx: number, field: string, value: string) => {
    if (!data) return;
    const c = [...data.certifications];
    c[idx] = { ...c[idx], [field]: value };
    save({ ...data, certifications: c });
  };

  const removeCertification = (idx: number) => {
    if (!data) return;
    save({ ...data, certifications: data.certifications.filter((_, i) => i !== idx) });
  };

  const addLanguage = () => {
    if (!data) return;
    save({ ...data, languages: [...data.languages, ""] });
  };

  const updateLanguage = (idx: number, value: string) => {
    if (!data) return;
    const l = [...data.languages];
    l[idx] = value;
    save({ ...data, languages: l });
  };

  const removeLanguage = (idx: number) => {
    if (!data) return;
    save({ ...data, languages: data.languages.filter((_, i) => i !== idx) });
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data?.title || "resume"}.pdf`);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Resume not found.</p>
      </div>
    );
  }

  const TemplateComponent = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate,
    corporate: CorporateTemplate,
  }[data.template];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b border-border bg-card flex items-center px-4 gap-4 flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Input
          value={data.title}
          onChange={(e) => update({ title: e.target.value })}
          className="max-w-xs h-8 text-sm font-medium border-none bg-transparent focus-visible:ring-0"
        />
        <div className="flex-1" />
        <Select value={data.template} onValueChange={(v: any) => update({ template: v })}>
          <SelectTrigger className="w-36 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleDownloadPDF} size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Download className="w-3 h-3 mr-1" /> PDF
        </Button>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-[480px] border-r border-border overflow-y-auto bg-card">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 flex-wrap">
              {[
                { value: "personal", icon: User, label: "Personal" },
                { value: "experience", icon: Briefcase, label: "Work" },
                { value: "education", icon: GraduationCap, label: "Education" },
                { value: "skills", icon: Code, label: "Skills" },
                { value: "projects", icon: FolderOpen, label: "Projects" },
                { value: "more", icon: Award, label: "More" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs px-3 py-2.5"
                >
                  <tab.icon className="w-3 h-3 mr-1" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="p-5 space-y-4">
              {/* Personal Info */}
              <TabsContent value="personal" className="mt-0 space-y-3">
                <h3 className="font-semibold text-foreground text-sm">Personal Information</h3>
                {[
                  { field: "fullName", label: "Full Name", placeholder: "John Doe" },
                  { field: "title", label: "Professional Title", placeholder: "Software Engineer" },
                  { field: "email", label: "Email", placeholder: "john@example.com" },
                  { field: "phone", label: "Phone", placeholder: "+1 234 567 890" },
                  { field: "location", label: "Location", placeholder: "New York, NY" },
                  { field: "website", label: "Website", placeholder: "johndoe.com" },
                  { field: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/johndoe" },
                ].map((f) => (
                  <div key={f.field}>
                    <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                    <Input
                      value={(data.personalInfo as any)[f.field]}
                      onChange={(e) => updatePersonal(f.field, e.target.value)}
                      placeholder={f.placeholder}
                      className="h-9 text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Summary</label>
                  <Textarea
                    value={data.summary}
                    onChange={(e) => update({ summary: e.target.value })}
                    placeholder="Brief professional summary..."
                    rows={4}
                    className="text-sm"
                  />
                </div>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">Work Experience</h3>
                  <Button onClick={addExperience} size="sm" variant="outline" className="text-xs h-7">
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Experience {idx + 1}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeExperience(idx)}>
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                    <Input value={exp.position} onChange={(e) => updateExperience(idx, "position", e.target.value)} placeholder="Position" className="h-8 text-sm" />
                    <Input value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} placeholder="Company" className="h-8 text-sm" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input value={exp.startDate} onChange={(e) => updateExperience(idx, "startDate", e.target.value)} placeholder="Start date" className="h-8 text-sm" />
                      <Input value={exp.endDate} onChange={(e) => updateExperience(idx, "endDate", e.target.value)} placeholder="End date" className="h-8 text-sm" disabled={exp.current} />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(idx, "current", e.target.checked)} className="rounded" />
                      Currently working here
                    </label>
                    <Textarea value={exp.description} onChange={(e) => updateExperience(idx, "description", e.target.value)} placeholder="Description of your role..." rows={3} className="text-sm" />
                  </div>
                ))}
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">Education</h3>
                  <Button onClick={addEducation} size="sm" variant="outline" className="text-xs h-7">
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Education {idx + 1}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeEducation(idx)}>
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                    <Input value={edu.school} onChange={(e) => updateEducation(idx, "school", e.target.value)} placeholder="School" className="h-8 text-sm" />
                    <Input value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="Degree" className="h-8 text-sm" />
                    <Input value={edu.field} onChange={(e) => updateEducation(idx, "field", e.target.value)} placeholder="Field of study" className="h-8 text-sm" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input value={edu.startDate} onChange={(e) => updateEducation(idx, "startDate", e.target.value)} placeholder="Start date" className="h-8 text-sm" />
                      <Input value={edu.endDate} onChange={(e) => updateEducation(idx, "endDate", e.target.value)} placeholder="End date" className="h-8 text-sm" />
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">Skills</h3>
                  <Button onClick={addSkill} size="sm" variant="outline" className="text-xs h-7">
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {data.skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input value={skill} onChange={(e) => updateSkill(idx, e.target.value)} placeholder="Skill" className="h-8 text-sm" />
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeSkill(idx)}>
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Projects */}
              <TabsContent value="projects" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-sm">Projects</h3>
                  <Button onClick={addProject} size="sm" variant="outline" className="text-xs h-7">
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
                {data.projects.map((proj, idx) => (
                  <div key={proj.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Project {idx + 1}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeProject(idx)}>
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                    <Input value={proj.name} onChange={(e) => updateProject(idx, "name", e.target.value)} placeholder="Project name" className="h-8 text-sm" />
                    <Textarea value={proj.description} onChange={(e) => updateProject(idx, "description", e.target.value)} placeholder="Description" rows={2} className="text-sm" />
                    <Input value={proj.technologies} onChange={(e) => updateProject(idx, "technologies", e.target.value)} placeholder="Technologies used" className="h-8 text-sm" />
                    <Input value={proj.link} onChange={(e) => updateProject(idx, "link", e.target.value)} placeholder="Project link" className="h-8 text-sm" />
                  </div>
                ))}
              </TabsContent>

              {/* More (Certifications + Languages) */}
              <TabsContent value="more" className="mt-0 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground text-sm">Certifications</h3>
                    <Button onClick={addCertification} size="sm" variant="outline" className="text-xs h-7">
                      <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                  {data.certifications.map((cert, idx) => (
                    <div key={cert.id} className="border border-border rounded-lg p-4 space-y-3 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-muted-foreground">Certification {idx + 1}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeCertification(idx)}>
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                      <Input value={cert.name} onChange={(e) => updateCertification(idx, "name", e.target.value)} placeholder="Certification name" className="h-8 text-sm" />
                      <Input value={cert.issuer} onChange={(e) => updateCertification(idx, "issuer", e.target.value)} placeholder="Issuing organization" className="h-8 text-sm" />
                      <Input value={cert.date} onChange={(e) => updateCertification(idx, "date", e.target.value)} placeholder="Date" className="h-8 text-sm" />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground text-sm">Languages</h3>
                    <Button onClick={addLanguage} size="sm" variant="outline" className="text-xs h-7">
                      <Plus className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {data.languages.map((lang, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input value={lang} onChange={(e) => updateLanguage(idx, e.target.value)} placeholder="Language" className="h-8 text-sm" />
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeLanguage(idx)}>
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right Panel - Preview */}
        <div className="hidden lg:flex flex-1 bg-muted/30 overflow-y-auto p-8 items-start justify-center">
          <div className="w-full max-w-[210mm] shadow-elegant rounded-lg overflow-hidden border border-border bg-background" ref={previewRef}>
            <TemplateComponent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
