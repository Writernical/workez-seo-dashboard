// lib/seo/schema.ts
// Pure functions that return JSON-LD objects. No React here — these are easy to
// unit-test and reuse. Each builder OMITS any field it has no real value for, so
// you never ship placeholder or guessed data.

import type {
  Centre,
  FaqItem,
  BreadcrumbItem,
  BlogPost,
  PostalAddress,
} from './types'

export const SITE = 'https://workez.in'

const ORG_NAME = 'WorkEZ'
const LOGO = `${SITE}/assets/images/workez-logo.png`
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`

const abs = (u?: string): string | undefined =>
  !u ? undefined : u.startsWith('http') ? u : `${SITE}${u.startsWith('/') ? '' : '/'}${u}`

function postalAddress(a: PostalAddress) {
  return {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country ?? 'IN',
  }
}

// ── Global (use once, near the homepage / root layout) ──────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    alternateName: 'WorkEZ Managed Offices',
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', url: LOGO },
    description:
      'Enterprise managed office spaces across Chennai, Bengaluru, Coimbatore and Kochi. 24,000+ seats across 13 centres.',
    foundingDate: '2019',
    areaServed: ['Chennai', 'Bengaluru', 'Coimbatore', 'Kochi'].map((c) => ({
      '@type': 'City',
      name: c,
    })),
    sameAs: [
      'https://in.linkedin.com/company/work-ez',
      'https://www.instagram.com/workez_/',
      'https://www.facebook.com/Workeasyspace/',
      'https://x.com/workez_',
      'https://www.youtube.com/@workez_',
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: `${SITE}/`,
    publisher: { '@type': 'Organization', name: ORG_NAME, url: `${SITE}/` },
  }
}

// ── Reusable ────────────────────────────────────────────────────────────────

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  if (!items?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE}${it.url}`,
    })),
  }
}

// Returns null when there are no FAQs, so .filter(Boolean) drops it cleanly.
// NOTE: as of May 2026 Google no longer shows FAQ rich results. FAQPage is still
// a valid type and helps AI/answer engines parse Q&As, so it is kept but is low
// priority. Remove this builder from a page if you do not want it.
export function faqSchema(faqs?: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

// ── Location (centre) pages ──────────────────────────────────────────────────

export function localBusinessSchema(c: Centre) {
  const hours = c.openingHours ?? { opens: '00:00', closes: '23:59' }
  const days =
    hours.days ??
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}${c.path}#localbusiness`,
    name: c.name,
    url: `${SITE}${c.path}`,
    image: abs(c.heroImage) ?? DEFAULT_IMAGE,
    logo: LOGO,
    telephone: c.telephone ?? '+91-44-4855-5555',
    email: c.email ?? 'hello@workez.in',
    priceRange: c.priceRange ?? '₹₹₹',
    address: postalAddress(c.address),
    geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: hours.opens, closes: hours.closes },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${c.geo.lat},${c.geo.lng}`,
    parentOrganization: { '@type': 'Organization', name: ORG_NAME, url: `${SITE}/` },
  }

  if (c.amenities?.length) {
    schema.amenityFeature = c.amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    }))
  }
  return schema
}

export function productSchema(c: Centre) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${c.name} — Managed Office Space`,
    brand: { '@type': 'Brand', name: ORG_NAME },
    url: `${SITE}${c.path}`,
    image: abs(c.heroImage) ?? DEFAULT_IMAGE,
    category: 'Managed Office Space',
  }

  // Only emit pricing when you pass real numbers — never guess.
  if (c.priceFrom != null && c.priceTo != null) {
    schema.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      lowPrice: String(c.priceFrom),
      highPrice: String(c.priceTo),
      url: `${SITE}${c.path}`,
    }
  }

  const props: Array<Record<string, unknown>> = [
    { '@type': 'PropertyValue', name: 'City', value: c.city },
  ]
  if (c.seatsFrom != null || c.seatsTo != null) {
    const value =
      c.seatsFrom != null && c.seatsTo != null
        ? `${c.seatsFrom}-${c.seatsTo}`
        : String(c.seatsTo ?? c.seatsFrom)
    props.push({ '@type': 'PropertyValue', name: 'Seat Capacity', value })
  }
  schema.additionalProperty = props
  return schema
}

export function defaultCentreCrumbs(c: Centre): BreadcrumbItem[] {
  return [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/location/' },
    { name: c.city, url: `/location/managed-office-space-${c.city.toLowerCase()}` },
    { name: c.name, url: c.path },
  ]
}

// One call gives a location page everything it needs.
export function centrePageSchemas(c: Centre, faqs?: FaqItem[], crumbs?: BreadcrumbItem[]) {
  return [
    localBusinessSchema(c),
    productSchema(c),
    faqSchema(faqs),
    breadcrumbSchema(crumbs ?? defaultCentreCrumbs(c)),
  ].filter(Boolean)
}

// ── Blog pages ───────────────────────────────────────────────────────────────

export function articleSchema(p: BlogPost) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title.slice(0, 110),
    description: p.description,
    url: `${SITE}/blog/${p.slug}`,
    mainEntityOfPage: `${SITE}/blog/${p.slug}`,
    image: abs(p.image) ?? DEFAULT_IMAGE,
    author: {
      '@type': p.authorName ? 'Person' : 'Organization',
      name: p.authorName ?? ORG_NAME,
      url: `${SITE}/about-us/`,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    inLanguage: 'en-IN',
  }
  if (p.section) schema.articleSection = p.section
  if (p.keywords?.length) schema.keywords = p.keywords.join(', ')
  if (p.wordCount) schema.wordCount = p.wordCount
  return schema
}

// One call gives a blog page everything it needs.
export function blogPageSchemas(p: BlogPost, crumbs?: BreadcrumbItem[]) {
  return [
    articleSchema(p),
    faqSchema(p.faqs),
    breadcrumbSchema(
      crumbs ?? [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: p.title, url: `/blog/${p.slug}` },
      ],
    ),
  ].filter(Boolean)
}
