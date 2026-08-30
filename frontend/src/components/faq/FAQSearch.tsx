"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui";
import FAQList, { FAQItem } from "./FAQList";

export default function FAQSearch({
  items,
}: {
  items?: FAQItem[];
}) {
  const [query, setQuery] = useState("");

  const defaultItems: FAQItem[] = [
    {
      category: "General",
      question: "How can I start a project?",
      answer:
        "Send a brief through the contact or hire page and include your scope, timeline and budget if available.",
    },
    {
      category: "General",
      question: "Do you accept custom projects?",
      answer:
        "Yes. Custom project scopes can be discussed based on your requirements.",
    },
  ];

  const source = items?.length ? items : defaultItems;

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return source;

    return source.filter((item) =>
      `${item.question} ${item.answer} ${item.category ?? ""}`
        .toLowerCase()
        .includes(value),
    );
  }, [query, source]);

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-rituals">
        <div className="relative max-w-xl">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
          />
          <Input
            aria-label="Search frequently asked questions"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions..."
            className="pl-11"
          />
        </div>

        <div className="mt-12">
          <FAQList items={filtered} />
        </div>
      </div>
    </section>
  );
}
