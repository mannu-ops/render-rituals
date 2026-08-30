import type { Testimonial } from "@/types";
import { testimonials as fallbackTestimonials } from "@/data";

export async function getTestimonials(): Promise<Testimonial[]> {
  return fallbackTestimonials;
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  return fallbackTestimonials;
}
