const checklist = [
  "Project type and approximate area",
  "Design style or visual references",
  "Required drawings / renders",
  "Preferred timeline",
  "Approximate budget",
];

export default function ProjectBrief() {
  return (
    <aside className="h-fit lg:sticky lg:top-28">
      <p className="text-[10px] uppercase tracking-[0.22em] text-black/40">
        A useful brief includes
      </p>

      <ul className="mt-6 divide-y divide-black/10 border-y border-black/10">
        {checklist.map((item, index) => (
          <li key={item} className="flex gap-4 py-4 text-sm">
            <span className="text-[10px] text-black/30">
              0{index + 1}
            </span>
            <span className="text-black/60">{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs leading-6 text-black/40">
        Don&apos;t have everything yet? That&apos;s okay. Send whatever you have
        and we can define the scope together.
      </p>
    </aside>
  );
}
