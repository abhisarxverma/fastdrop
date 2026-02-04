
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    const item = window.localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch (e) {
      console.error(`Error parsing storage key "${key}":`, e);
      return null;
    }
  },
  
  // Accept any type (T), not just string
  set: <T>(key: string, value: T) => {
    if (typeof window !== "undefined") {
      const stringifiedValue = typeof value === "string" ? value : JSON.stringify(value);
      window.localStorage.setItem(key, stringifiedValue);
    }
  },
};
