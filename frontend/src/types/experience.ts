export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location?: string;
  description: string;
  highlights?: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  qualification: string;
  institution: string;
  location?: string;
  description?: string;
}

export interface TrainingItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
