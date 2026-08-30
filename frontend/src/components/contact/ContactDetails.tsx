import { Mail, MapPin } from "lucide-react";
import { CONTACT } from "@/data";
import { InstagramIcon } from "@/components/common/InstagramIcon";

export default function ContactDetails() {
  return (
    <aside>
      <p className="label-rituals">Direct contact</p>

      <div className="mt-7 space-y-7">
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex gap-4 border-t border-black/10 pt-5"
        >
          <Mail size={16} className="mt-0.5 shrink-0 text-black/35" />
          <div>
            <p className="label-rituals">Email</p>
            <p className="mt-2 text-sm text-black/65">{CONTACT.email}</p>
          </div>
        </a>

        <div className="flex gap-4 border-t border-black/10 pt-5">
          <MapPin size={16} className="mt-0.5 shrink-0 text-black/35" />
          <div>
            <p className="label-rituals">Location</p>
            <p className="mt-2 text-sm text-black/65">{CONTACT.location}</p>
          </div>
        </div>

        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer"
          className="flex gap-4 border-t border-black/10 pt-5"
        >
          <InstagramIcon size={16} className="mt-0.5 shrink-0 text-black/35" />
          <div>
            <p className="label-rituals">Instagram</p>
            <p className="mt-2 text-sm text-black/65">Render Rituals</p>
          </div>
        </a>
      </div>

      <div className="mt-12 border-t border-black/10 pt-6">
        <p className="label-rituals">Typical response</p>
        <p className="mt-3 text-sm leading-7 text-black/50">
          Project enquiries are usually reviewed within 1–2 business days.
        </p>
      </div>
    </aside>
  );
}
