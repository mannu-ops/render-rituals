const cards = [
  ["Projects", "24"],
  ["Services", "8"],
  ["Inquiries", "17"],
  ["Testimonials", "6"],
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <p className="label-rituals">Admin</p>
        <h1 className="font-display mt-3 text-3xl sm:text-4xl font-normal text-[#F3F4F6]">Dashboard</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value]) => (
            <div key={label} className="card-luxury p-5 rounded-2xl border border-white/10">
              <p className="font-mono-spec text-xs uppercase tracking-wider text-[#8E98A5]">{label}</p>
              <p className="mt-4 font-display text-3xl font-semibold text-[#F3F4F6]">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
