import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StudioIntro from "@/components/home/StudioIntro";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProcessPreview from "@/components/home/ProcessPreview";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import HomeCTA from "@/components/home/HomeCTA";

export const metadata = {
  title: "Render Rituals — 3D Visualization & 2D Space Planning",
  description:
    "Render Rituals specializes in photorealistic 3D interior renders and practical 2D space planning floor layouts.",
};

export default function HomePage() {
  return (
    <main className="w-full relative">
      <Hero />
      <FeaturedProjects />
      <StudioIntro />
      <ServicesPreview />
      <ProcessPreview />
      <TestimonialsPreview />
      <HomeCTA />
    </main>
  );
}
