export const getDefaultExpiryInput = () => {
  const date = new Date()
  date.setHours(date.getHours() + 1)

  const tzOffset = date.getTimezoneOffset() * 60000

  return new Date(date.getTime() - tzOffset)
    .toISOString()
    .slice(0, 16)
}

export const formatDateForInput = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export const datetimeLocalToUTC = (value: string) : string => {
  return new Date(value).toISOString()
}

export function relativeTimeFromNow(timestamp: string) {
  const now = new Date();
  const target = new Date(timestamp);
  const diffMs = target.getTime() - now.getTime(); 
  const absDiff = Math.abs(diffMs);

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  let unit: string;

  // Special case for very small differences
  if (seconds < 5) {
    return "Just now";
  } else if (seconds < 60) {
    unit = `${seconds}s`;
  } else if (minutes < 60) {
    unit = `${minutes}min`;
  } else if (hours < 24) {
    unit = `${hours}h`;
  } else if (days < 7) {
    unit = `${days}d`;
  } else if (weeks < 5) {
    unit = `${weeks}w`;
  } else if (months < 12) {
    unit = `${months}mo`;
  } else {
    unit = `${years}y`;
  }

  return diffMs < 0 ? `${unit} ago` : `in ${unit}`;
}

export function formatSupabaseTimestamp(timestampz: string) {
  const date = new Date(timestampz);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
