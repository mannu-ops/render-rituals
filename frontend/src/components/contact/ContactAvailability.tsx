import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data";

export default function ContactAvailability() {
  return (
    <div className="flex items-start gap-3 border border-black/10 p-5">
      <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium">Availability</p>
        <p className="mt-1 text-xs leading-6 text-black/45">
          {siteConfig.availability}
        </p>
      </div>
    </div>
  );
}
