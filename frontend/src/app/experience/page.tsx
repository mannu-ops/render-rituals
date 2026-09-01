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
    <main className="py-14 sm:py-18 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <ExperienceIntro />
        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
          <ExperienceTimeline items={experience} />
          <ExperienceSkills skills={skillsList} />
          <ExperienceServices />
          <ExperienceCTA />
        </div>
      </div>
    </main>
  );
}
