import { z } from "zod"
import { baseShareSchema } from "./base-share"
import { fileItemSchema } from "./file-share"
import { codeItemSchema } from "./code-share"
import { textItemSchema } from "./text-share"
import { linkItemSchema } from "./link-share"

export const folderItemSchema = z.discriminatedUnion("item_type", [
  fileItemSchema,
  codeItemSchema,
  textItemSchema,
  linkItemSchema
])

export const folderShareActionSchema = baseShareSchema.extend({
  share_type: z.literal("folder"),
  items: z
    .array(folderItemSchema)
    .min(1, "Folder must contain at least one item"),
})

export const folderShareFormSchema =
  folderShareActionSchema.omit({
    session_id: true,
    share_type: true
  })

export type FolderShareInput =
  z.infer<typeof folderShareActionSchema>

export type FolderItem =
  z.infer<typeof folderItemSchema>

export type FolderItemForm =
  | (z.infer<typeof fileItemSchema> & { file?: File | null })
  | z.infer<typeof codeItemSchema>
  | z.infer<typeof textItemSchema>
  | z.infer<typeof linkItemSchema>

export type FolderShareFormValues = {
  title: string
  items: FolderItemForm[]
}