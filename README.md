# WorkEZ SEO Configuration

Complete, copy-paste ready SEO config for **workez.in** (Next.js). Production domain only.

## Latest update (2026-05-22)
- 4th city added: **Kochi** (`/location/managed-office-space-kochi`) with centre **IT Twin Towers, Kakkanad**.
- New Chennai centre: **One National Park, Velachery**.
- New page: **/about-us/meet-the-team**.
- **Compare section removed entirely** (hub + 9 pages). Orphaned OMR-landing redirect re-pointed to OMR Urban Square.
- **All 12 existing GPS corrected.** SM Towers was 7.46 km off (shared Chambers' coordinate). See gps-corrections.md.
- Total: **14 centres, 4 cities.**

## Files
| Path | What it is |
|---|---|
| index.html | SEO Command Centre dashboard (reference) |
| sitemap.xml | 34 URLs. Submit to Google Search Console. |
| robots.txt | Crawl rules + sitemap reference |
| redirects.js | Old URLs -> new architecture. Paste into next.config.js. |
| meta/workez-meta-tags.json | Title, description, canonical, OG, Twitter per page |
| meta/meta-tags.js | Next.js getMetadata(path) helper |
| schemas/workez-schemas.json | JSON-LD per page |
| schemas/schema-reference.html | Open in a browser to read every schema |
| image-alt-tags.json | Alt text per image |
| gps-corrections.md | Old vs corrected coordinates (changelog) |

## Note on meta tags
Meta for the 4 new pages is final. Meta for existing pages is regenerated from the schema source for completeness. If you kept your previously approved meta file, retain those existing-page strings and add only the 4 new entries.
