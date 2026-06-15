# WorkEZ SEO — Schema + Sitemap Fix (start here)

This folder fixes one problem: structured data (JSON-LD) currently renders **only on the homepage**. On every other page, validator.schema.org shows nothing. The code here generates schema automatically on every page (location, blog, hubs) and keeps the sitemap auto-updating.

---

## For whoever manages the repo

Push this whole `seo-implementation` folder to the repo. That's it — one folder, one push. Nothing else needs to go up.

**Pushing this does not change the live site by itself.** It is a handoff package for the developer to integrate into the live Next.js app and deploy.

---

## For the developer

1. Read **`IMPLEMENTATION.md`** in this folder — it has the full step-by-step.
2. Short version:
   - Drop in `lib/seo/`, `components/JsonLd.tsx`, `data/centres.ts`
   - Add two lines to the location and blog page templates (see `examples/`)
   - Replace `app/sitemap.xml/route.ts` and wire the publish hook (`hooks/revalidateSitemap.ts`) into the Posts collection
   - Confirm the data points flagged in `IMPLEMENTATION.md` section 4
   - Deploy, then verify on validator.schema.org and in `view-source`

---

## What's in here

```
README.md               ← you are here (orientation)
IMPLEMENTATION.md       ← full developer brief (read this next)
lib/seo/                ← schema builders + types
components/JsonLd.tsx   ← renders schema server-side
data/centres.ts         ← the 13 centres (verified data)
app/sitemap.xml/route.ts ← corrected dynamic sitemap
hooks/revalidateSitemap.ts ← instant sitemap refresh on publish
public/sitemap.xml      ← corrected static fallback
examples/               ← copy-paste integration examples
```

---

## Key facts baked in

- 4 cities, 13 centres, 24,000+ seats.
- There is **no** "One National Park, Velachery" — the Velachery centre is Helix. Do not re-add it.
- The old `workez-schemas.json` (elsewhere in the repo) references pages that don't exist live (pricing, virtual-tour, compare, case-studies). It is **superseded** by this folder — don't implement from it.
