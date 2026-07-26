"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  companyInfo,
  footerCompanyLinks,
  footerQuickLinks,
} from "@/data/site-content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterStatus = "idle" | "loading" | "success" | "error";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    hoverClass: "hover:text-[#4d94ff] hover:border-[#4d94ff]/40 hover:bg-[#4d94ff]/10 hover:shadow-[#4d94ff]/25",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    hoverClass: "hover:text-white hover:border-white/40 hover:bg-white/10 hover:shadow-white/20",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    href: "#",
    hoverClass: "hover:text-white hover:border-white/40 hover:bg-white/10 hover:shadow-white/20",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.767-9.233M13.233 13.233L20 4" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    hoverClass: "hover:text-[#4d94ff] hover:border-[#4d94ff]/40 hover:bg-[#4d94ff]/10 hover:shadow-[#4d94ff]/25",
    icon: (
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded text-slate-400 outline-none transition-all duration-200 hover:translate-x-0.5 hover:text-indigo-300 focus-visible:translate-x-0.5 focus-visible:text-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400/60"
    >
      <span className="h-1 w-1 shrink-0 rounded-full bg-slate-600 transition-colors duration-200 group-hover:bg-indigo-400 group-focus-visible:bg-indigo-400" />
      {label}
    </Link>
  );
}

function EmailLink() {
  const subject = encodeURIComponent(`Website enquiry for ${companyInfo.name}`);
  const body = encodeURIComponent(
    `Hello ${companyInfo.name},\n\nI'd like to discuss a project.\n\nName:\nCompany:\nMessage:\n\nThank you.`
  );
  const gmailComposeUrl =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(companyInfo.email)}` +
    `&su=${subject}&body=${body}`;

  return (
    <a
      href={gmailComposeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 pr-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:shadow-lg hover:shadow-indigo-950/30 focus-visible:-translate-y-0.5 focus-visible:border-indigo-400/60 focus-visible:ring-2 focus-visible:ring-indigo-400/60"
      aria-label={`Compose an email to ${companyInfo.email}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300 transition-all duration-200 group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white">
        <MailIcon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 transition-colors group-hover:text-indigo-300">
          Email us
        </span>
        <span className="block truncate text-sm text-slate-300 transition-colors group-hover:text-white">
          {companyInfo.email}
        </span>
      </span>
      <ArrowIcon className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-indigo-300" />
    </a>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never fill this
  const [status, setStatus] = useState<NewsletterStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Silently drop likely-bot submissions instead of erroring, so we don't
    // tip off scrapers while still protecting the list.
    if (company) {
      setEmail("");
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Swap this for a real call, e.g.:
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-white">Stay in the loop</p>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="footer-newsletter" className="sr-only">
          Email address
        </label>

        {/* Honeypot field — visually and semantically hidden from real users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="footer-company">Company</label>
          <input
            id="footer-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="relative flex items-center">
          <MailIcon className="pointer-events-none absolute left-4 h-4 w-4 text-slate-500" />
          <input
            id="footer-newsletter"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            required
            disabled={status === "loading"}
            aria-invalid={status === "error"}
            aria-describedby="footer-newsletter-status"
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 transition-colors duration-200 focus:border-indigo-500/60 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            disabled={status === "loading"}
            className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white transition-transform duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <SpinnerIcon className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <p id="footer-newsletter-status" role="status" aria-live="polite" className="mt-2 min-h-[1rem] text-xs">
          {status === "success" && (
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <CheckIcon className="h-3.5 w-3.5" /> Thanks for subscribing!
            </span>
          )}
          {status === "error" && <span className="text-rose-400">{errorMessage}</span>}
        </p>
      </form>
    </div>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const fadeUp = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 pb-10 pt-16 text-slate-300 sm:pt-20">
      {/* Frosted glass layer — lets the fixed AmbientBackground (blue/purple/teal blobs)
          glow through softly instead of hiding it behind a flat color. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#070b12]/75 backdrop-blur-2xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-purple-500/15 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-[100px]" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container>
        {/* Top CTA Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative mb-20 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-950/60 via-[#0e1626]/80 to-[#111927]/80 p-5 shadow-[0_0_80px_-20px_rgba(99,102,241,0.4)] sm:p-12"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-indigo-400/20" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border border-purple-400/20" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Let&apos;s build something great
              </span>
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                Your Solutions Are One Call Away &mdash; Let&apos;s Connect Today!
              </h2>
              <p className="mt-3 max-w-lg text-slate-400">
                Transform your digital presence and streamline business operations with our engineering experts.
              </p>
            </div>
            <div className="flex w-full flex-nowrap gap-2 sm:w-auto sm:gap-3">
              <Link
                href="/contact"
                className="group inline-flex min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 outline-none transition-all duration-200 hover:shadow-indigo-500/50 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111927] sm:flex-none sm:px-6 sm:text-base"
              >
                Contact Us
                <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-3 text-sm font-semibold text-white outline-none backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111927] sm:flex-none sm:px-6 sm:text-base"
              >
                Talk Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* 4-Column Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8"
        >
          {/* Column 1 — Brand Block */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 text-xl font-bold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-600/40">
                A
              </span>
              <span>{companyInfo.name}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Step into the future of digital solutions. We build high-impact digital systems and web apps that drive continuous growth.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 outline-none transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${social.hoverClass}`}
                >
                  {social.icon}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0b111c] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <nav aria-label="Services">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <div className="mb-5 h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <ul className="space-y-3 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Company */}
          <nav aria-label="Company">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <div className="mb-5 h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <ul className="space-y-3 text-sm">
              {footerCompanyLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Contact Us & Newsletter */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-white">
                Contact Us
              </h3>
              <div className="mb-5 h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="space-y-3 text-sm text-slate-400">
                <EmailLink />
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="group flex items-center gap-3 outline-none transition-colors duration-200 hover:text-indigo-300 focus-visible:text-indigo-300"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-indigo-400 transition-colors duration-200 group-hover:bg-indigo-500/15">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  <span>{companyInfo.formattedPhone}</span>
                </a>
              </div>
            </div>

            <NewsletterForm />
          </div>
        </motion.div>

        {/* Divider & Copyright */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded text-sm text-slate-500 outline-none transition-colors duration-200 hover:text-indigo-300 focus-visible:text-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-indigo-400/40 group-hover:bg-indigo-500/10">
              <ArrowIcon className="h-3.5 w-3.5 -rotate-90" />
            </span>
          </button>
        </div>
      </Container>
    </footer>
  );
}
