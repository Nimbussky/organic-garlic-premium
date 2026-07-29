"use client"

import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui"
import { SITE_CONFIG } from "@/lib/constants"

export function CartPageContent() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  const shipping = subtotal >= SITE_CONFIG.shipping.freeMinimum ? 0 : SITE_CONFIG.shipping.standardFee
  const total = subtotal + shipping

  return (
    <div className="pt-24 min-h-screen bg-[#FAFAF6]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-4xl font-light text-[#1A1A2E] mb-12">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛒</div>
            <p className="text-[#5A5A6E] mb-8">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-[#1A1A2E] text-[#FAFAF6] rounded-2xl font-medium hover:bg-[#2A2A3E] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-6 bg-white p-6 rounded-3xl border border-[#E8E4DC]"
                >
                  <div className="w-24 h-24 bg-[#F5F0E8] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl opacity-50">🧄</span>
                  </div>
                  <div className="flex-1">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="text-lg font-medium text-[#1A1A2E] hover:text-[#C9A84C] transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#5A5A6E] mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#E8E4DC] rounded-xl">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.product.id, item.quantity - 1)
                              : removeItem(item.product.id)
                          }
                          className="w-10 h-10 flex items-center justify-center text-[#5A5A6E] hover:text-[#1A1A2E]"
                        >
                          -
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-10 h-10 flex items-center justify-center text-[#5A5A6E] hover:text-[#1A1A2E]"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium text-[#1A1A2E]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[#9A9AAE] hover:text-[#C44A4A] transition-colors"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC] sticky top-28">
                <h2 className="text-lg font-medium text-[#1A1A2E] mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3">
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
                <Link href="/checkout">
                  <Button className="w-full mt-6" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link
                  href="/products"
                  className="block text-center text-sm text-[#5A5A6E] mt-4 hover:text-[#1A1A2E] transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}