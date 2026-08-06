import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET
    if (!razorpayKeySecret) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 })
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const receipt = `rcpt_${orderId}`

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${razorpayKeySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create Razorpay order")
    }

    const order = await response.json()

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    })
  } catch (error) {
    console.error("Create Order Error:", error)
    return NextResponse.json(
      { error: "Payment order creation failed" },
      { status: 500 }
    )
  }
}