# Claude & Agents Project Reference

Please see the comprehensive handbook at [agents/claude.md](file:///home/ateeb/wedding-cards/agents/claude.md) for full architecture standards, invariants, color tokens, and testing protocols.

### Key Commands:
- **Dev Server:** `pnpm dev`
- **Build & Type Check:** `pnpm build`
- **Lint:** `pnpm lint`

### Essential Invariants:
- **Design:** Contemporary Heirloom (`#F8F5EE`, `#342C26`, `#B5965A`). Full-bleed unwrapped stationery.
- **Couple:** Ateeb Faiz & Nimra Javed.
- **Single-Event Lock:** Guests invited to one ceremony cannot browse or switch events.
- **Audio:** Custom track `wedding-song-opt.mp3` with procedural SFX in `src/lib/audio.ts`.
- **Nastaliq:** Zero positive letter-spacing on Urdu.
