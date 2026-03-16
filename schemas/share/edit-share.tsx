import { z } from "zod";
import { contentValidator, stringValidator } from "../utils";

/* ---------------- TEXT ---------------- */

const textItemSchema = z.object({
  id: z.string().optional().nullable(),
  item_type: z.literal("text"),
  title: stringValidator(5, 40, "Item title"),
  content: contentValidator,
});

/* ---------------- CODE ---------------- */

const codeItemSchema = z.object({
  id: z.string().optional().nullable(),
  item_type: z.literal("code"),
  title: stringValidator(5, 40, "Item title"),
  content: contentValidator,
  language: z.string().min(1),
});

/* ---------------- LINK ---------------- */

const linkItemSchema = z.object({
  id: z.string().optional().nullable(),
  item_type: z.literal("link"),
  title: stringValidator(5, 40, "Item title"),
  content: contentValidator,
});

/* ---------------- FILE ---------------- */

const fileItemSchema = z
  .object({
    id: z.string().optional().nullable(),
    item_type: z.literal("file"),
    title: stringValidator(5, 40, "Item title"),
    file_name: stringValidator(5, 40, "File name"),
    file_type: z.string().min(1),
    file_path: z.string().optional(),
    file: z.instanceof(File).optional().nullable(),
  })
  .superRefine((val, ctx) => {
    if (!val.file && !val.file_path) {
      ctx.addIssue({
        code: "custom",
        path: ["file"],
        message: "File is required",
      });
    }
  });

export const editShareItemSchema = z.discriminatedUnion("item_type", [
  textItemSchema,
  codeItemSchema,
  linkItemSchema,
  fileItemSchema,
]);

export const editShareFormSchema = z.object({
  title: stringValidator(5, 50, "Title"),
  items: z.array(editShareItemSchema),
});

export const editShareActionSchema = editShareFormSchema.extend({ share_id: z.string() })

export type EditShareFormValues = z.infer<typeof editShareFormSchema>;

export type EditShareInput = EditShareFormValues & {
  share_id: string;
};