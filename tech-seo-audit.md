# WorkEZ Dev Site — Comprehensive Tech SEO Audit
## Crawled: dev.workez.in | All 28 pages | April 1, 2026

---

## 🔴 CRITICAL — Fix Before Launch (April 10)

### 1. Page Titles Still Show Defaults
| Page | Current Title | Should Be |
|------|--------------|-----------|
| Homepage | "Managed Office Spaces That Adapt To How You Work" | Use from meta/workez-meta-tags.json — includes keywords + brand |
| About | "Workez Hansa" | About WorkEZ — Chennai's Largest Managed Office Provider |
| Careers | "Create Next App" | Careers at WorkEZ — Join Our Growing Team |
| Blog | "Create Next App" | WorkEZ Blog — Managed Office Insights & Guides |
| Gallery | "Workez Helix" | Workspace Gallery — Tour WorkEZ Centres |
| Book a Tour | Needs check | Book a Free Office Tour — Visit WorkEZ |
| All Solutions pages | "Workez Helix" | Use from meta JSON per page |
| All Location pages | "WorkEZ Anna Salai," etc. | Use from meta JSON per page — include area + seats |
**Action:** Import meta/workez-meta-tags.json and wire up using meta-tags.js helper. Every page gets a unique, keyword-optimized title.

### 2. Meta Descriptions — Completely Missing
No page on the dev site has a `<meta name="description">` tag. Google will auto-generate one from page content — which is currently full of placeholder text.
**Action:** Wire meta descriptions from workez-meta-tags.json. Each page has a unique 150-160 char description.

### 3. Open Graph Tags — Missing
No `og:title`, `og:description`, `og:image`, or `og:url` found on any page. When someone shares a WorkEZ link on LinkedIn/WhatsApp/Facebook, it will show a blank preview.
**Action:** Wire OG tags from workez-meta-tags.json. Each page has og:title, og:description, og:type, og:url, og:image.

### 4. Twitter Card Tags — Missing
No `twitter:card`, `twitter:title`, or `twitter:image` found.
**Action:** Wire from workez-meta-tags.json → twitter section.

### 5. Canonical Tags — Missing
No `<link rel="canonical">` on any page. Risk: Google may index duplicate versions of pages (with/without trailing slash, query parameters, etc.)
**Action:** Wire from workez-meta-tags.json → canonical field. Next.js metadata API handles this.

### 6. Schema/Structured Data — Missing from ALL Pages
Zero `<script type="application/ld+json">` found on any page. This means:
- No Google Maps Local Pack for location pages
- No FAQ rich snippets
- No sitelinks search box on homepage
- No breadcrumb display in SERPs
- No product pricing in search results
**Action:** Copy schema blocks from schemas/workez-schemas.json into each page's `<head>`. 118 ready-to-paste blocks across 42 pages.

### 7. robots.txt — Missing
dev.workez.in/robots.txt returns 404. Google doesn't know how to crawl the site.
**Action:** Copy robots.txt from repo to public/ directory.

### 8. sitemap.xml — Missing
No sitemap.xml found. Google has no map of the site's pages.
**Action:** Copy sitemap.xml from repo to public/ directory. Submit to Google Search Console on launch day.

### 9. URL Issues — & in URLs
| Current URL | Fix To |
|---|---|
| /privacy-&-policy | /privacy-policy |
| /terms-&-conditions | /terms-and-conditions |
`&` breaks URL encoding, causes crawl errors, and looks unprofessional in SERPs. Change the slug in the CMS/router.

---

## 🔴 CRITICAL — Content Errors on Location Pages

### 10. Copy-Paste Error — Wrong Centre Names in Body Text
Anna Salai page body says "Workez Guindy" instead of "WorkEZ Anna Salai." This suggests all 12 location pages were templated from Guindy and body text was not updated.
**Action:** Verify body text on ALL 12 location pages. Each page must reference its own centre name, area, and landmarks.

### 11. Placeholder Addresses
Anna Salai shows "123, Anna Salai Road, Chennai, Tamil Nadu 600002" — this is a fake address. Actual address: Block-B, Door No.3, Hansa Building RK Swamy Centre, 147, Pathari Rd, Thousand Lights, Chennai 600006.
**Action:** Update addresses on all 12 location pages with real data from GMB profiles.

