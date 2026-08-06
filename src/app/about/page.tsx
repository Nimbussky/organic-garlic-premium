import Link from "next/link"

export const metadata = {
  title: "About Us | Nature's Finest Garlic",
  description:
    "Meet the family farm behind Nature's Finest Garlic - pesticide-free organic garlic grown in the hills of Himachal Pradesh and delivered farm-to-home.",
}

const pillars = [
  {
    title: "Purity",
    desc: "Every bulb is grown without pesticides, synthetic fertilizers, or shortcuts - pure from soil to shelf.",
  },
  {
    title: "Small-Batch Craft",
    desc: "From whole bulbs to fermented black garlic, everything is processed in small batches with care.",
  },
  {
    title: "Farm-to-Home Freshness",
    desc: "Our garlic reaches your door within days of harvest, preserving flavor and nutrition.",
  },
]

const products = [
  "Whole Garlic Bulbs",
  "Peeled Garlic",
  "Fermented Black Garlic",
  "Garlic Powder",
  "Garlic-Infused Olive Oil",
  "Garlic Chutney",
]

export default function AboutPage() {
  return (
    <div className="pt-24 bg-[#FAFAF6]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-20">
        <p className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-4">About Us</p>
        <h1 className="text-4xl md:text-6xl font-light text-[#1A1A2E] tracking-tight mb-12">
          Honest Garlic,
          <br />
          <span className="italic text-[#C9A84C]">Grown with Care</span>
        </h1>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-4">Who We Are</h2>
          <p className="text-[#5A5A6E] leading-relaxed">
            Nestled in the misty hills of Himachal Pradesh, India, our organic garlic thrives in
            pesticide-free soil, nurtured by generations of sustainable farming wisdom. Every
            bulb is hand-selected for peak freshness, then carefully processed into peeled
            cloves, whole bulbs, or transformed into rich fermented black garlic, aromatic
            powder, infused olive oil, and zesty chutney - all crafted in small batches to
            preserve nature&apos;s purity.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-4">What We Grow</h2>
          <p className="text-[#5A5A6E] leading-relaxed mb-6">
            From our sun-kissed farm to your kitchen, we ensure no shortcuts, no compromise -
            just honest, bold flavor you can trust. Our range includes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product}
                className="bg-white p-4 rounded-2xl border border-[#E8E4DC] text-sm text-[#1A1A2E]"
              >
                {product}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-light text-[#1A1A2E] mb-6">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="bg-white p-6 rounded-2xl border border-[#E8E4DC]">
                <h3 className="font-medium text-[#1A1A2E] mb-2">{pillar.title}</h3>
                <p className="text-sm text-[#5A5A6E]">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-[#F8F6F0] rounded-3xl p-8 md:p-12">
            <p className="text-[#5A5A6E] leading-relaxed text-center max-w-2xl mx-auto">
              Each bite carries the earthy warmth of the Himalayas, grown with care and delivered
              with love. We take our time, and it shows.
            </p>
          </div>
        </section>

        <div className="text-center">
          <p className="text-[#5A5A6E] leading-relaxed mb-8 max-w-xl mx-auto">
            Taste the difference that honest, unhurried growing makes.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-[#C9A84C] text-[#1A1A2E] rounded-2xl font-medium hover:bg-[#D4B85A] transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
