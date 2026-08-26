"use client"

import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"

export function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
