const internships = [
  {
    period: "Aug 2020 — Jan 2021",
    company: "Anil Creation & Contr.",
    role: "Junior Architect",
    description:
      "Learned the basics of house planning and worked on 3+ residential layout designs during the internship, gaining hands-on experience in space planning and design fundamentals.",
  },
  {
    period: "College training",
    company: "UP State Constr. & Infra. Development Corp. Ltd.",
    role: "Apprentice Architect",
    description:
      "Completed a 1-month Apprentice Architect training involving site visits and hands-on tasks on small projects to gain practical architectural experience.",
  },
];

export default function ResumeInternship() {
  return (
    <section className="border-y border-black/10 py-20 md:py-28">
      <div className="container-rituals">
        <p className="label-rituals">Internship</p>

        <div className="mt-8 border-t border-black/10">
          {internships.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="grid gap-5 border-b border-black/10 py-8 md:grid-cols-[.32fr_1fr]"
            >
              <div>
                <p className="text-[10px] text-black/35">{item.period}</p>
                <p className="mt-2 text-xs text-black/45">{item.company}</p>
              </div>

              <div>
                <h3 className="font-display text-3xl">{item.role}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-black/50">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
