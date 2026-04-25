# Rentola — Premium Car Rental App

A full-stack car rental web application built with **Next.js 16**, **Prisma**, **NextAuth.js**, and **Tailwind CSS v4**.

---

## Navigation

- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Tests](#running-tests)
- [Deployment](#deployment)

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up the database (run migrations + seed)
pnpm prisma migrate deploy
pnpm prisma db seed

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js 16 (App Router)                 |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS v4                         |
| Database     | PostgreSQL via Prisma ORM               |
| Auth         | NextAuth.js v5 (credentials provider)  |
| Testing      | Vitest + Testing Library                |
| Deployment   | Vercel                                  |

---

## Project Structure

```
rentola-app/
├── app/
│   ├── components/        # Shared UI components
│   ├── lib/               # Server actions, DB queries, utilities
│   ├── admin/             # Admin panel (cars, bookings, profile)
│   ├── dashboard/         # User dashboard (bookings, profile)
│   ├── cars/              # Car catalog & detail pages
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── about/
│   ├── contact/
│   └── api/               # API routes (NextAuth)
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Seed data
│   └── migrations/
├── public/
│   └── images/            # Static assets
└── __tests__/             # Unit & component tests
```

---

## Features

- **Dark / Light theme** with smooth transitions and persistent preference
- **Car catalog** with search, category filter and price sorting
- **Car detail page** with image gallery and specifications
- **Booking modal** with two-month calendar and time slot picker
- **User dashboard** — view and manage bookings
- **Admin panel** — manage cars and bookings
- **Authentication** — register / login with hashed passwords
- **Responsive design** — mobile-friendly across all pages

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
AUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Seed the database with sample cars and a test user
pnpm prisma db seed
```

---

## Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage report
pnpm test:coverage
```

---

## Deployment

The app is configured for deployment on **Vercel**.

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

Build command used by Vercel:
```bash
prisma generate && next build
```
