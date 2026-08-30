import {
  ResumeHeader,
  ResumeExperience,
  ResumeEducation,
  ResumeSkills,
  ResumeTraining,
  ResumeDownload,
} from "@/components/resume";
import { experience, education, training, skillsList } from "@/data";

export const metadata = {
  title: "Resume — Professional CV",
  description: "Professional resume, qualifications, software competencies, and design background of Interior Designer & 3D Visualization Artist at Render Rituals.",
};

export default function ResumePage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <ResumeHeader />
        <div className="mt-10">
          <ResumeDownload />
        </div>

        <div className="mt-24 space-y-24 md:mt-32 md:space-y-32">
          <ResumeExperience items={experience} />
          <ResumeEducation items={education} />
          <ResumeSkills
            professional={skillsList}
            personal={[
              "Client Discovery & Briefing",
              "Creative Direction",
              "Attention to Proportions & Detailing",
              "Problem Solving & Spatial Planning",
              "Clear & Transparent Communication",
            ]}
          />
          <ResumeTraining items={training} />
        </div>
      </div>
    </main>
  );
}
