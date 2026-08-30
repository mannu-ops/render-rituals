"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder="Your email address"
        required
        className="min-w-0 flex-1 rounded-full border border-black/10 bg-transparent px-5 py-3 text-sm outline-none focus:border-black"
      />

      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-xs text-white"
      >
        {submitted ? "Subscribed" : "Subscribe"}
        <ArrowUpRight
          size={13}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}
