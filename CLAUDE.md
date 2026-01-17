# CLAUDE.md - Skintellect Project Guidelines

## Project Overview

Skintellect is an AI-powered skincare comparison platform that helps users find product dupes, analyze ingredients, and make informed skincare decisions. Built with Next.js 16 App Router for optimal SEO and single-deployment simplicity.

**Live URL:** https://skintellect-next.vercel.app

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 (CSS-first configuration)
- **State Management**: Zustand with localStorage persistence
- **AI Integration**: Google Gemini API (server-side only)
- **Icons**: Lucide React
- **Validation**: Zod
- **Deployment**: Vercel (single deployment)

## Project Structure

```
/
├── CLAUDE.md                    # This file - project guidelines
├── README.md                    # Project documentation
├── package.json                 # Dependencies and scripts
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS for Tailwind
├── eslint.config.mjs            # ESLint configuration
├── .env.local                   # Environment variables (NEVER commit)
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (fonts, providers, metadata)
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles + Tailwind config
│   │   ├── loading.tsx          # Global loading UI
│   │   ├── not-found.tsx        # 404 page
│   │   ├── sitemap.ts           # Dynamic sitemap generation
│   │   ├── robots.ts            # Robots.txt generation
│   │   │
│   │   ├── api/                 # API Routes (server-side)
│   │   │   ├── ai/
│   │   │   │   ├── compare/route.ts      # POST /api/ai/compare
│   │   │   │   └── safety-audit/route.ts # POST /api/ai/safety-audit
│   │   │   └── health/route.ts           # GET /api/health
│   │   │
│   │   ├── cart/page.tsx        # Shopping cart
│   │   ├── checkout/page.tsx    # Checkout flow
│   │   ├── compare/page.tsx     # Product comparison results
│   │   ├── order-confirmation/page.tsx
│   │   ├── wishlist/page.tsx    # User wishlist
│   │   └── saved/page.tsx       # Saved for later
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # 'use client' - navigation
│   │   │   └── Footer.tsx       # Server component
│   │   ├── product/
│   │   │   └── ProductCard.tsx  # 'use client' - product display
│   │   ├── comparison/
│   │   │   ├── ComparisonWidget.tsx  # 'use client' - floating widget
│   │   │   ├── AnalysisPanel.tsx     # Server component - results
│   │   │   └── SafetyModal.tsx       # 'use client' - modal
│   │   ├── common/
│   │   │   ├── Toast.tsx        # 'use client' - notifications
│   │   │   └── LoadingOverlay.tsx
│   │   └── providers/
│   │       └── Providers.tsx    # 'use client' - Zustand wrapper
│   │
│   ├── stores/                  # Zustand stores
│   │   ├── cart-store.ts        # Cart, wishlist, saved items
│   │   ├── comparison-store.ts  # Product comparison state
│   │   └── toast-store.ts       # Toast notifications
│   │
│   ├── hooks/
│   │   ├── useProducts.ts       # Product filtering
│   │   └── use-hydration.ts     # SSR hydration helper
│   │
│   └── lib/
│       ├── types.ts             # TypeScript interfaces
│       ├── products.ts          # Mock product data
│       ├── gemini.ts            # Server-only AI service
│       └── api.ts               # Client-side fetch helpers
│
└── public/
    └── favicon.svg              # Site favicon
```

## Design System

### IMPORTANT: Preserve Visual Design
The frontend visual design MUST be preserved:
- Warm cream backgrounds (#FAF7F2)
- Soft rose accents (#A67C7C)
- Serif typography for headings (Cormorant Garamond)
- Sans-serif for body (Plus Jakarta Sans)
- Large rounded corners (rounded-[3rem])
- Grayscale hover effects on images

### Color Palette
```css
--color-cream-100: #FAF7F2;      /* Primary background */
--color-cream-200: #F5F2ED;      /* Secondary background */
--color-rose-soft: #A67C7C;      /* Primary accent */
--color-rose-light: #FDF2F2;     /* Light accent background */
--border-soft: #E8E2D9;          /* Subtle borders */
```

### Typography (via next/font)
- **Serif**: Cormorant Garamond - headings, prices, quotes
- **Sans**: Plus Jakarta Sans - body text, labels, buttons

## Key Patterns

### Server vs Client Components
```tsx
// Server Component (default) - no directive needed
export function AnalysisPanel({ analysis }) {
  return <div>{analysis.summary}</div>;
}

// Client Component - needs 'use client' directive
'use client';
export function ComparisonWidget() {
  const router = useRouter();  // Client-side hooks
  return <button onClick={() => router.push('/compare')}>Compare</button>;
}
```

### Zustand with Hydration
```tsx
// In stores/cart-store.ts
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({ /* state and actions */ }),
    { name: 'skintellect-cart-v2' }
  )
);

// In components - use hydration hook to avoid SSR mismatch
const hydrated = useHydration();
const cartCount = useCartStore((state) => state.getCartCount());
if (!hydrated) return <Skeleton />;
```

### API Routes
```tsx
// app/api/ai/compare/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { compareProducts } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate with Zod, call Gemini, return response
  const analysis = await compareProducts(body.source, body.target);
  return NextResponse.json({ success: true, data: analysis });
}
```

## Security Rules

### CRITICAL - API Keys
- **NEVER** expose `GEMINI_API_KEY` in client code
- API key is only used in `lib/gemini.ts` which has `import 'server-only'`
- All AI calls go through `/api/ai/*` routes

### Environment Variables
```bash
# .env.local (NEVER commit)
GEMINI_API_KEY=your_key_here
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Build & Deploy
npm run build        # Create production build
npm run start        # Start production server locally
vercel --prod        # Deploy to Vercel production

# Code Quality
npm run lint         # Run ESLint
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/compare | Compare two products using Gemini AI |
| POST | /api/ai/safety-audit | Analyze ingredient safety |
| GET | /api/health | Health check endpoint |

## Deployment

- **Platform**: Vercel
- **URL**: https://skintellect-next.vercel.app
- **Environment Variables**: Set `GEMINI_API_KEY` in Vercel dashboard

## Troubleshooting

### Hydration Mismatch
Use the `useHydration` hook when accessing persisted Zustand stores:
```tsx
const hydrated = useHydration();
if (!hydrated) return <LoadingState />;
```

### API Key Not Working
1. Check `.env.local` exists with `GEMINI_API_KEY`
2. Restart dev server after changing env vars
3. For production, verify env var is set in Vercel dashboard

### Build Errors
1. Run `npm install` to ensure dependencies are installed
2. Check TypeScript errors with `npx tsc --noEmit`
3. Verify all 'use client' directives are at top of file
