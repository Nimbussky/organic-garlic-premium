import Link from "next/link"

export const metadata = {
  title: "Our Story | Nature's Finest Garlic",
  description:
    "How a small family farm in the Himalayas grows premium organic garlic, hand-selected and delivered farm-to-home within days of harvest.",
}

const values = [
  {
    title: "Purity First",
    desc: "Grown without pesticides or synthetic fertilizers, ever.",
  },
  {
    title: "Small-Batch Integrity",
    desc: "Hand-processed in limited quantities to ensure consistent, superior quality.",
  },
  {
    title: "Sustainable Farming",
    desc: "Regenerative practices that nurture the land for future generations.",
  },
]

const badges = [
  { title: "No Pesticides", desc: "Grown without pesticides or synthetic fertilizers" },
  { title: "Farm to Door in Days", desc: "Harvested at its prime, delivered to your door" },
  { title: "Small-Batch", desc: "Small-batch quality you can taste" },
]

export default function StoryPage() {
  return (
    <div className="pt-24 bg-[#FAFAF6]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-20">
        <p className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-4">
          Our Story
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-[#1A1A2E] tracking-tight mb-12">
          Nature&apos;s
          <br />
          <span className="italic text-[#C9A84C]">Finest</span> Garlic
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-4">The Beginning</h2>
          <p className="text-[#5A5A6E] leading-relaxed">
            Nestled in the pristine valleys of Himachal Pradesh, our family farm began with a
            simple belief: garlic should grow as nature intended. Generations of farming wisdom
            combined with the region&apos;s pure mountain air and fertile soil created the perfect
            environment for cultivating premium organic garlic. What started as a small plot
            behind our home gradually blossomed into a dedicated organic farm, rooted in the
            conviction that food free from chemicals and synthetic fertilizers tastes better and
            nourishes the body more completely.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-4">The Craft</h2>
          <p className="text-[#5A5A6E] leading-relaxed">
            Every bulb that leaves our farm is hand-selected at the peak of its flavor. Our garlic
            undergoes natural curing in controlled conditions, preserving its essential oils and
            pungency. Small-batch processing ensures each product receives personal attention,
            from our silky peeled garlic to our fermented black garlic aged for a full 60 days.
            Whether it is our garlic powder, garlic-infused olive oil, or our tangy garlic
            chutney, every item is crafted with care, honoring the raw ingredient at every step.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-4">The Promise</h2>
          <p className="text-[#5A5A6E] leading-relaxed">
            We believe you deserve garlic harvested at its prime and delivered to your door within
            days. Our farm-to-home model cuts out unnecessary middlemen, ensuring unmatched
            freshness and quality. Every practice we follow, from sustainable soil management to
            mindful packaging, reflects our commitment to the earth and to you. When you choose
            us, you choose transparency, integrity, and garlic that truly tastes the way nature
            meant it to. That is our promise, and it is one we keep with every order.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-2xl border border-[#E8E4DC]">
                <h3 className="font-medium text-[#1A1A2E] mb-2">{value.title}</h3>
                <p className="text-sm text-[#5A5A6E]">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-[#F8F6F0] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {badges.map((badge) => (
                <div key={badge.title}>
                  <h3 className="font-medium text-[#1A1A2E] mb-2">{badge.title}</h3>
                  <p className="text-sm text-[#5A5A6E]">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center">
          <p className="text-[#5A5A6E] leading-relaxed mb-8 max-w-xl mx-auto">
            Thank you for trusting us to bring the finest organic garlic from our Himalayan farm
            to your table. We invite you to explore our collection and taste the difference that
            nature, care, and craft can make. Welcome to the family.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-[#C9A84C] text-[#1A1A2E] rounded-2xl font-medium hover:bg-[#D4B85A] transition-all"
          >
            Explore the Collection
          </Link>
        </div>
      </div>
    </div>
  )
}
