"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { Badge, Button, ProductCard, SectionHeading } from "@/components/ui"
import { products, getRelatedProducts, getProductReviews } from "@/lib/data"
import { SITE_CONFIG } from "@/lib/constants"

export function ProductPageContent({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) notFound()

  const related = getRelatedProducts(product.id)
  const reviews = getProductReviews(product.id)

  return (
    <div className="pt-24 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="aspect-square bg-[#F5F0E8] rounded-3xl flex items-center justify-center overflow-hidden">
              <span className="text-[12rem] opacity-40">🧄</span>
            </div>
            <div className="flex gap-3">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-2xl bg-[#F5F0E8] flex items-center justify-center border-2 transition-colors ${
                    selectedImage === i
                      ? "border-[#C9A84C]"
                      : "border-transparent"
                  }`}
                >
                  <span className="text-3xl opacity-50">🧄</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="organic">100% Organic</Badge>
                <Badge>{product.category}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-light text-[#1A1A2E] tracking-tight">
                {product.name}
              </h1>
              <p className="text-[#5A5A6E] mt-2">{product.unit}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-light text-[#1A1A2E]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-lg text-[#9A9AAE] line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="text-sm text-[#6B8E5A]">
                    Save {formatPrice(product.comparePrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="text-[#5A5A6E] leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E8E4DC] rounded-2xl">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-12 h-12 flex items-center justify-center text-[#5A5A6E] hover:text-[#1A1A2E]"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-[#5A5A6E] hover:text-[#1A1A2E]"
                >
                  +
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, quantity)}
              >
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>
            </div>

            <div className="border-t border-[#E8E4DC] pt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#5A5A6E]">
                <span className="text-[#6B8E5A]">✓</span>
                Free shipping on orders above {formatPrice(SITE_CONFIG.shipping.freeMinimum)}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5A5A6E]">
                <span className="text-[#6B8E5A]">✓</span>
                Fresh from farm, delivered in {SITE_CONFIG.shipping.estimatedDays}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5A5A6E]">
                <span className="text-[#6B8E5A]">✓</span>
                {product.origin}
              </div>
            </div>

            <div className="border-t border-[#E8E4DC] pt-6">
              <h3 className="text-sm font-medium text-[#1A1A2E] mb-3 uppercase tracking-wider">
                Benefits
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="text-sm text-[#5A5A6E] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-[#C9A84C] rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#E8E4DC] pt-6">
              <h3 className="text-sm font-medium text-[#1A1A2E] mb-3 uppercase tracking-wider">
                Storage
              </h3>
              <p className="text-sm text-[#5A5A6E]">{product.storage}</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <SectionHeading
            title="Nutrition Facts"
            subtitle="Per serving (approx. 3 cloves)"
          />
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { label: "Calories", value: `${product.nutrition.calories}` },
              { label: "Fat", value: `${product.nutrition.fat}g` },
              { label: "Carbs", value: `${product.nutrition.carbs}g` },
              { label: "Protein", value: `${product.nutrition.protein}g` },
              { label: "Fiber", value: `${product.nutrition.fiber}g` },
              { label: "Vitamin C", value: `${product.nutrition.vitaminC}mg` },
            ].map((n) => (
              <div
                key={n.label}
                className="bg-white p-4 rounded-2xl border border-[#E8E4DC] text-center"
              >
                <p className="text-2xl font-light text-[#1A1A2E]">{n.value}</p>
                <p className="text-xs text-[#5A5A6E] mt-1">{n.label}</p>
              </div>
            ))}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="mb-20">
            <SectionHeading title="Customer Reviews" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-2xl border border-[#E8E4DC]"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "text-[#C9A84C]" : "text-[#E8E4DC]"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-[#5A5A6E] text-sm mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="flex justify-between text-xs text-[#9A9AAE]">
                    <span>{review.name}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div>
            <SectionHeading title="You May Also Like" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id}>
                  <Link href={`/products/${p.slug}`}>
                    <div className="aspect-square bg-[#F5F0E8] flex items-center justify-center">
                      <span className="text-6xl opacity-40">🧄</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-[#1A1A2E]">
                        {p.name}
                      </h3>
                      <p className="text-[#C9A84C] text-sm mt-1">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => addItem(p)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </ProductCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}