"use server";

import { actionClient } from "@/lib/actions/action-client";
import { withAuth } from "@/lib/actions/with-auth";
import { textShareActionSchema } from "@/schemas/share/text-share";
import { codeShareActionSchema } from "@/schemas/share/code-share";
import { fileShareActionSchema } from "@/schemas/share/file-share";
import { linkShareActionSchema } from "@/schemas/share/link-share";
import { shareService } from "@/services";
import { containsProfanity } from "@/lib/utils/profanity";
import { isBlockedDomain } from "@/lib/utils/link-moderation";
import { logError } from "@/lib/logging/logger"
import ogs from "open-graph-scraper";
import { LinkMetadataResponse } from "@/types/utils";
import { folderShareActionSchema } from "@/schemas/share/folder-share";

export const textShareAction = actionClient
    .inputSchema(textShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user, token }) => {
            return shareService.createTextShare(parsedInput, user, supabase, token);
        })
    })

export const codeShareAction = actionClient
    .inputSchema(codeShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user, token }) => {
            return shareService.createCodeShare(parsedInput, user, supabase, token);
        })
    })

export const fileShareAction = actionClient
    .inputSchema(fileShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user, token }) => {
            return shareService.createFileShare(parsedInput, user, supabase, token);
        })
    })

export const linkShareAction = actionClient
    .inputSchema(linkShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user, token }) => {
            return shareService.createLinkShare(parsedInput, user, supabase, token);
        })
    })

export const folderShareAction = actionClient
    .inputSchema(folderShareActionSchema)
    .action(async ({ parsedInput }) => {
      return withAuth(async ({ supabase, user, token }) => {
        return shareService.createFolderShare(parsedInput, user, supabase, token);
      })
    })

const GOOGLE_SAFE_BROWSING_API = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_API_KEY}`

async function checkSafeBrowsing(url: string): Promise<boolean> {
  const body = {
    client: {
      clientId: "your-app-name",
      clientVersion: "1.0.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  }

  const res = await fetch(GOOGLE_SAFE_BROWSING_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return !data.matches
}

export async function fetchMetadata(url: string): Promise<LinkMetadataResponse> {
  let result;
  let safe;
  try {
    if (isBlockedDomain(url)) {
      return {
        status: "blocked",
        message: "This domain is not allowed in collaborative spaces.",
      };
    }

    safe = await checkSafeBrowsing(url)
    if (!safe) {
      return { status: "unsafe", message: "This link is flagged as unsafe." }
    }

    try {
      result = (await ogs({ url })).result;
    } catch (error) {
      logError({
        source: "local",
        scope: "fetch metadata",
        error,
        meta: { url, isSafe: safe }
      })
      return { status: "ok", data: null, message: "Metadata not found." };
    }
    
    const title = result.ogTitle || "No title found"
    const description = result.ogDescription || "No description available"
    
    if (containsProfanity(title) || containsProfanity(description)) {
      return { status: "blocked", message: "This link contains inappropriate content." }
    }

    return {
      status: "ok",
      data: {
        title,
        description,
        image: result.ogImage?.[0]?.url || null,
        url,
      },
      message: "Metadata fetched successfully"
    }
  } catch (e)  {
    logError({
        source: "local",
        scope: "fetch metadata",
        error: e,
        meta: { url, isSafe: safe, fetch_result: result }
      })
    return { status: "error", message: "Unexpected error occured." }
  }
}
