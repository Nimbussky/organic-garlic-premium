"use client"

import Link from "next/link"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { Badge, Button, ProductCard, ProductImage } from "@/components/ui"
import { products } from "@/lib/data"
import type { Product } from "@/types"
import { useState } from "react"

export function Homepage() {
  const { addItem } = useCart()

  return (
    <>
      <HeroSection />
      <FeaturedProducts onAdd={addItem} />
      <WhyChooseUs />
      <FarmProcess />
      <OrganicBenefits />
      <CustomerReviews />
      <RecipeInspiration />
      <FAQSection />
      <NewsletterSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A2E]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/50 to-[#1A1A2E]/90 z-10" />
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <p className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-6">
          Premium Organic Since 2024
        </p>
        <h1 className="text-5xl md:text-8xl font-light text-white tracking-tight leading-none mb-6">
          Nature&apos;s
          <br />
          <span className="italic text-[#C9A84C]">Finest</span> Garlic
        </h1>
        <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-10">
          Hand-selected, organically grown, and delivered fresh from the pristine
          valleys of Himachal Pradesh to your doorstep.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/products"
            className="px-8 py-4 bg-[#C9A84C] text-[#1A1A2E] rounded-2xl font-medium hover:bg-[#D4B85A] transition-all hover:scale-[1.02]"
          >
            Explore Collection
          </Link>
          <Link
            href="/story"
            className="px-8 py-4 border border-white/20 text-white rounded-2xl font-medium hover:bg-white/5 transition-all"
          >
            Our Story
          </Link>
        </div>
        <div className="mt-16 flex items-center justify-center gap-12 text-white/40 text-sm">
          <div className="text-center">
            <p className="text-2xl text-white font-light">100%</p>
            <p>Organic</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-white font-light">24hr</p>
            <p>Farm to Door</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-white font-light">5K+</p>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts({ onAdd }: { onAdd: (product: Product) => void }) {
  return (
    <section className="py-28 px-4 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            Collection
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-[#1A1A2E] tracking-tight">
            Premium Selection
          </h2>
          <p className="mt-4 text-lg text-[#5A5A6E] font-light max-w-xl mx-auto">
            Each product is carefully curated for quality and freshness
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
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
                      <h3 className="text-lg font-medium text-[#1A1A2E] group-hover:text-[#C9A84C] transition-colors">
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
                  <Button size="sm" onClick={() => onAdd(product)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const reasons = [
    {
      icon: "🌱",
      title: "100% Certified Organic",
      desc: "Grown without pesticides, synthetic fertilizers, or GMOs",
    },
    {
      icon: "⛰️",
      title: "Himalayan Grown",
      desc: "Pristine mountain soil and pure spring water",
    },
    {
      icon: "🚚",
      title: "Farm to Door in 24hr",
      desc: "Harvested and delivered at peak freshness",
    },
    {
      icon: "✨",
      title: "Hand-Selected",
      desc: "Every clove inspected for premium quality",
    },
  ]

  return (
    <section className="py-28 px-4 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A2E]">
            Crafted with Care
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                {reason.icon}
              </div>
              <h3 className="text-lg font-medium text-[#1A1A2E] mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-[#5A5A6E] leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FarmProcess() {
  const steps = [
    { step: "01", title: "Sowing", desc: "Seeds planted in nutrient-rich Himalayan soil" },
    { step: "02", title: "Growing", desc: "Nurtured naturally with compost and spring water" },
    { step: "03", title: "Harvesting", desc: "Hand-picked at peak ripeness by skilled farmers" },
    { step: "04", title: "Curing", desc: "Sun-dried naturally to preserve flavor and nutrients" },
    { step: "05", title: "Sorting", desc: "Graded by size, quality, and freshness" },
    { step: "06", title: "Delivery", desc: "Packed sustainably and delivered within 24 hours" },
  ]

  return (
    <section className="py-28 px-4 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            Farm Fresh Process
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A2E]">
            From Soil to Soul
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative pl-12 border-l border-[#E8E4DC]"
            >
              <span className="absolute -left-3 top-0 w-6 h-6 bg-[#C9A84C] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1A1A2E]">
                {s.step}
              </span>
              <h3 className="text-lg font-medium text-[#1A1A2E] mb-2">{s.title}</h3>
              <p className="text-sm text-[#5A5A6E] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrganicBenefits() {
  return (
    <section className="py-28 px-4 bg-[#1A1A2E] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
              Why Organic
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              The Power of
              <br />
              <span className="text-[#C9A84C]">Organic Garlic</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Rich in Allicin", desc: "Natural compound with powerful medicinal properties" },
                { title: "Packed with Antioxidants", desc: "Protects cells from damage and aging" },
                { title: "Heart Health", desc: "Helps lower blood pressure and cholesterol" },
                { title: "Immune Booster", desc: "Natural defense against common illnesses" },
              ].map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-1 bg-[#C9A84C] flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">{benefit.title}</h4>
                    <p className="text-sm text-white/50">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square bg-gradient-to-br from-[#C9A84C]/10 to-transparent rounded-3xl flex items-center justify-center">
            <span className="text-[12rem] opacity-30">🧄</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CustomerReviews() {
  const featured = [
    { name: "Priya S.", text: "Absolutely the best garlic I've ever bought. The flavor is incredibly fresh and intense!", rating: 5 },
    { name: "Rahul M.", text: "Premium quality, amazing aroma. The peeled garlic saves so much time in the kitchen.", rating: 5 },
    { name: "Anita K.", text: "Black garlic is a revelation! Sweet, complex, and delicious.", rating: 5 },
  ]

  return (
    <section className="py-28 px-4 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A2E]">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((review) => (
            <div
              key={review.name}
              className="bg-white p-8 rounded-3xl border border-[#E8E4DC]"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < review.rating ? "text-[#C9A84C]" : "text-[#E8E4DC]"}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[#5A5A6E] leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-sm font-medium text-[#1A1A2E]">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecipeInspiration() {
  const recipes = [
    { name: "Garlic Butter Naan", time: "25 min", difficulty: "Easy" },
    { name: "Black Garlic Risotto", time: "40 min", difficulty: "Medium" },
    { name: "Garlic Chutney", time: "15 min", difficulty: "Easy" },
  ]

  return (
    <section className="py-28 px-4 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            Recipes
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A2E]">
            Get Inspired
          </h2>
          <p className="mt-4 text-lg text-[#5A5A6E] font-light">
            Delicious ways to use our premium garlic
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.name}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#E8E4DC] hover:border-[#C9A84C]/30 transition-all"
            >
              <div className="aspect-video bg-[#F5F0E8] flex items-center justify-center">
                <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                  🍳
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-[#1A1A2E] mb-2">
                  {recipe.name}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#5A5A6E]">
                  <span>⏱ {recipe.time}</span>
                  <span>📋 {recipe.difficulty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = [
    { q: "Is your garlic certified organic?", a: "Yes, our garlic is 100% certified organic. We never use pesticides, synthetic fertilizers, or GMOs." },
    { q: "How do you ensure freshness?", a: "We harvest and deliver within 24 hours. Our cold-chain logistics ensure peak freshness from farm to your doorstep." },
    { q: "What is your delivery coverage?", a: "We currently deliver across all major cities in India. Free shipping on orders above ₹499." },
    { q: "How should I store the garlic?", a: "Store in a cool, dry place away from direct sunlight. Peeled garlic should be refrigerated." },
  ]

  return (
    <section className="py-28 px-4 bg-[#F8F6F0]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A2E]">
            Common Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="px-6 py-5 flex items-center justify-between">
                <h3 className="text-[#1A1A2E] font-medium">{faq.q}</h3>
                <span className={`text-[#C9A84C] transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </div>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#5A5A6E] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section className="py-28 px-4 bg-[#1A1A2E]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[#C9A84C] text-sm tracking-[0.2em] uppercase mb-4">
          Stay Connected
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
          Join the Premium Circle
        </h2>
        <p className="text-white/50 mb-8">
          Subscribe for exclusive offers, recipes, and farm updates.
        </p>
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
          <button className="px-6 py-4 bg-[#C9A84C] text-[#1A1A2E] rounded-2xl font-medium hover:bg-[#D4B85A] transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}