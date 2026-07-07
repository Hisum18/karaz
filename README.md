# Karaz Hookah Lounge — Website

A multi‑page, static website for **Karaz Hookah Lounge**. No build step, no
dependencies — just open it or drop it on any web host.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, welcome, the experience, menu teaser, gallery strip, Google reviews |
| `menu.html` | Real menu — hookah, sweets, coffee, matcha & refreshers (tabbed) |
| `gallery.html` | Filterable photo gallery with a lightbox |
| `about.html` | The story behind Karaz |
| `visit.html` | Hours, location, live map, and directions |

## Run it locally
Just open `index.html` in a browser. For nicer behavior (so paths resolve
exactly like on a server), serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Real info that's already wired in
Pulled from the venue's Google Business listing (June 2026):

- **Address:** 6315 Leesburg Pike, Suite C, Falls Church, VA 22044
- **Phone:** (703) 763-2100 (`tel:+17037632100`)
- **Hours:** every day, 12:00 PM – 12:00 AM
- **Map & directions** on `visit.html` point at the real address.
- **Reviews** on the home page are three real 5★ Google reviews; the "Read all
  reviews" button links to the Google listing.
- **Menu** (`menu.html`) holds the real menu with live prices — Hookah (Adalya,
  Starbuzz, Al Fakher), Sweets, Coffee, and Matcha & Refreshers — in a tabbed
  layout. Transcribed from karazlounge.com; update items/prices there as they change.

## Still placeholder / to confirm
| Item | Note |
|------|------|
| `href="#"` on the Instagram/Facebook/TikTok links (footer) | Add the real social URLs |
| `21+` (footer) | Set to the venue's actual minimum age if different |
| Google reviews on the home page | Refresh the three featured quotes as new reviews come in |
| Menu prices | Kept in sync manually — re-check against the live menu periodically |

The map on `visit.html` is a keyless Google Maps embed (`…/maps?q=ADDRESS&output=embed`)
centered on the address; the stylesheet tints it to match the dark theme. To swap
in a richer "Share → Embed a map" iframe later, just replace the `<iframe>` inside
`.map-embed`.

> **Note:** reservations were intentionally removed — Karaz is walk-in only, so the
> site drives people to **Call**, **Get Directions**, and **Hours & Location** instead.

## Photos
- Curated from the original Sony RAW (`.ARW`) shoot — 24 of the best, hand‑picked.
- `assets/img/` holds the full‑size web images (max 1800px, hero at 2600px).
- `assets/img/thumb/` holds the gallery/grid thumbnails (max 760px).

To add or swap photos: drop a large version in `assets/img/`, a matching
thumbnail in `assets/img/thumb/` (same filename), and reference it in the
relevant page. On `gallery.html`, copy a `.g-item` block and set its
`data-cat`, `data-full`, `data-cap`, and the thumbnail `src`/`alt`.

## Brand notes
- **Name:** *Karaz* (كرز) is Arabic for **cherry** — hence the cherry logo.
- **Palette:** night plum `#0a0610`, cherry `#e0285a`, gold `#cda85f`, with a
  neon‑purple glow. All defined as CSS variables at the top of
  `assets/css/styles.css` — change them in one place to re‑theme the whole site.
- **Type:** Cormorant Garamond (display) + Inter (body), loaded from Google Fonts.

## Tech
Plain HTML, one CSS file, one JS file. Responsive, keyboard‑accessible, respects
`prefers-reduced-motion`. Works offline once the fonts are cached.
