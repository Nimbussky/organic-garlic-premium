"use client"

import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { ProductImage } from "@/components/ui"
import { SITE_CONFIG } from "@/lib/constants"

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, subtotal } =
    useCart()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={toggleCart}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FAFAF6] z-50 transform transition-transform duration-500 ease-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#E8E4DC]">
            <h2 className="text-xl font-light text-[#1A1A2E]">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="text-[#5A5A6E] hover:text-[#1A1A2E] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#5A5A6E] mb-4">Your cart is empty</p>
                <Link
                  href="/products"
                  onClick={toggleCart}
                  className="inline-block px-6 py-3 bg-[#1A1A2E] text-[#FAFAF6] rounded-xl text-sm hover:bg-[#2A2A3E] transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl"
                >
                  <div className="w-20 h-20 flex-shrink-0">
                    <ProductImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full rounded-xl overflow-hidden"
                      emoji="🧄"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#1A1A2E] truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-[#C9A84C] mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#E8E4DC] rounded-lg">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              : removeItem(item.product.id)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#5A5A6E] hover:text-[#1A1A2E]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#5A5A6E] hover:text-[#1A1A2E]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-[#9A9AAE] hover:text-[#C44A4A] transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-[#E8E4DC] space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#5A5A6E]">Subtotal</span>
                <span className="text-[#1A1A2E] font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {subtotal < SITE_CONFIG.shipping.freeMinimum && (
                <p className="text-xs text-[#9A9AAE]">
                  Add {formatPrice(SITE_CONFIG.shipping.freeMinimum - subtotal)} more for
                  free shipping
                </p>
              )}
              <Link
                href="/checkout"
                onClick={toggleCart}
                className="block w-full py-3 bg-[#C9A84C] text-[#1A1A2E] text-center font-medium rounded-xl hover:bg-[#D4B85A] transition-colors"
              >
                Checkout - {formatPrice(subtotal)}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}