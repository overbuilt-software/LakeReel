# LakeReel

Mobile-first fishing web app for anglers. Find lake conditions, read fishing reports, and shop recommended tackle.

**lakereel.com** — built by [Overbuilt Software LLC](https://overbuiltsoftware.com)

## Features

- Live lake conditions (water temp, air temp, wind) via USGS + Open-Meteo
- Fishing reports by lake
- Contextual tackle recommendations with affiliate links
- Submit your own fishing report
- Mobile-first design

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Supabase](https://supabase.com) (database + auth)
- TypeScript

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
