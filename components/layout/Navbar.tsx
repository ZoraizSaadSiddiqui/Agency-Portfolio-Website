"use client";

import { Container } from "@/components/ui/Container";
import { companyInfo, megaMenu, mobilePrimaryLinks } from "@/data/site-content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 7H20M4 12H20M4 17H14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile sidebar
  const [isExploreOpen, setIsExploreOpen] = useState(false); // desktop dropdown
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false); // mobile accordion
  const navbarRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Close everything on outside click / Escape
  useEffect(() => {
    if (!isMenuOpen && !isExploreOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        navbarRef.current &&
        event.target instanceof Node &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsExploreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsExploreOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, isExploreOpen]);

  // Lock body scroll while mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsExploreOpen(false);
    setIsMobileExploreOpen(false);
  };

  const renderMegaMenuGrid = () => (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
      {megaMenu.map((category) => (
        <div key={category.title}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {category.title}
          </p>
          <div className="space-y-2">
            {category.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeAll}
                className="block rounded-2xl border border-transparent px-3 py-2.5 outline-none transition-colors hover:border-white/10 hover:bg-white/[0.045] focus-visible:border-indigo-400/30 focus-visible:bg-white/[0.045] focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <span className="block font-medium text-white">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm leading-5 text-slate-400">
                  {item.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/75 backdrop-blur-xl"
    >
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={closeAll}
          className="rounded-md font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12]"
        >
          {companyInfo.name}
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm text-slate-300 lg:flex"
        >
          {mobilePrimaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeAll}
              className="rounded-md outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12]"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            aria-expanded={isExploreOpen}
            aria-controls="desktop-explore-menu"
            onClick={() => setIsExploreOpen((current) => !current)}
            className="inline-flex items-center gap-1.5 rounded-md outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12]"
          >
            Explore
            <motion.span
              aria-hidden="true"
              className="flex"
              animate={{ rotate: isExploreOpen ? 180 : 0 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 24 }}
            >
              <ChevronIcon className="h-4 w-4" />
            </motion.span>
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            onClick={closeAll}
            className="hidden min-h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-slate-950 outline-none transition-transform duration-300 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12] lg:inline-flex"
          >
            Get in touch
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-sidebar"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white outline-none transition-colors hover:border-white/30 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b12] lg:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <AnimatePresence initial={false} mode="wait">
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  className="flex"
                >
                  <CloseIcon className="h-4.5 w-4.5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  className="flex"
                >
                  <MenuIcon className="h-4.5 w-4.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {/* Desktop dropdown — opens below navbar, only on lg+ */}
      <AnimatePresence>
        {isExploreOpen ? (
          <motion.div
            id="desktop-explore-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={reduceMotion ? { duration: 0.12 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-50 mx-auto hidden w-[min(72rem,calc(100vw-3rem))] rounded-3xl border border-white/10 bg-[#0b111c] p-7 shadow-2xl shadow-black/50 lg:top-[calc(100%+0.75rem)] lg:block"
          >
            {renderMegaMenuGrid()}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.div
              aria-hidden="true"
              onClick={closeAll}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />

            <motion.div
              id="mobile-sidebar"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              transition={reduceMotion ? { duration: 0.12 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-[60%] min-w-[280px] flex-col overflow-hidden border-l border-white/10 bg-[#0b111c]/95 shadow-2xl shadow-black/60 backdrop-blur-2xl lg:hidden"
            >
              {/* Soft ambient glow for a bit of depth */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
              />

              <nav
                aria-label="Mobile navigation"
                data-lenis-prevent
                className="relative flex h-full min-h-0 flex-1 flex-col overflow-y-auto p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              >
                <div className="mb-6 flex shrink-0 items-center justify-between border-b border-white/10 pb-5">
                  <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
                    Menu
                  </span>
                  <button
                    type="button"
                    onClick={closeAll}
                    aria-label="Close menu"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white outline-none transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b111c]"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Home / Projects / Process */}
                <div className="mb-2 flex shrink-0 flex-col gap-0.5">
                  {mobilePrimaryLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={closeAll}
                      className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-white outline-none transition-colors hover:bg-white/[0.045] focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Explore — accordion trigger, same style as the links above */}
                  <button
                    type="button"
                    aria-expanded={isMobileExploreOpen}
                    aria-controls="mobile-explore-panel"
                    onClick={() => setIsMobileExploreOpen((current) => !current)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium text-white outline-none transition-colors hover:bg-white/[0.045] focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-indigo-400/60 ${
                      isMobileExploreOpen ? "bg-white/[0.045]" : ""
                    }`}
                  >
                    Explore
                    <motion.span
                      aria-hidden="true"
                      className="flex text-slate-400"
                      animate={{ rotate: isMobileExploreOpen ? 180 : 0 }}
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 24 }}
                    >
                      <ChevronIcon className="h-4 w-4" />
                    </motion.span>
                  </button>

                  {/* Mega menu — only shows once Explore is clicked */}
                  <AnimatePresence initial={false}>
                    {isMobileExploreOpen ? (
                      <motion.div
                        id="mobile-explore-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.12 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 border-l border-white/10 py-3 pl-4 pr-1">
                          {renderMegaMenuGrid()}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="relative mt-auto shrink-0 border-t border-white/10 pt-5">
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-slate-950 outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b111c]"
                  >
                    Get in touch
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
