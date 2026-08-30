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
    <main className="min-h-screen bg-[#14171A] px-5 py-24 md:px-10 md:py-32 text-[#F3F4F6]">
      <div className="mx-auto max-w-[1440px]">
        <AboutIntro />
        <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          <AboutStatement />
          <AboutPrinciples />
          <AboutCapabilities />
          <AboutCTA />
        </div>
      </div>
    </main>
  );
}
