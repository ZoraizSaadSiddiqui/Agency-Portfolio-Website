# Agency Portfolio Website

A static, single-page marketing site for an automation and web development
agency. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## Getting started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Content and configuration

- Update all site copy, cards, navigation, links, and contact details in
  `data/site-content.ts`. It is the single source of truth for content.
- Replace the placeholder business email, phone number, website URL, social URLs,
  and address before launch.
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY` to enable
  contact-form delivery through Web3Forms.
- Update component layout and styling in `components/` only when changing the UI.

## Project structure

- `app/` contains routes, global styles, and metadata.
- `components/effects/` contains visual and motion behavior.
- `components/layout/` contains shared navigation and footer UI.
- `components/sections/` contains page sections.
- `components/ui/` contains reusable presentational components.
- `data/site-content.ts` contains all editable site content.
- `lib/` contains shared helpers and `types/` contains shared TypeScript types.

## Contact form

The contact page submits directly to Web3Forms and shows loading, success, and
failure states without a page navigation. If the Web3Forms key is missing, the
form shows a clear setup message and visitors can still use the displayed email
and phone links.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
