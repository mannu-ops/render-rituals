import {
  AboutIntro,
  AboutStatement,
  AboutPrinciples,
  AboutCapabilities,
  AboutCTA,
} from "@/components/about";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#14171A] py-14 sm:py-18 md:py-20 text-[#F3F4F6]">
      <div className="container-rituals">
        <AboutIntro />
        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
          <AboutStatement />
          <AboutPrinciples />
          <AboutCapabilities />
          <AboutCTA />
        </div>
      </div>
    </main>
  );
}
