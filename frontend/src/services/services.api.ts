import type { Service } from "@/types";
import { services as fallbackServices } from "@/data";

/**
 * Frontend-ready service access layer.
 * Replace the fallback source with your API/Supabase repository later.
 */
export async function getServices(): Promise<Service[]> {
  return fallbackServices;
}

export async function getServiceById(
  id: string,
): Promise<Service | undefined> {
  return fallbackServices.find((service) => service.id === id);
}
