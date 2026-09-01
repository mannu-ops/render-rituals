import { PortfolioGrid, PortfolioHero } from "@/components/portfolio";
import { projects } from "@/data";

export const metadata = {
  title: "Work — Selected Projects",
  description: "Explore selected interior design, 3D visualization, space planning, and architectural concepts by Render Rituals.",
};

export default function WorkPage() {
  return (
    <main className="px-5 py-12 sm:py-16 md:px-8 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <div className="mb-10 sm:mb-12">
          <p className="label-rituals">Portfolio</p>
          <h1 className="font-display mt-3.5 max-w-4xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
            Selected work.
          </h1>
          <p className="mt-4 sm:mt-5 max-w-xl text-sm leading-relaxed text-[#8E98A5]">
            A collection of residential interiors, commercial space planning, photorealistic 3D renders, and material studies crafted with intention and clarity.
          </p>
        </div>

        <PortfolioGrid projects={projects} />
      </div>
    </main>
  );
}
