

export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  set: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },
};
