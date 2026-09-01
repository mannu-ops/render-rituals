type ResumeHeaderProps = {
  name?: string;
  role?: string;
  location?: string;
};

export default function ResumeHeader({
  name = "Your Name",
  role = "Interior Designer & 3D Visualization Artist",
  location = "Noida, Uttar Pradesh, India",
}: ResumeHeaderProps) {
  return (
    <header className="border-b border-white/10 pb-8 text-[#F3F4F6]">
      <p className="label-rituals">Curriculum vitae</p>
      <h1 className="font-display mt-3.5 text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
        {name}
      </h1>
      <div className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-[#8E98A5] sm:flex-row sm:items-center sm:gap-4">
        <span>{role}</span>
        <span className="hidden sm:block text-white/30">/</span>
        <span>{location}</span>
      </div>
    </header>
  );
}
