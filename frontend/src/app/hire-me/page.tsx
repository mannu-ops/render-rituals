import { HireForm } from "@/components/forms";

export const metadata = { title: "Hire Me" };

export default function HireMePage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <HireForm />
      </div>
    </main>
  );
}
