"use client"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react"

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
        size === "sm" && "px-4 py-2 text-sm rounded-lg",
        size === "md" && "px-6 py-3 text-base rounded-xl",
        size === "lg" && "px-8 py-4 text-lg rounded-2xl",
        variant === "primary" &&
          "bg-[#1A1A2E] text-[#FAFAF6] hover:bg-[#2A2A3E] shadow-lg shadow-black/10",
        variant === "secondary" &&
          "bg-[#C9A84C] text-[#1A1A2E] hover:bg-[#D4B85A] shadow-lg shadow-[#C9A84C]/20",
        variant === "outline" &&
          "border-2 border-[#E8E4DC] text-[#1A1A2E] hover:border-[#C9A84C] hover:text-[#C9A84C]",
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
        "group relative bg-[#FAFAF6] rounded-3xl overflow-hidden",
        "transition-all duration-500 hover:shadow-2xl hover:shadow-black/5",
        "border border-[#E8E4DC] hover:border-[#C9A84C]/30",
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