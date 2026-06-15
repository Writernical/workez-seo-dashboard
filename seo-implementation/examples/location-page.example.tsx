// examples/location-page.example.tsx
// HOW TO ADD SCHEMA TO A LOCATION PAGE.
// Your real file is something like:
//   app/location/managed-office-space-[city]/[slug]/page.tsx
// Add the two marked lines to whatever that page already renders.

import { JsonLd } from '../components/JsonLd'
import { centrePageSchemas } from '../lib/seo/schema'
import { getCentreBySlug } from '../data/centres'
import type { FaqItem } from '../lib/seo/types'

export default function CentrePage({ params }: { params: { slug: string } }) {
  const centre = getCentreBySlug(params.slug)
  if (!centre) return null // your existing notFound() handling

  // Pull the FAQs this page already shows. If they live in your CMS or a local
  // file, map them to { question, answer }. Pass [] if the page has no FAQ block.
  const faqs: FaqItem[] = [
    // { question: 'Where is this centre?', answer: '...' },
  ]

  const schemas = centrePageSchemas(centre, faqs) // ← builds LocalBusiness + Product + FAQ + Breadcrumb

  return (
    <>
      <JsonLd schema={schemas} /> {/* ← renders all of them, server-side */}

      {/* …the rest of your existing page markup, unchanged… */}
    </>
  )
}

// PREFER THIS if you already have a centre data object that powers the page:
// pass your object straight into the builders instead of getCentreBySlug, so the
// schema reads from the same data the page shows and can never drift.
