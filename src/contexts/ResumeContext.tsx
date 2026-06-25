// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// export interface PersonalInfo {
//   fullName: string;
//   email: string;
//   phone: string;
//   location: string;
//   title: string;
//   website: string;
//   linkedin: string;
// }

// export interface ExperienceEntry {
//   id: string;
//   company: string;
//   position: string;
//   startDate: string;
//   endDate: string;
//   current: boolean;
//   description: string;
// }

// export interface EducationEntry {
//   id: string;
//   school: string;
//   degree: string;
//   field: string;
//   startDate: string;
//   endDate: string;
//   description: string;
// }

// export interface ProjectEntry {
//   id: string;
//   name: string;
//   description: string;
//   technologies: string;
//   link: string;
// }

// export interface CertificationEntry {
//   id: string;
//   name: string;
//   issuer: string;
//   date: string;
// }

// export interface ResumeData {
//   id: string;
//   title: string;
//   personalInfo: PersonalInfo;
//   summary: string;
//   experience: ExperienceEntry[];
//   education: EducationEntry[];
//   skills: string[];
//   projects: ProjectEntry[];
//   certifications: CertificationEntry[];
//   languages: string[];
//   template: "modern" | "classic" | "minimal" | "corporate";
//   createdAt: string;
//   updatedAt: string;
// }

// const emptyResume = (): ResumeData => ({
//   id: crypto.randomUUID(),
//   title: "Untitled Resume",
//   personalInfo: {
//     fullName: "",
//     email: "",
//     phone: "",
//     location: "",
//     title: "",
//     website: "",
//     linkedin: "",
//   },
//   summary: "",
//   experience: [],
//   education: [],
//   skills: [],
//   projects: [],
//   certifications: [],
//   languages: [],
//   template: "modern",
//   createdAt: new Date().toISOString(),
//   updatedAt: new Date().toISOString(),
// });

// interface ResumeContextType {
//   resumes: ResumeData[];
//   currentResume: ResumeData | null;
//   setCurrentResume: (resume: ResumeData) => void;
//   createResume: () => ResumeData;
//   updateResume: (resume: ResumeData) => void;
//   deleteResume: (id: string) => void;
//   duplicateResume: (id: string) => ResumeData;
// }

// const ResumeContext = createContext<ResumeContextType | null>(null);

// export const useResume = () => {
//   const ctx = useContext(ResumeContext);
//   if (!ctx) throw new Error("useResume must be within ResumeProvider");
//   return ctx;
// };

// export const ResumeProvider = ({ children }: { children: ReactNode }) => {
//   const [resumes, setResumes] = useState<ResumeData[]>(() => {
//     const saved = localStorage.getItem("cv-resumes");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);

//   useEffect(() => {
//     localStorage.setItem("cv-resumes", JSON.stringify(resumes));
//   }, [resumes]);

//   const createResume = () => {
//     const r = emptyResume();
//     setResumes((prev) => [...prev, r]);
//     setCurrentResume(r);
//     return r;
//   };

//   const updateResume = (resume: ResumeData) => {
//     const updated = { ...resume, updatedAt: new Date().toISOString() };
//     setResumes((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
//     setCurrentResume(updated);
//   };

//   const deleteResume = (id: string) => {
//     setResumes((prev) => prev.filter((r) => r.id !== id));
//     if (currentResume?.id === id) setCurrentResume(null);
//   };

//   const duplicateResume = (id: string) => {
//     const original = resumes.find((r) => r.id === id);
//     if (!original) throw new Error("Resume not found");
//     const copy: ResumeData = {
//       ...JSON.parse(JSON.stringify(original)),
//       id: crypto.randomUUID(),
//       title: `${original.title} (Copy)`,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     setResumes((prev) => [...prev, copy]);
//     return copy;
//   };

