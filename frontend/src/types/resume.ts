export interface ResumeExperience {
  id?: string;
  period: string;
  company: string;
  role: string;
  description: string;
  order?: number;
}

export interface ResumeEducation {
  id?: string;
  period: string;
  qualification: string;
  institution: string;
  order?: number;
}

export interface ResumeTraining {
  id?: string;
  period: string;
  title: string;
  institution: string;
  description?: string;
  order?: number;
}

export interface ResumeData {
  profile: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  training: ResumeTraining[];
  professionalSkills: string[];
  personalSkills: string[];
  resumeUrl?: string;
}
