# WorkEZ — Complete SEO Config for Developers

Generated from SEO Command Centre v19. Everything needed for meta tags, schema, sitemap.

## 📁 Structure

```
workez-seo-config/
├── README.md                              ← You are here
├── robots.txt                             ← Copy to public/
├── sitemap.xml                            ← Copy to public/
├── meta/
│   ├── workez-meta-tags.json              ← Title, description, OG, Twitter for all 41 pages
│   └── meta-tags.js                       ← Next.js helper — import & use
└── schemas/
    ├── workez-schemas.json                ← All JSON-LD schemas (programmatic)
    └── schema-reference.html              ← Visual reference — open in browser to see all schemas
```

## 🚀 What the Developer Needs to Do

### Step 1: Meta Tags (Title + Description + OG + Twitter)
```javascript
// In any Next.js page:
import { getMetadata } from '@/seo/meta/meta-tags'
export const metadata = getMetadata('/about-us/')
```
This gives you: title, description, canonical, OG tags, Twitter card — all SEO-optimized.

### Step 2: Schema JSON-LD
Open `schemas/schema-reference.html` in browser — it shows all schemas organized by page. Copy the `<script type="application/ld+json">` blocks into each page's `<head>`.

Or use `schemas/workez-schemas.json` programmatically:
```javascript
import schemas from '@/seo/schemas/workez-schemas.json'
const pageSchema = schemas.pages['/about-us/']
// pageSchema.html_ready = ready-to-paste <script> tags
```

### Step 3: robots.txt + sitemap.xml
Copy both to `public/` directory. They serve at root:
- https://workez.in/robots.txt
- https://workez.in/sitemap.xml

## 📊 Coverage

| Type | Pages | Details |
|------|-------|---------|
| Meta Tags | 41 | Title, description, OG, Twitter, canonical, keywords |
| Schema JSON-LD | 41 (75 blocks) | LocalBusiness, Product, FAQ, Article, Organization, etc. |
| Sitemap | 41 URLs | With priority and changefreq |

## ⚠️ Placeholders — Dev Must Create These Assets

| Asset | What | Size |
|-------|------|------|
| `og-default.jpg` | Default social sharing image | 1200×630px |
| `centres/{slug}-hero.webp` | Hero photo per centre (×12) | 1200×630px |

## 🔴 Still Pending (Not in This Repo)

| Item | Status | Who |
|------|--------|-----|
| BreadcrumbList schema (all pages) | Templates ready in JSON, dev to implement | Kabilan |
| Exact GPS coordinates (12 centres) | Waiting for exact pins from Google Maps | Siva |
| aggregateRating (4 centres with 20+ reviews) | Pending review data | Kabilan |

