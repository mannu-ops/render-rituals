type EducationItem = {
  period: string;
  qualification: string;
  institution: string;
};

const fallbackEducation: EducationItem[] = [
  {
    period: "—",
    qualification: "Interior Design / Design Qualification",
    institution: "Education details",
  },
];

export default function Education({
  items = fallbackEducation,
}: {
  items?: EducationItem[];
}) {
  return (
    <section className="bg-[#d9d2c6] py-20 md:py-28">
      <div className="container-rituals grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Education</p>

        <div className="border-t border-black/10">
          {items.map((item) => (
            <div
              key={`${item.period}-${item.qualification}`}
              className="grid gap-3 border-b border-black/10 py-7 md:grid-cols-[.35fr_1fr]"
            >
              <span className="text-[10px] text-black/35">{item.period}</span>
              <div>
                <h3 className="font-display text-3xl">{item.qualification}</h3>
                <p className="mt-2 text-sm text-black/45">{item.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
