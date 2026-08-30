import { PortfolioGrid, PortfolioHero } from "@/components/portfolio";
import { projects } from "@/data";

export const metadata = {
  title: "Work — Selected Projects",
  description: "Explore selected interior design, 3D visualization, space planning, and architectural concepts by Render Rituals.",
};

export default function WorkPage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14">
          <p className="label-rituals">Portfolio</p>
          <h1 className="font-display mt-5 max-w-5xl text-6xl leading-[0.9] md:text-8xl">
            Selected work.
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-black/50">
            A collection of residential interiors, commercial space planning, photorealistic 3D renders, and material studies crafted with intention and clarity.
          </p>
        </div>

        <PortfolioGrid projects={projects} />
      </div>
    </main>
  );
}
