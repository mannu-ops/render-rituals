import { type ReactNode } from "react";
import PageTransition from "../common/PageTransition";

export default function PageFrame({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
