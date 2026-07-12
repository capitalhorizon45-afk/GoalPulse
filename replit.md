# GoalPulse

A production-ready sports website delivering live scores, fixtures, standings, and news for Football, Cricket, Basketball, and Tennis.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom design tokens
- **Font**: Inter (Google Fonts, next/font)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Design

Premium dark UI with the following color system:
- Background: `#0B0B0F`
- Surface: `#17171C`
- Primary: `#00C8FF` (cyan)
- Secondary: `#22C55E` (green)

## Project Structure

```
goalpulse/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── live/page.tsx       # Live scores
│   ├── fixtures/page.tsx   # Fixtures
│   ├── standings/page.tsx  # League tables
│   ├── sports/page.tsx     # Sports overview
│   ├── news/page.tsx       # News listing
│   └── about/page.tsx      # About page
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Reusable UI components
│   └── sections/           # Homepage sections
├── lib/
│   ├── api/                # API service layer
│   │   ├── football-data.ts # Football-Data.org
│   │   └── sports-db.ts    # TheSportsDB
│   ├── data-fetcher.ts     # Football data access — live API with automatic mock fallback
│   ├── mock-data.ts        # Football mock data (used only if the live API fails)
│   ├── types/index.ts      # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── .env.local              # API keys (not committed)
```

## Running Locally

```bash
npm run dev      # Start dev server on port 5000
npm run build    # Production build
npm run lint     # ESLint
```

## API Keys

Configured as Replit secrets (not committed):

```env
# Football-Data.org (https://www.football-data.org/client/register)
FOOTBALL_DATA_API_KEY=your_key_here

# TheSportsDB (https://www.thesportsdb.com/api.php)
THESPORTSDB_API_KEY=3
```

**Football** (`lib/data-fetcher.ts`) automatically falls back to realistic mock
data (`lib/mock-data.ts`) if `FOOTBALL_DATA_API_KEY` is missing, invalid, or
the API is rate-limited/unavailable — the UI never shows an error for this.
Cricket, basketball, and tennis (TheSportsDB) remain live-only with no mock
fallback.

## User Preferences

- Dark UI (#0B0B0F background, #00C8FF primary, #22C55E secondary)
- Inter font
- Responsive design, mobile-first
- Keep mock data working without API keys
- Port 5000 for Replit webview compatibility
