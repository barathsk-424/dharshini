import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
)

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 })
  const { pincode, items_weight } = await req.json()

  // Static demo logic: distance from Tamil Nadu (pin 600001) returns cost
  const base = 50
  const distanceFactor = Math.random() * 30 // simulated
  const weightFactor = items_weight * 10
  const total = base + distanceFactor + weightFactor

  return new Response(JSON.stringify({ cost: Math.round(total), estimated_days: 3 }), {
    headers: { "Content-Type": "application/json" }
  })
})
