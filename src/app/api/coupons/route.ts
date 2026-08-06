import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    )
  }

  try {
    const body = await req.json()
    const code = String(body?.code || "").trim().toUpperCase()
    const orderTotal = Number(body?.orderTotal) || 0

    if (!code || code.length > 32) {
      return NextResponse.json({ error: "Coupon code required" }, { status: 400 })
    }

    const { data: coupon, error } = await supabaseAdmin
      .from("coupons")
      .select("*")
      .eq("code", code)
      .eq("active", true)
      .single()

    if (error || !coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 })
    }

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return NextResponse.json({ error: "Coupon expired" }, { status: 400 })
    }

    if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
      return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 })
    }

    if (orderTotal < Number(coupon.min_order || 0)) {
      return NextResponse.json(
        { error: `Minimum order of ₹${coupon.min_order} required` },
        { status: 400 }
      )
    }

    let discount = 0
    if (coupon.discount_percent) {
      discount = (orderTotal * coupon.discount_percent) / 100
    } else if (coupon.discount_amount) {
      discount = coupon.discount_amount
    }

    await supabaseAdmin
      .from("coupons")
      .update({ used_count: coupon.used_count + 1 })
      .eq("id", coupon.id)

    return NextResponse.json({
      success: true,
      discount,
      couponCode: coupon.code,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to validate coupon" },
      { status: 500 }
    )
  }
}