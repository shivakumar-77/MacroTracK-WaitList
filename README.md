# MacroTrack — Waitlist Landing Page

A production-ready waitlist landing page for MacroTrack, an AI-powered fitness
platform. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
shadcn/ui-style components on Radix primitives, Framer Motion, GSAP
(ScrollTrigger), Firebase Firestore, React Hook Form, and Zod.

## Stack & how it's used

| Tool | What it's doing here |
|---|---|
| **Next.js 15 / TypeScript** | App Router, static generation for every route |
| **Tailwind CSS** | Styling, using CSS variables for the brand color system |
| **Radix UI + CVA** | Accessible primitives (Accordion, Select, Checkbox, Label) styled shadcn-style |
| **Framer Motion** | Scroll reveals, hero entrance, mouse-parallax phone, form success animation |
| **GSAP + ScrollTrigger** | The scroll-scrubbed connecting line in the "Why MacroTrack" timeline |
| **Firebase Firestore** | Waitlist submissions (`waitlist` collection) + live signup count |
| **React Hook Form + Zod** | Waitlist form state and validation |
| **Lucide Icons** | All iconography |

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Firebase config
npm run dev
```

Open http://localhost:3000.

### Connecting Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Add a **Web app** to the project and copy the config values into `.env.local`.
3. In **Firestore Database**, create a database (production mode is fine).
4. Add security rules that allow public *writes* to `waitlist` but not reads,
   so visitors can join the list without being able to read everyone else's
   emails:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /waitlist/{docId} {
         allow create: if request.resource.data.keys().hasAll(['name', 'email', 'goal', 'platform', 'updates', 'createdAt'])
                        && request.resource.data.email is string;
         allow read, update, delete: if false;
       }
     }
   }
   ```

   The live counter reads via `getCountFromServer`, which Firestore's count
   aggregation allows without needing document-level read access.

Until `.env.local` is filled in, the page still renders and animates fully —
the waitlist form will show an inline notice instead of submitting, and the
live counter shows "Be the first" instead of a number.

### Build & deploy

```bash
npm run build
npm run start   # or deploy the `.next` output to Vercel, which needs zero config
```

This repo was built and verified with `npm run build` (TypeScript strict
mode + ESLint both pass with zero errors) before being handed off.

## Project structure

```
src/
├── app/                  # Routes: /, /privacy, /terms, root layout
├── components/
│   ├── ui/                # Reusable primitives (Button, Card, Select, Accordion, …)
│   ├── layout/             # Navbar, Footer
│   ├── shared/             # Cross-section pieces: PhoneMockup, GradientBlob,
│   │                       # ParticleField, AnimatedCounter, Reveal, DashboardPreview
│   └── sections/           # One file per landing-page section
├── data/content.ts        # All copy: features, FAQ, timeline, platforms, founder
├── lib/                   # firebase.ts, validations.ts (Zod), utils.ts
└── types/                 # (shared types live alongside their data/schema files)
```

## Things to personalize before launch

- **`src/data/content.ts` → `FOUNDER`** — placeholder name, bio, and social
  links. Intentionally generic rather than a fabricated identity — swap in
  the real details.
- **Founder avatar** — currently renders initials rather than a photo. Swap
  `FounderSection` to an `<Image>` once you have a real photo.
- **Social links in `Footer`** — Instagram/LinkedIn currently point to `#`.
- **`src/app/privacy` and `/terms`** — honest placeholder pages; replace with
  real policies before accepting real signups.
- **Fonts** — Inter is loaded via a `<link>` tag (works everywhere, no build
  dependency on Google's servers). Swap to `next/font/google` for automatic
  self-hosting and zero layout shift once you're building somewhere with
  unrestricted internet access.

## Notes on scope

- The hero and product-preview "screenshots" are real coded UI (an actual
  React component rendering inside a CSS-drawn phone frame), not fake
  screenshot images — per the brief.
- `npm run build` bundles Framer Motion, GSAP, and the Firebase SDK; total
  first-load JS is ~336 kB. Reasonable for this feature set, but if
  Lighthouse performance matters, dynamic-`import()`-ing GSAP and the
  Firebase Firestore module (loading them only after first interaction) is
  the next optimization to reach for.
