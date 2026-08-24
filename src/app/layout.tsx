import type { Metadata } from "next"
import { CartProvider } from "@/store/cart"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CartDrawer } from "@/components/cart/CartDrawer"
import { SmoothScrolling } from "@/components/ui/SmoothScrolling"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://organicgarlicpremium.com"),
  title: {
    default: "Organic Garlic Premium | Nature's Finest, Delivered to Your Door",
    template: "%s | Organic Garlic Premium",
  },
  description:
    "India's most premium organic grocery experience. Hand-selected, organically grown garlic delivered fresh from Himachal Pradesh to your doorstep.",
  keywords: [
    "organic garlic",
    "premium garlic",
    "peeled garlic",
    "black garlic",
    "organic grocery",
    "Himachal Pradesh",
    "farm fresh",
    "buy garlic online",
  ],
  authors: [{ name: "Organic Garlic Premium" }],
  creator: "Organic Garlic Premium",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://organicgarlicpremium.com",
    siteName: "Organic Garlic Premium",
    title: "Organic Garlic Premium | Nature's Finest, Delivered to Your Door",
    description:
      "India's most premium organic grocery experience. Hand-selected, organically grown garlic delivered fresh from Himachal Pradesh.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Organic Garlic Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Organic Garlic Premium",
    description: "Nature's finest organic garlic, delivered fresh.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://organicgarlicpremium.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Organic Garlic Premium",
              url: "https://organicgarlicpremium.com",
              logo: "https://organicgarlicpremium.com/logo.png",
              description: "India's most premium organic grocery experience",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Himachal Pradesh",
                addressCountry: "IN",
              },
              sameAs: [
                "https://instagram.com/organicgarlicpremium",
                "https://twitter.com/garlicpremium",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F6F0]">
        <SmoothScrolling>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </SmoothScrolling>
      </body>
    </html>
  )
}
