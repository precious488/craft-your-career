import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  website: string;
  linkedin: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  id: string;
  title: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  languages: string[];
  template: "modern" | "classic" | "minimal" | "corporate";
  createdAt: string;
  updatedAt: string;
}

const emptyResume = (): ResumeData => ({
  id: crypto.randomUUID(),
  title: "Untitled Resume",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    website: "",
    linkedin: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  template: "modern",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

interface ResumeContextType {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  setCurrentResume: (resume: ResumeData) => void;
  createResume: () => ResumeData;
  updateResume: (resume: ResumeData) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => ResumeData;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be within ResumeProvider");
  return ctx;
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumes, setResumes] = useState<ResumeData[]>(() => {
    const saved = localStorage.getItem("cv-resumes");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    localStorage.setItem("cv-resumes", JSON.stringify(resumes));
  }, [resumes]);

  const createResume = () => {
    const r = emptyResume();
    setResumes((prev) => [...prev, r]);
    setCurrentResume(r);
    return r;
  };

  const updateResume = (resume: ResumeData) => {
    const updated = { ...resume, updatedAt: new Date().toISOString() };
    setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setCurrentResume(updated);
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (currentResume?.id === id) setCurrentResume(null);
  };

  const duplicateResume = (id: string) => {
    const original = resumes.find((r) => r.id === id);
    if (!original) throw new Error("Resume not found");
    const copy: ResumeData = {
      ...JSON.parse(JSON.stringify(original)),
      id: crypto.randomUUID(),
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [...prev, copy]);
    return copy;
  };

  return (
    <ResumeContext.Provider
      value={{ resumes, currentResume, setCurrentResume, createResume, updateResume, deleteResume, duplicateResume }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
