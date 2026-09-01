import { PortfolioGrid } from "@/components/portfolio";
import { projects } from "@/data";

export const metadata = {
  title: "Portfolio — Selected Works",
  description: "Browse selected spatial design and 3D visualization projects by Render Rituals.",
};

export default function PortfolioPage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14">
          <p className="label-rituals">Portfolio</p>
          <h1 className="font-display mt-4 max-w-5xl text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
            Selected work.
          </h1>
        </div>

        <PortfolioGrid projects={projects} />
      </div>
    </main>
  );
}
