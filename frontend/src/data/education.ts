import { EducationItem, TrainingItem } from "@/types";

export const education: EducationItem[] = [
  {
    id: "edu-01",
    period: "2020 — 2023",
    qualification: "Bachelor of Design (Interior Design)",
    institution: "School of Design & Built Environment",
    location: "India",
    description:
      "Comprehensive training in space planning, interior architecture, materials, construction techniques, ergonomics, and visual presentation.",
  },
];

export const training: TrainingItem[] = [
  {
    id: "train-01",
    period: "2023",
    title: "Advanced Architectural 3D Rendering & Lighting",
    institution: "Visualization Masterclass",
    description:
      "Specialized training in photorealistic lighting, PBR texturing, camera composition, and post-production.",
  },
  {
    id: "train-02",
    period: "2022",
    title: "Modular Kitchen & Wardrobe Detailing",
    institution: "Interior Engineering Workshops",
    description:
      "In-depth technical training on hardware specifications, ergonomic clearance, material selection, and joinery drawings.",
  },
];

export const EDUCATION = education;
export const TRAINING = training;
