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
    <main className="py-14 sm:py-18 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <ResumeHeader />
        <div className="mt-8">
          <ResumeDownload />
        </div>

        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
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
