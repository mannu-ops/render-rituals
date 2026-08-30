export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Brief",
    subtitle: "Understanding your lifestyle, vision & space",
    description:
      "We begin with a detailed conversation about how you plan to use the space, your aesthetic preferences, budget, site measurements, and timeline requirements.",
    deliverables: ["Requirement Checklist", "Project Timeline Estimate", "Moodboard Direction"],
  },
  {
    number: "02",
    title: "Space Planning & Layout",
    subtitle: "Circulation, zoning & functional layout",
    description:
      "Developing 2D CAD floor plans that optimize circulation, natural light, furniture proportions, and storage efficiency before moving to visual styling.",
    deliverables: ["2D Furniture Layouts", "Zoning Options", "Dimensioned Floor Plans"],
  },
  {
    number: "03",
    title: "Material & Concept Direction",
    subtitle: "Textures, color palettes & finishes",
    description:
      "Curating a harmonious palette of timber, stone, metal, textiles, and lighting fixtures tailored specifically to create a warm, calm, and sophisticated ambience.",
    deliverables: ["Material Board", "Color Palette", "Fixture & Finish Recommendations"],
  },
  {
    number: "04",
    title: "3D Visualization & Modeling",
    subtitle: "High-resolution renders before execution",
    description:
      "Translating 2D plans and material choices into photorealistic 3D renders so you can clearly visualize the finished atmosphere from every perspective.",
    deliverables: ["High-Res 3D Renders", "Lighting Simulations", "Camera Views"],
  },
  {
    number: "05",
    title: "Documentation & Execution",
    subtitle: "Production drawings & site handoff",
    description:
      "Finalizing clear technical drawings, elevations, material specifications, and vendor guidelines to ensure flawless on-site execution.",
    deliverables: ["2D Working Drawings", "BOQ & Specifications", "Execution Support"],
  },
];

export const PROCESS = processSteps;
