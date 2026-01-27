import {Filter} from 'bad-words'

const filter = new Filter()
filter.addWords("porn", "casino", "gambling", "xxx")

export function containsProfanity(text: string): boolean {
  return filter.isProfane(text)
}

export function validateLinkStructure(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}