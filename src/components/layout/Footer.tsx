"use client"

import Link from "next/link"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-white text-lg font-medium tracking-wider mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-sm leading-relaxed max-w-md">
              {SITE_CONFIG.description}. Grown with care in the pristine valleys
              of Himachal Pradesh.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Shop", path: "/products" },
                { name: "Our Story", path: "/story" },
                { name: "About", path: "/about" },
                { name: "Recipes", path: "/recipes" },
                { name: "Contact", path: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>{SITE_CONFIG.email}</li>
              <li>{SITE_CONFIG.phone}</li>
              <li>{SITE_CONFIG.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>{SITE_CONFIG.social.instagram}</span>
            <span>{SITE_CONFIG.social.twitter}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}