import { type ReactNode } from "react";

export default function AdminGuardPlaceholder({
  children,
}: {
  children: ReactNode;
}) {
  // Frontend phase placeholder.
  // Authentication and role protection will be implemented with the backend.
  return <>{children}</>;
}
