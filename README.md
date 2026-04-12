# Cryptrix

A professional cryptocurrency dashboard built from scratch with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. Real-time market data, interactive charts, and a full-featured trading terminal UI — all powered by the CoinGecko API.

---

## Features

### Home Dashboard
- **Bitcoin Overview** with interactive candlestick chart (period switching: 1D / 1W / 1M / 3M / 6M / 1Y / Max)
- **Trending Coins** table with live prices pulled from `/simple/price` to avoid stale data
- **Top Categories** with market cap, volume, and 24h change
- Suspense-based streaming with custom skeleton fallbacks for each section

### Coin Detail Page (`/coins/[id]`)
- **Two-column responsive layout**: chart + data on the left, stats on the right
- **CoinHeader** with live-updating price (polls every 15s via server action), 24h/30d change, price delta, and market cap rank
- **Candlestick Chart** using `lightweight-charts` v5 with configurable periods and update frequencies
- **About Section** with HTML-stripped descriptions and Read more / Show less toggle
- **Exchange Listings** with sticky header, internal scroll, and `table-fixed` layout so all 4 columns (Exchange, Pair, Price, Link) always fit
- **Currency Converter** supporting USD, EUR, GBP, JPY, BTC, ETH
- **Coin Details** grid: market cap, rank, volume, website, explorer, community links
- **Price Statistics**: ATH, ATL, fully diluted valuation, circulating/max supply with progress bar
- **Top Gainers & Losers** with tab switching (server-fetched, client-rendered)

### All Coins Page (`/coins`)
- Paginated table (20 coins/page) with rank, name, price, 24h change, market cap
- Custom pagination with ellipsis logic and URL-driven page state

### Global Search (Cmd+K)
- Command palette powered by `cmdk` (shadcn Command component)
- **Debounced search** (300ms) using `react-use` to avoid API rate limits
- **Two-step data merge**: `/search` for matching coins + `/coins/markets` for live prices
- Shows **trending coins** when idle, **search results** when typing
- SWR caching prevents redundant fetches and handles race conditions
- Keyboard shortcut: `Cmd+K` (Mac) / `Ctrl+K` (Windows)

### Live Price Updates
- Server action polls CoinGecko `/simple/price` every 15 seconds
- Price updates in the CoinHeader without page refresh
- `cache: 'no-store'` ensures fresh data on every poll

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.3 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS nesting |
| UI Components | shadcn/ui (Table, Pagination, Command, Dialog, Tabs) |
| Charts | lightweight-charts v5 |
| Data Fetching | Server Actions (`'use server'`), SWR, Suspense streaming |
| API | CoinGecko REST API (Demo), GeckoTerminal API |
| Linting | ESLint (flat config) + Prettier |

---

## Architecture Decisions

### Server / Client Component Split
- **Server components** handle all data fetching (no `useEffect` watchers, no client-side API keys)
- **Client components** (`'use client'`) only where interactivity is required: charts, search modal, tab switching, live price polling
- Server actions in `lib/coingecko.actions.ts` are called directly from client components — no API routes needed

### Data Consistency
- Trending coins in the navbar and home page both pull prices from `/simple/price` instead of relying on the stale snapshot embedded in `/search/trending`
- Live price on the coin detail page uses the same `/simple/price` endpoint as the overview, so prices are always consistent

### Layout Patterns
- `flex flex-col min-h-full` on `<body>` with `mt-auto` on the footer for sticky-bottom behavior
- `table-fixed` with explicit percentage column widths on Exchange Listings to prevent content overflow
- `max-h` + `overflow-y-auto` for internal scroll on long data tables
- Suspense boundaries with skeleton fallbacks for each async section

---

## Project Structure

```
app/
  layout.tsx            # Root layout (Header + Footer on every page)
  page.tsx              # Home: CoinOverview + TrendingCoins + Categories
  coins/
    page.tsx            # All Coins with pagination
    [id]/page.tsx       # Coin detail page
  terms/page.tsx        # Terms & Conditions

components/ui/
  Header.tsx            # Navbar with logo + search modal + nav links
  Footer.tsx            # Global footer with copyright + links
  SearchModal.tsx       # Cmd+K search with SWR + debounce
  CandleSticksChart.tsx # lightweight-charts candlestick with period switching
  LiveDataWrapper.tsx   # Client wrapper: live price polling + chart + about + exchanges
  CoinHeader.tsx        # Coin name, live price, change stats
  CoinDescription.tsx   # About section with HTML stripping + expand/collapse
  ExchangeListings.tsx  # Ticker table with sticky header + internal scroll
  Converter.tsx         # Currency converter
  PriceStats.tsx        # ATH, ATL, supply stats
  TopMovers.tsx         # Gainers/losers tab UI (client)
  TopMoversWrapper.tsx  # Server data fetch for top movers
  DataTable.tsx         # Generic reusable table component
  CoinsPagination.tsx   # Pagination with page numbers + ellipsis
  home/
    CoinOverview.tsx    # Bitcoin chart + price header
    TrendingCoins.tsx   # Trending coins table with live prices
    Categories.tsx      # Market categories table

lib/
  coingecko.actions.ts  # Server actions: fetcher, searchCoins, getLivePrice, getPools
  utils.ts              # formatCurrency, formatPrice, formatPercentage, cn, etc.

constants.ts            # Chart config, period buttons, interval buttons
type.d.ts               # Global TypeScript interfaces
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- CoinGecko Demo API key (free at [coingecko.com](https://www.coingecko.com/en/api))

### Setup

```bash
git clone https://github.com/yourusername/cryptrix.git
cd cryptrix
npm install
```

Create a `.env.local` file:

```env
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=your_demo_api_key_here
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Screenshots

### Home Dashboard
![Home Dashboard](public/screenshot-homepage.png)

### Coin Detail Page
![Coin Detail Page](public/Screenshot-coindetailpage.png)

### Global Search (Cmd+K)
![Search Modal](public/Screenshot-searchcoin.png)

---

## Author

**Prashan Adhikari**
[LinkedIn](https://www.linkedin.com/in/prashan-adhikari-902915242/)
