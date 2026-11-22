# Wedding Cards — Agents & Claude System Handbook
*Comprehensive Technical Blueprint, Behavioral Standards, Design Governance, and Architecture Registry for Autonomous Agents and Human Engineers.*

---

## 🏛️ 1. Project Overview & Vision

**Repository:** `ateebfaiz/wedding-cards`  
**Active Production Branch:** `ateeb-nimra-invitation` (PR #2)  
**Primary Stack:** Next.js 16.4.6 (Turbopack, React 19, TypeScript, Tailwind CSS v4)  
**Design Standard:** Contemporary Heirloom Stationery (Refined, cultural, authentic subcontinental Pakistani wedding aesthetics)

The objective of this project is to build an interactive, bilingual (English & Urdu Nastaliq), audio-enriched digital wedding invitation experience for the wedding festivities of **Ateeb Faiz** and **Nimra Javed**.

The experience delivers the intimacy of physical heirloom stationery combined with modern web capabilities:
- Interactive wax-seal envelope opening sequence with procedural wax-crack physics.
- Dual rotating celestial arabesque and mandala watermarks with frosted ambient light flares.
- Authentic Islamic calligraphy (Bismillah Al-Rahman Al-Raheem & Surah Ar-Rum 30:21 sacred marriage verse).
- Multi-tier audience access controls (individual ceremony guests cannot browse uninvited celebrations).
- Host Private Portal (`/admin`) for deterministic link generation and WhatsApp invitation dispatch.

---

## 🌿 2. The Contemporary Heirloom Design System

The visual identity combines traditional stationery craftsmanship with contemporary typography. Avoid dark saturated gradients everywhere, heavy gaming aesthetics, or generic templated UI.

### Color Tokens
```css
:root {
  --color-paper: #F8F5EE;        /* Primary warm stationery background */
  --color-paper-deep: #EFE8DA;   /* Secondary paper accent & borders */
  --color-surface: #FCFAF6;      /* High-clarity card canvas surface */
  --color-ink: #342C26;          /* Deep espresso primary text ink */
  --color-ink-muted: #5A4D41;    /* Muted espresso secondary text */
  --color-antique-gold: #B5965A; /* Restrained metallic filigree & dividers */
  --color-olive: #545B43;        /* Nikkah ceremonial accent */
  --color-burgundy: #702F3D;     /* Baraat ceremonial accent */
  --color-champagne: #CBB994;    /* Walima ceremonial accent */
}
```

### Typography Hierarchy
- **English Display & Headings:** `Cormorant Garamond` (Classic serif font with noble subcontinental character).
- **Urdu Display & Titles:** `Gulzar` (Traditional Nastaliq with grand calligraphy swashes).
- **Urdu Body & Notes:** `Noto Nastaliq Urdu` (High-readability Urdu calligraphy).
- **English Body & UI Accents:** `DM Sans` / Clean sans-serif.
- **Urdu Ligature Integrity Rule:** **NEVER** apply positive `letter-spacing` to Urdu Nastaliq text. Positive letter spacing breaks Arabic/Nastaliq cursive word ligatures. Always enforce `letter-spacing: normal !important; word-spacing: normal !important;`.

---

## 👥 3. Verified Entities, Parentage & Event Registry

All agents must strictly uphold these authentic family and event details:

### The Couple
- **Groom:** **Ateeb Faiz** (`عاطب فیض`)
  - Parents: Respected Faiz Rasool Cheema & Yasmeen Tahira (`جناب فیض رسول چیمہ و محترمہ یاسمین طاہرہ`)
- **Bride:** **Nimra Javed** (`نمرہ جاوید`)
  - Parents: Javed Iqbal Sultani & Zahida Parveen (`جناب جاوید اقبال سلطانی و محترمہ زاہدہ پروین`)

### The Ceremonies

| Ceremony | Route | Date | Venue & Location | Ceremonial Theme |
|---|---|---|---|---|
| **Nikkah Ceremony** | `/nikkah` | Tuesday, 1 December 2026 | Residence of Mian Javed Iqbal Sultani Sahib, Veroke Cheema | Olive (`#545B43`) — Sacred Covenant |
| **The Wedding Baraat** | `/baraat` | Friday, 4 December 2026 | Mughal-e-Azam Banquet Hall, Lahore | Burgundy (`#702F3D`) — Ceremonial Procession |
| **Walima Reception** | `/walima` | Sunday, 6 December 2026 | Hall 20, Garrison Club, Lahore | Champagne (`#B5965A`) — Celebratory Luncheon Feast |

### Baraat Ceremonial Progression Standard
Simulated GPS or real-time tracking is strictly prohibited. The Baraat schedule is structured into 4 dignified ceremonial milestones:
1. **1. Assembly** (06:15 PM) — Gathering of guests and baraat convoy.
2. **2. Arrival & Welcome** (07:00 PM) — Floral welcome and entrance procession.
3. **3. Dinner Banquet** (08:00 PM) — Traditional feast.
4. **4. Rukhsati** (10:00 PM) — Farewell prayers and departure.

---

## 🔒 4. Audience Governance & Navigation Security Matrix

Invitations are audience-segmented to preserve privacy and ceremonial intimacy:

### Guest Access Tiers
- `walima`: Single ceremony (Colleagues, professional network, acquaintances).
- `nikkah`: Single ceremony (Close family & elders).
- `baraat`: Single ceremony (Close family & wedding party).
- `reception`: Multi-ceremony (Baraat & Walima).
- `all`: Full celebration (Family and closest friends).

### Strict Single-Event Navigation Lock (Invariant)
1. **Guests invited to a single ceremony (`walima`, `nikkah`, `baraat`) MUST NEVER see the multi-event navigation bar.**
2. On single-event pages:
   - Top navigation header is completely omitted. Only a floating corner language button (`اردو | English`) is shown.
   - The bottom *"Explore Other Ceremonies"* section is completely removed.
   - The *"Back to Main Wedding Card"* link is completely removed.
   - Direct links generated by `/admin` for single-event guests append `&nav=0` and point directly to the specific route (e.g., `/walima?invite=walima&to=...&nav=0`).
3. **Out-of-Scope Gate Protection:** If a single-event guest manually tampers with the URL (e.g., changes `/walima` to `/nikkah`), the page displays a dignified access notice (`Ceremony Specific Invitation`) and provides a button returning them **strictly to their designated ceremony**.
4. **Multi-Event Guests (`all` / `reception`):**
   - The host in `/admin` can explicitly toggle navigation:
     - `Show Navigation Bar`: appends `&nav=1` (allows switching between invited events).
     - `Hide Navigation`: appends `&nav=0` (locks them into single ceremony view).
   - In `EventNavigationHeader.tsx`, **NO main card logo (`✦`) or text (`Main Card`, `Ateeb & Nimra`) is permitted.** The header only contains the ceremony tabs (`[Nikkah | Baraat | Walima]`) and controls (`[Audio | Language]`).

---

## 🎨 5. Full-Bleed Stationery Architecture (Unwrapped Standard)

### The "Anti-Boxed" Rule
- **NEVER** wrap the entire page in a nested card container (`rounded-3xl border shadow...`) on top of a paper background. This creates a claustrophobic "card trapped inside a card" appearance.
- The page itself **IS** the invitation canvas. Content flows naturally with generous breathing room (`max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-14`).
- Section cards (Venue, Schedule, Countdown) have subtle borders (`border-[#B5965A]/35`) and soft shadows, but the page body is full-bleed and unconstrained.
- **Wax Seal Rule:** The red wax seal (`wedding-seal-opt.webp`) belongs **exclusively** to the unopened envelope sequence (`WaxSealEnvelope.tsx`). It must **never** be rendered on opened invitation pages.

### Atmospheric Background System ([HeirloomAmbientBackground.tsx](file:///home/ateeb/wedding-cards/src/components/backgrounds/HeirloomAmbientBackground.tsx))
- **Base:** Warm stationery paper `#F8F5EE`.
- **Outer Celestial Ring:** `gdj-arabesque-4164761_1920.png` (`gdj-arabesque-disc.webp`) rotating clockwise at `120s`.
- **Concentric Inner Ring:** `gdj-mandala-5180247_1920.png` (`gdj-mandala-ornament.webp`) rotating counter-clockwise at `160s`.
- **Frosted Light Flares:** Soft golden and champagne radial blurred flares (`blur-3xl`) with gentle pulse and mouse-follow parallax.
- **Soft Vignette:** Subtle radial overlay ensuring foreground calligraphy and text have pristine contrast and 100% legibility.

---

## 🎵 6. Audio Architecture & Web Audio Engine

### Official Wedding Track
- Audio Source: Requested melody from YouTube (`youtu.be/NojYsXa9pog`).
- Local Asset: [public/assets/audio/wedding-song-opt.mp3](file:///home/ateeb/wedding-cards/public/assets/audio/wedding-song-opt.mp3) (128 kbps stereo, optimized for zero-latency mobile streaming).
- Managed via [src/lib/audio.ts](file:///home/ateeb/wedding-cards/src/lib/audio.ts):
  - Autoplay-safe user-gesture initialization.
  - Seamless loop playback with volume damping (`0.65`).
  - Integrated with floating [AudioController.tsx](file:///home/ateeb/wedding-cards/src/components/layout/AudioController.tsx) and navigation header controls.
  - Procedural Web Audio API sound effects for wax seal cracking physics and golden bell chimes.

---

## 🛠️ 7. Codebase Directory Map

```
wedding-cards/
├── agents/
│   └── claude.md                       # This handbook
├── public/
│   └── assets/
│       ├── audio/
│       │   └── wedding-song-opt.mp3    # Official wedding song
│       ├── backgrounds/
│       │   └── alyoha-arabic-bg.webp
│       ├── calligraphy/
│       │   ├── bismillah-islamic-vector.webp # Official Bismillah banner
│       │   └── quranic-marriage-verse.webp   # Surah Ar-Rum 30:21 sticker
│       ├── mandalas/
│       │   ├── gdj-arabesque-4164761_1920.png
│       │   ├── gdj-arabesque-disc.webp
│       │   ├── gdj-mandala-5180247_1920.png
│       │   └── gdj-mandala-ornament.webp
│       └── seal/
│           └── wedding-seal-opt.webp   # Red wax seal (envelope only)
├── src/
│   ├── app/
│   │   ├── [eventSlug]/
│   │   │   ├── EventClientView.tsx     # Independent ceremony view
│   │   │   └── page.tsx                # Dynamic route handler
│   │   ├── admin/
│   │   │   └── page.tsx                # Host Private Portal & Link Generator
│   │   ├── globals.css                 # Contemporary Heirloom CSS variables
│   │   ├── layout.tsx                  # Font loading (Cormorant, Gulzar, etc.)
│   │   └── page.tsx                    # Main card folio & opening envelope
│   ├── components/
│   │   ├── backgrounds/
│   │   │   └── HeirloomAmbientBackground.tsx # Dual rotating mandalas + flares
│   │   ├── common/
│   │   │   └── CountdownTimer.tsx      # Hydration-safe ceremonial countdown
│   │   ├── envelope/
│   │   │   └── WaxSealEnvelope.tsx     # Interactive wax seal opening
│   │   ├── events/
│   │   │   ├── ActionRow.tsx           # Calendar, WhatsApp & QR actions
│   │   │   ├── BaraatStatusCard.tsx    # 4 dignified Baraat milestones
│   │   │   ├── EventHero.tsx           # Ceremony title & Bismillah banner
│   │   │   ├── ScheduleTimeline.tsx    # Detailed schedule events
│   │   │   └── VenueCard.tsx           # Google Maps & directions
│   │   ├── layout/
│   │   │   ├── AudioController.tsx     # Floating heirloom music button
│   │   │   └── InvitationShell.tsx     # Envelope state & main viewport
│   │   └── navigation/
│   │       └── EventNavigationHeader.tsx # Minimal ceremony switcher
│   ├── config/
│   │   ├── ateeb-nimra.config.ts       # Master wedding configuration
│   │   └── default.ts                  # Configuration getter
│   ├── lib/
│   │   ├── audio.ts                    # Audio engine & SFX
│   │   ├── audience.ts                 # Tier resolution & access filtering
│   │   └── utils.ts                    # Countdown math & helpers
│   └── types/
│       └── wedding.ts                  # TypeScript definitions
└── package.json
```

---

## ⛔ 8. Strict NO-DO Invariants (Hard Negative Constraints)

1. **NO Hardcoded Legacy Placeholders**:
   - Zero occurrences of `ahmad`, `ahmed`, `arfa` in filenames, configs, or UI copy.
2. **NO Boxed Page Wrappers**:
   - Do not wrap `/` or `/[eventSlug]` in an artificial `border` or `rounded-3xl` modal frame. The page is full-bleed stationery.
3. **NO Navigation Leakage for Single Events**:
   - Single-event invitees (`walima`, `nikkah`, `baraat`) must never be given access to switch ceremonies or browse other event cards.
4. **NO Logo or Text in EventNavigationHeader**:
   - Do not re-add "Main Card", "✦", or couple names to the navigation header.
5. **NO Hydration Breakages**:
   - Countdown timer digits must use `suppressHydrationWarning` and `isMounted` checks to prevent server/client timestamp mismatches.
6. **NO Positive Letter-Spacing on Nastaliq**:
   - Never apply `tracking-wide` or positive letter-spacing to Urdu text.
7. **NO Simulated GPS or Moving Buses**:
   - Baraat status must strictly follow the 4 dignified milestones.

---

## 🚀 9. Verification & Quality Gates

Before pushing or completing any task, agents must execute and pass:
```bash
# 1. Type checking and Next.js build
pnpm build

# 2. Viewport testing via headless Chrome
/home/ateeb/.local/bin/google-chrome --headless=new --disable-gpu --no-sandbox --window-size=390,844 --screenshot=/tmp/review/mobile.png "http://localhost:3000/?opened=true"
/home/ateeb/.local/bin/google-chrome --headless=new --disable-gpu --no-sandbox --window-size=1440,900 --screenshot=/tmp/review/desktop.png "http://localhost:3000/?opened=true"
```
All builds must compile with **0 TypeScript errors** and **0 lint errors**.
