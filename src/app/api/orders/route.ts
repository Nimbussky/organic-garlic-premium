import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9+\-\s]{7,15}$/

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    )
  }

  try {
    const body = await req.json()
    const {
      items,
      subtotal,
      shipping,
      discount,
      total,
      customer,
      paymentMethod,
      paymentId,
      razorpayOrderId,
    } = body

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      Number(total) <= 0 ||
      Number(total) > 2000000
    ) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 })
    }

    const email = String(customer?.email || "").trim().toLowerCase()
    const name = String(customer?.name || "").trim()
    const phone = String(customer?.phone || "").trim()

    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Invalid customer name" }, { status: 400 })
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid customer email" }, { status: 400 })
    }
    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json({ error: "Invalid customer phone" }, { status: 400 })
    }

    const orderNumber = `OGP-${Date.now().toString(36).toUpperCase()}`

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        items,
        subtotal: Number(subtotal) || 0,
        shipping: Number(shipping) || 0,
        discount: Number(discount) || 0,
        total: Number(total),
        status: "pending",
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        shipping_address: String(customer?.address || "").slice(0, 300),
        shipping_city: String(customer?.city || "").slice(0, 80),
        shipping_state: String(customer?.state || "").slice(0, 80),
        shipping_pincode: String(customer?.pincode || "").slice(0, 12),
        payment_method: paymentMethod || "cod",
        payment_id: paymentId || null,
        razorpay_order_id: razorpayOrderId || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, order: data })
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
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

  // Security Fix: Prevent unauthorized dumping of order PII data.
  const adminSecret = req.headers.get("x-admin-secret")
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    let query = supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}