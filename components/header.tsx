"use client";

import { Container } from "@/components/container";
import { megaMenu } from "@/content/site-content";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MenuIconName =
  | "code"
  | "automation"
  | "orders"
  | "projects"
  | "process"
  | "people";

function MenuIcon({ name }: { name: MenuIconName }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };

  if (name === "code") {
    return (
      <svg {...commonProps}>
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
      </svg>
    );
  }

  if (name === "automation") {
    return (
      <svg {...commonProps}>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <circle cx="12" cy="12" r="4" />
        <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      </svg>
    );
  }

  if (name === "orders") {
    return (
      <svg {...commonProps}>
        <path d="M5 4h14v16H5zM8 8h8M8 12h5M8 16h3" />
      </svg>
    );
  }

  if (name === "projects") {
    return (
      <svg {...commonProps}>
        <path d="M4 7h16v12H4zM7 4h10v3M8 11h8M8 15h5" />
      </svg>
    );
  }

  if (name === "process") {
    return (
      <svg {...commonProps}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="6" cy="18" r="2" />
        <path d="M8 6h3a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3M8 18h3a3 3 0 0 0 3-3v0a3 3 0 0 1 3-3" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 14.5a4.5 4.5 0 0 1 6.5 4" />
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const previousOverflow = document.body.style.overflow;

    if (mobileQuery.matches) {
      document.body.style.overflow = "hidden";
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const listVariants: Variants = {
    hidden: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.025,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.06,
        staggerChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.12 }
        : { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/75 backdrop-blur-xl"
    >
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link href="/" onClick={closeMenu} className="font-semibold text-white">
          Agency Name
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm text-slate-300 lg:flex"
        >
          <Link href="/" onClick={closeMenu} className="transition-colors hover:text-white">
            Home
          </Link>
          <Link
            href="/#projects"
            onClick={closeMenu}
            className="transition-colors hover:text-white"
          >
            Projects
          </Link>
          <Link
            href="/#process"
            onClick={closeMenu}
            className="transition-colors hover:text-white"
          >
            Process
          </Link>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-mega-menu"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            Explore
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 320, damping: 24 }
              }
            >
              <path
                d="m4 6 4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            onClick={closeMenu}
            className="hidden min-h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-slate-950 transition-transform duration-300 hover:scale-[1.03] lg:inline-flex"
          >
            Get in touch
          </Link>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-mega-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            <motion.span
              aria-hidden="true"
              className="absolute h-px w-4 bg-current"
              animate={
                isOpen
                  ? { rotate: 45, y: 0 }
                  : { rotate: 0, y: -3 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute h-px w-4 bg-current"
              animate={
                isOpen
                  ? { rotate: -45, y: 0 }
                  : { rotate: 0, y: 3 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="site-mega-menu"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, scale: 0.97, scaleY: 0.92 }
            }
            animate={{ opacity: 1, y: 0, scale: 1, scaleY: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.98, scaleY: 0.94 }
            }
            transition={
              reduceMotion
                ? { duration: 0.12 }
                : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
            }
            className="fixed inset-x-4 bottom-4 top-20 origin-top overflow-hidden rounded-3xl border border-white/10 bg-[#0b111c]/98 shadow-2xl shadow-black/50 lg:absolute lg:inset-x-0 lg:bottom-auto lg:top-[calc(100%+0.75rem)] lg:mx-auto lg:h-auto lg:w-[min(72rem,calc(100vw-3rem))]"
          >
            <motion.nav
              aria-label="Explore"
              data-lenis-prevent
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="h-full overflow-y-auto p-5 sm:p-7 lg:h-auto lg:overflow-visible"
            >
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5 lg:hidden">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-indigo-300">
                  Explore
                </p>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950"
                >
                  Get in touch
                </Link>
              </div>

              <div className="grid gap-7 lg:grid-cols-3 lg:gap-5">
                {megaMenu.map((category) => (
                  <section key={category.title}>
                    <motion.p
                      variants={itemVariants}
                      className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500"
                    >
                      {category.title}
                    </motion.p>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <motion.a
                          key={item.label}
                          variants={itemVariants}
                          href={item.href}
                          onClick={closeMenu}
                          className="group flex gap-3 rounded-2xl border border-transparent p-3 transition-colors hover:border-white/10 hover:bg-white/[0.045]"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-300 transition-colors group-hover:border-indigo-400/30 group-hover:bg-indigo-400/10">
                            <MenuIcon name={item.icon} />
                          </span>
                          <span>
                            <span className="block font-medium text-white">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-sm leading-5 text-slate-400">
                              {item.description}
                            </span>
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
