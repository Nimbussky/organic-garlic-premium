"use client"

import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { SITE_CONFIG } from "@/lib/constants"
import { Button } from "@/components/ui"
import { initiatePayment, type RazorpayResponse } from "@/lib/razorpay"

export function CheckoutPageContent() {
  const { items, subtotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const shipping =
    subtotal >= SITE_CONFIG.shipping.freeMinimum
      ? 0
      : SITE_CONFIG.shipping.standardFee
  const total = subtotal + shipping

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("upi")

  const handlePlaceOrder = async () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    if (paymentMethod === "upi") {
      try {
        await initiatePayment(
          total,
          { name: customer.name, email: customer.email, phone: customer.phone },
          async (response: RazorpayResponse) => {
            const res = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  items: items.map((i) => ({
                    productId: i.product.id,
                    name: i.product.name,
                    price: i.product.price,
                    quantity: i.quantity,
                  })),
                  subtotal,
                  shipping,
                  discount: 0,
                  total,
                  customer,
                },
              }),
            })

            const data = await res.json()
            if (data.success) {
              setOrderNumber(data.orderNumber)
              setOrderPlaced(true)
              clearCart()
            } else {
              setError("Payment verification failed")
            }
          },
          () => {
            setError("Payment failed. Please try again.")
            setLoading(false)
          }
        )
      } catch {
        setError("Payment failed. Please try again.")
        setLoading(false)
      }
    } else {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.product.id,
              name: i.product.name,
              price: i.product.price,
              quantity: i.quantity,
            })),
            subtotal,
            shipping,
            discount: 0,
            total,
            customer,
            paymentMethod,
          }),
        })

        const data = await res.json()
        if (data.success) {
          setOrderNumber(data.order.order_number)
          setOrderPlaced(true)
          clearCart()
        } else {
          setError("Failed to place order")
        }
      } catch {
        setError("Failed to place order")
      } finally {
        setLoading(false)
      }
    }
  }

  if (orderPlaced) {
    return (
      <div className="pt-24 min-h-screen bg-[#FAFAF6] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-light text-[#1A1A2E] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-[#5A5A6E] mb-2">
            Order Number: <strong className="text-[#1A1A2E]">{orderNumber}</strong>
          </p>
          <p className="text-[#5A5A6E] mb-8">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#1A1A2E] text-[#FAFAF6] rounded-2xl font-medium hover:bg-[#2A2A3E] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-[#FAFAF6]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl font-light text-[#1A1A2E] mb-12">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC]">
              <h2 className="text-lg font-medium text-[#1A1A2E] mb-6">
                Shipping Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name *"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    placeholder="Phone Number *"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <input
                  placeholder="Email *"
                  type="email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <input
                  placeholder="Address *"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    placeholder="City *"
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({ ...customer, city: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    placeholder="State *"
                    value={customer.state}
                    onChange={(e) =>
                      setCustomer({ ...customer, state: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    placeholder="Pincode *"
                    value={customer.pincode}
                    onChange={(e) =>
                      setCustomer({ ...customer, pincode: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC]">
              <h2 className="text-lg font-medium text-[#1A1A2E] mb-6">
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { id: "upi", label: "UPI (Google Pay / PhonePe / Paytm)" },
                  { id: "link", label: "Payment Link" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? "border-[#C9A84C] bg-[#F5F0E8]/50"
                        : "border-[#E8E4DC] hover:border-[#C9A84C]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#C9A84C]"
                    />
                    <span className="text-sm text-[#1A1A2E]">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC] sticky top-28">
              <h2 className="text-lg font-medium text-[#1A1A2E] mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-[#5A5A6E]">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-[#1A1A2E]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E8E4DC] pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5A5A6E]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5A5A6E]">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-[#6B8E5A]">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-medium text-[#1A1A2E] pt-3 border-t border-[#E8E4DC]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "upi"
                  ? `Pay ${formatPrice(total)}`
                  : `Place Order - ${formatPrice(total)}`}
              </Button>
              <Link
                href="/cart"
                className="block text-center text-sm text-[#5A5A6E] mt-4 hover:text-[#1A1A2E] transition-colors"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}