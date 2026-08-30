import { ContactForm } from "@/components/forms";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="px-5 py-20 md:px-10 md:py-28">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="label-rituals">Contact</p>
          <h1 className="font-display mt-5 text-6xl leading-[0.9] md:text-8xl">
            Let&apos;s make
            <br />
            something.
          </h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-black/50">
            Tell me about your space, project, collaboration or hiring
            opportunity. I&apos;ll get back to you with the next steps.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
