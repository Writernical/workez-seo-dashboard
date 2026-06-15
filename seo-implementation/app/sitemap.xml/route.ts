// app/sitemap.xml/route.ts   (Next.js App Router + Payload 3)
// Serves https://workez.in/sitemap.xml — built from static routes + the 13
// centres + published CMS posts. Auto-updates: the publish hook
// (hooks/revalidateSitemap.ts) rebuilds it instantly, and revalidate=3600 is an
// hourly safety net.

import { getPayload } from 'payload'
import config from '@payload-config'
import { CENTRES } from '../../../data/centres' // adjust relative path to your data file

export const revalidate = 3600

const SITE = 'https://workez.in'

type Entry = { loc: string; lastmod: string; changefreq: string; priority: string }

// ── Fixed (non-CMS) routes. Keep in sync with the site. ──
const STATIC: Array<Omit<Entry, 'lastmod'>> = [
  { loc: `${SITE}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE}/about-us/`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE}/about-us/meet-the-team`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE}/careers/`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE}/blog`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE}/gallery`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${SITE}/book-a-tour/`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE}/privacy-policy/`, changefreq: 'yearly', priority: '0.3' },
  { loc: `${SITE}/terms-and-conditions/`, changefreq: 'yearly', priority: '0.3' },
  // Solution hubs
  { loc: `${SITE}/managed-office-space`, changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE}/managed-office-space/enterprise-office-space`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE}/managed-office-space/private-managed-offices`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE}/managed-office-space/corporate-conference-room`, changefreq: 'monthly', priority: '0.7' },
  // Location index + city pages (4 cities)
  { loc: `${SITE}/location`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${SITE}/location/managed-office-space-chennai`, changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE}/location/managed-office-space-bengaluru`, changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE}/location/managed-office-space-coimbatore`, changefreq: 'monthly', priority: '0.9' },
  { loc: `${SITE}/location/managed-office-space-kochi`, changefreq: 'monthly', priority: '0.9' },
]

// ── CMS collections that feed the sitemap. ──
const COLLECTIONS: Array<{ slug: string; drafts?: boolean; path: (d: any) => string; changefreq: string; priority: string }> = [
  { slug: 'posts', drafts: true, path: (d) => `/blog/${d.slug}`, changefreq: 'weekly', priority: '0.7' },
  // If location pages are ALSO stored in the CMS, add them here and remove the
  // CENTRES loop below to avoid duplicates.
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const day = (d?: string) => new Date(d ?? Date.now()).toISOString().slice(0, 10)

export async function GET() {
  const dynamic: Entry[] = []

  // 1) CMS posts (auto-updating)
  try {
    const payload = await getPayload({ config })
    for (const c of COLLECTIONS) {
      const res = await payload.find({
        collection: c.slug as any,
        where: c.drafts ? { _status: { equals: 'published' } } : undefined,
        depth: 0,
        pagination: false,
        limit: 0,
      })
      for (const doc of res.docs as any[]) {
        if (!doc?.slug) continue
        dynamic.push({ loc: `${SITE}${c.path(doc)}`, lastmod: day(doc.updatedAt), changefreq: c.changefreq, priority: c.priority })
      }
    }
  } catch (e) {
    console.error('[sitemap] CMS fetch failed:', e)
  }

  // 2) The 13 centres (from the typed data file — One National Park is gone)
  const centres: Entry[] = CENTRES.map((c) => ({
    loc: `${SITE}${c.path}`,
    lastmod: day(),
    changefreq: 'monthly',
    priority: '0.8',
  }))

  const all: Entry[] = [
    ...STATIC.map((s) => ({ ...s, lastmod: day() })),
    ...centres,
    ...dynamic,
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate',
    },
  })
}
