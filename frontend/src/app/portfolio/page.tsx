import { PortfolioGrid } from "@/components/portfolio";
import { projects } from "@/data";

export const metadata = {
  title: "Portfolio — Selected Works",
  description: "Browse selected spatial design and 3D visualization projects by Render Rituals.",
};

export default function PortfolioPage() {
  return (
    <main className="py-14 sm:py-18 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <div className="mb-10 sm:mb-12">
          <p className="label-rituals">Portfolio</p>
          <h1 className="font-display mt-3.5 max-w-3xl text-3xl xs:text-4xl sm:text-5xl font-normal leading-[1.12] tracking-tight text-[#F3F4F6]">
            Selected work.
          </h1>
        </div>

        <PortfolioGrid projects={projects} />
      </div>
    </main>
  );
}
