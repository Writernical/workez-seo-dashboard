# WorkEZ — Developer Implementation Guide
## Step-by-step. Follow in order. Each step is independent.

---

## STEP 1: Change URL Slugs (30 min)

Update your Next.js routing. All config files in this repo use these final slugs:

| Your Current Slug | Change To |
|---|---|
| /workez-anna-salai | /annasalai-hansa |
| /workez-anna-salai-clubhouse | /annasalai-clubhouse |
| /workez-guindy | /guindy-willow-square |
| /workez-guindy-chambers | /guindy-chambers |
| /workez-perungudi | /perungudi-sm-towers |
| /workez-omr | /omr-urban-square |
| /workez-omr-the-ark | /omr-the-ark |
| /workez-pallavaram | /pallavaram-the-address |
| /workez-velachery | /velachery-helix |
| /workez-alwarpet | /alwarpet-park-centre |
| /workez-koramangala | /bellandur |
| /workez-rs-puram | /saravanampatti |
| /privacy-&-policy | /privacy-policy |
| /terms-&-conditions | /terms-and-conditions |

Rename the folder/file in \`app/location/managed-office-space-chennai/\` for each.

---

## STEP 2: Add Meta Tags + Canonical (15 min)

**Option A — Using our helper (recommended):**

1. Copy \`meta/workez-meta-tags.json\` and \`meta/meta-tags.js\` to your project (e.g., \`src/seo/\`)
2. In every page file:

\`\`\`javascript
// app/about-us/page.js
import { getMetadata } from '@/seo/meta/meta-tags'
export const metadata = getMetadata('/about-us')
\`\`\`

This gives you: \`<title>\`, \`<meta description>\`, \`<link canonical>\`, all OG tags, all Twitter tags — automatically.

3. For blog posts (dynamic):
\`\`\`javascript
// app/blog/[slug]/page.js
import { getBlogPostMetadata } from '@/seo/meta/meta-tags'
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return getBlogPostMetadata(params.slug, post.title, post.excerpt, post.image)
}
\`\`\`

**Option B — Manual (if not using helper):**

For each page, add to your metadata export:
\`\`\`javascript
export const metadata = {
  title: '...',           // from workez-meta-tags.json → title
  description: '...',     // from workez-meta-tags.json → description
  alternates: {
    canonical: '...',     // from workez-meta-tags.json → canonical
  },
  openGraph: { ... },     // from workez-meta-tags.json → og
  twitter: { ... },       // from workez-meta-tags.json → twitter
}
\`\`\`

**Verify:** After adding, view page source and confirm you see:
- \`<title>Managed Office Space Chennai...</title>\`
- \`<meta name="description" content="...">\`
- \`<link rel="canonical" href="https://workez.in/...">\`
- \`<meta property="og:title" content="...">\`
- \`<meta name="twitter:card" content="summary_large_image">\`

---

## STEP 3: Add Schema JSON-LD (30 min)

1. Open \`schemas/schema-reference.html\` in your browser — visual reference of all schemas
2. For each page, find it in the reference and copy the \`<script type="application/ld+json">\` blocks
3. Add to each page's \`<head>\`

**In Next.js App Router:**
\`\`\`javascript
// app/about-us/page.js
export const metadata = {
  ...getMetadata('/about-us'),
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      // ... paste schema here
    })
  }
}
\`\`\`

**Or use a Script component:**
\`\`\`javascript
import Script from 'next/script'

export default function AboutPage() {
  return (
    <>
      <Script id="schema-about" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: \`PASTE SCHEMA JSON HERE\` }}
      />
      {/* page content */}
    </>
  )
}
\`\`\`

**Or load programmatically** from \`schemas/workez-schemas.json\`:
\`\`\`javascript
import schemas from '@/seo/schemas/workez-schemas.json'
const pageSchema = schemas.pages['/about-us']
// pageSchema.html_ready contains the ready-to-paste code
\`\`\`

**Page count:** 42 pages, 118 schema blocks total. Location pages have 4 blocks each (LocalBusiness + Product + FAQ + BreadcrumbList).

**Verify:** Use https://search.google.com/test/rich-results — paste any page URL after launch.

---

## STEP 4: Add robots.txt + sitemap.xml (2 min)

1. Copy \`robots.txt\` to \`public/robots.txt\`
2. Copy \`sitemap.xml\` to \`public/sitemap.xml\`
3. Verify after deploy: \`https://workez.in/robots.txt\` and \`https://workez.in/sitemap.xml\`

---

## STEP 5: Add 301 Redirects (10 min)

1. Open \`redirects.js\`
2. Copy the \`redirects()\` array into your \`next.config.js\`:

\`\`\`javascript
// next.config.js
const nextConfig = {
  async redirects() {
    return [
      // paste all redirect objects here
    ]
  },
}
module.exports = nextConfig
\`\`\`

This covers:
- 20 old live site URLs → new SEO URLs
- 12 dev site slugs → new SEO URLs (in case any got shared/bookmarked)
- Total: 52 redirect rules (with + without trailing slash)

---

## STEP 6: Update Image Alt Tags (20 min)

1. Open \`image-alt-tags.json\`
2. Find each image by filename and update its \`alt\` attribute

**Priority order:**
- Global (header logo, footer logo) — update once in layout component
- Homepage images (32 images)
- Location page amenity icons (same across all 12 pages — update once in template)
- Solution page carousels
- About page team photos

**Key fix:** Amenity icons currently have SEO keyword filenames as alt text (e.g., \`"Book a coworking space"\` for a 24-hour access icon). Use the amenity name instead: \`"24 hour access"\`.

**When real photos replace placeholders:** The alt tags describe what the image SHOULD show, not the file. So when you replace \`hansaWork.jpg\` with a real cafeteria photo, the alt \`"Cafeteria at WorkEZ Willow Square, Guindy"\` still works.

---

## STEP 7: Add Visible Breadcrumb Navigation (15 min)

Breadcrumb text already shows on location pages ("Home > Location > Chennai > ...") but it's just plain text. Make each segment a clickable \`<a>\` link.

Schema breadcrumbs are already included in Step 3. This step is just the visible UI.

**Component example:**
\`\`\`jsx
function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol style={{ display: 'flex', gap: '8px', listStyle: 'none' }}>
        {items.map((item, i) => (
          <li key={i}>
            {i < items.length - 1 ? (
              <><a href={item.url}>{item.name}</a> &gt; </>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
\`\`\`

Breadcrumb trails for each page type are in the BreadcrumbList schema — use the same hierarchy.

---

## STEP 8: Launch Day Checklist

- [ ] All URL slugs changed to final SEO versions
- [ ] Meta tags live on all 28 pages (check view-source)
- [ ] Schema JSON-LD on all pages (test with Google Rich Results Test)
- [ ] robots.txt accessible at workez.in/robots.txt
- [ ] sitemap.xml accessible at workez.in/sitemap.xml
- [ ] 301 redirects working (test old URLs → should redirect to new)
- [ ] Canonical tags on all pages (view-source, search for rel="canonical")
- [ ] Submit sitemap to Google Search Console
- [ ] Redirect dev.workez.in → workez.in
- [ ] Verify favicon is WorkEZ logo (not Next.js default)
- [ ] Verify copyright year is 2026

---

## File Reference

| File | Purpose | When to Use |
|---|---|---|
| meta/workez-meta-tags.json | Title, desc, OG, Twitter, canonical for 28 pages | Step 2 |
| meta/meta-tags.js | Next.js helper — import & use | Step 2 |
| schemas/workez-schemas.json | JSON-LD for 42 pages (118 blocks) | Step 3 |
| schemas/schema-reference.html | Visual browser for schemas | Step 3 |
| robots.txt | Crawl rules for Google | Step 4 |
| sitemap.xml | 28 page URLs for Google | Step 4 |
| redirects.js | 52 redirect rules for next.config.js | Step 5 |
| image-alt-tags.json | Alt text for every image | Step 6 |
| tech-seo-audit.md | Full issue list + context | Reference |
