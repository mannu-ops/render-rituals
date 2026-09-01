"use client";

import ContactForm from "./ContactForm";

export default function HireForm() {
  return (
    <div>
      <div className="mb-8">
        <p className="label-rituals">Hiring & freelance</p>
        <h2 className="font-display mt-3.5 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] text-[#F3F4F6]">
          Tell me what you&apos;re building.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#8E98A5]">
          Use this form for freelance projects, collaborations, studio
          opportunities or full-time hiring enquiries.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
