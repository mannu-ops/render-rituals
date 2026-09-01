import Link from "next/link";

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#14171A] text-[#F3F4F6] px-5 py-12 sm:py-16 md:px-8 md:py-20">
      <div className="container-rituals">
        <p className="label-rituals">Workflow & Process</p>
        <h1 className="font-display mt-3.5 max-w-4xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
          From brief to <span className="italic text-[#D49A6A]">reality</span>.
        </h1>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {["Consultation & Scope", "2D Space Planning & Layout", "3D Modeling & Materiality", "4K Photorealistic Renders", "Technical Drawing Pack"].map((step, i) => (
            <div key={step} className="card-luxury rounded-2xl p-6">
              <span className="font-mono-spec text-xs text-[#D49A6A]">0{i + 1}</span>
              <h2 className="mt-8 text-lg font-semibold text-[#F3F4F6]">{step}</h2>
            </div>
          ))}
        </div>
        <Link href="/" className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D49A6A] hover:text-[#E5A97C]">
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}
