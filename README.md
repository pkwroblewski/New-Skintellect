# Skintellect AI

An AI-powered cosmetics and beauty marketplace that helps users find product dupes, analyze ingredients, and make informed skincare decisions.

## Features

- **Product Comparison**: Compare two products side-by-side with AI-powered analysis
- **Ingredient Safety Audit**: Get detailed safety reports for any product's ingredients
- **Smart Search**: Filter products by name, brand, or specific ingredients
- **Wishlist & Cart**: Save products for later or add to cart
- **Beautiful UI**: Minimalist, elegant design with smooth animations

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router v6 for navigation
- Tailwind CSS for styling
- Zustand for state management
- Vite for build tooling

### Backend
- Node.js with Express
- Google Gemini AI for product analysis
- Rate limiting and security middleware

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd skintellect-ai
   ```

2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. Start the development servers:
   ```bash
   npm run dev
   ```

   This starts both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:client` | Start only the frontend |
| `npm run dev:server` | Start only the backend |
| `npm run build` | Build both for production |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run install:all` | Install dependencies for all packages |

## Project Structure

```
skintellect-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Route-based pages
│   │   ├── services/       # API client
│   │   ├── types/          # TypeScript types
│   │   └── constants/      # Static data
│   └── ...
├── server/                 # Express backend
│   └── src/
│       ├── routes/         # API routes
│       ├── services/       # Business logic
│       └── middleware/     # Express middleware
├── CLAUDE.md               # Project guidelines
└── package.json            # Root package.json
```

## Security

- API keys are stored securely on the server, never exposed to the client
- Rate limiting prevents API abuse
- Input validation on all endpoints
- Helmet.js for security headers

## Contributing

1. Read `CLAUDE.md` for coding guidelines
2. Follow the established patterns
3. Preserve the existing visual design

## License

MIT
