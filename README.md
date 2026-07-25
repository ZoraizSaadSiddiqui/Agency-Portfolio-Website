# Agency portfolio website

A static, single-page marketing site for an automation and web development
agency. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## Getting started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Editing the site

- Update page copy, services, projects, process steps, founder bios, and the form
  endpoint in `content/site-content.ts`.
- Update each section's markup in `components/`.
- Replace `Agency Name` in the header and footer before launch.
- Set `contact.formEndpoint` to the third-party form action URL when it is ready.

## Animation system

- `components/motion/smooth-scroll-provider.tsx` owns Lenis and keeps it synced
  with GSAP ScrollTrigger.
- `components/motion/custom-cursor.tsx` renders the fine-pointer cursor accent.
- `components/motion/magnetic-link.tsx` contains the reusable magnetic CTA.
- Framer Motion handles component entrances and hover interactions.
- GSAP ScrollTrigger drives the process timeline's scroll-linked progress.
- Reduced-motion preferences disable smooth scrolling and simplify or remove
  non-essential movement.

The contact form submits with `fetch` so it can show loading, failure, and
success states without a hard page navigation. The third-party form service
must accept cross-origin form submissions and return a successful HTTP status.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
