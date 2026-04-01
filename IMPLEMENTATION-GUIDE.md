# WorkEZ — Developer Implementation Guide
## Step-by-step. Follow in order. Estimated time: 1-2 days.

---

## STEP 1: Change URL Slugs (30 min)

Update your Next.js routing to use these final URL slugs:

| Current Dev Slug | Change To |
|---|---|
| /workez-anna-salai | **/annasalai-hansa** |
| /workez-anna-salai-clubhouse | **/annasalai-clubhouse** |
| /workez-guindy | **/guindy-willow-square** |
| /workez-guindy-chambers | **/guindy-chambers** |
| /workez-perungudi | **/perungudi-sm-towers** |
| /workez-omr | **/omr-urban-square** |
| /workez-omr-the-ark | **/omr-the-ark** |
| /workez-pallavaram | **/pallavaram-the-address** |
| /workez-velachery | **/velachery-helix** |
| /workez-alwarpet | **/alwarpet-park-centre** |
| /workez-koramangala | **/bellandur** |
| /workez-rs-puram | **/saravanampatti** |
| /privacy-&-policy | **/privacy-policy** |
| /terms-&-conditions | **/terms-and-conditions** |

Rename your page folders/files in `app/location/managed-office-space-chennai/` accordingly.

---

## STEP 2: Add Meta Tags (30 min)

1. Copy `meta/workez-meta-tags.json` and `meta/meta-tags.js` into your project (e.g., `src/seo/` or `lib/seo/`)

2. In each page file, import and export metadata:

```javascript
// Example: app/about-us/page.js
import { getMetadata } from '@/seo/meta/meta-tags'

export const metadata = getMetadata('/about-us')

export default function AboutPage() {
  // your page component
}
```

3. This automatically renders in `<head>`:
   - `<title>` — unique per page
   - `<meta name="description">` — unique per page
   - `<link rel="canonical">` — prevents duplicate content
   - `<meta property="og:title/description/image/url">` — social sharing
   - `<meta name="twitter:card/title/description/image">` — Twitter cards

4. For dynamic blog posts:
```javascript
// app/blog/[slug]/page.js
import { getBlogPostMetadata } from '@/seo/meta/meta-tags'

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return getBlogPostMetadata(params.slug, post.title, post.excerpt, post.image)
}
```

---

## STEP 3: Add Schema JSON-LD (1-2 hours)

1. Open `schemas/schema-reference.html` in your browser — visual reference of all schemas
2. For each page, copy the `<script type="application/ld+json">` block(s) into the page's `<head>`

**Option A — Static injection (simple):**
```javascript
// app/about-us/page.js
export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            // paste schema JSON here from workez-schemas.json
          })
        }}
      />
      {/* page content */}
    </>
  )
}
```

**Option B — Dynamic from JSON (scalable):**
```javascript
// lib/schema.js
import schemas from '@/seo/schemas/workez-schemas.json'

export function getSchemaScripts(path) {
  const page = schemas.pages[path]
  if (!page) return null
  return page.html_ready // contains ready-to-paste <script> blocks
}
```

Each location page has 4 schema blocks (LocalBusiness + Product + FAQPage + BreadcrumbList).
Each compare page has 3 blocks (FAQPage + ItemList + BreadcrumbList).
Other pages have 2-3 blocks each.

Total: 118 blocks across 42 pages.

---

## STEP 4: Add robots.txt + sitemap.xml (2 min)

1. Copy `robots.txt` → `public/robots.txt`
2. Copy `sitemap.xml` → `public/sitemap.xml`

Verify after deployment:
- https://workez.in/robots.txt
- https://workez.in/sitemap.xml

---

## STEP 5: Add 301 Redirects (15 min)

1. Open `redirects.js`
2. Copy the `redirects()` function into your `next.config.js`:

```javascript
// next.config.js
const nextConfig = {
  async redirects() {
    return [
      // paste all redirect rules from redirects.js
    ]
  },
  // ... your other config
}
module.exports = nextConfig
```

This covers:
- 20 old live site URLs → new SEO URLs
- 12 dev site slugs → final SEO slugs (safety net)
- 8 misc page redirects

---

## STEP 6: Update Image Alt Tags (1 hour)

Open `image-alt-tags.json` — it has the correct alt text for every image, organized by page.

**Global elements (update once in layout):**
- Header logo: `alt="WorkEZ — Managed Office Spaces in Chennai, Bangalore & Coimbatore"`
- Arrow icon: `alt=""` (decorative)
- Footer logo: `alt="WorkEZ logo — managed office spaces across South India"`

**Per page — find the image filename in the JSON and copy the alt text.**

Example for homepage client logos:
```html
<!-- Before -->
<img src="/homePage/tata.png" alt="logo-0" />

<!-- After -->
<img src="/homePage/tata.png" alt="Tata — WorkEZ enterprise client" />
```

Key rules:
- Decorative icons (arrows, dividers) → `alt=""`
- Amenity icons → use the amenity name as alt, not the filename
- Client logos → "[Company Name] — WorkEZ enterprise client"
- Centre photos → "WorkEZ [Centre] — [what's shown] in [Area], [City]"

---

## STEP 7: Add Visible Breadcrumb Navigation (30 min)

Breadcrumb schema is already in the JSON-LD (Step 3). But you also need a visible breadcrumb UI.

```jsx
// components/Breadcrumb.jsx
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', listStyle: 'none', gap: '8px' }}>
        {items.map((item, i) => (
          <li key={i}>
            {i < items.length - 1 ? (
              <a href={item.url}>{item.name}</a>
            ) : (
              <span>{item.name}</span>
            )}
            {i < items.length - 1 && <span> &gt; </span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Usage on location page:
<Breadcrumb items={[
  { name: 'Home', url: '/' },
  { name: 'Chennai', url: '/location/managed-office-space-chennai' },
  { name: 'Anna Salai Hansa', url: '/location/managed-office-space-chennai/annasalai-hansa' }
]} />
```

---

## STEP 8: Verification Checklist (Before Launch)

Run these checks on every page:

- [ ] Page title is unique and under 60 characters
- [ ] Meta description is present and 150-160 characters
- [ ] Canonical URL points to https://workez.in/...
- [ ] OG tags present (check with https://www.opengraph.xyz/)
- [ ] Schema JSON-LD present (validate at https://search.google.com/test/rich-results)
- [ ] Breadcrumb visible and clickable
- [ ] Image alt tags are descriptive (not "logo-0")
- [ ] No "Create Next App" anywhere in the HTML
- [ ] robots.txt accessible at /robots.txt
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] 301 redirects working (test old URLs)
- [ ] Phone number clickable in footer/header
- [ ] Copyright shows 2026

## STEP 9: Launch Day

1. Point workez.in DNS to new site
2. Submit sitemap.xml to Google Search Console
3. Redirect dev.workez.in → workez.in
4. Test all 301 redirects with old URLs
5. Run Google Rich Results Test on homepage + 2 location pages
