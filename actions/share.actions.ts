"use server";


import { actionClient } from "@/lib/actions/action-client";
import { withAuth } from "@/lib/actions/with-auth";
import { textShareActionSchema } from "@/schemas/share/text-share";
import { codeShareActionSchema } from "@/schemas/share/code-share";
import { fileShareActionSchema } from "@/schemas/share/file-share";
import { linkShareActionSchema } from "@/schemas/share/link-share";
import { shareService } from "@/services";

export const textShareAction = actionClient
    .inputSchema(textShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user }) => {
            return shareService.createTextShare(parsedInput, user, supabase);
        })
    })

export const codeShareAction = actionClient
    .inputSchema(codeShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user }) => {
            return shareService.createCodeShare(parsedInput, user, supabase);
        })
    })

export const fileShareAction = actionClient
    .inputSchema(fileShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user }) => {
            return shareService.createFileShare(parsedInput, user, supabase);
        })
    })

export const linkShareAction = actionClient
    .inputSchema(linkShareActionSchema)
    .action(async ({ parsedInput }) => {
        return withAuth(async ({ supabase, user }) => {
            return shareService.createLinkShare(parsedInput, user, supabase);
        })
    })