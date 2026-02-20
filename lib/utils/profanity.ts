import {Filter} from 'bad-words'

const filter = new Filter()
filter.addWords("porn", "casino", "gambling", "xxx")

export function containsProfanity(text: string): boolean {
  return filter.isProfane(text)
}
