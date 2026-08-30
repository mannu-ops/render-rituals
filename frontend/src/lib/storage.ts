/**
 * Small browser-storage helpers.
 *
 * These are intentionally isolated so localStorage can later be replaced
 * with a database-backed preference/session system without changing UI code.
 */

export function getStorageItem<T>(
  key: string,
  fallback: T,
): T {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Intentionally ignored.
  }
}
