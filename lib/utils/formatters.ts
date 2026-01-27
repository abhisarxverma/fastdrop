export const getDefaultExpiry = () => {
    const date = new Date();

    // 1. Add 1 hour (60 minutes * 60 seconds * 1000 milliseconds)
    date.setHours(date.getHours() + 1);

    // 2. Format as YYYY-MM-DDTHH:mm (Required for datetime-local)
    // We adjust for timezone offset to keep it in the user's local time
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISODate = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);

    return localISODate;
}

export const formatDateForInput = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export function timeAgo(timestamp: string) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}min ago`;
  if (hours < 24)   return `${hours}h ago`;
  if (days < 7)     return `${days}d ago`;
  if (weeks < 5)    return `${weeks}w ago`;
  if (months < 12)  return `${months}mo ago`;
  return `${years}y ago`;
}
