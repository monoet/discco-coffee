# Layout Cleanup Reference Impl Plan

- [x] **Stage 0 — Reference Intake**
- [x] **Stage 1 — Layout Token Alignment**
- [x] **Stage 2 — Hero + Category Rail Cleanup**
- [x] **Stage 3 — Menu List Rhythm Cleanup**
- [x] **Stage 4 — CTA Bar + Final Visual Polish**
- [ ] **Stage 5 — Mobile Validation Against Reference**

**Project:** `discco-coffee`
**Focus:** Layout cleanup and visual rhythm alignment
**Reference type:** mobile menu screen
**Status:** implementation pass applied; mobile visual validation still pending

---

## Goal

Leave the app visually cleaner, more ordered, and closer to the provided reference by standardizing:

- horizontal margins
- vertical spacing rhythm
- section padding
- card/list item proportions
- category rail spacing
- text hierarchy
- image-to-text balance
- bottom CTA bar presence and visual weight

This pass is not about inventing a new visual language.
This pass is about making the current app feel intentional, aligned, and easier to scan, using the reference as the composition target.

---

## Goal Section — Reference Read

The reference communicates five strong layout principles:

1. **Tight mobile shell with strong vertical flow**
2. **Large bold hero headline with compressed line-height**
3. **Very consistent left/right margins across all sections**
4. **Menu rows built on a stable three-column logic:** image / text / price
5. **Bottom CTA always visible and visually heavy**

The screen feels clean because almost everything obeys one narrow set of spacings.
There is very little decorative noise.
The order comes from repetition, not from complex chrome.

---

## Goal Section — Global Layout Metrics

These values are inferred from the provided image and should be treated as layout targets, not literal pixel tracing.

### Shell

- **Viewport mode:** mobile-first
- **Max content width target:** `390px–430px` visual feel
- **Outer shell background:** warm off-white / soft cream
- **Desktop behavior:** centered phone-shell presentation is acceptable

### Horizontal rhythm

Use one primary horizontal content gutter for almost everything.

- **Primary content gutter:** `20px`
- **Tight inner gutter:** `16px`
- **Micro inset for icon groups only:** `12px`

**Rule:** avoid mixing `20`, `28`, `32`, `18`, `14` randomly in sibling sections.
The reference feels clean because most major blocks align to the same left edge.

### Vertical rhythm

- **Major section break:** `28px–32px`
- **Section heading to first item:** `12px–16px`
- **Item-to-item spacing inside lists:** `18px–22px`
- **Small label to headline spacing:** `8px–10px`
- **Body copy paragraph gap:** `6px–8px`

**Rule:** major spacing should look deliberate and repeated, not improvised per block.

---

## Goal Section — Hero Composition

### Structural target

The hero should feel like a split composition:

- left: compact copy block
- right: large product image
- overall: dark, cinematic, high contrast

### Hero proportions

- **Hero height target:** `250px–300px`
- **Text block width:** around `42%–48%`
- **Image block width:** around `52%–58%`
- **Hero inner padding:**
  - top: `20px–24px`
  - left/right: `20px`
  - bottom: `18px–22px`

### Hero typography target

#### Eyebrow

- uppercase
- bright accent green/yellow
- small but not tiny
- **size:** `11px–14px`
- **weight:** `700`
- **tracking:** `0.08em–0.14em`

#### Headline

- condensed display face
- all caps
- very large
- very tight leading
- **size target:** `56px–72px` depending on shell width
- **line-height:** `0.88–0.96`
- **weight:** heavy / condensed display
- **tracking:** neutral to slightly tight

#### Supporting copy

- soft white / slightly muted
- **size:** `15px–18px`
- **line-height:** `1.35–1.5`
- max 2–3 lines visible before crowding

### Hero visual notes

- overlay should be dark enough that the white headline feels cut out cleanly
- avoid floating badges unless they truly help the composition
- the image should feel large and appetizing, not decorative wallpaper
- the left text block should sit visibly lower in the hero, not vertically centered

---

## Goal Section — Category Rail

### Structural target

The category navigation should feel like a flat icon rail, not like individual cards.

### Rail spacing

- **Top/bottom padding:** `16px–20px`
- **Horizontal item distribution:** even, 5 columns
- **Gap between icon and label:** `6px–8px`
- **Gap from hero to rail:** `0px`
- **Gap from rail to first divider/content:** `8px–12px`

### Category item target

- icon centered
- label uppercase
- label short, bold, narrow
- active state should be obvious through color + underline, not big geometry changes

### Active indicator

- underline width: `56px–72px` visual feel in the reference
- underline thickness: `5px–7px`
- rounded ends
- accent green/yellow
- should sit clearly below the active label, not directly touching it

### Typography target

- **label size:** `12px–15px`
- **weight:** `700–800`
- **tracking:** light positive tracking

### Visual notes

- remove any unnecessary shadow or pill treatment
- icons should all look same optical weight
- labels should align on a common baseline

---

## Goal Section — Section Headers

### Structural target

Section headers like `CAFÉS`, `DESAYUNOS`, `BEBIDAS` should work as hard anchors in the scroll.

### Metrics

- **Horizontal alignment:** same `20px` content gutter
- **Top spacing before section title:** `28px–32px`
- **Bottom spacing after section title:** `10px–14px`
- **Size:** `30px–40px`
- **Line-height:** `0.95–1.0`
- **Weight:** strong display condensed
- **Case:** uppercase

### Visual notes

- should feel louder than item titles
- should not need extra decoration beyond spacing and weight
- divider above section is acceptable if very subtle

