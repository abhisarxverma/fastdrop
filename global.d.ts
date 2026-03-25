// global.d.ts
declare module 'profanity-hindi' {
  export function isMessageDirty(text: string): boolean;
  export function maskBadWords(text: string): string;
  export function getAllBadWords(): string[];
}
