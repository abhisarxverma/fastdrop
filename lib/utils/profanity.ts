import {Filter} from 'bad-words';
import * as hindiProfanity from "profanity-hindi";

const filter = new Filter();
filter.addWords("porn", "casino", "gambling", "xxx");

export function containsProfanity(text: string): boolean {
  return filter.isProfane(text) || hindiProfanity.isMessageDirty(text);
}
