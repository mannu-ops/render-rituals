import { Mail, MapPin, Phone } from "lucide-react";

export default function ResumeContact() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-rituals grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
        <p className="label-rituals">Professional contact</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="tel:+919305308296"
            className="border border-black/10 p-5"
          >
            <Phone size={16} className="text-black/35" />
            <p className="mt-7 text-xs text-black/60">+91-9305308296</p>
          </a>

          <a
            href="mailto:iamnikita2911@gmail.com"
            className="border border-black/10 p-5"
          >
            <Mail size={16} className="text-black/35" />
            <p className="mt-7 break-words text-xs text-black/60">
              iamnikita2911@gmail.com
            </p>
          </a>

          <div className="border border-black/10 p-5">
            <MapPin size={16} className="text-black/35" />
            <p className="mt-7 text-xs text-black/60">
              Noida, Uttar Pradesh, India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
