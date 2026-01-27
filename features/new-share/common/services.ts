import { SupabaseClient } from "@supabase/supabase-js";
import { TextShareServiceInput } from "@/features/new-share/text/types";
import { Share } from "@/types";
import { FileShareServiceInput } from "@/features/new-share/file/types";
import { CodeShareServiceInput } from "@/features/new-share/code/types";
import { LinkShareServiceInput } from "@/features/new-share/link/types";
import { BaseShareInput } from "./types";

const OPEN_SHARES_BUCKET_NAME = process.env.OPEN_SHARES_BUCKET_NAME!;

export async function createBaseShare(supabase: SupabaseClient, baseShareInput: BaseShareInput, share_type: "single" | "multiple"): Promise<Share> {

    const { room_id, created_by, expires_at, lat, lng, title } = baseShareInput;

    const { data: share, error: shareError } = await supabase
        .from("shares")
        .insert({
            room_id: room_id ?? null,
            title,
            created_by,
            share_type: share_type,
            expires_at,
            location: `POINT(${lng} ${lat})`,
        })
        .select()
        .single();

    if (shareError) throw new Error(`Share creation failed: ${shareError.message}`);

    return share
}

export async function createTextShare(
  supabase: SupabaseClient,
  input: TextShareServiceInput
): Promise<Share> {
  const { content, file_name } = input;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: baseShare.id,
      file_name,
      content_text: content,
      item_type: "text"
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

export async function createFileShare(
  supabase: SupabaseClient,
  input: FileShareServiceInput
): Promise<Share> {
  const { file, file_type, file_name } = input;

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
      share_id: baseShare.id,
      file_path: fileUrl,
      file_name,
      file_type,
      item_type: "file",
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

export async function createCodeShare(
  supabase: SupabaseClient,
  input: CodeShareServiceInput
): Promise<Share> {
  const { content, language, file_name } = input;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: baseShare.id,
      file_name,
      content_text: content,
      item_type: "code",
      language
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

export async function createLinkShare(
  supabase: SupabaseClient,
  input: LinkShareServiceInput
): Promise<Share> {
  const { content } = input;

  const baseShare = await createBaseShare(supabase, input, "single")

  const { error: itemError } = await supabase
    .from("share_items")
    .insert({
      share_id: baseShare.id,
      content_text: content,
      item_type: "link",
    });

  if (itemError) throw new Error(`Item creation failed: ${itemError.message}`);

  return baseShare;
}

