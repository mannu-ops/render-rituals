"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  deadline: string;
  location: string;
  brief: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  deadline: "",
  location: "",
  brief: "",
};

export default function HireForm({
  selectedPackage = "",
}: {
  selectedPackage?: string;
}) {
  const [data, setData] = useState<FormData>({
    ...initialData,
  });
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormData, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Frontend phase: API/email integration will be added later.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-black/10 p-8 md:p-12">
        <CheckCircle2 size={36} strokeWidth={1.3} />
        <h2 className="font-display mt-7 text-4xl md:text-5xl">
          Your project brief is ready.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-black/50">
          This frontend is currently in demo mode. In the backend phase, this
          submission will be stored in the admin panel and delivered by email.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(initialData);
            setSent(false);
          }}
          className="mt-8 rounded-full border border-black/15 px-5 py-3 text-xs"
        >
          Submit another brief
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-black/10 p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5">
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-black/35">
            Project brief
          </p>
          <p className="mt-1 text-sm">Tell me what you&apos;re building.</p>
        </div>
        {selectedPackage && (
          <span className="rounded-full border border-black/10 px-3 py-2 text-[9px] uppercase tracking-[0.12em] text-black/45">
            {selectedPackage}
          </span>
        )}
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <Field
          label="Name"
          value={data.name}
          required
          onChange={(value) => update("name", value)}
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          required
          onChange={(value) => update("email", value)}
        />
        <Field
          label="Phone / WhatsApp"
          value={data.phone}
          onChange={(value) => update("phone", value)}
        />
        <Field
          label="Company / Studio"
          value={data.company}
          onChange={(value) => update("company", value)}
        />

        <Select
          label="What do you need?"
          value={data.projectType}
          required
          onChange={(value) => update("projectType", value)}
          options={[
            "Complete Interior Design",
            "Residential Interior",
            "Commercial Interior",
            "Space Planning",
            "3D Visualization",
            "Architectural Drafting",
            "Other",
          ]}
        />

        <Select
          label="Approx. budget"
          value={data.budget}
          onChange={(value) => update("budget", value)}
          options={[
            "Under ₹10,000",
            "₹10,000 — ₹25,000",
            "₹25,000 — ₹50,000",
            "₹50,000 — ₹1,00,000",
            "₹1,00,000+",
            "Not decided",
          ]}
        />

        <Field
          label="Project location"
          value={data.location}
          onChange={(value) => update("location", value)}
        />

        <Field
          label="Ideal start / deadline"
          value={data.deadline}
          onChange={(value) => update("deadline", value)}
          placeholder="e.g. October 2026"
        />

        <div className="md:col-span-2">
          <label className="block">
            <span className="text-[9px] uppercase tracking-[0.16em] text-black/40">
              Project brief *
            </span>
            <textarea
              required
              rows={7}
              value={data.brief}
              onChange={(event) => update("brief", event.target.value)}
              placeholder="Tell me about the space, area, style, deliverables, references, deadline and anything else that matters..."
              className="mt-3 w-full resize-none border-b border-black/15 bg-transparent py-3 text-sm leading-7 outline-none placeholder:text-black/25 focus:border-black"
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#171717] px-6 py-4 text-sm text-white"
      >
        Send Project Brief
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-[0.16em] text-black/40">
        {label} {required && "*"}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full border-b border-black/15 bg-transparent py-3 text-sm outline-none placeholder:text-black/25 focus:border-black"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-[0.16em] text-black/40">
        {label} {required && "*"}
      </span>
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 w-full border-b border-black/15 bg-transparent py-3 text-sm outline-none focus:border-black"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
