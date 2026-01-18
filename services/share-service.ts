import { SupabaseClient } from "@supabase/supabase-js";
import { TextShareServiceInput } from "@/features/share/text/types";
import { Share } from "@/types";
import { FileShareServiceInput } from "@/features/share/file/types";
import { CodeShareServiceInput } from "@/features/share/code/types";
import { LinkShareServiceInput } from "@/features/share/link/types";
import { createBaseShare } from "./base-share";

const OPEN_SHARES_BUCKET_NAME = process.env.OPEN_SHARES_BUCKET_NAME!

export async function textShareService(
  supabase: SupabaseClient,
  input: TextShareServiceInput
): Promise<Share> {
  const { title, content } = input;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: baseShare.id,
      title,
      content_text: content,
      item_type: "text"
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

export async function fileShareService(
  supabase: SupabaseClient,
  input: FileShareServiceInput
): Promise<Share> {
  const { file, file_type, file_name, title } = input;

  const fileName = `${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(OPEN_SHARES_BUCKET_NAME)
    .upload(fileName, file);

  if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);

  const { data: publicUrlData } = supabase.storage
    .from(OPEN_SHARES_BUCKET_NAME)
    .getPublicUrl(fileName);

  const fileUrl = publicUrlData.publicUrl;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      title,
      share_id: baseShare.id,
      file_path: fileUrl,
      file_name,
      file_type,
      item_type: "file",
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

export async function codeShareService(
  supabase: SupabaseClient,
  input: CodeShareServiceInput
): Promise<Share> {
  const { title, content, language } = input;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: baseShare.id,
      title,
      content_text: content,
      item_type: "code",
      language
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

export async function linkShareService(
  supabase: SupabaseClient,
  input: LinkShareServiceInput
): Promise<Share> {
  const { title, content } = input;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: baseShare.id,
      title,
      content_text: content,
      item_type: "link",
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

