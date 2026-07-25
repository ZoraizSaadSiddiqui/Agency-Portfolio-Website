"use client";

import { Container } from "@/components/container";
import { MagneticLink } from "@/components/motion/magnetic-link";
import { hero } from "@/content/site-content";
import { motion, type Variants } from "framer-motion";

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.065,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroSection() {
  const words = hero.heading.split(" ");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden py-20 sm:py-28 lg:flex lg:items-center lg:py-32"
    >
      <div aria-hidden="true" className="hero-aurora absolute inset-0 -z-30" />
      <div aria-hidden="true" className="hero-blob hero-blob-blue -z-20" />
      <div aria-hidden="true" className="hero-blob hero-blob-purple -z-20" />
      <div aria-hidden="true" className="hero-blob hero-blob-teal -z-20" />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />

      <Container className="relative">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.55 }}
            className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-300"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-heading"
            aria-label={hero.heading}
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            {words.map((word, index) => (
              <span
                aria-hidden="true"
                key={`${word}-${index}`}
                className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  variants={wordVariants}
                  className="inline-block will-change-transform"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
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
