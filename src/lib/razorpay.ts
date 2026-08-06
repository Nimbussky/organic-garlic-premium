export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void }
  }
}

export async function createRazorpayOrder(amount: number): Promise<RazorpayOrder> {
  const res = await fetch("/api/payments/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  })

  if (!res.ok) throw new Error("Failed to create order")
  return res.json()
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.id = "razorpay-script"
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function initiatePayment(
  amount: number,
  customer: { name: string; email: string; phone: string },
  onSuccess: (response: RazorpayResponse) => void,
  onError?: (error: Error) => void
) {
  const loaded = await loadRazorpayScript()
  if (!loaded) {
    onError?.(new Error("Failed to load Razorpay SDK"))
    return
  }

  try {
    const order = await createRazorpayOrder(amount)

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: order.currency,
      name: "Organic Garlic Premium",
      description: "Payment for your order",
      order_id: order.id,
      handler: onSuccess,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: {
        color: "#C9A84C",
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (error) {
    onError?.(error as Error)
  }
}