import {
  ExperienceIntro,
  ExperienceTimeline,
  ExperienceSkills,
  ExperienceServices,
  ExperienceCTA,
} from "@/components/experience";
import { experience, skillsList } from "@/data";

export const metadata = {
  title: "Experience — Professional History",
  description: "Professional experience, design capabilities, and history of spatial projects by Render Rituals.",
};

export default function ExperiencePage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <ExperienceIntro />
        <div className="mt-24 space-y-24 md:mt-32 md:space-y-32">
          <ExperienceTimeline items={experience} />
          <ExperienceSkills skills={skillsList} />
          <ExperienceServices />
          <ExperienceCTA />
        </div>
      </div>
    </main>
  );
}
