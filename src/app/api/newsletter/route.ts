import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    )
  }

  try {
    const body = await req.json()
    const email = String(body?.email || "").trim().toLowerCase()

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from("subscribers")
      .upsert({ email, active: true }, { onConflict: "email" })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 }
    )
  }
}