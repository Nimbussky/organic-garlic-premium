"use client"

import { useState } from "react"
import Link from "next/link"
import { Button, ProductCard, Badge } from "@/components/ui"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/store/cart"

export function ProductsPageContent() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...new Set(products.map((p) => p.category))]
  const filtered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="pt-24 min-h-screen bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-12">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            Collection
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-[#1A1A2E] tracking-tight">
            All Products
          </h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-[#1A1A2E] text-white"
                  : "bg-white text-[#5A5A6E] border border-[#E8E4DC] hover:border-[#1A1A2E]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square bg-[#F5F0E8] flex items-center justify-center overflow-hidden">
                  <span className="text-8xl opacity-40 group-hover:scale-110 transition-transform duration-700">
                    🧄
                  </span>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-lg font-medium text-[#1A1A2E] hover:text-[#C9A84C] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#5A5A6E] mt-1">{product.unit}</p>
                  </div>
                  <Badge variant="organic">Organic</Badge>
                </div>
                <p className="text-sm text-[#9A9AAE] mt-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <span className="text-2xl font-light text-[#1A1A2E]">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="ml-2 text-sm text-[#9A9AAE] line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                  <Button size="sm" onClick={() => addItem(product)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </div>
  )
}