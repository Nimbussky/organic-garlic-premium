import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderData,
    } = body

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 })
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET
    if (!razorpayKeySecret) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 })
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const orderNumber = `OGP-${Date.now().toString(36).toUpperCase()}`

    // If Supabase is not configured, still return success so checkout UX works
    // (payment already succeeded on Razorpay side)
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        orderNumber,
        note: "Order recorded locally only (database not configured)",
      })
    }

    const { error } = await supabaseAdmin.from("orders").insert({
      order_number: orderNumber,
      items: orderData?.items ?? [],
      subtotal: orderData?.subtotal ?? 0,
      shipping: orderData?.shipping ?? 0,
      discount: orderData?.discount ?? 0,
      total: orderData?.total ?? 0,
      status: "confirmed",
      customer_name: orderData?.customer?.name ?? "",
      customer_email: orderData?.customer?.email ?? "",
      customer_phone: orderData?.customer?.phone ?? "",
      shipping_address: orderData?.customer?.address ?? "",
      shipping_city: orderData?.customer?.city ?? "",
      shipping_state: orderData?.customer?.state ?? "",
      shipping_pincode: orderData?.customer?.pincode ?? "",
      payment_method: "upi",
      payment_id: razorpay_payment_id,
      razorpay_order_id,
    })

    if (error) throw error

    return NextResponse.json({ success: true, orderNumber })
  } catch (error) {
    console.error("Verify Payment Error:", error)
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    )
  }
}
