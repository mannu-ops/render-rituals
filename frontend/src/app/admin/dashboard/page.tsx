const cards = [
  ["Projects", "24"],
  ["Services", "8"],
  ["Inquiries", "17"],
  ["Testimonials", "6"],
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <p className="text-xs uppercase tracking-[0.25em] text-black/40">Admin</p>
      <h1 className="font-display mt-4 text-5xl md:text-7xl">Dashboard</h1>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value]) => (
          <div key={label} className="border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-black/40">{label}</p>
            <p className="mt-8 text-4xl">{value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
