# WorkEZ — Structured Data + Sitemap Implementation

**For:** Kabilan / Mynerva (workez.in, Next.js App Router + Payload 3)
**From:** Writernical
**Goal:** Get valid JSON-LD onto every page (today only the homepage has it), and keep blog schema + the sitemap updating automatically.

---

## 1. The problem we are fixing

When you test any page other than the homepage on `validator.schema.org`, it reports **no structured data**. We confirmed this on the live Anna Salai Hansa page: meta tags render fine, but there is **no JSON-LD** in the HTML.

Cause: the global Organization/WebSite schema was added near the homepage, but the **per-page** schema (LocalBusiness, Product, Article, FAQ, Breadcrumb) was never added to the individual page templates. The old approach was a static "copy this block per page" file, which never got applied beyond the homepage.

Fix: generate schema **dynamically** inside the page templates from data you already have. Add one centre or publish one blog, and its schema appears on its own.

---

## 2. What is in this package

```
lib/seo/types.ts        TypeScript types
lib/seo/schema.ts       Builder functions (LocalBusiness, Product, Article, FAQ, Breadcrumb, Org, WebSite)
components/JsonLd.tsx    Server component that renders schema as <script> in the server HTML
data/centres.ts         The 13 centres (verified GPS, corrected addresses/pincodes)
app/sitemap.xml/route.ts Corrected dynamic sitemap (static + 13 centres + CMS posts)
hooks/revalidateSitemap.ts  Publish hook so the sitemap rebuilds instantly
public/sitemap.xml      Corrected static fallback (no "One National Park")
examples/               Copy-paste examples for location, blog, and homepage/layout
```

Adjust the relative import paths to match your `src/` structure (e.g. `@/lib/seo/schema`).

---

## 3. Steps

### A. Drop in the library
Copy `lib/seo/`, `components/JsonLd.tsx`, and `data/centres.ts` into your app.

### B. Location pages (biggest win — 13 pages currently have zero schema)
In `app/location/managed-office-space-[city]/[slug]/page.tsx`, add two lines (see `examples/location-page.example.tsx`):

```tsx
const schemas = centrePageSchemas(centre, faqs)
return (<><JsonLd schema={schemas} /> {/* existing markup */}</>)
```

`centre` can come from `getCentreBySlug(params.slug)` in `data/centres.ts`, **or** — better — from the data object you already use to render the page, so schema and page never drift. `faqs` is the FAQ list the page already shows, mapped to `{ question, answer }`; pass `[]` if none.

### C. Blog pages (automatic for every new post)
In `app/blog/[slug]/page.tsx`, map your Payload fields to `BlogPost` and render (see `examples/blog-page.example.tsx`):

```tsx
const schemas = blogPageSchemas(post)
return (<><JsonLd schema={schemas} /> {/* existing markup */}</>)
```

Because the data comes from the CMS, **Article schema builds itself on publish** with no per-post work. If posts have a structured FAQ block, map it to `post.faqs` and FAQPage builds too.

### D. Homepage / layout
Keep the global Organization + WebSite schema. To use the shared builders for consistency, see `examples/home-and-layout.example.tsx`. Render it **once** — homepage or layout, not both.

### E. Sitemap
Replace your current `app/sitemap.xml/route.ts` with the one here (it now includes all 13 centres and queries published posts; **"One National Park" is removed**). Replace `public/sitemap.xml` with the corrected fallback. Then wire the publish hook into the Posts collection — see the snippet at the bottom of `hooks/revalidateSitemap.ts`. Without that wiring you still get an hourly refresh, just not instant.

---

## 4. Data to confirm before go-live

- **Saravanampatti pincode**: old data had `560103` (a Bengaluru code). Set to `641035` (Coimbatore) here — confirm exact code.
- **OMR Urban Square pincode**: old data `600002` looked wrong for OMR; set to `600096` — confirm.
- **Hansa address**: updated from the live page (old schema was outdated). Spot-check the other 12 against their live pages.
- **Seats / prices**: intentionally left out so we don't ship guessed numbers. Add per centre only with authoritative figures (ideally read from the same CMS field the page shows). The Product builder only writes pricing when both `priceFrom` and `priceTo` are set.
- **hero images**: paths follow `/locations/{city}/{centre}/hero.webp`. Confirm each folder name, or the builder falls back to the default OG image.
- **Opening hours**: builder defaults to 24/7. Make sure this matches the hours shown on Google Business Profile to avoid inconsistency.

---

## 5. How to verify (after deploy)

1. **View source** on a location page and a blog post (Ctrl+U). Search for `application/ld+json`. You should see `LocalBusiness`, `Product`, `BreadcrumbList` on centres, and `Article` on blogs — in the raw HTML, not just the rendered DOM.
2. **validator.schema.org** — paste each page URL; every page type should now report detected items.
3. **Sitemap** — open `https://workez.in/sitemap.xml`; confirm all 13 centres appear and `/blog/...` URLs are listed. Publish a test blog and confirm it shows up within a minute (instant hook) or an hour (fallback).

Note on FAQ: Google stopped showing FAQ rich results in May 2026, so FAQPage no longer produces a search feature. It is still valid and useful for AI/answer engines, so we keep it, but it is the lowest-priority item here. Article and LocalBusiness are the ones that matter most.

---

## 6. Priority order

1. Location pages — LocalBusiness + Product (10 Chennai + 3 other centres, currently empty; biggest local-search impact).
2. Blog Article schema (automatic, future-proofs every new post).
3. Sitemap route + publish hook (correctness + auto-update).
4. FAQ + Breadcrumb (nice to have).
