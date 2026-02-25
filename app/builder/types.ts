export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
}

export interface ExperienceEntry {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  link: string;
}

export interface Links {
  github: string;
  linkedin: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: string;
  links: Links;
}