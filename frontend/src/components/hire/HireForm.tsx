"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button, Input, Select, Textarea } from "../ui";

const serviceOptions = [
  { label: "Choose a service", value: "" },
  { label: "Full Interior Design", value: "full-interior-design" },
  { label: "Space Planning", value: "space-planning" },
  { label: "3D Visualization", value: "3d-visualization" },
  { label: "Moodboard / Concept", value: "moodboard-concept" },
  { label: "Custom Project", value: "custom" },
];

const timelineOptions = [
  { label: "Preferred timeline", value: "" },
  { label: "As soon as possible", value: "asap" },
  { label: "Within 2–4 weeks", value: "2-4-weeks" },
  { label: "Within 1–2 months", value: "1-2-months" },
  { label: "Flexible", value: "flexible" },
];

export default function HireForm() {
  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = useMemo(
    () => [
      { label: "Budget range", value: "" },
      { label: "Under ₹25,000", value: "under-25k" },
      { label: "₹25,000 – ₹50,000", value: "25k-50k" },
      { label: "₹50,000 – ₹1,00,000", value: "50k-100k" },
      { label: "₹1,00,000+", value: "100k-plus" },
      { label: "Not sure yet", value: "not-sure" },
    ],
    [],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-black/10 p-7 md:p-10">
        <p className="label-rituals">Project request received</p>
        <h2 className="font-display mt-5 text-4xl leading-none md:text-5xl">
          Great. The next step is a conversation.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-black/50">
          This is the frontend hiring flow. In the backend phase, this request
          will be stored and delivered to the Render Rituals admin panel.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-xs underline underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black/10 p-6 md:p-10"
    >
      <div className="grid gap-7 md:grid-cols-2">
        <Input label="Name" name="name" placeholder="Your name" required />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Input label="Phone" name="phone" placeholder="Optional" />
        <Input label="Company" name="company" placeholder="Optional" />
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <Select
          label="Service"
          name="service"
          options={serviceOptions}
          required
        />
        <Select
          label="Timeline"
          name="timeline"
          options={timelineOptions}
          required
        />
      </div>

      <div className="mt-7">
        <Select
          label="Budget"
          name="budget"
          options={budgetOptions}
          required
        />
      </div>

      <div className="mt-7">
        <Textarea
          label="Project brief"
          name="brief"
          placeholder="Tell me about the space, requirements, location and what you need help with."
          rows={7}
          required
        />
      </div>

      <div className="mt-8">
        <Button type="submit" className="group gap-2">
          Send project request
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Button>
      </div>
    </form>
  );
}
