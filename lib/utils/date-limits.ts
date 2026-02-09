export function getExpiryLimits() {
  const now = new Date();
  const min = new Date(now.getTime() + 10 * 60 * 1000); 
  const max = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); 
  return { min, max };
}