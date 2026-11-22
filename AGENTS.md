<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wedding Cards — Agents & Autonomous Governance Standard

Please refer to the comprehensive handbook at [agents/claude.md](file:///home/ateeb/wedding-cards/agents/claude.md) for full architectural guidelines, color tokens, and invariants.

## Core Rules & Invariants Summary:
1. **Design System:** Contemporary Heirloom Stationery (Warm Paper `#F8F5EE`, Deep Espresso Ink `#342C26`, Antique Gold `#B5965A`, Ceremony Accents: Olive `#545B43`, Burgundy `#702F3D`, Champagne `#CBB994`).
2. **Couples & Parentage:** **Ateeb Faiz** s/o Respected Faiz Rasool Cheema & Yasmeen Tahira; **Nimra Javed** d/o Javed Iqbal Sultani & Zahida Parveen. Nikkah on 1 Dec 2026 at Veroke Cheema.
3. **Unwrapped Full-Bleed Stationery:** Never box the page inside a card-inside-a-card wrapper. Content flows naturally across the screen with dual rotating mandalas and ambient frosted flares.
4. **Single-Event Locking:** Guests with single-event tier (`walima`, `nikkah`, `baraat`) are strictly locked (`&nav=0`): no top navbar, no other event explorer, no main card backlinks.
5. **No Main Card Logo/Text in Navigation:** EventNavigationHeader displays only ceremony tabs and audio/language controls.
6. **No Letter-Spacing on Nastaliq:** Urdu text must always use `letter-spacing: normal !important`.
7. **Hydration Integrity:** Countdown timers must use `suppressHydrationWarning` and `isMounted` checks.
8. **Audio Engine:** Background audio streams `wedding-song-opt.mp3` with procedural Web Audio wax crack SFX.

