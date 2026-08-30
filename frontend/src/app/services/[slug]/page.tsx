import Link from "next/link";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-black/40">Service</p>
        <h1 className="font-display mt-6 text-6xl capitalize tracking-tight md:text-8xl">
          {slug.replaceAll("-", " ")}
        </h1>
        <Link href="/services" className="mt-10 inline-block text-sm underline underline-offset-4">
          Back to Services
        </Link>
      </div>
    </main>
  );
}
