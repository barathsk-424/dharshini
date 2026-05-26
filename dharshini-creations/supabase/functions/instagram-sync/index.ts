import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

serve(async () => {
  const token = Deno.env.get("INSTAGRAM_LONG_LIVED_TOKEN")
  const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${token}`)
  const { data } = await res.json()

  if (!data) return new Response("No data", { status: 500 })

  for (const post of data) {
    const { id, caption, media_url, permalink } = post
    await supabase.from("instagram_cache").upsert({
      post_id: id,
      caption,
      media_url,
      permalink,
      fetched_at: new Date()
    }, { onConflict: "post_id" })
  }

  return new Response("Synced", { status: 200 })
})