//   return (
//     <ResumeContext.Provider
//       value={{ resumes, currentResume, setCurrentResume, createResume, updateResume, deleteResume, duplicateResume }}
//     >
//       {children}
//     </ResumeContext.Provider>
//   );
// };
/**
 * ResumeContext.tsx — UPDATED VERSION
 * Replaces localStorage persistence with backend API calls.
 * Drop this file over the existing src/contexts/ResumeContext.tsx
 */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'
import { resumeAPI, ResumeFromAPI } from '@/lib/api'
import { useAuth } from './AuthContext'
// import { v4 as uuidv4 } from 'uuid'

// ─── Types (unchanged — frontend still uses these) ─────────────
export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  title: string
  website: string
  linkedin: string
}
export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}
export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}
export interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link: string
}
export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
}

export interface ResumeData {
  id: string
  title: string
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
  certifications: Certification[]
  languages: string[]
  template: 'modern' | 'classic' | 'minimal' | 'corporate'
  createdAt: string
  updatedAt: string
}

function apiToLocal(r: ResumeFromAPI): ResumeData {
  return { ...r, id: r._id }
}

// ─── Context ──────────────────────────────────────────────────
interface ResumeContextValue {
  resumes: ResumeData[]
  isLoading: boolean
  currentResume: ResumeData | null
  createResume: () => Promise<string>
  updateResume: (id: string, updates: Partial<ResumeData>) => Promise<void>
  deleteResume: (id: string) => Promise<void>
  duplicateResume: (id: string) => Promise<string>
  setCurrentResume: (id: string) => Promise<void>
  refreshResumes: () => Promise<void>
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  title: '',
  website: '',
  linkedin: '',
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [currentResume, setCurrentResumeState] = useState<ResumeData | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(false)

  const refreshResumes = useCallback(async () => {
    if (!isAuthenticated) return
    setIsLoading(true)
    try {
      const { data } = await resumeAPI.list()
      setResumes(data.map(apiToLocal))
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated])

  // Load resumes when user authenticates
  useEffect(() => {
    if (isAuthenticated) refreshResumes()
    else setResumes([])
  }, [isAuthenticated, refreshResumes])

  const createResume = useCallback(async (): Promise<string> => {
    const { data } = await resumeAPI.create({
      title: 'Untitled Resume',
      personalInfo: DEFAULT_PERSONAL_INFO,
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      template: 'modern',
    })
    const local = apiToLocal(data)
    setResumes((prev) => [local, ...prev])
    setCurrentResumeState(local)
    return local.id
  }, [])

  const updateResume = useCallback(
    async (id: string, updates: Partial<ResumeData>) => {
      const { data } = await resumeAPI.update(
        id,
        updates as Partial<ResumeFromAPI>,
      )
      const local = apiToLocal(data)
      setResumes((prev) => prev.map((r) => (r.id === id ? local : r)))
      if (currentResume?.id === id) setCurrentResumeState(local)
    },
    [currentResume],
  )

  const deleteResume = useCallback(
    async (id: string) => {
      await resumeAPI.delete(id)
      setResumes((prev) => prev.filter((r) => r.id !== id))
      if (currentResume?.id === id) setCurrentResumeState(null)
    },
    [currentResume],
  )

  const duplicateResume = useCallback(async (id: string): Promise<string> => {
    const { data } = await resumeAPI.duplicate(id)
    const local = apiToLocal(data)
    setResumes((prev) => [local, ...prev])
    return local.id
  }, [])

  const setCurrentResume = useCallback(
    async (id: string) => {
      const cached = resumes.find((r) => r.id === id)
      if (cached) {
        setCurrentResumeState(cached)
        return
      }
      const { data } = await resumeAPI.get(id)
      setCurrentResumeState(apiToLocal(data))
    },
    [resumes],
  )

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        isLoading,
        currentResume,
        createResume,
        updateResume,
        deleteResume,
        duplicateResume,
        setCurrentResume,
        refreshResumes,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be inside ResumeProvider')
  return ctx
}
