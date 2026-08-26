"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer",
        "hover:scale-[1.02] active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        size === "sm" && "px-4 py-2 text-xs tracking-wide rounded-full",
        size === "md" && "px-6 py-3 text-sm tracking-wide rounded-full",
        size === "lg" && "px-8 py-4 text-base tracking-wide rounded-full",
        variant === "primary" &&
          "bg-[#1A1A2E] text-[#FAFAF6] hover:bg-[#2A2A3E] shadow-md shadow-black/8",
        variant === "secondary" &&
          "bg-[#C9A84C] text-[#1A1A2E] hover:bg-[#D4B85A] shadow-md shadow-[#C9A84C]/15",
        variant === "outline" &&
          "border border-[#E8E4DC] text-[#1A1A2E] hover:border-[#C9A84C] hover:text-[#C9A84C]",
        variant === "ghost" && "text-[#5A5A6E] hover:text-[#1A1A2E] hover:bg-[#F5F0E8]/50",
        className
      )}
      {...props}
    />
  )
}

interface ProductCardProps {
  children: React.ReactNode
  className?: string
}

export function ProductCard({ children, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden",
        "transition-all duration-500 ease-out",
        "border border-[#E8E4DC] hover:border-[#C9A84C]/35",
        "hover:shadow-[0_24px_48px_-12px_rgba(26,26,46,0.1)]",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "sale" | "organic"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium rounded-full",
        variant === "default" && "bg-[#F5F0E8] text-[#5A5A6E]",
        variant === "sale" && "bg-[#C44A4A] text-white",
        variant === "organic" && "bg-[#6B8E5A] text-white"
      )}
    >
      {children}
    </span>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 md:px-6", className)}>
      {children}
    </div>
  )
}

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center"
      )}
    >
      <h2 className="text-3xl md:text-5xl font-light text-[#1A1A2E] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[#5A5A6E] font-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
  emoji?: string
  priority?: boolean
}

export function ProductImage({
  src,
  alt,
  className,
  imgClassName,
  emoji = "🧄",
  priority,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <span className="text-8xl opacity-40 select-none">{emoji}</span>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover", imgClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  )
}
