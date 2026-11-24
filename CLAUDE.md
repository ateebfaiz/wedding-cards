# Claude & Agents Project Reference

Please see the comprehensive handbook at [agents/claude.md](file:///home/ateeb/wedding-cards/agents/claude.md) for full architecture standards, invariants, color tokens, and testing protocols.

### Key Commands:
- **Dev Server:** `pnpm dev`
- **Build & Type Check:** `pnpm build`
- **Lint:** `pnpm lint`

### Essential Invariants & Governance:
- **Design Standard:** Contemporary Heirloom (`#F8F5EE`, `#342C26`, `#B5965A`, `#DFBF73`, `#081226`). Full-bleed unwrapped stationery.
- **The Couple:**
  - Groom: Ateeb Faiz (Urdu: `اطیب فیض`, shortName: `اطیب`)
  - Bride: Nimra Javed (Urdu: `نمرہ جاوید`, shortName: `نمرہ`)
  - Groom Parents: Respected Faiz Rasool Cheema & Yasmeen Tahira (Urdu: `محترم فیض رسول چیمہ اور یاسمین طاہرہ`)
  - Bride Parents: Javed Iqbal Sultani & Zahida Parveen (Urdu: `جاوید اقبال سلطانی اور زاہدہ پروین`)
- **Ceremonial Dates & Venues (Chronological):**
  - **Nikkah:** Tuesday, 1 December 2026, 11:00 PM onwards (`11PM onwards`) at Javed Iqbal Sultani Sahib's House, New Islamia Public Model School Building, Opposite GT Road Wazirabad, Veroke Cheema.
  - **Walima:** Friday, 25 December 2026, Night function.
  - **Baraat:** Saturday, 26 December 2026, Daylight function at Ashraf Palace.
- **Emergency / RSVP Contacts:**
  - Faiz Rasool Cheema: `0318-6587882` (Call & WhatsApp)
  - Muneeb Faiz: `0312-6587882` (Call & WhatsApp)
  - Samr Faiz: `0313-6587860` (Urdu: `ثمر فیض`, Brother, Call & WhatsApp)
- **Event Instructions:** "Please come on time and follow our lead and the details and event details on the map in your personalized invitation card."
- **Envelope Card:** Luxurious Navy Gold Wedding Envelope (`luxurious-navy-envelope.webp`) with authentic drop shadows, interactive center red wax seal, and wax crack SFX.
- **Celebratory Confetti:** Launched upon opening Nikkah and Baraat with a slight procedural delay.
- **Audience Governance & Single-Event Lock:** Guests invited to one ceremony cannot browse or switch events. Zero navigation header and zero other event recommendations.
- **Persistent Media & Controls:** Floating audio controller (`AudioController`) and language toggle (`LanguageSwitcher` / `Globe`) are active and accessible on EVERY page, regardless of lock status.
- **Urdu Typography Integrity:** Strictly `letter-spacing: normal !important;` on Urdu Nastaliq text to prevent word ligature tearing.

