// lib/seo/types.ts
// Shared types for WorkEZ structured-data (JSON-LD) generation.

export interface PostalAddress {
  street: string
  locality: string // city / area, e.g. "Chennai"
  region: string // state, e.g. "Tamil Nadu"
  postalCode: string
  country?: string // ISO code, defaults to "IN"
}

export interface OpeningHours {
  opens: string // "00:00"
  closes: string // "23:59"
  days?: string[] // defaults to all 7 days
}

export interface Centre {
  slug: string // "annasalai-hansa"
  path: string // "/location/managed-office-space-chennai/annasalai-hansa"
  name: string // "WorkEZ Hansa, Anna Salai"
  city: string // "Chennai"
  address: PostalAddress
  geo: { lat: number; lng: number }
  telephone?: string
  email?: string
  heroImage?: string // site-root path or absolute URL
  priceRange?: string // "₹₹₹"
  amenities?: string[]
  openingHours?: OpeningHours

  // Commercial detail. These are OPTIONAL on purpose: the builders only write
  // them into schema if you supply a real value, so no guessed numbers ship.
  seatsFrom?: number
  seatsTo?: number
  priceFrom?: number // INR per seat / month
  priceTo?: number
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  url: string // path ("/blog") or absolute URL
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  image?: string
  authorName?: string
  datePublished: string // ISO date
  dateModified?: string // ISO date
  section?: string // pillar / category
  keywords?: string[]
  wordCount?: number
  faqs?: FaqItem[] // if the post has an FAQ block, pass it here
}
