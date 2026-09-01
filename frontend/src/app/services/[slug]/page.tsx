import Link from "next/link";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#14171A] text-[#F3F4F6] px-5 py-12 sm:py-16 md:px-8 md:py-20">
      <div className="container-rituals">
        <p className="label-rituals">Service</p>
        <h1 className="font-display mt-3.5 max-w-3xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal capitalize tracking-tight text-[#F3F4F6]">
          {slug.replaceAll("-", " ")}
        </h1>
        <Link href="/#services" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D49A6A] hover:text-[#E5A97C]">
          ← Back to Services
        </Link>
      </div>
    </main>
  );
}
