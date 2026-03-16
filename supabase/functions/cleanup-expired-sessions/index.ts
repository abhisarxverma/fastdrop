
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

serve(async () => {
  try {
    const now = new Date().toISOString();

    const { data: sessions, error: sessionError } = await supabase
      .from("sessions")
      .select("id")
      .or(`ended_by_host.eq.true,expires_at.lt.${now}`);

    if (sessionError) throw sessionError;

    if (!sessions || sessions.length === 0) {
      return new Response("No expired sessions", { status: 200 });
    }

    const sessionIds = sessions.map((s) => s.id);

    const { data: shares } = await supabase
      .from("shares")
      .select("id, session_id")
      .in("session_id", sessionIds);

    const shareIds = shares?.map((s) => s.id) ?? [];

    const { data: items } = await supabase
      .from("share_items")
      .select("file_path")
      .in("share_id", shareIds)
      .eq("item_type", "file");

    const files = items ?? [];

    const paths = files
      .map((item) => {
        const url = item.file_path;
        const prefix = "/object/public/fastdrop/";
        const idx = url.indexOf(prefix);
        return decodeURIComponent(url.substring(idx + prefix.length));
      })
      .filter(Boolean);

    if (paths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("fastdrop")
        .remove(paths);

      if (storageError) throw storageError;
    }

    const { error: deleteError } = await supabase
      .from("sessions")
      .delete()
      .in("id", sessionIds);

    if (deleteError) throw deleteError;

    return new Response(
      JSON.stringify({
        deleted_sessions: sessionIds.length,
        deleted_files: paths.length,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
});