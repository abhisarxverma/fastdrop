import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openInNewTab(url: string) {
  try {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  } catch (err) {
    console.error("Failed to open link:", err);
  }
}

export async function downloadFile(url: string, suggestedName?: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch file");

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = suggestedName || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  } catch (err) {
    console.error("Download error:", err);
  }
}

export async function copy(text: string) {
  await navigator.clipboard.writeText(text);
}

export function htmlToText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function getTextWithBreaks(node: Node): string {
    let text = "";

    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        const childText = getTextWithBreaks(child);

        if (
          ["P", "DIV", "BR", "LI", "SECTION", "ARTICLE", "H1", "H2", "H3", "H4", "H5", "H6"].includes(
            el.tagName
          )
        ) {
          text += childText + "\n";
        } else {
          text += childText;
        }
      }
    });

    return text;
  }

  return getTextWithBreaks(doc.body).trim();
}

