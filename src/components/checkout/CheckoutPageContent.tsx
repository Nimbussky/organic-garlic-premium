"use client"

import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { SITE_CONFIG } from "@/lib/constants"
import { Button } from "@/components/ui"

export function CheckoutPageContent() {
  const { items, subtotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shipping = subtotal >= SITE_CONFIG.shipping.freeMinimum ? 0 : SITE_CONFIG.shipping.standardFee
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="pt-24 min-h-screen bg-[#FAFAF6] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-4xl font-light text-[#1A1A2E] mb-4">
            Order Confirmed!
          </h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC]">
              <h2 className="text-lg font-medium text-[#1A1A2E] mb-6">
                Shipping Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <input
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <input
                  placeholder="Address"
                  className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    placeholder="City"
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    placeholder="State"
                    className="w-full px-4 py-3 bg-[#F8F6F0] rounded-xl border border-[#E8E4DC] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                  <input
                    placeholder="Pincode"
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
                {["UPI (Google Pay / PhonePe / Paytm)", "Payment Link", "Cash on Delivery"].map(
                  (method) => (
                    <label
                      key={method}
                      className="flex items-center gap-3 p-4 rounded-xl border border-[#E8E4DC] cursor-pointer hover:border-[#C9A84C] transition-colors"
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="accent-[#C9A84C]"
                      />
                      <span className="text-sm text-[#1A1A2E]">{method}</span>
                    </label>
                  )
                )}
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
                  <div key={item.product.id} className="flex justify-between text-sm">
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
              >
                Place Order
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