// examples/home-and-layout.example.tsx
// HOW TO ADD THE GLOBAL SCHEMA (once).
// The homepage already has Organization + WebSite — this just shows the same
// pattern using the shared builders, so everything stays consistent.

import { JsonLd } from '../components/JsonLd'
import { organizationSchema, websiteSchema } from '../lib/seo/schema'

// In app/page.tsx (homepage) OR app/layout.tsx (site-wide), render once:
export function GlobalSchema() {
  return <JsonLd schema={[organizationSchema(), websiteSchema()]} />
}

// If you put it in layout.tsx it applies to every page. If only on the homepage,
// keep it in app/page.tsx. Do NOT add it twice (don't put it in both).
