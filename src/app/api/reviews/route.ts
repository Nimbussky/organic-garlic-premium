import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

const MAX_NAME_LENGTH = 80
const MAX_COMMENT_LENGTH = 1000

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    )
  }

  try {
    const body = await req.json()
    const productId = String(body?.productId || "").trim()
    const customerName = String(body?.customerName || "").trim()
    const comment = String(body?.comment || "").trim()
    const rating = Number(body?.rating)

    if (!productId || !/^[a-zA-Z0-9_-]{1,32}$/.test(productId)) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      )
    }
    if (!customerName || customerName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be between 1 and ${MAX_NAME_LENGTH} characters` },
        { status: 400 }
      )
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be a whole number between 1 and 5" },
        { status: 400 }
      )
    }
    if (comment.length < 3 || comment.length > MAX_COMMENT_LENGTH) {
      return NextResponse.json(
        { error: `Review must be between 3 and ${MAX_COMMENT_LENGTH} characters` },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin.from("reviews").insert({
      product_id: productId,
      customer_name: customerName,
      rating,
      comment,
      verified: false,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const productId = searchParams.get("productId")

    let query = supabaseAdmin
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })

    if (productId) {
      if (!/^[a-zA-Z0-9_-]{1,32}$/.test(productId)) {
        return NextResponse.json(
          { error: "Invalid product id" },
          { status: 400 }
        )
      }
      query = query.eq("product_id", productId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}
