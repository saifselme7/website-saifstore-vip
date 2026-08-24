# SAIF STORE

Premium fashion and digital products e-commerce platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Storefront**: Home, Products, Product Detail, Search, Categories
- **Physical & Digital Products**: Full support for both product types
- **Cart & Checkout**: Real cart with order creation
- **Authentication**: Sign up, Login, Profile, Order History
- **Wishlist**: Save favorite products
- **Admin Dashboard**: Products, Orders, Categories, Customers, Coupons, Reviews, Settings
- **Supabase Backend**: Real database with RLS, Auth, and Storage

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://gheiosuruzvzvorvalfv.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

Get your publishable key from: Supabase Dashboard → Project Settings → API → `anon/public` key.

### 3. Set Up Supabase Database

1. Open your Supabase project SQL Editor
2. Run the files in this order:
   - `supabase/schema.sql`
   - `supabase/rls.sql`
   - `supabase/seed.sql`

### 4. Enable Authentication

1. Go to Authentication → Providers → Email
2. Enable Email provider
3. Set Site URL to `http://localhost:5173` (or your deployed URL)

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 6. Build for Production

```bash
npm run build
```

### 7. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Make sure to add your environment variables in the Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Project Structure

```
saif-store/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── components/admin/# Admin layout
│   ├── context/         # React contexts (Auth, Cart, App)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities, Supabase client, constants
│   ├── pages/           # Store pages
│   ├── pages/admin/     # Admin dashboard pages
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles + Tailwind
├── supabase/
│   ├── schema.sql       # Database schema
│   ├── rls.sql          # Row Level Security policies
│   └── seed.sql         # Demo data
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── .env.example
```

## Admin Access

After signing up, manually update the user's role in Supabase:

```sql
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
```

Then navigate to `/admin`.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Supabase (Auth, Database, Storage)
- Lucide React (icons)

## License

MIT
