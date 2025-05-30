export type Section = 
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications';

export type Template = 
  | 'modern'
  | 'professional'
  | 'creative'
  | 'minimal';

export interface Personal {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  link?: string;
}

export interface ResumeData {
  personal: Personal;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export interface ResumeTemplate {
  id: Template;
  name: string;
  description: string;
  thumbnail: string;
}