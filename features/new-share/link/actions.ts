'use server'
import ogs from 'open-graph-scraper'
import { shareAction } from '../common/actions'
import { LinkShareActionSchema } from './validation'
import { createLinkShare } from '../common/services'
import { containsProfanity } from './utils'
import { MetadataResponse } from './types'

export const linkShareAction = shareAction(LinkShareActionSchema, createLinkShare)

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
  // console.log("Google response : ", data);
  return !data.matches
}


export async function fetchMetadata(url: string): Promise<MetadataResponse> {
  try {
    const safe = await checkSafeBrowsing(url)
    if (!safe) {
      return { status: "unsafe", message: "This link is flagged as unsafe." }
    }

    let result;
    try {
      result = (await ogs({ url })).result;
    } catch {
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
    console.log("Error fetching metadata : ", e)
    return { status: "error", message: "Unexpected error occured." }
  }
}
