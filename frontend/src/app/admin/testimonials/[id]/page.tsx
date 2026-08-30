export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="p-10"><h1 className="font-display text-5xl">Testimonial: {id}</h1></main>;
}
