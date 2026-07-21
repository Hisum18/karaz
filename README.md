# Karaz Lounge — Website

A multi‑page, static website for **Karaz Lounge** — a hookah lounge in Falls
Church, VA. No build step, no dependencies — just open it or drop it on any web
host. Live at **karazlounge.com** (hosted on Netlify, auto‑deploys from `main`).

> "Hookah Lounge" is used only as a *descriptor* in page titles and headings —
> never as the business name. The name is **Karaz Lounge** everywhere (logo,
> footer, `og:site_name`, schema), matching the Google/Apple/Yelp listings.
> Keeping it consistent is a direct local‑SEO signal.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, welcome, the experience, menu teaser, gallery strip, Google reviews |
| `menu.html` | Menu — hookah, sweets, coffee, matcha & refreshers (tabbed) |
| `gallery.html` | Filterable photo gallery with a lightbox |
| `about.html` | The story behind Karaz |
| `visit.html` | Hours, location, live map, and directions |
| `404.html` | Custom not‑found page |

## Run it locally
Just open `index.html` in a browser. For nicer behavior (so paths resolve
exactly like on a server), serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Real info that's already wired in
Matched to the venue's Google Business listing (verified July 2026):

- **Address:** 6315 Leesburg Pike, Suite C, Falls Church, VA 22044
- **Phone:** (703) 763-2100 (`tel:+17037632100`)
- **Hours** (mirror Google exactly — visible table, footer, *and* JSON‑LD schema):
  - Sun–Wed: 12:00 PM – 12:00 AM
  - Thu: 12:00 PM – 1:00 AM
  - Fri–Sat: 12:00 PM – 2:00 AM
- **Map & directions** on `visit.html` use the official Google "Embed a map"
  iframe (`…/maps/embed?pb=…`) — a pin on the storefront; the stylesheet tints it
  to match the dark theme.
- **Instagram:** live in the footer → <https://www.instagram.com/karaz.lounge>
  (also in the JSON‑LD `sameAs`). Facebook & TikTok are left **commented out** in
  the footer until those accounts exist — uncomment the block and drop in the
  handle to enable.
- **Reviews** on the home page are three real 5★ Google reviews; the "Read all
  reviews" button links to the Google listing.
- **Menu** (`menu.html`) is in a tabbed layout. Hookah prices are confirmed;
  other items/prices are kept in sync manually — re‑check against the live menu.

## SEO & structured data
- **JSON‑LD** (`schema.org`) on every page: a `LocalBusiness`
  (CafeOrCoffeeShop + BarOrPub) with hours/geo/amenities on the home page, plus
  `WebPage`, `BreadcrumbList`, and a `Menu` graph where relevant.
- **`sitemap.xml`** and **`robots.txt`** at the root.
- **Canonical**, Open Graph, and Twitter‑card tags on each page point at
  `https://karazlounge.com/…`.

> **Confirm with the owner:** the amenity flags in the home‑page schema (outdoor
> seating, pool table, smoking) and the menu items/prices are published as
> structured data — keep them accurate to what the venue actually offers.

## Photos
- `assets/img/` holds the full‑size web images; key hero/banner images also have
  optimized **`.webp`** versions (preloaded on the pages that use them).
- `assets/img/thumb/` holds the gallery/grid thumbnails.

To add or swap photos: drop a large version in `assets/img/`, a matching
thumbnail in `assets/img/thumb/` (same filename), and reference it in the
relevant page. On `gallery.html`, copy a `.g-item` block and set its
`data-cat`, `data-full`, `data-cap`, and the thumbnail `src`/`alt`.

## Brand notes
- **Name:** *Karaz* (كرز) is Arabic for **cherry** — hence the cherry logo.
- **Palette:** night plum `#0a0610`, cherry `#e0285a`, gold `#cda85f`. Defined as
  CSS variables at the top of `assets/css/styles.css` — change them in one place
  to re‑theme the whole site.
- **Type:** Cormorant Garamond (display) + Inter (body), loaded from Google Fonts.

## Tech
Plain HTML, one CSS file, one JS file. Responsive, keyboard‑accessible, respects
`prefers-reduced-motion`, with a skip‑link and no‑JS fallbacks. Works offline
once the fonts are cached.

> **Note:** reservations were intentionally removed — Karaz is walk‑in only, so
> the site drives people to **Call**, **Get Directions**, and **Hours & Location**
> instead.