### 12. Wrong Seat Capacities
Anna Salai shows "250 seats" — actual capacity is 1,530. Koramangala shows "260 seats" — actual capacity is 3,300 (Bellandur).
**Action:** Update seat counts from GMB audit data:
- Hansa Anna Salai: 1,530 | Clubhouse Anna Salai: 700 | Willow Square Guindy: 1,250
- Chambers Guindy: 450 | SM Towers Perungudi: 1,740 | Urban Square OMR: 3,000
- The Ark OMR: 875 | Pallavaram: 2,600 | Helix Velachery: 2,250
- Alwarpet: 500 | Bengaluru (Koramangala): 3,300 | Coimbatore (RS Puram): 2,000

### 13. All Gallery Images Are Same File
Every location page shows `hansaWork.jpg` repeated 4 times. Each centre needs unique photos.
**Action:** Upload real photos per centre. Use alt tags from image-alt-tags.json.

### 14. Koramangala Page Shows Wrong Data
URL says Koramangala but this centre is actually Bellandur ORR. Page shows "34, 7th Block, Koramangala" which is wrong. Should show Bellandur ORR address with 3,300 seats.
**Action:** Update content to reflect Bellandur ORR data.

---

## 🟡 IMPORTANT — Homepage Fixes

### 15. "White Field, Bangalore" → "Bellandur ORR, Bangalore"
Location carousel shows wrong area name.

### 16. Only 4 Centres in Location Carousel
Should show all 12 centres with area names and thumbnails.

### 17. "Private Cabins" → "Private Managed Offices"
Nav label should use enterprise positioning.

### 18. Copyright "2025" → "2026"
Footer shows outdated year.

### 19. Client Logo Alt Tags
All show "logo-0" through "logo-19" (duplicated set). Must use company names from image-alt-tags.json.

### 20. Booking Form Dropdown Still Shows Old Names
Form lists "Bellandur, Bengaluru" and "Saravanampatti, Coimbatore" but pages use "Koramangala" and "RS Puram". Must be consistent.

---

## 🟡 IMPORTANT — Image SEO (All Pages)

### 21. Alt Tags — Mostly Generic or Wrong
| Current Alt | Issue |
|---|---|
| "logo-0" through "logo-19" | Generic numbering — should be company names |
| "Modern office workspace" | Used on multiple pages — not unique |
| "Workez Helix" | Wrong centre name used as hero alt on non-Helix pages |
| "Enterprise workspace 1-8" | Generic numbering — should describe what's shown |
| Amenity icons named as SEO keywords | "Book a coworking space.png" for 24hr access icon — confusing |
**Action:** Use image-alt-tags.json — has correct alt text for every image on every page type.

### 22. Images Not Lazy-Loaded Below the Fold
Next.js `<Image>` component supports `loading="lazy"` — verify it's being used for below-fold images (gallery, carousel, client logos). Hero images should NOT be lazy.

### 23. No WebP Format for Some Images
Some images are .png/.jpg (client logos, hero). Convert to .webp for 30-50% smaller file sizes.

### 24. Same Hero Image (aboutHero.png) Used on Multiple Pages
About, Careers, Book a Tour, and all Location pages use the same hero image. Each page should have a unique hero.

---

## 🟡 IMPORTANT — Heading Structure

### 25. Multiple H1 Tags
Anna Salai page has `# WorkEZ Anna Salai,` (H1) plus `# Managed Office Spaces That Adapt To How You Work` being pulled from homepage. Each page should have exactly ONE H1.

### 26. H1 Not Keyword-Optimized
| Page | Current H1 | Better H1 |
|---|---|---|
| Homepage | "Managed Office Spaces That Adapt To How You Work" | OK — could add "in Chennai" |
| About | "Workez Hansa" | "About WorkEZ — India's Fastest-Growing Managed Office Provider" |
| Enterprise | "Workez Helix" | "Enterprise Managed Office Spaces for Large Teams" |
| Private | "Workez Helix" | "Private Managed Offices — Ready to Move" |
| Meeting | "Workez Helix" | "Meeting Rooms & Boardrooms for Rent" |
| Anna Salai | "WorkEZ Anna Salai," | "Managed Office Space in Anna Salai, Chennai — WorkEZ Hansa" |
| Gallery | "Workez Helix" | "WorkEZ Workspace Gallery — Tour Our Centres" |
**Action:** Each page needs a unique, keyword-rich H1 that matches the page's target keyword.

