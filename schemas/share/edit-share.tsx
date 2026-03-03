import { z } from "zod";

const editTextItemSchema = z.object({
  id: z.string().min(1, { message: "Share item id must be present."}),
  item_type: z.literal("text"),
  title: z.string(),
  content: z.string(),
});

const editCodeItemSchema = z.object({
  id: z.string().min(1, { message: "Share item id must be present."}),
  item_type: z.literal("code"),
  title: z.string(),
  content: z.string(),
  language: z.string(),
});

const editLinkItemSchema = z.object({
  id: z.string().min(1, { message: "Share item id must be present."}),
  item_type: z.literal("link"),
  title: z.string(),
  content: z.string(),
});

const editFileItemSchema = z.object({
  id: z.string().min(1, { message: "Share item id must be present."}),
  item_type: z.literal("file"),
  title: z.string(),
  file_name: z.string(),
  file_path: z.string(),
  file_type: z.string(),
});

export const editShareItemSchema = z.discriminatedUnion("item_type", [
  editTextItemSchema,
  editCodeItemSchema,
  editLinkItemSchema,
  editFileItemSchema,
]);

export const editShareActionSchema = z.object({
  share_id: z.string().min(1, { message: "Share id must be present" }),
  title: z.string(),
  items: z.array(editShareItemSchema),
});

export const editShareFormSchema = editShareActionSchema.omit({
    share_id: true
})

export type EditShareInput = z.infer<typeof editShareActionSchema>;

export type EditShareFormValues = Omit<EditShareInput, "share_id">;