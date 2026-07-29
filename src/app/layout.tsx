import type { Metadata } from "next"
import { CartProvider } from "@/store/cart"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CartDrawer } from "@/components/cart/CartDrawer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Organic Garlic Premium | Nature's Finest, Delivered to Your Door",
  description:
    "India's most premium organic grocery experience. Hand-selected, organically grown garlic delivered fresh from Himachal Pradesh.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F6F0]">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}