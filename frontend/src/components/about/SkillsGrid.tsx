const skills = [
  "Interior Design",
  "Space Planning",
  "3D Visualization",
  "Material & Finish Selection",
  "Moodboards",
  "Design Presentations",
  "Furniture & Styling",
  "Client Communication",
  "Concept Development",
  "Design Documentation",
  "Visual Storytelling",
  "Project Coordination",
];

export default function SkillsGrid({
  items = skills,
}: {
  items?: string[];
}) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Capabilities</p>

        <div className="grid grid-cols-1 border-t border-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((skill) => (
            <div
              key={skill}
              className="border-b border-black/10 py-5 text-sm text-black/60 sm:pr-6"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
