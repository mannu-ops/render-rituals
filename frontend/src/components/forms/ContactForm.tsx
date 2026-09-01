"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { contactConfig } from "@/config";
import { submitContactForm } from "@/services";
import { validateContactForm } from "@/lib";
import Field, { TextareaField } from "./Field";
import SelectField from "./SelectField";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    const formData = new FormData(event.currentTarget);

    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      type: String(formData.get("type") ?? "project") as
        | "project"
        | "hiring"
        | "general",
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
    };

    const validation = validateContactForm(values);

    if (!validation.valid) {
      setErrors(validation.errors);
      setStatus("error");
      return;
    }

    const result = await submitContactForm(values);

    if (!result.success) {
      setStatus("error");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="card-luxury rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
        <CheckCircle2 size={24} className="text-[#D49A6A]" />
        <h3 className="font-display mt-4 text-2xl sm:text-3xl font-medium leading-snug text-[#F3F4F6]">
          Enquiry received.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#8E98A5]">
          Thank you for reaching out. We will review your project brief and respond within 24 hours.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-mono-spec uppercase tracking-wider text-[#D49A6A] hover:underline"
        >
          Send another enquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 card-luxury p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10">
      <div className="grid gap-8 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name}
          required
        />

        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
          required
        />

        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+91"
          autoComplete="tel"
        />

        <Field
          label="Company"
          name="company"
          placeholder="Company / studio"
          autoComplete="organization"
        />

        <SelectField
          label="I am contacting for"
          name="type"
          defaultValue="project"
          options={["project", "hiring", "general"]}
        />

        <Field
          label="Subject"
          name="subject"
          placeholder="What can I help with?"
        />

        <SelectField
          label="Approx. budget"
          name="budget"
          options={contactConfig.budgetOptions}
        />

        <SelectField
          label="Timeline"
          name="timeline"
          options={contactConfig.timelineOptions}
        />
      </div>

      <TextareaField
        label="Message"
        name="message"
        placeholder="Tell me about your project, requirements or opportunity..."
        maxLength={contactConfig.maxMessageLength}
        error={errors.message}
        required
      />

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-5 text-[#8E98A5]">
          Your details will only be used to respond to this enquiry.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#D49A6A] px-7 py-4 text-xs font-semibold uppercase tracking-wider text-[#14171A] shadow-md transition-all duration-300 hover:bg-[#E5A97C] hover:shadow-[0_4px_25px_rgba(212,154,106,0.4)] disabled:cursor-wait disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send enquiry"}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="text-xs text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
