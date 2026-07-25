"use client";

import { Container } from "@/components/container";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    href: "#",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.767-9.233M13.233 13.233L20 4" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "#",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.79-.17-2.01.03-2.87.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.72-4.08-4.19-4.08-2.85 0-4.53 2.14-4.53 4.35 0 .86.33 1.78.74 2.28a.3.3 0 0 1 .07.28c-.08.33-.26 1.06-.3 1.2-.05.21-.18.26-.41.16-1.53-.71-2.48-2.95-2.48-4.75 0-3.87 2.81-7.42 8.11-7.42 4.26 0 7.57 3.03 7.57 7.09 0 4.23-2.67 7.64-6.37 7.64-1.24 0-2.41-.65-2.81-1.41l-.77 2.92c-.28 1.07-1.03 2.41-1.54 3.24C9.56 21.84 10.75 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Web Application", href: "#services" },
  { label: "App Development", href: "#services" },
  { label: "Desktop Application", href: "#services" },
  { label: "Game Development", href: "#services" },
  { label: "Branding", href: "#services" },
  { label: "Application Security", href: "#services" },
  { label: "Social Media Marketing", href: "#services" },
];

const companyLinks = [
  { label: "Company", href: "#about" },
  { label: "Blog", href: "#" },
  { label: "Contact Us", href: "/contact" },
  { label: "Our Products", href: "#projects" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Hire An Expert", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#070b12] py-16 text-slate-300">
      <Container>
        {/* Top CTA Banner */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/40 via-[#0e1626]/80 to-[#111927] p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Your Solutions Are One Call Away — Let&apos;s Reach Out Today!
            </h2>
            <p className="mt-3 text-slate-400">
              Transform your digital presence and streamline business operations with our engineering experts.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-colors duration-200 hover:bg-indigo-500"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/923132471870"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/15"
            >
              Talk Now
            </a>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Brand Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/40">
                A
              </span>
              <span>Agency</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Step into the future of ingenious solutions. We build high-impact digital systems and websites that drive continuous growth.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase tracking-wider text-indigo-400">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h3 className="mb-4 text-base font-semibold uppercase tracking-wider text-indigo-400">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 transition-colors duration-200 hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact Us & Newsletter */}
          <div className="space-y-5">
            <h3 className="text-base font-semibold uppercase tracking-wider text-indigo-400">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href="mailto:info@agency.com"
                className="flex items-center gap-3 transition-colors duration-200 hover:text-indigo-400"
              >
                <svg className="h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@agency.com</span>
              </a>
              <a
                href="tel:+923132471870"
                className="flex items-center gap-3 transition-colors duration-200 hover:text-indigo-400"
              >
                <svg className="h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+92 313 2471870</span>
              </a>
            </div>

            {/* Newsletter Input Pill */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-4">
              <label htmlFor="footer-newsletter" className="sr-only">
                Subscribe to newsletter
              </label>
              <div className="relative flex items-center">
                <input
                  id="footer-newsletter"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter"
                  className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors duration-200 hover:bg-indigo-500"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500 sm:mt-16">
          <p>© {new Date().getFullYear()} Agency. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
