type ProjectMetaProps = {
  items: Array<{
    label: string;
    value: string;
  }>;
};

export default function ProjectMeta({ items }: ProjectMetaProps) {
  return (
    <div className="grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="border-b border-black/10 py-5 sm:border-r sm:px-5 sm:last:border-r-0"
        >
          <p className="label-rituals">{item.label}</p>
          <p className="mt-2 text-sm text-black/65">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
