// ─────────────────────────────────────────────────────────────────────────
// FILE: src/hooks/revalidateSitemap.ts   (Payload 3 — runs in Next runtime)
// Refreshes /sitemap.xml the instant a doc is published, updated, or deleted.
// ─────────────────────────────────────────────────────────────────────────
import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

function bust(slug?: string, prefix = '/blog') {
  try {
    revalidatePath('/sitemap.xml')          // the sitemap itself
    if (slug) revalidatePath(`${prefix}/${slug}`) // the page that changed
  } catch (e) {
    // revalidatePath can throw outside a request context (e.g. seed scripts) — safe to ignore
    console.warn('[revalidateSitemap] skipped:', (e as Error)?.message)
  }
}

export const revalidateSitemap: CollectionAfterChangeHook = ({ doc }) => {
  bust(doc?.slug)
  return doc
}

export const revalidateSitemapOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  bust(doc?.slug)
  return doc
}

// ── Wire it into each CMS collection that feeds the sitemap, e.g. Posts: ──
//
// // src/collections/Posts.ts
// import { revalidateSitemap, revalidateSitemapOnDelete } from '../hooks/revalidateSitemap'
//
// export const Posts: CollectionConfig = {
//   slug: 'posts',
//   versions: { drafts: true },     // enables published/draft filtering
//   hooks: {
//     afterChange: [revalidateSitemap],
//     afterDelete: [revalidateSitemapOnDelete],
//   },
//   fields: [ /* … */ ],
// }
//
// ── FALLBACK: if Payload runs as a SEPARATE server (not inside this Next app),
//    revalidatePath won't reach Next. Instead POST to a revalidate route:
//
//   afterChange: [async () => {
//     await fetch(`${process.env.SITE_URL}/api/revalidate-sitemap?secret=${process.env.REVALIDATE_SECRET}`, { method: 'POST' })
//   }]
//
//   // src/app/api/revalidate-sitemap/route.ts
//   import { revalidatePath } from 'next/cache'
//   export async function POST(req: Request) {
//     if (new URL(req.url).searchParams.get('secret') !== process.env.REVALIDATE_SECRET)
//       return new Response('Unauthorized', { status: 401 })
//     revalidatePath('/sitemap.xml')
//     return Response.json({ revalidated: true })
//   }
