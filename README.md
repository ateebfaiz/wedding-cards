# Heirloom Wedding Cards Engine 💍✨

A modular, dynamic, high-fidelity digital wedding invitation engine inspired by traditional South Asian stationery, Mughal architectural motifs, and modern luxury editorial typography.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Web Audio API**.

---

## 🏛️ Architectural Principles

1. **100% Dynamic & Schema-Driven**:
   Zero hardcoded names or family specifics in core components. All dates, venues, ceremony schedules, travel advisories, and bilingual announcements are loaded from a strictly typed configuration object (`WeddingConfig`). Any marriage occasion can be created simply by adding a configuration file.
2. **Tactile Digital Stationery**:
   Features an authentic wax-sealed envelope opening experience with procedural 3D physics, wax cracking, paper unfolding, and ambient acoustic soundscapes.
3. **True Bilingual Isolation (English + Urdu Nastaliq)**:
   Does not invert the entire layout with a naive `dir="rtl"`. Instead, directional blocks are isolated so Latin times (`06:30 PM`), phone numbers, and navigation URLs never reverse, while Nastaliq calligraphy maintains proper line height and ligature rendering.
4. **Zero-Audio File Lag / Procedural Synthesizer**:
   Uses the browser Web Audio API to synthesize tactile wax snaps, paper rustles, and golden pentatonic chimes with zero external audio assets or network latency.
5. **Event Utilities**:
   - Timezone-safe countdown (`Asia/Karachi`).
   - Add to Calendar (`.ics` generation for Apple/Outlook + direct Google Calendar link).
   - Smart Venue Cards with direct Google Maps and Apple Maps routing.
   - Expandable Motorway & Fog travel advisories.
   - Printable vector QR code modal with quiet zones.
   - WhatsApp quick share with pre-formatted bilingual wedding previews.

---

## 📂 Project Structure

```
src/
├── types/
│   └── wedding.ts               # Core schema definitions (WeddingConfig, Events, Venue, Audio)
├── config/
│   ├── neutral-wedding.config.ts# Neutral archetype template on main branch
│   └── default.ts               # Active configuration resolver
├── lib/
│   ├── audio.ts                 # Web Audio procedural sound synthesizer (crack, rustle, chime, ambient)
│   ├── calendar.ts              # .ics file generator & Google/Apple calendar deep-links
│   ├── qr.ts                    # Zero-dependency SVG QR code generator
│   └── utils.ts                 # Countdown calculations, clipboard, class helpers
├── components/
│   ├── layout/
│   │   ├── InvitationShell.tsx  # Bilingual state, wax seal orchestration, header & footer
│   │   ├── LanguageSwitcher.tsx # Instant EN / اردو toggle
│   │   ├── AudioController.tsx  # Floating audio indicator (music and SFX controls)
│   │   └── EventNav.tsx         # Event pill navigation
│   ├── envelope/
│   │   ├── WaxSealEnvelope.tsx  # 3D interactive envelope, wax seal crack & unfold
│   │   └── WaxSeal.tsx          # 3D embossed gold wax seal with monogram
│   ├── common/
│   │   ├── BismillahHeader.tsx  # Calligraphic Bismillah with isolated RTL container
│   │   ├── CountdownTimer.tsx   # Timezone-accurate countdown (days, hrs, mins, secs)
│   │   └── OrnamentalBorder.tsx # Fine hairline borders and Mughal arch motifs
│   ├── events/
│   │   ├── EventHero.tsx        # Event title, date, ceremony type
│   │   ├── ScheduleTimeline.tsx # Vertical interactive timeline
│   │   ├── VenueCard.tsx        # Venue details, Google/Apple Maps, copy address
│   │   ├── TravelGuide.tsx      # Route advice, motorway & fog tips accordion
│   │   ├── MeetingPointCard.tsx # Assembly point & departure details
│   │   ├── BaraatStatusCard.tsx # Real progression status
│   │   └── ActionRow.tsx        # Add to calendar, Share on WhatsApp, Show QR
│   └── modals/
│       └── QRCodeModal.tsx      # Printable vector QR code modal
└── app/
    ├── layout.tsx               # Root layout with fonts, metadata, language wrapper
    ├── page.tsx                 # Main invitation landing, wax seal opening, overview
    ├── [eventSlug]/
    │   └── page.tsx             # Dynamic event route (/nikkah, /baraat, /walima, or custom)
    └── globals.css              # Tailored typography, paper textures, envelope 3D transforms
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ateebfaiz/wedding-cards.git
cd wedding-cards

# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the wedding invitation experience.

---

## 🎨 Color Palette & Stationery Tokens

| Token | Purpose | Hex |
|---|---|---|
| Ivory | Main background | `#F8F5EE` |
| Warm Paper | Envelope and card surfaces | `#EFE8DA` |
| Antique Gold | Wax seal, hairline borders, accents | `#B5965A` |
| Deep Olive | Buttons, active navigation pills | `#545B43` |
| Dark Espresso | Main typography | `#342C26` |
| Muted Taupe | Secondary text and subtitles | `#8A8074` |
| Burgundy | Ceremonial Baraat accent | `#702F3D` |

---

## 🌿 Creating a New Wedding Card Instance

To create a new wedding invitation, duplicate `src/config/neutral-wedding.config.ts`, fill in the couple details, ceremony dates, venues, and schedules, and point `src/config/default.ts` to your new configuration.
