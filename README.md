# Organic Garlic Premium

India's most premium organic grocery e-commerce platform.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **3D:** Three.js + React Three Fiber + Drei
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Payments:** Razorpay (UPI)
- **Deployment:** Vercel / Cloudflare Pages

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Fill in your Supabase and Razorpay keys

# Run development server
npm run dev

# Build for production
npm run build
```

## Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in the SQL Editor
3. Copy your project URL and keys to `.env.local`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay test/live key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/           # Reusable UI components
│   ├── three/        # Three.js 3D components
│   ├── layout/       # Header, Footer
│   ├── home/         # Homepage sections
│   ├── product/      # Product pages
│   ├── cart/         # Cart drawer + page
│   ├── checkout/     # Checkout flow
│   └── admin/        # Admin dashboard
├── lib/              # Utilities, constants, data
├── store/            # Cart state management
└── types/            # TypeScript types
```

## Features

- [x] 3D hero with floating garlic
- [x] Product catalog with filtering
- [x] Product detail pages
- [x] Shopping cart (context/reducer)
- [x] Checkout with Razorpay UPI
- [x] Admin dashboard
- [x] Mobile responsive
- [x] SEO (sitemap, robots, structured data)
- [x] Supabase API routes
- [ ] Authentication (Clerk/Auth.js)
- [ ] Image optimization (product photos)
- [ ] Email notifications
- [ ] Analytics (GA4, GTM)

## License

Private - Organic Garlic Premium