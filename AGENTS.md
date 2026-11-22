<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wedding Cards — Agents & Autonomous Governance Standard

Please refer to the comprehensive handbook at [agents/claude.md](file:///home/ateeb/wedding-cards/agents/claude.md) for full architectural guidelines, color tokens, and invariants.

## Core Rules & Invariants Summary:
1. **Design System:** Contemporary Heirloom Stationery (Warm Paper `#F8F5EE`, Deep Espresso Ink `#342C26`, Antique Gold `#B5965A`, Ceremony Accents: Olive `#545B43`, Burgundy `#702F3D`, Champagne `#CBB994`).
2. **Couples & Parentage:** **Ateeb Faiz** (`اطیب فیض`) s/o Respected Faiz Rasool Cheema & Yasmeen Tahira (`محترم فیض رسول چیمہ اور یاسمین طاہرہ`); **Nimra Javed** (`نمرہ جاوید`) d/o Javed Iqbal Sultani & Zahida Parveen (`جاوید اقبال سلطانی اور زاہدہ پروین`).
3. **Ceremony Timing Standard:**
   - **Nikkah Ceremony:** Tuesday, 1 December 2026 — Daylight Function (11:00 AM onwards).
   - **The Wedding Baraat:** Saturday, 26 December 2026 — Daylight Function at Ashraf Palace.
   - **Walima Reception:** Friday, 25 December 2026 — Night Function Banquet.
   - All ceremonies except Walima are daylight functions.
4. **Unwrapped Full-Bleed Stationery:** Never box the page inside a card-inside-a-card wrapper. Content flows naturally across the screen with dual rotating celestial mandalas and ambient frosted flares (`bg-[#F8F5EE]/45 backdrop-blur-[2px]`).
5. **Urdu Typography Standard:**
   - Primary Urdu Display Headings: `AA Sameer Zikran` (`.font-sameer-zikran` / `.font-zikran`).
   - Urdu Announcements & Subheadings: `AlQalam Taj Nastaleeq` (`.font-alqalam-taj` / `.font-taj`).
   - Strictly enforce `letter-spacing: normal !important; word-spacing: normal !important;` on all Nastaliq styles.
   - Urdu content aligns right-to-left (`text-start` with `dir="rtl"`).
6. **Physical Luxury Envelope:** Displayed strictly in true landscape format (`aspect-[2282/1388]`, max-width `650px`) with procedural wax cracking, ambient halo, and gold seal hotspot.
7. **Sacred Marriage Verse Sticker:** Surah Ar-Rum (30:21) sticker present and prominent across ceremony pages.
8. **Single-Event Locking:** Guests with single-event tier (`walima`, `nikkah`, `baraat`) are strictly locked (`&nav=0`): no top navbar, no other event explorer, no main card backlinks.
9. **Audio Engine:** Background audio streams `wedding-song-opt.mp3` with procedural Web Audio wax crack SFX and persistent audio controllers on every page.

