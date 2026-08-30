"use client";

import ContactForm from "./ContactForm";

export default function HireForm() {
  return (
    <div>
      <div className="mb-10">
        <p className="label-rituals">Hiring & freelance</p>
        <h2 className="font-display mt-4 text-5xl leading-none md:text-6xl">
          Tell me what you&apos;re building.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-black/50">
          Use this form for freelance projects, collaborations, studio
          opportunities or full-time hiring enquiries.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