---

## 🟡 MODERATE — Internal Linking

### 27. Footer Links Don't Match Actual URLs
Footer shows "FAQs" link but /faqs page doesn't exist on dev site.
Footer shows "Privacy & Policy" — should link to /privacy-policy (after URL fix).

### 28. No Internal Links Between Related Location Pages
Location pages don't link to nearby centres. E.g., Anna Salai Hansa should link to Anna Salai Clubhouse ("Our other centre on Anna Salai").

### 29. Solutions Pages — No CTA to Specific Locations
Enterprise/Private/Meeting pages should link to "Available at 12 centres" with links to each location page.

---

## 🟡 MODERATE — Performance & Technical

### 30. Blog Page is Empty
/blog shows only header/footer — no content, no posts. Either add content or add `noindex` until populated.

### 31. Careers Page — Needs Check
Could not fully crawl. Verify it has actual job listings or at least a "no openings" message with email.

### 32. 301 Redirects Not Yet Configured
Old site URLs (workez.in/workez-annasalai/, workez.in/helix-velachery/, etc.) will 404 after migration. Must add redirects.
**Action:** Use redirects.js from repo — paste into next.config.js.

### 33. No Favicon
Verify favicon is set. Default Next.js favicon should be replaced with WorkEZ logo.

### 34. Mobile Responsiveness
Verify all pages render correctly on mobile. Key issues to check:
- Booking form usability on mobile
- Location carousel swipe behavior
- Table/spec section on location pages

### 35. Phone Number Missing from Header/Footer
No clickable phone number anywhere. Add `<a href="tel:+914448555555">+91-44-4855-5555</a>` to header/footer.

### 36. No Google Analytics / Tag Manager
Verify GA4/GTM is installed before launch for tracking.

### 37. No Google Search Console Verification
Add GSC verification meta tag or DNS record before launch.

---

## ⚪ NICE TO HAVE — Post-Launch

### 38. Add FAQ Section to Location Pages
FAQ schema is ready in our schemas — but the page needs visible FAQ content too.

### 39. Add Visible Breadcrumb Navigation
Breadcrumb text is visible ("Home > Location > Chennai > ...") but it's just text, not clickable links. Make each breadcrumb segment a link.

### 40. Add Social Media Links to Footer
Facebook, Instagram, Twitter/X, LinkedIn, YouTube — all missing from footer.

### 41. Add Structured Contact Information to Footer
Show: phone number, email (hello@workez.in), registered office address.

### 42. Page Speed Optimization
After launch, run Google PageSpeed Insights on all pages and fix any Core Web Vitals issues.

---

## Summary Score Card

| Category | Issues | Severity |
|----------|--------|----------|
| Title Tags | 28 pages need unique titles | 🔴 Critical |
| Meta Descriptions | 28 pages — completely missing | 🔴 Critical |
| OG Tags | 28 pages — completely missing | 🔴 Critical |
| Schema/JSON-LD | 28 pages — completely missing | 🔴 Critical |
| robots.txt | Missing | 🔴 Critical |
| sitemap.xml | Missing | 🔴 Critical |
| Canonical Tags | 28 pages — missing | 🔴 Critical |
| URL Issues | 2 pages have & in URL | 🔴 Critical |
| Content Errors | 12 location pages — wrong data | 🔴 Critical |
| Image Alt Tags | ~150 images need fixing | 🟡 Important |
| H1 Tags | Most pages have wrong H1 | 🟡 Important |
| Internal Linking | Minimal cross-linking | 🟡 Moderate |
| 301 Redirects | Not configured | 🟡 Important |
| Blog Page | Empty | 🟡 Moderate |
| Phone/Social in Footer | Missing | ⚪ Nice to have |

**Everything the developer needs to fix items 1-9 is in the GitHub repo — just import and wire up.**
