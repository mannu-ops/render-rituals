import { ContactForm } from "@/components/forms";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="px-5 py-12 sm:py-16 md:px-8 md:py-20 bg-[#14171A] text-[#F3F4F6]">
      <div className="container-rituals">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="label-rituals">Contact</p>
            <h1 className="font-display mt-3.5 max-w-xl text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6]">
              Let&apos;s make
              <br />
              <span className="italic text-[#D49A6A]">something</span>.
            </h1>
            <p className="mt-4 sm:mt-5 max-w-md text-sm leading-relaxed text-[#8E98A5]">
              Tell me about your space, project, collaboration or hiring
              opportunity. I&apos;ll get back to you with the next steps.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
