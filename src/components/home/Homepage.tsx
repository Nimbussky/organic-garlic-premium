"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { useCart } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { Badge, Button, ProductCard, ProductImage } from "@/components/ui"
import { products } from "@/lib/data"
import type { Product } from "@/types"
import { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const Hero3D = dynamic(
  () => import("@/components/three/GarlicHero").then((m) => m.Hero3D),
  { ssr: false, loading: () => null }
)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-12% 0px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Homepage() {
  const { addItem } = useCart()

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
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
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#1A1A2E] grain"
    >
      <div className="absolute inset-0 z-0 opacity-55">
        <Hero3D />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/75 via-[#1A1A2E]/35 to-[#1A1A2E]/92 z-10" />

      <motion.div style={{ y, opacity }} className="relative z-20 text-center px-5 max-w-4xl mx-auto pt-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#C9A84C] text-[11px] md:text-xs tracking-[0.35em] uppercase mb-5 font-medium"
        >
          Himalayan Organic · Est. 2024
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[3.25rem] leading-[0.95] md:text-7xl lg:text-8xl text-white tracking-tight mb-6"
        >
          Nature&apos;s
          <br />
          <span className="italic text-[#C9A84C] font-normal">Finest</span> Garlic
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-white/55 font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Hand-selected bulbs from the high valleys of Himachal Pradesh.
          Organically grown, sun-cured, and delivered at peak aroma within 24 hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          <Link
            href="/products"
            className="px-8 py-3.5 bg-[#C9A84C] text-[#1A1A2E] rounded-full text-sm font-medium tracking-wide hover:bg-[#D4B85A] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Collection
          </Link>
          <Link
            href="/story"
            className="px-8 py-3.5 border border-white/20 text-white/90 rounded-full text-sm font-medium tracking-wide hover:bg-white/5 hover:border-white/35 transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-16 md:mt-20 flex items-center justify-center gap-10 md:gap-14 text-white/35 text-[11px] tracking-wider uppercase"
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-white/90 font-display font-light normal-case tracking-tight">100%</p>
            <p className="mt-1">Organic</p>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-white/90 font-display font-light normal-case tracking-tight">24h</p>
            <p className="mt-1">Farm to Door</p>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-white/90 font-display font-light normal-case tracking-tight">5K+</p>
            <p className="mt-1">Customers</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/30">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/50 rounded-full"
          />
        </div>
      </div>
    </section>
  )
}

function MarqueeStrip() {
  const items = [
    "Certified Organic",
    "Himachal Grown",
    "Sun-Cured",
    "24h Delivery",
    "Hand-Selected",
    "Zero Pesticides",
    "Cold-Chain Fresh",
    "Premium Grade",
  ]
  return (
    <div className="bg-[#C9A84C] overflow-hidden py-3.5 border-y border-[#1A1A2E]/5">
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-[#1A1A2E] text-[11px] tracking-[0.28em] uppercase font-medium"
          >
            {item}
            <span className="ml-8 opacity-40">·</span>
          </span>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  )
}

function FeaturedProducts({ onAdd }: { onAdd: (product: Product) => void }) {
  return (
    <section className="py-20 md:py-28 px-4 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A2E] tracking-tight">
            Premium Selection
          </h2>
          <p className="mt-3 text-[#5A5A6E] font-light max-w-md mx-auto text-[15px]">
            Each product is curated for peak flavour, aroma and purity
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {products.slice(0, 6).map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard className="premium-card h-full">
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-[4/5] bg-[#F5F0E8] overflow-hidden relative">
                    <ProductImage
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="organic">Organic</Badge>
                    </div>
                  </div>
                </Link>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-[15px] md:text-base font-medium text-[#1A1A2E] group-hover:text-[#C9A84C] transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#9A9AAE] mt-0.5">{product.unit}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#5A5A6E] mt-2.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#E8E4DC]/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-display text-[#1A1A2E]">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-xs text-[#9A9AAE] line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                    <Button size="sm" onClick={() => onAdd(product)}>
                      Add
                    </Button>
                  </div>
                </div>
              </ProductCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-[#1A1A2E] border-b border-[#1A1A2E]/25 pb-0.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          >
            View full collection
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const reasons = [
    {
      title: "100% Certified Organic",
      desc: "Grown without pesticides, synthetic fertilisers or GMOs. Fully certified and traceable to the plot.",
    },
    {
      title: "Himalayan Terroir",
      desc: "High-altitude soil, pure spring water and cool nights that concentrate flavour and allicin.",
    },
    {
      title: "Farm to Door in 24h",
      desc: "Harvested at peak, packed same day and moved through cold-chain logistics to your kitchen.",
    },
    {
      title: "Hand-Selected Grade",
      desc: "Every bulb and clove is inspected for size, firmness and aroma before it leaves the farm.",
    },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            Why Choose Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] tracking-tight">
            Crafted with Care
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.07}>
              <div className="group h-full p-6 md:p-7 bg-white/60 border border-[#E8E4DC] rounded-2xl hover:border-[#C9A84C]/35 transition-colors duration-400">
                <div className="w-8 h-px bg-[#C9A84C] mb-5 group-hover:w-12 transition-all duration-400" />
                <h3 className="text-[15px] font-medium text-[#1A1A2E] mb-2.5 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-[13px] text-[#5A5A6E] leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FarmProcess() {
  const steps = [
    { step: "01", title: "Sowing", desc: "Cloves planted in nutrient-rich Himalayan soil at the right moon phase for strong root systems." },
    { step: "02", title: "Growing", desc: "Nurtured with compost, spring water and natural mulches — no chemicals, ever." },
    { step: "03", title: "Harvesting", desc: "Hand-lifted at peak maturity when leaves begin to yellow and bulbs firm." },
    { step: "04", title: "Curing", desc: "Sun-dried and air-cured for 2–3 weeks to lock in flavour and extend shelf life." },
    { step: "05", title: "Sorting", desc: "Graded by size, density and skin integrity. Only premium grade ships." },
    { step: "06", title: "Delivery", desc: "Packed in breathable, sustainable materials and delivered within 24 hours." },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            Farm Fresh Process
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] tracking-tight">
            From Soil to Soul
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.05}>
              <div className="relative pl-14">
                <span className="absolute left-0 top-0 font-display text-2xl text-[#C9A84C]/70 tracking-tight">
                  {s.step}
                </span>
                <h3 className="text-[15px] font-medium text-[#1A1A2E] mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-[#5A5A6E] leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrganicBenefits() {
  const benefits = [
    { title: "Rich in Allicin", desc: "The natural compound responsible for garlic’s medicinal punch and signature aroma." },
    { title: "Antioxidant Density", desc: "Protects cells and supports longevity through a spectrum of sulphur compounds." },
    { title: "Heart Health", desc: "Supports healthy blood pressure and cholesterol as part of a balanced diet." },
    { title: "Immune Resilience", desc: "A time-tested kitchen staple for everyday defence against seasonal challenges." },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-[#1A1A2E] text-white relative overflow-hidden grain">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal>
            <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
              Why Organic
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-8 leading-[1.1]">
              The Power of
              <br />
              <span className="italic text-[#C9A84C]">Organic Garlic</span>
            </h2>
            <div className="space-y-5">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-0.5 bg-[#C9A84C]/80 flex-shrink-0 mt-1.5 h-10" />
                  <div>
                    <h4 className="font-medium text-[15px] mb-0.5">{benefit.title}</h4>
                    <p className="text-[13px] text-white/45 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-[#C9A84C]/12 via-transparent to-transparent rounded-[2rem] flex items-center justify-center border border-white/5">
              <div className="text-center px-8">
                <p className="font-display text-6xl md:text-7xl text-[#C9A84C]/90 tracking-tight">26800</p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mt-2">ppm Alliin potential</p>
                <p className="text-[13px] text-white/50 mt-4 max-w-xs mx-auto leading-relaxed">
                  Premium organic garlic delivers significantly higher active compounds than conventional crops.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CustomerReviews() {
  const featured = [
    { name: "Priya S.", location: "Mumbai", text: "Absolutely the best garlic I’ve ever bought. The flavour is incredibly fresh and intense — one clove does the work of three supermarket ones.", rating: 5 },
    { name: "Rahul M.", location: "Delhi", text: "Premium quality, amazing aroma. The peeled garlic saves so much time and still tastes like it came straight from the farm.", rating: 5 },
    { name: "Anita K.", location: "Bengaluru", text: "Black garlic is a revelation. Sweet, complex and deeply savoury. I use it in everything from risottos to dressings.", rating: 5 },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] tracking-tight">
            What Our Customers Say
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {featured.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.08}>
              <div className="h-full bg-white p-7 md:p-8 rounded-2xl border border-[#E8E4DC] premium-card">
                <div className="flex gap-0.5 mb-4 text-[#C9A84C] text-sm tracking-tight">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j}>{j < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="text-[14px] text-[#5A5A6E] leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#1A1A2E]">{review.name}</p>
                  <p className="text-xs text-[#9A9AAE]">{review.location}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function RecipeInspiration() {
  const recipes = [
    { name: "Garlic Butter Naan", time: "25 min", difficulty: "Easy", note: "Classic street-style" },
    { name: "Black Garlic Risotto", time: "40 min", difficulty: "Medium", note: "Umami-rich" },
    { name: "Garlic Chutney", time: "15 min", difficulty: "Easy", note: "Punchy & fresh" },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-[#FAFAF6]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            Recipes
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] tracking-tight">
            Get Inspired
          </h2>
          <p className="mt-3 text-[#5A5A6E] font-light text-[15px]">
            Simple, elevated ways to use our garlic
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {recipes.map((recipe, i) => (
            <Reveal key={recipe.name} delay={i * 0.07}>
              <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] premium-card">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#F5F0E8] to-[#EDE6D9] flex items-center justify-center relative">
                  <span className="font-display text-4xl text-[#C9A84C]/25 group-hover:text-[#C9A84C]/40 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-1.5">{recipe.note}</p>
                  <h3 className="text-[15px] font-medium text-[#1A1A2E] mb-2 group-hover:text-[#C9A84C] transition-colors">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#9A9AAE]">
                    <span>{recipe.time}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E8E4DC]" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = [
    { q: "Is your garlic certified organic?", a: "Yes. Our garlic is 100% certified organic. We never use pesticides, synthetic fertilisers or GMOs, and every batch is traceable to the farm plot." },
    { q: "How do you ensure freshness?", a: "We harvest and pack the same day, then move product through cold-chain logistics so it reaches you within 24 hours of leaving the farm." },
    { q: "What is your delivery coverage?", a: "We currently deliver across all major cities in India. Free shipping on orders above ₹499." },
    { q: "How should I store the garlic?", a: "Whole bulbs: cool, dry, well-ventilated place away from sunlight. Peeled cloves: refrigerate and use within a few days for best flavour." },
  ]

  return (
    <section className="py-20 md:py-28 px-4 bg-[#F8F6F0]">
      <div className="max-w-2xl mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            FAQ
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] tracking-tight">
            Common Questions
          </h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div
                className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden cursor-pointer transition-colors hover:border-[#C9A84C]/40"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="px-5 py-4 flex items-center justify-between gap-4">
                  <h3 className="text-[14px] font-medium text-[#1A1A2E] text-left">{faq.q}</h3>
                  <span
                    className={`text-[#C9A84C] text-lg leading-none transition-transform duration-300 flex-shrink-0 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-[13px] text-[#5A5A6E] leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"" | "loading" | "success" | "error">("")

  const handleSubscribe = async () => {
    if (!email.trim()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus(""), 3000)
  }

  return (
    <section className="py-20 md:py-28 px-4 bg-[#1A1A2E] relative grain">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-[#C9A84C] text-[11px] tracking-[0.28em] uppercase mb-3 font-medium">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight mb-3">
            Join the Premium Circle
          </h2>
          <p className="text-white/45 text-[15px] mb-8 font-light">
            Exclusive offers, seasonal recipes and farm notes — no noise.
          </p>
          <div className="flex items-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Your email"
              className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-full text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
            />
            <button
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className="px-6 py-3.5 bg-[#C9A84C] text-[#1A1A2E] rounded-full text-sm font-medium hover:bg-[#D4B85A] transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </div>
          {status === "success" && (
            <p className="mt-4 text-sm text-[#6B8E5A]">Welcome to the circle.</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">Something went wrong. Please try again.</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
