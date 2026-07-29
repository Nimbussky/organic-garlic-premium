import { Product, Review } from "@/types"

export const products: Product[] = [
  {
    id: "gp-001",
    name: "Premium Peeled Garlic",
    slug: "premium-peeled-garlic",
    description:
      "Hand-selected, organically grown premium garlic cloves, carefully peeled and packed at peak freshness. Grown in the rich soils of Himachal Pradesh without pesticides or synthetic fertilizers.",
    price: 349,
    comparePrice: 449,
    unit: "250g pack",
    images: [
      "/images/garlic-1.jpg",
      "/images/garlic-2.jpg",
      "/images/garlic-3.jpg",
    ],
    category: "Garlic",
    tags: ["organic", "premium", "peeled", "fresh"],
    nutrition: {
      calories: 4,
      fat: 0,
      carbs: 1,
      protein: 0.2,
      fiber: 0.1,
      vitaminC: 1,
      manganese: 2,
    },
    benefits: [
      "Boosts immune system",
      "Natural antibiotic properties",
      "Supports heart health",
      "Rich in antioxidants",
    ],
    storage: "Store in a cool, dry place. Refrigerate after opening.",
    inStock: true,
    weight: "250g",
    origin: "Himachal Pradesh, India",
  },
  {
    id: "gp-002",
    name: "Organic Garlic Whole",
    slug: "organic-garlic-whole",
    description:
      "Farm-fresh whole organic garlic bulbs. Each bulb is sun-dried and cured naturally for maximum flavor and shelf life.",
    price: 199,
    comparePrice: 249,
    unit: "500g pack",
    images: [
      "/images/garlic-whole-1.jpg",
      "/images/garlic-whole-2.jpg",
    ],
    category: "Garlic",
    tags: ["organic", "whole", "bulbs", "fresh"],
    nutrition: {
      calories: 4,
      fat: 0,
      carbs: 1,
      protein: 0.2,
      fiber: 0.1,
      vitaminC: 1,
      manganese: 2,
    },
    benefits: [
      "Heart health support",
      "Natural immunity booster",
      "Anti-inflammatory properties",
      "Rich in vitamins B6 and C",
    ],
    storage: "Store in a cool, dark, well-ventilated area.",
    inStock: true,
    weight: "500g",
    origin: "Himachal Pradesh, India",
  },
  {
    id: "gp-003",
    name: "Black Garlic Fermented",
    slug: "black-garlic-fermented",
    description:
      "Premium aged black garlic, fermented over 60 days. Sweet, umami-rich flavor with zero pungency. A rare delicacy packed with antioxidants.",
    price: 599,
    comparePrice: 749,
    unit: "100g pack",
    images: [
      "/images/black-garlic-1.jpg",
      "/images/black-garlic-2.jpg",
    ],
    category: "Specialty",
    tags: ["fermented", "black garlic", "aged", "gourmet"],
    nutrition: {
      calories: 6,
      fat: 0,
      carbs: 1.5,
      protein: 0.3,
      fiber: 0.2,
      vitaminC: 0.5,
      manganese: 1,
    },
    benefits: [
      "Double the antioxidants of raw garlic",
      "Easier to digest",
      "Rich, sweet umami flavor",
      "No garlic breath",
    ],
    storage: "Store in a cool, dry place. No refrigeration needed.",
    inStock: true,
    weight: "100g",
    origin: "Himachal Pradesh, India",
  },
  {
    id: "gp-004",
    name: "Garlic Powder Premium",
    slug: "garlic-powder-premium",
    description:
      "Finely ground powder from sun-dried organic garlic cloves. Perfect for seasoning, rubs, and cooking. No additives or preservatives.",
    price: 249,
    unit: "100g jar",
    images: [
      "/images/garlic-powder-1.jpg",
      "/images/garlic-powder-2.jpg",
    ],
    category: "Spices",
    tags: ["powder", "dried", "seasoning", "organic"],
    nutrition: {
      calories: 10,
      fat: 0,
      carbs: 2,
      protein: 0.5,
      fiber: 0.1,
      vitaminC: 0,
      manganese: 1,
    },
    benefits: [
      "Long shelf life",
      "Concentrated flavor",
      "Versatile seasoning",
      "No peeling required",
    ],
    storage: "Store in an airtight container in a cool, dark place.",
    inStock: true,
    weight: "100g",
    origin: "Himachal Pradesh, India",
  },
  {
    id: "gp-005",
    name: "Garlic Infused Olive Oil",
    slug: "garlic-infused-olive-oil",
    description:
      "Cold-pressed extra virgin olive oil gently infused with organic garlic. Perfect for dressings, dipping, and finishing dishes.",
    price: 449,
    unit: "250ml bottle",
    images: [
      "/images/garlic-oil-1.jpg",
      "/images/garlic-oil-2.jpg",
    ],
    category: "Oils",
    tags: ["infused", "olive oil", "dressing", "gourmet"],
    nutrition: {
      calories: 120,
      fat: 14,
      carbs: 0,
      protein: 0,
      fiber: 0,
      vitaminC: 0,
      manganese: 0,
    },
    benefits: [
      "Premium cold-pressed olive oil",
      "Natural garlic infusion",
      "Heart-healthy monounsaturated fats",
      "Perfect for salads and dipping",
    ],
    storage: "Store in a cool, dark place away from direct sunlight.",
    inStock: true,
    weight: "250ml",
    origin: "Himachal Pradesh, India",
  },
  {
    id: "gp-006",
    name: "Organic Garlic Chutney",
    slug: "organic-garlic-chutney",
    description:
      "Traditional Indian garlic chutney made with organic ingredients. Spicy, tangy, and packed with flavor. No artificial preservatives.",
    price: 179,
    unit: "200g jar",
    images: [
      "/images/garlic-chutney-1.jpg",
      "/images/garlic-chutney-2.jpg",
    ],
    category: "Condiments",
    tags: ["chutney", "spread", "traditional", "organic"],
    nutrition: {
      calories: 25,
      fat: 1.5,
      carbs: 3,
      protein: 0.5,
      fiber: 0.3,
      vitaminC: 1,
      manganese: 0.5,
    },
    benefits: [
      "Traditional recipe",
      "No preservatives",
      "Bold, authentic flavor",
      "Pairs with any meal",
    ],
    storage: "Refrigerate after opening. Consume within 30 days.",
    inStock: true,
    weight: "200g",
    origin: "Himachal Pradesh, India",
  },
]

export const reviews: Review[] = [
  {
    id: "rev-001",
    productId: "gp-001",
    name: "Priya S.",
    rating: 5,
    comment:
      "Absolutely the best garlic I've ever bought. The flavor is incredibly fresh and intense. Worth every penny!",
    date: "2026-06-15",
  },
  {
    id: "rev-002",
    productId: "gp-001",
    name: "Rahul M.",
    rating: 5,
    comment:
      "The peeled garlic saves so much time in the kitchen. Premium quality, amazing aroma.",
    date: "2026-06-10",
  },
  {
    id: "rev-003",
    productId: "gp-003",
    name: "Anita K.",
    rating: 5,
    comment:
      "Black garlic is a revelation! Sweet, complex, and delicious. Perfect for gourmet cooking.",
    date: "2026-05-28",
  },
  {
    id: "rev-004",
    productId: "gp-002",
    name: "Vikram J.",
    rating: 4,
    comment:
      "Very good quality whole garlic. Fresh and flavorful. Slightly pricey but worth it for organic.",
    date: "2026-05-20",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, 4)
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId)
}