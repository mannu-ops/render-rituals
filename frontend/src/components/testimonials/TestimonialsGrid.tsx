"use client";

import { testimonials as defaultTestimonials } from "@/data";
import { useAdminData } from "@/context/AdminDataContext";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsGrid() {
  const { testimonials: liveTestimonials } = useAdminData();
  const items = liveTestimonials && liveTestimonials.length > 0 ? liveTestimonials : defaultTestimonials;

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-rituals grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </section>
  );
}
