"use client"

import { useState } from "react"
import Link from "next/link"
import { Button, ProductCard, Badge, ProductImage } from "@/components/ui"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/store/cart"

export function ProductsPageContent() {
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", ...new Set(products.map((p) => p.category))]
  const query = searchQuery.trim().toLowerCase()
  const filtered = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory
    const matchesSearch =
      query === "" ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
    return matchesCategory && matchesSearch
  })

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

        <div className="flex flex-wrap gap-3 mb-6">
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

        <div className="mb-10">
          <div className="relative max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9AAE]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garlic, powder, chutney..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-[#E8E4DC] text-[#1A1A2E] placeholder-[#9A9AAE] focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
        </div>

        <p className="text-sm text-[#9A9AAE] mb-6">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#5A5A6E]">
            No products match your search. Try a different keyword.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square bg-[#F5F0E8] overflow-hidden">
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />
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