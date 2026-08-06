import { NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import { products as staticProducts } from "@/lib/data"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const fallback = staticProducts.find(
    (p) => p.slug === id || p.id === id
  )

  if (!isSupabaseConfigured()) {
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("slug", id)
      .single()

    if (error || !data) {
      return fallback
        ? NextResponse.json(fallback)
        : NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch {
    return fallback
      ? NextResponse.json(fallback)
      : NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
}