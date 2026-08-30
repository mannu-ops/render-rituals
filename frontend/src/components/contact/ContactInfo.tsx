import { Mail, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/common/InstagramIcon";
import { CONTACT } from "@/data";

const details = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MessageCircle,
    label: "Phone / WhatsApp",
    value: CONTACT.phone || "+91 9305308296",
    href: `https://wa.me/${(CONTACT.phone || "+919305308296").replace(/[^0-9]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Based in",
    value: CONTACT.location,
  },
];

export default function ContactInfo() {
  return (
    <aside>
      <p className="text-[10px] uppercase tracking-[0.24em] text-black/40">
        Direct Contact
      </p>

      <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
        {details.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <Icon size={17} className="mt-0.5 shrink-0 text-black/45" />
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-black/35">
                  {item.label}
                </p>
                <p className="mt-1 text-sm">{item.value}</p>
              </div>
            </>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="flex gap-4 py-6 transition-opacity hover:opacity-60"
            >
              {content}
            </a>
          ) : (
            <div key={item.label} className="flex gap-4 py-6">
              {content}
            </div>
          );
        })}
      </div>

      <a
        href={CONTACT.instagram}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em]"
      >
        <InstagramIcon size={15} />
        Instagram
      </a>
    </aside>
  );
}
