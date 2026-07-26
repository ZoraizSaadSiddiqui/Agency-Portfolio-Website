"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MagneticLink } from "@/components/effects/MagneticLink";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/site-content";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2, staggerChildren: 0.065 },
  },
};

const word: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

// Controlled line breaks so the headline never wraps awkwardly (e.g. a lone
// word stranded on its own line) at any viewport width. Each sub-array is
// one visual line; adjust word counts here if the copy in site-content.ts
// changes, rather than letting the browser reflow decide.
const HEADING_LINE_BREAKS = [3, 4, 4] as const;

function splitIntoLines(heading: string, breaks: readonly number[]) {
  const words = heading.trim().split(/\s+/);
  const lines: string[][] = [];
  let cursor = 0;

  for (const count of breaks) {
    lines.push(words.slice(cursor, cursor + count));
    cursor += count;
  }

  // Any leftover words (e.g. if copy changes and breaks aren't updated)
  // get appended to the final line instead of silently disappearing.
  if (cursor < words.length) {
    lines[lines.length - 1] = [
      ...lines[lines.length - 1],
      ...words.slice(cursor),
    ];
  }

  return lines;
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const lines = splitIntoLines(hero.heading, HEADING_LINE_BREAKS);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(100svh-4rem)] py-10 sm:py-14 lg:flex lg:items-center lg:py-16"
    >
      <Container className="relative">
        <div className="max-w-5xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            id="hero-heading"
            aria-label={hero.heading}
            variants={container}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="mt-5 text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
          >
            {lines.map((lineWords, lineIndex) => (
              <span
                key={`line-${lineIndex}`}
                aria-hidden="true"
                className="flex flex-wrap"
              >
                {lineWords.map((w, i) => (
                  <span
                    key={`${w}-${lineIndex}-${i}`}
                    className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                  >
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.65 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            {hero.subheading}
          </motion.p>

          <MagneticLink
            href={hero.cta.href}
            className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 font-medium text-slate-950 shadow-lg shadow-indigo-500/20"
          >
            <span>{hero.cta.label}</span>
            <span aria-hidden="true" className="ml-3 text-lg">
              ↗
            </span>
          </MagneticLink>
        </div>
      </Container>
    </section>
  );
}