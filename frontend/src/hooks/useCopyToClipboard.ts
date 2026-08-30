"use client";

import { useState } from "react";

export function useCopyToClipboard(resetAfter = 1800) {
  const [copied, setCopied] = useState(false);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, resetAfter);

      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }

  return { copied, copy };
}
