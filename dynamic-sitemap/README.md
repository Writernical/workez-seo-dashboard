# Auto-updating sitemap — Payload CMS + Next.js App Router

Goal: `/sitemap.xml` rebuilds itself from the CMS, so every newly published blog/page
appears automatically. The styled view (`sitemap.xsl`) keeps working on top of it.

## Files
1. `app--sitemap.xml--route.ts`  →  put at **`src/app/sitemap.xml/route.ts`**
2. `revalidateSitemap.ts`        →  put at **`src/hooks/revalidateSitemap.ts`**
3. `sitemap.xsl` (already in this package)  →  keep in **`public/sitemap.xsl`**

## Steps (Kabilan)
1. Drop in the two files above.
2. In the route, edit `COLLECTIONS` (CMS-driven pages) and `STATIC` (hardcoded pages)
   to match the real Payload collections and URL structure.
3. Add the hook to each sitemap-feeding collection (see the commented block in the hook file).
   Make sure those collections have `versions: { drafts: true }`.
4. **Delete `public/sitemap.xml`** — a static file at that path would shadow the dynamic route.
5. **Do NOT add `app/sitemap.ts`** (Next's metadata sitemap) — it conflicts with this route
   and cannot include the `<?xml-stylesheet?>` line, which would kill the styled view.
6. Deploy. Visit `/sitemap.xml` — it should list live CMS content, styled.
7. Re-submit `https://workez.in/sitemap.xml` once in Google Search Console.

## How updates flow
- Publish in Payload → `afterChange` hook fires → `revalidatePath('/sitemap.xml')` →
  sitemap refreshes within seconds.
- Hourly `revalidate = 3600` is a safety net if a hook is ever missed.

## If Payload runs as a separate server (not inside this Next app)
Use the fetch-to-API fallback shown at the bottom of `revalidateSitemap.ts`.
