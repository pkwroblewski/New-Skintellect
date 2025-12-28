# CLAUDE.md - DermaLogic AI Project Guidelines

## Project Overview

DermaLogic AI is an AI-powered cosmetics and beauty marketplace that helps users find product dupes, analyze ingredients, and make informed skincare decisions. Inspired by skinskoolbeauty.com.

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (utility-first)
- **Icons**: Lucide React
- **State Management**: React Context + Zustand (for complex state)
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js with Express
- **API**: RESTful endpoints
- **AI Integration**: Google Gemini API (proxied through backend)

### Database (Future)
- Supabase (PostgreSQL) for products, users, reviews

## Project Structure

```
/
├── CLAUDE.md                 # This file - project rules
├── README.md                 # Project documentation
├── package.json              # Root package.json (monorepo scripts)
│
├── client/                   # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── common/       # Reusable UI components (Button, Input, Modal)
│   │   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   │   ├── product/      # Product-related components
│   │   │   └── comparison/   # Comparison/analysis components
│   │   ├── context/          # React Context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Route-based page components
│   │   ├── services/         # API client services
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Helper functions
│   │   ├── constants/        # Static data, config
│   │   ├── App.tsx           # Main App component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
│
├── server/                   # Backend Express application
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── services/         # Business logic (AI, database)
│   │   ├── middleware/       # Express middleware
│   │   ├── utils/            # Helper functions
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── .env                      # Environment variables (NEVER commit)
```

## Design System

### IMPORTANT: Preserve Visual Design
The frontend visual design MUST be preserved exactly as-is:
- Color scheme (warm cream #FAF7F2, soft rose #A67C7C, etc.)
- Typography (Cormorant Garamond serif, Plus Jakarta Sans)
- Layout structure and spacing
- Image styling (grayscale hover effects, aspect ratios)
- Animation patterns (fade-in, scale, blur transitions)

### Color Palette
```css
--bg-primary: #FAF7F2;        /* Warm cream background */
--bg-secondary: #FDF2F2;      /* Soft pink/japandi pink */
--bg-tertiary: #F0F4F8;       /* Soft blue/japandi blue */
--accent-primary: #A67C7C;    /* Soft rose - primary accent */
--border-soft: #E8E2D9;       /* Cream border */
--text-primary: #1e293b;      /* Slate 800 */
--text-secondary: #64748b;    /* Slate 500 */
--text-muted: #94a3b8;        /* Slate 400 */
```

### Typography
- **Serif (Display)**: Cormorant Garamond - headings, prices, quotes
- **Sans-serif (Body)**: Plus Jakarta Sans - body text, labels, buttons

### Component Patterns
- Buttons: Rounded-full with uppercase tracking-widest text
- Cards: Subtle shadows, hover state with grayscale removal
- Modals: Large rounded corners (rounded-[3rem])
- Inputs: Underline style with border-b, no visible border

## Coding Standards

### TypeScript
- Strict mode enabled
- All components must have explicit prop interfaces
- Use `type` for object shapes, `interface` for component props
- Avoid `any` - use `unknown` if type is truly unknown

### React Patterns
```tsx
// Component structure
interface ComponentProps {
  prop1: string;
  prop2?: number;
  onAction: (id: string) => void;
}

export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2 = 0,
  onAction
}) => {
  // hooks first
  const [state, setState] = useState();

  // derived values
  const computed = useMemo(() => {}, [deps]);

  // effects
  useEffect(() => {}, [deps]);

  // handlers
  const handleClick = () => {};

  // render
  return <div />;
};
```

### File Naming
- Components: PascalCase (`ProductCard.tsx`)
- Hooks: camelCase with `use` prefix (`useProducts.ts`)
- Utils: camelCase (`formatPrice.ts`)
- Types: PascalCase (`Product.ts`)
- Constants: SCREAMING_SNAKE_CASE for values, camelCase for files

### Import Order
1. React and React-related
2. Third-party libraries
3. Internal components
4. Internal hooks/utils
5. Types
6. Styles

## API Design

### Backend Endpoints
```
POST /api/ai/compare          # Compare two products
POST /api/ai/safety-audit     # Analyze ingredient safety
GET  /api/products            # List products (with pagination)
GET  /api/products/:id        # Get single product
GET  /api/products/search     # Search products
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```

### Error Handling
- Never expose internal errors to client
- Log full errors server-side
- Return user-friendly messages
- Use appropriate HTTP status codes

## Security Rules

### CRITICAL - API Keys
- **NEVER** expose API keys in frontend code
- **NEVER** commit `.env` files
- All external API calls go through backend proxy
- Use environment variables for all secrets

### Input Validation
- Sanitize all user inputs
- Validate on both client and server
- Use parameterized queries for database

### Authentication (When Implemented)
- Use HTTP-only cookies for sessions
- Implement CSRF protection
- Rate limit auth endpoints

## Git Workflow

### Branch Naming
- `feature/` - new features
- `fix/` - bug fixes
- `refactor/` - code improvements
- `chore/` - maintenance tasks

### Commit Messages
Format: `type(scope): description`

Examples:
- `feat(api): add product comparison endpoint`
- `fix(ui): correct mobile navigation toggle`
- `refactor(hooks): extract useCart from App`

### Files to Never Commit
- `.env`, `.env.local`, `.env.production`
- `node_modules/`
- `dist/`, `build/`
- `.DS_Store`
- API keys, secrets, credentials

## Testing Guidelines

### Unit Tests
- Test utility functions
- Test custom hooks with @testing-library/react-hooks
- Mock external services

### Component Tests
- Use React Testing Library
- Test user interactions, not implementation
- Prefer queries by role/label over test IDs

### E2E Tests (Future)
- Playwright for critical user flows
- Test: search, compare, add to cart

## Performance Guidelines

- Use React.lazy() for route-based code splitting
- Optimize images (WebP format, srcset)
- Debounce search inputs (300ms)
- Memoize expensive computations
- Virtualize long lists (>50 items)

## Common Commands

```bash
# Development
npm run dev           # Start both client and server
npm run dev:client    # Start frontend only
npm run dev:server    # Start backend only

# Build
npm run build         # Build for production
npm run preview       # Preview production build

# Quality
npm run lint          # Run ESLint
npm run typecheck     # Run TypeScript compiler
npm run test          # Run tests
```

## Troubleshooting

### "API key not found" error
1. Check `.env` file exists in server directory
2. Ensure `GEMINI_API_KEY` is set
3. Restart the server after changes

### "CORS error" in browser
1. Check server is running on correct port
2. Verify CORS middleware is configured
3. Ensure API URL matches in client config

### "Module not found" errors
1. Run `npm install` in both client and server
2. Check import paths are correct
3. Restart TypeScript server in IDE