---

## Goal Section — Menu Row Layout

### Structural target

Each row should read instantly as:

`thumbnail | title + description | price / badge area`

The reference is strong because every item obeys this same skeleton.

### Row metrics

- **Row vertical padding:** `12px–16px`
- **Image width:** `92px–112px`
- **Image height:** `76px–92px`
- **Image radius:** `12px–16px`
- **Gap image -> text:** `16px–20px`
- **Gap text -> price column:** `12px–18px`
- **Price column min width:** `64px–84px`

### Text block target

#### Item title

- **size:** `18px–22px`
- **weight:** `700–800`
- **line-height:** `1.0–1.1`
- ideally one line; two lines only if necessary

#### Item description

- **size:** `14px–16px`
- **line-height:** `1.3–1.45`
- muted dark gray
- ideally max 2 lines in the default state

### Price column target

- right aligned
- visually stable width so prices line up vertically across rows
- **price size:** `20px–28px`
- **weight:** `700–800`
- should sit near the upper half of the row, not vertically lost in the middle

### Row separators

- subtle horizontal divider between sibling items in same section
- divider starts after image/text block or full width depending on implementation, but must be consistent
- opacity low enough to avoid harsh table feel

### Visual notes

- avoid row chrome, heavy cards, or deep shadows
- the reference is list-driven, not card-driven
- thumbnail should feel editorial and useful, not ornamental

---

## Goal Section — Badge / Recommendation Treatment

### Structural target

The recommendation badge should be a secondary accent inside the price column area, not a sticker competing with the title.

### Metrics

- **Size:** `12px–14px`
- **Weight:** `700`
- **Color:** warm pink/coral accent
- **Icon size:** small star or simple symbol
- **Placement:** under price or aligned lower-right in row content area

### Visual notes

- use sparingly
- only one visual accent family for recommendation states
- badge should not push the price off alignment

---

## Goal Section — CTA Bar

### Structural target

The bottom CTA is a large persistent order bar.
It should feel heavy, obvious, and easy to hit.

### Metrics

- **Horizontal inset:** `20px`
- **Bottom inset:** `20px–24px`
- **Height:** `64px–74px`
- **Radius:** full pill / `999px`
- **Internal horizontal padding:** `20px–24px`

### Content structure

- left: bag/order icon
- center: uppercase CTA label
- right: chevron/arrow

### Typography target

- **size:** `15px–18px`
- **weight:** `800`
- **tracking:** slight positive
- **case:** uppercase

### Visual notes

- background must be the bright accent
- text should be very dark, not white
- CTA must visually sit above content and feel like the terminal action of the screen

---

## Goal Section — Typography Summary

### Display / section type

Use condensed display typography for:

- hero title
- section headers

**Desired feeling:** loud, narrow, vertical, poster-like

### Utility / navigation type

Use bold sans for:

- category labels
- eyebrow
- CTA label
- price badges / recommendation tags

### Body copy

Use a clean sans for:

- descriptions
- supporting copy
- secondary UI text

### Recommended hierarchy targets

- `Hero display:` `56–72px`
- `Section display:` `30–40px`
- `Item title:` `18–22px`
- `Price:` `20–28px`
- `Body:` `14–16px`
- `Utility uppercase:` `11–15px`

---

## Goal Section — Cleanup Rules

These are the non-negotiable cleanup rules for the layout pass:

1. **One primary gutter** across hero text, sections, rows, and CTA
2. **One repeated row structure** for all menu items
3. **One spacing scale** used consistently
4. **No accidental cardification** of list items
5. **No decorative clutter** that fights the content
6. **Typography must carry hierarchy** more than shadows or borders
7. **Bottom CTA must feel intentional**, not appended

---

## Goal Section — Success Criteria

This goal section is satisfied when:

- the app reads clearly at first glance on mobile
- section edges align consistently
- the hero feels bolder and more editorial
- category rail feels flatter and cleaner
- menu rows feel uniform and scannable
- prices line up reliably
- recommendation badges feel integrated
- the CTA bar feels like part of the design system

---

## Implementation Note

All numeric values above should be interpreted as **optical targets**.
During implementation we can tune exact CSS values, but the visual hierarchy and spacing relationships should remain stable.

---

## Implementation Progress — 2026-05-05

Applied a second layout pass after visual review:

- Reduced hero from tall poster treatment to a compact `2 / 1` editorial crop.
- Softened accent green from neon yellow-green to a more organic cafe tone.
- Increased vertical breathing room in the category rail without widening the horizontal layout.
- Reworked the featured strip with calmer color, tighter radius, and more balanced internal padding.
- Added a `Populares` highlight row with 5 items below the featured strip and before `Café`.
- Kept `Populares` out of category navigation to preserve the 5-button rail.
- Reduced menu row image, text, and price scale to prevent the list from feeling oversized.
- Removed the floating hero demo badge to reduce clutter.

Validation:

- `npm run build` passed.
- `graphify` code graph was rebuilt after code changes.

### Follow-up Calibration — 2026-05-05

Applied a smaller-scale correction after mobile review:

- Restored category rail to full-width button range with no horizontal side padding.
- Reduced category rail vertical density by roughly 5%.
- Reduced hero height by roughly 15%.
- Reduced hero title scale substantially so the display copy fits the 2:1 crop.
- Hid the order CTA dock for this demo because checkout is out of scope.
- Reduced inactive CTA dimensions by roughly 50% for future reactivation.
- Reduced menu section/title rhythm and item typography/vertical padding for a less oversized list.
