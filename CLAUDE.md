# LakeReel — Claude Context

## Project
Mobile-first fishing web app by **Overbuilt Software LLC**. Tagline: "Find your next bite."
Users discover lakes, check live conditions, share fishing reports, and shop affiliate tackle.
**Mobile-first is the #1 design and development priority — every feature must be built phone-first.**

## Business
- Domain: **lakereel.com**
- Owner: **Overbuilt Software LLC** (est. 2026)
- Use "Overbuilt Software LLC" in footers, legal pages, affiliate/ad account registrations
- "LakeReel" is the consumer brand; LLC name stays in fine print

## Tech Stack
- **Next.js 16** (App Router) / **React 19** / **TypeScript 5**
- **Tailwind CSS 4** + PostCSS
- **Lucide React** for icons
- **ESLint 9** for linting
- Path alias: `@/*` → `./src/*`

## Deployment (planned — not yet set up)
- **Vercel** — hosts the Next.js app (free tier, auto-scales, CDN, built for Next.js)
- **Supabase** — Postgres database + auth (free tier up to 500MB / 50k MAU)
- lakereel.com DNS will point to Vercel; Hostinger stays as registrar only
- Reason: Hostinger shared hosting can't run Node.js API routes

## External APIs
| API | Endpoint | Cache | Purpose |
|-----|----------|-------|---------|
| Open-Meteo | `https://api.open-meteo.com/v1/forecast` | 30 min | Air temp, wind speed/direction |
| USGS Water Services | `https://waterservices.usgs.gov/nwis/iv/` | 60 min | Water temp (param 00010), gage height (param 00065) |

Conditions are fetched server-side via `/api/weather` and `/api/conditions` route handlers.

## Key Files
- `src/lib/lakes.ts` — Master lake database + all TypeScript types (`Lake`, `LakeReport`, `LakeTackle`, `LiveConditions`)
- `src/lib/getConditions.ts` — Fetches and combines live weather + water data
- `src/components/BottomNav.tsx` — Fixed mobile bottom navigation
- `src/components/Footer.tsx` — Footer with Overbuilt Software LLC + legal links
- `src/components/LegalLayout.tsx` — Shared layout for legal pages

## App Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout (dark theme, BottomNav, Footer)
│   ├── page.tsx            # Home page
│   ├── api/
│   │   ├── weather/        # Open-Meteo proxy
│   │   └── conditions/     # USGS proxy
│   ├── lakes/
│   │   ├── page.tsx        # Lakes list
│   │   └── [id]/page.tsx   # Lake detail (live conditions, reports, tackle)
│   ├── reports/
│   │   ├── page.tsx        # Reports list
│   │   └── submit/         # Submit report form
│   ├── tackle/page.tsx     # Affiliate tackle shop
│   ├── profile/page.tsx    # User profile (placeholder)
│   └── legal/              # Privacy, Terms, Affiliate Disclosure
├── components/             # BottomNav, Footer, LegalLayout
└── lib/                    # lakes.ts, getConditions.ts
```

## Current Status
- [x] Mobile-first shell with dark theme and bottom nav
- [x] Home page with conditions strip, report cards, tackle CTA
- [x] Lakes list page
- [x] Lake detail page (live conditions, tackle recommendations, reports)
- [x] Submit a report form (UI only — data not persisted yet, needs Supabase)
- [x] Reports list page
- [x] Tackle/affiliate page
- [x] Profile page (placeholder)
- [x] Footer with Overbuilt Software LLC
- [x] Legal pages (Privacy Policy, Terms of Use, Affiliate Disclosure)
- [ ] Supabase integration (reports persistence, user accounts)
- [ ] Vercel deployment
- [ ] GPS / location detection for auto-nearby lakes
- [ ] Real Bass Pro Shops affiliate account + live product links
- [ ] Expand lake database beyond Oklahoma (user is in Missouri)

## Design Conventions
- **Mobile-first**, dark theme (`bg-slate-950`)
- Color palette: slate (grays), sky (blues), orange, green, red
- Bite level: 1–5 scale, color-coded
- Touch targets: `active:scale-[0.98]` feedback
- Safe area padding for notched devices
- Always show affiliate disclosure on tackle pages

## Data Model (from `lib/lakes.ts`)
```typescript
type Lake = {
  id: string;
  name: string;
  state: string;
  acres: string;
  maxDepth: string;
  county: string;
  lat: number;
  lon: number;
  usgsSiteId: string | null;
  biteLevel: number; // 1–5
  species: string[];
  reports: LakeReport[];
  tackle: LakeTackle[];
};
```

## Lakes (pre-loaded — Oklahoma placeholder data)
- Lake Tenkiller
- Grand Lake
- Keystone Lake
- Lake Eufaula
- Fort Gibson Lake
> Note: User is in Missouri. Missouri lakes should be added when expanding coverage.

## Revenue Model
- **Affiliate links**: Bass Pro Shops (affiliate account not yet applied for — needs LLC info and live site)
- Also consider: Tackle Warehouse, Amazon Associates, Cabela's
- **Display ads**: Google AdSense / Mediavine once traffic thresholds are met
- **Future**: local guide listings, premium membership, tournament listings

## Git
- Working branch: `master`
