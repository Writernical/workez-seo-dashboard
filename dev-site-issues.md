# WorkEZ Dev Site — Content Issues Found During Crawl
# Developer must fix these BEFORE launch

## 🔴 CRITICAL — All Pages
1. Page <title> shows "Create Next App" on EVERY page — must use titles from meta/workez-meta-tags.json
2. About page <title> shows "Workez Hansa" — should be "About WorkEZ"

## 🔴 CRITICAL — URL Issues (flag to dev)
3. /privacy-&-policy → CHANGE TO /privacy-policy (& breaks URL encoding)
4. /terms-&-conditions → CHANGE TO /terms-and-conditions (& breaks URL encoding)

## 🔴 CRITICAL — Location Pages (all 12 have same issues)
5. Anna Salai page body text says "Workez Guindy" — copy-paste error, wrong centre name
6. Total capacity shows "250 seats" on Anna Salai — should be 1,530
7. Address shows "123, Anna Salai Road" — placeholder, use real address
8. Koramangala page shows "260 seats" and wrong Koramangala address — this is Bellandur (3,300 seats)
9. RS Puram page — verify if showing correct Saravanampatti data
10. All 4 gallery images are the SAME file (hansaWork.jpg repeated on every location page)
11. Amenity icon filenames are SEO keywords (e.g., "Book a coworking space.png" for 24hr access icon)
12. Breadcrumb text visible ("Home > Location > Chennai > ...") but NO schema markup

## 🟡 HOMEPAGE
13. "28,000+ Clients" → should be "28,000+ Seats"
14. "White Field, Bangalore" → should be "Bellandur ORR, Bangalore"
15. Location carousel only shows 4 centres — should show all 12
16. Copyright shows "2025" — should be "2026"

## 🟡 ABOUT PAGE
17. Page title shows "Workez Hansa" instead of "About WorkEZ"
18. "1.5 million square feet" and "28,000 workstations" — verify these are current numbers

## 🟡 BOOKING FORM (on every location page)
19. Dropdown still shows "Bellandur, Bengaluru" and "Saravanampatti, Coimbatore"
    Should match dev URL names or use consistent naming

## 🟡 FOOTER (all pages)
20. "Private Cabins" in nav → should be "Private Managed Offices"
21. No social media links visible in footer
22. No phone number in footer

## 🟡 NAVIGATION
23. "Meetings and Event Spaces" → should be "Boardrooms, Events & Collaboration"
