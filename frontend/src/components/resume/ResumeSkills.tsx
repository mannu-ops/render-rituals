type ResumeSkillsProps = {
  professional: string[];
  personal: string[];
};

function SkillGroup({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.13em] text-black/35">
        {title}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-black/10 px-4 py-2 text-xs text-black/55"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResumeSkills({
  professional,
  personal,
}: ResumeSkillsProps) {
  return (
    <section className="grid gap-10 md:grid-cols-[1fr_2fr]">
      <p className="label-rituals">Skills</p>

      <div className="space-y-9">
        <SkillGroup title="Professional" skills={professional} />
        <SkillGroup title="Personal" skills={personal} />
      </div>
    </section>
  );
}
