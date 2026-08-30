type ExperienceSkillsProps = {
  skills: string[];
};

export default function ExperienceSkills({
  skills,
}: ExperienceSkillsProps) {
  return (
    <section className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">Working toolkit</p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-black/10 px-4 py-2 text-xs text-black/55"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
