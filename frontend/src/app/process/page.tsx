import Link from "next/link";

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-black/40">Process</p>
        <h1 className="font-display mt-6 text-6xl tracking-tight md:text-8xl">
          From brief to space.
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {["Consultation", "Space Planning", "Design & Visualization", "Technical Drawings", "Execution Support"].map((step, i) => (
            <div key={step} className="border border-black/10 p-6">
              <span className="text-xs text-black/35">0{i + 1}</span>
              <h2 className="mt-10 text-xl">{step}</h2>
            </div>
          ))}
        </div>
        <Link href="/" className="mt-10 inline-block text-sm underline underline-offset-4">
          Back Home
        </Link>
      </div>
    </main>
  );
}
