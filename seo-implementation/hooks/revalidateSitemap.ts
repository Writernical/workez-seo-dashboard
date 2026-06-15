// hooks/revalidateSitemap.ts   (Payload 3 — runs in the Next runtime)
// Rebuilds /sitemap.xml the instant a post is published, updated, or deleted.
// WIRE THIS INTO THE POSTS COLLECTION (see bottom) — without that step it does
// nothing and you only get the hourly refresh.

import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

function bust(slug?: string, prefix = '/blog') {
  try {
    revalidatePath('/sitemap.xml')
    if (slug) revalidatePath(`${prefix}/${slug}`)
  } catch (e) {
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

// ── WIRE IT IN — src/collections/Posts.ts ──
//
// import { revalidateSitemap, revalidateSitemapOnDelete } from '../hooks/revalidateSitemap'
//
// export const Posts: CollectionConfig = {
//   slug: 'posts',
//   versions: { drafts: true },
//   hooks: {
//     afterChange: [revalidateSitemap],
//     afterDelete: [revalidateSitemapOnDelete],
//   },
//   fields: [ /* … */ ],
// }
//
// If Payload runs as a SEPARATE server (not inside this Next app), revalidatePath
// can't reach Next. Instead POST to a revalidate route from afterChange:
//   await fetch(`${process.env.SITE_URL}/api/revalidate-sitemap?secret=${process.env.REVALIDATE_SECRET}`, { method: 'POST' })
