"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button, Input, Select, Textarea } from "../ui";

const projectOptions = [
  { label: "Select project type", value: "" },
  { label: "Residential Interior", value: "residential" },
  { label: "Commercial Interior", value: "commercial" },
  { label: "3D Visualization", value: "visualization" },
  { label: "Moodboard / Concept", value: "concept" },
  { label: "Other", value: "other" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-black/10 p-7 md:p-10">
        <p className="label-rituals">Message received</p>
        <h2 className="font-display mt-5 text-4xl leading-none md:text-5xl">
          Thank you. I&apos;ll get back to you soon.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-black/50">
          Your form is currently using the frontend demo flow. Email delivery
          will be connected during the backend stage.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-xs underline underline-offset-4"
        >
          Send another message
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
        <Input label="Your name" name="name" placeholder="Full name" required />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <Input label="Company" name="company" placeholder="Optional" />
        <Input
          label="Budget"
          name="budget"
          placeholder="e.g. ₹50,000 — ₹1,00,000"
        />
      </div>

      <div className="mt-7">
        <Select
          label="Project type"
          name="projectType"
          options={projectOptions}
          required
        />
      </div>

      <div className="mt-7">
        <Textarea
          label="Tell me about the project"
          name="message"
          placeholder="Space, location, timeline, requirements..."
          rows={6}
          required
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-[10px] leading-5 text-black/35">
          By submitting this form, you agree to be contacted regarding your
          project enquiry.
        </p>

        <Button type="submit" className="group gap-2">
          Send enquiry
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Button>
      </div>
    </form>
  );
}
