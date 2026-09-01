import { HireForm } from "@/components/forms";

export const metadata = { title: "Hire Me" };

export default function HireMePage() {
  return (
    <main className="py-14 sm:py-18 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals max-w-3xl mx-auto">
        <HireForm />
      </div>
    </main>
  );
}
