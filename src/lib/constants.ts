export const COLORS = {
  primary: "#F5F0E8",
  secondary: "#C9A84C",
  accent: "#6B8E5A",
  neutral: "#1A1A2E",
  surface: "#FAFAF6",
  background: "#F8F6F0",
  text: {
    primary: "#1A1A2E",
    secondary: "#5A5A6E",
    muted: "#9A9AAE",
  },
  border: "#E8E4DC",
  success: "#6B8E5A",
  error: "#C44A4A",
  gold: "#C9A84C",
} as const

export const SITE_CONFIG = {
  name: "Organic Garlic Premium",
  tagline: "Nature's Finest, Delivered to Your Door",
  description: "India's most premium organic grocery experience",
  email: "hello@有机garlicpremium.com",
  phone: "+91 98765 43210",
  address: "Organic Valley, Himachal Pradesh, India",
  social: {
    instagram: "@有机garlicpremium",
    twitter: "@garlicpremium",
  },
  shipping: {
    freeMinimum: 499,
    standardFee: 49,
    estimatedDays: "2-4 business days",
  },
} as const

export const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Our Story", href: "/story" },
  { label: "About", href: "/about" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact", href: "/contact" },
] as const