import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Design Capabilities",
    skills: [
      "Interior Design & Concepts",
      "Space Planning & Zoning",
      "Modular Kitchen & Furniture Design",
      "Material Direction & Palettes",
      "Lighting & Atmosphere Design",
      "Site Supervision & Client Guidance",
    ],
  },
  {
    category: "Software & Tools",
    skills: [
      "AutoCAD (2D Drafting)",
      "SketchUp (3D Modeling)",
      "3ds Max & V-Ray / Corona",
      "Lumion / Enscape",
      "Adobe Photoshop & Lightroom",
      "Figma / Layout Presentation",
    ],
  },
  {
    category: "Professional Competencies",
    skills: [
      "Client Requirement Discovery",
      "Budgeting & Quotation",
      "Vendor & Carpenter Coordination",
      "Attention to Detail & Proportions",
      "Clear & Transparent Communication",
    ],
  },
];

export const skillsList: string[] = [
  "AutoCAD",
  "SketchUp",
  "3D Visualization",
  "Space Planning",
  "Interior Design",
  "Material Selection",
  "Modular Furniture",
  "3ds Max / V-Ray",
  "Photoshop",
  "Lighting Direction",
];

export const SKILLS = skillsList;
export const SKILL_CATEGORIES = skillCategories;
