import {
  ArrowUpRight,
  BriefcaseBusiness,
  FolderPlus,
  MessageSquarePlus,
  Star,
} from "lucide-react";

const actions = [
  {
    label: "Add project",
    href: "/admin/projects/new",
    icon: FolderPlus,
  },
  {
    label: "Add service",
    href: "/admin/services/new",
    icon: BriefcaseBusiness,
  },
  {
    label: "Add testimonial",
    href: "/admin/testimonials/new",
    icon: Star,
  },
  {
    label: "View enquiries",
    href: "/admin/enquiries",
    icon: MessageSquarePlus,
  },
];

export default function QuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <a
            key={action.href}
            href={action.href}
            className="group flex items-center justify-between border border-black/10 bg-white/30 p-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <Icon size={16} />
              <span className="text-xs">{action.label}</span>
            </div>

            <ArrowUpRight
              size={14}
              className="text-black/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        );
      })}
    </div>
  );
}
