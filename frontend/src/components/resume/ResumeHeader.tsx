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
    <header className="border-b border-black/10 pb-10">
      <p className="label-rituals">Curriculum vitae</p>
      <h1 className="font-display mt-5 text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl">
        {name}
      </h1>
      <div className="mt-6 flex flex-col gap-2 text-sm text-black/50 sm:flex-row sm:items-center sm:gap-5">
        <span>{role}</span>
        <span className="hidden sm:block">/</span>
        <span>{location}</span>
      </div>
    </header>
  );
}
