export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main className="p-10"><h1 className="font-display text-5xl">Edit Project: {id}</h1></main>;
}
