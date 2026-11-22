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
- **Luxurious Navy & Gold Wedding Envelope:** Interactive unsealing sequence with procedural wax-crack physics, realistic atmospheric drop shadows, and confetti blast.
- **Dual Rotating Celestial Mandalas:** Arabesque disc and geometric mandala watermarks with frosted ambient light flares.
- **Moroccan Pattern & Islamic Arch Backdrops:** Portrait Moroccan geometric background for homepage; Islamic arch backdrop with luminous navy gold mandala for invitation ceremonies.
- **Authentic Islamic Calligraphy:** Bismillah Al-Rahman Al-Raheem vector banner and Surah Ar-Rum (30:21) sacred marriage verse annotation sticker.
- **Multi-tier Audience Access Controls:** Individual ceremony guests cannot browse uninvited celebrations (zero navigation bar, zero recommendations).
- **Persistent Media Controls:** Audio controller and language switcher are permanently accessible on all invitation pages.
- **Host Private Portal (`/admin`):** Deterministic link generation, navigation control, and WhatsApp invitation dispatch.

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
  --color-bright-gold: #DFBF73;  /* Luminous accent gold */
  --color-royal-navy: #081226;   /* Royal navy envelope & background depth */
  --color-olive: #545B43;        /* Nikkah ceremonial accent */
  --color-burgundy: #702F3D;     /* Baraat ceremonial accent */
  --color-champagne: #CBB994;    /* Walima ceremonial accent */
}
```

### Typography Hierarchy
- **English Display & Headings:** `Playfair Display` / `Cormorant Garamond` (Classic serif font with noble character).
- **Urdu Display & Titles:** `Gulzar` (Traditional Nastaliq with grand calligraphy swashes).
- **Urdu Body & Notes:** `Noto Nastaliq Urdu` (High-readability Urdu calligraphy).
- **English Body & UI Accents:** `Plus Jakarta Sans` / `DM Sans`.
- **Urdu Ligature Integrity Rule:** **NEVER** apply positive `letter-spacing` to Urdu Nastaliq text. Positive letter spacing breaks Arabic/Nastaliq cursive word ligatures. Always enforce `letter-spacing: normal !important; word-spacing: normal !important;`.

---

## 👥 3. Verified Entities, Parentage & Event Registry

All agents must strictly uphold these authentic family and event details:

### The Couple
- **Groom:** **Ateeb Faiz** (`اطیب فیض`, shortName: `اطیب`)
  - Parents: Respected Faiz Rasool Cheema & Yasmeen Tahira (`محترم فیض رسول چیمہ اور یاسمین طاہرہ`)
- **Bride:** **Nimra Javed** (`نمرہ جاوید`, shortName: `نمرہ`)
  - Parents: Javed Iqbal Sultani & Zahida Parveen (`جاوید اقبال سلطانی اور زاہدہ پروین`)

### Emergency / RSVP Contacts
- **Faiz Rasool Cheema:** `0318-6587882` (Call & WhatsApp `https://wa.me/923186587882`)
- **Muneeb Faiz:** `0312-6587882` (Call & WhatsApp `https://wa.me/923126587882`)

### Event Instructions
- *"Please come on time and follow our lead and the details and event details on the map in your personalized invitation card."*  
- (Urdu: `براہِ کرم وقت کی پابندی فرمائیں، ہماری رہنمائی پر عمل کریں اور اپنے ذاتی دعوتی کارڈ پر دیے گئے نقشے اور تقریب کی تفصیلات ملاحظہ فرمائیں۔`)

### The Ceremonies (Chronological Order)

| Ceremony | Route | Date | Time | Venue & Location | Ceremonial Theme |
|---|---|---|---|---|---|
| **Nikkah Ceremony** | `/nikkah` | Tuesday, 1 December 2026 | 11:00 PM onwards | Javed Iqbal Sultani Sahib's House, New Islamia Public Model School Building, Opposite GT Road Wazirabad, Veroke Cheema | Olive (`#545B43`) — Sacred Covenant |
| **Walima Reception** | `/walima` | Friday, 25 December 2026 | Night Function | Walima Reception, Wazirabad / Gujranwala (Times & dishes updated soon) | Champagne (`#B5965A`) — Celebratory Evening Banquet |
| **The Wedding Baraat** | `/baraat` | Saturday, 26 December 2026 | Daylight Function | Ashraf Palace, GT Road, Wazirabad / Gujranwala (Times & dishes updated soon) | Burgundy (`#702F3D`) — Daylight Wedding Ceremony |

---

## ✉️ 4. Envelope & Opening Experience

1. **Asset:** `/assets/envelope/luxurious-navy-envelope.webp`
   - Royal navy velvet texture with intricate golden embroidery corners and a custom red wax seal in the exact center embossed with "Ateeb & Nimra" in gold calligraphy.
   - Framed with realistic deep atmospheric drop shadows (`drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]`).
2. **Interactive States:**
   - **Idle:** Gentle hovering drift with luminous pulse around the center seal.
   - **Click:** Plays wax seal crack SFX (`weddingAudio.playWaxSealCrack()`), starts wedding song (`weddingAudio.startTraditionalMusic()`), pulses the seal with golden particle aura.
   - **Confetti:** For Nikkah and Baraat celebrations, celebratory multi-colored metallic confetti launches with a slight delay (`fireWeddingConfetti()`).
   - **Open Transition:** Envelope gently scales up and fades smoothly to reveal the wedding card canvas.
   - **Skip Option:** Clean skip button allows immediate access if user prefers.

---

## 🔒 5. Audience Governance & Navigation Security Matrix

Invitations are audience-segmented to preserve privacy and ceremonial intimacy:

### Guest Access Tiers
- `walima`: Single ceremony (Colleagues, professional network, acquaintances).
- `nikkah`: Single ceremony (Close family & elders).
- `baraat`: Single ceremony (Close family & wedding party).
- `reception`: Multi-ceremony (Walima & Baraat).
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
   - The host in `/admin` can explicitly toggle navigation (`Show Navigation Bar`: `&nav=1` or `&nav=0`).

### Persistent Audio & Language Controls (Mandatory)
On ALL pages—including single-event locked invitations—the floating audio controller (`AudioController`) and language toggle are ALWAYS visible, interactive, and playable.

---

## 🎨 6. Background Architecture

- **Homepage:** Moroccan geometric pattern (`moroccan-pattern-bg.webp`) rotated in vertical portrait orientation, layered beneath dual rotating mandalas (`gdj-arabesque-disc.webp` and `gdj-mandala-ornament.webp`) with parallax mouse drift and ambient light flares.
- **Invitation Pages:** Islamic arch backdrop (`islamic-arch-backdrop.webp`) blended with luminous gold mandala on navy (`luminous-navy-mandala.webp`) and dual rotating concentric mandalas.

---

## 🧪 7. Quality Gates & Verification Protocol

Before shipping changes:
1. `pnpm build`: Next.js Turbopack compilation must pass with 0 TypeScript/ESLint errors.
2. Verified with headless Chrome screenshots at Mobile (390x844) and Desktop (1440x900).
3. Zero occurrences of legacy names (`عاطب`, `Mian`, `Ahmad`, `Arfa`).
4. Strict enforcement of Urdu spelling `اطیب فیض`.
