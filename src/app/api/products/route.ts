import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { products as staticProducts } from "@/lib/data"

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(staticProducts)
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data && data.length ? data : staticProducts)
  } catch {
    return NextResponse.json(staticProducts)
  }
}