import { BLOCKED_ADULT_DOMAINS } from "@/lib/security/blocked-domains"
import { Filter } from "bad-words";

const filter = new Filter();

filter.addWords(
  "porn",
  "xxx",
  "sex",
  "nsfw",
  "nude",
  "hentai",
  "milf",
  "boobs",
  "anal"
);

export function validateLinkStructure(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isBlockedDomain(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname
      .toLowerCase()
      .replace(/^www\./, "");

    const fullUrl = url.toLowerCase();

    const isExplicitDomain = BLOCKED_ADULT_DOMAINS.some(
      domain =>
        hostname === domain ||
        hostname.endsWith(`.${domain}`)
    );

    if (isExplicitDomain) return true;

    if (filter.isProfane(hostname)) return true;

    if (filter.isProfane(fullUrl)) return true;

    return false;
  } catch {
    return true;
  }
}
