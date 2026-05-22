// ─────────────────────────────────────────────────────────────────────────
// FILE: src/app/sitemap.xml/route.ts   (Next.js App Router + Payload 3)
// Serves https://workez.in/sitemap.xml — auto-built from the CMS.
// Keeps the styled view (references /sitemap.xsl). Crawler-valid XML.
// ─────────────────────────────────────────────────────────────────────────
import { getPayload } from 'payload'
import config from '@payload-config'

// Safety-net rebuild every hour. The Payload publish hook makes it instant,
// so this just guarantees freshness even if a webhook is ever missed.
export const revalidate = 3600

const SITE = 'https://workez.in'

// ── THE ONLY CMS-SPECIFIC PART ──
// One entry per Payload collection that should appear in the sitemap.
// `path` turns a CMS doc into its public URL — adjust to match your routes.
// `drafts:true` means the collection uses draft/publish (filters to published).
const COLLECTIONS: {
  slug: string
  drafts?: boolean
  path: (doc: any) => string
  changefreq: string
  priority: string
}[] = [
  { slug: 'posts',     drafts: true, path: (d) => `/blog/${d.slug}`, changefreq: 'weekly',  priority: '0.7' },
  // Uncomment / edit for the other CMS collections:
  // { slug: 'pages',     drafts: true, path: (d) => `/${d.slug}`,                 changefreq: 'monthly', priority: '0.6' },
  // { slug: 'locations', drafts: true, path: (d) => d.fullPath /* e.g. /location/.../slug */, changefreq: 'monthly', priority: '0.8' },
]

// Pages NOT managed in the CMS (hardcoded routes). Keep these in sync with the site.
const STATIC: { loc: string; changefreq: string; priority: string }[] = [
  { loc: `${SITE}/`,                    changefreq: 'weekly',  priority: '1.0' },
  { loc: `${SITE}/about-us/`,           changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE}/about-us/meet-the-team`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE}/careers/`,            changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE}/contact-us/`,         changefreq: 'monthly', priority: '0.6' },
  // …add the remaining fixed pages (managed-office-space hubs, location pages if
  //   they are NOT in the CMS, privacy, terms, etc.)
]

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const day = (d?: string) => new Date(d ?? Date.now()).toISOString().slice(0, 10)

export async function GET() {
  const payload = await getPayload({ config })
  const dynamic: { loc: string; lastmod: string; changefreq: string; priority: string }[] = []

  for (const c of COLLECTIONS) {
    try {
      const res = await payload.find({
        collection: c.slug as any,
        where: c.drafts ? { _status: { equals: 'published' } } : undefined,
        depth: 0,
        pagination: false, // fetch all
        limit: 0,
      })
      for (const doc of res.docs as any[]) {
        if (!doc?.slug && !c.path(doc)) continue
        dynamic.push({
          loc: `${SITE}${c.path(doc)}`,
          lastmod: day(doc.updatedAt),
          changefreq: c.changefreq,
          priority: c.priority,
        })
      }
    } catch (e) {
      console.error(`[sitemap] collection "${c.slug}" failed:`, e)
    }
  }

  const all = [
    ...STATIC.map((s) => ({ ...s, lastmod: day() })),
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
