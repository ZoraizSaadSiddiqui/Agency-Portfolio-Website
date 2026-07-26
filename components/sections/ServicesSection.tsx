"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/site-content";
import { motion, useReducedMotion, type Variants } from "framer-motion";

function ServiceIcon({ name }: { name?: string }) {
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

  switch (name) {
    case "automation":
      return (
        <svg {...commonProps}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <circle cx="12" cy="12" r="4" />
          <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
        </svg>
      );
    case "cod":
      return (
        <svg {...commonProps}>
          <path d="M20 7.5 12 3 4 7.5 12 12z" />
          <path d="M4 7.5v9l8 4.5 8-4.5v-9" />
          <path d="M12 12v9" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "web":
      return (
        <svg {...commonProps}>
          <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
        </svg>
      );
    case "app":
      return (
        <svg {...commonProps}>
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <path d="M11 18h2" />
        </svg>
      );
    case "ai":
      return (
        <svg {...commonProps}>
          <path d="m12 3 1.9 4.8 4.8 1.9-4.8 1.9L12 16.5l-1.9-4.8-4.8-1.9 4.8-1.9z" />
          <path d="M6 3v4M4 5h4M19 15v4M17 17h4" />
        </svg>
      );
    case "rag":
      return (
        <svg {...commonProps}>
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v6c0 1.66 3.13 3 7 3 .6 0 1.18-.03 1.74-.09" />
          <path d="M5 11v6c0 1.66 3.13 3 7 3 1.2 0 2.33-.13 3.32-.37" />
          <circle cx="17.5" cy="17.5" r="3" />
          <path d="m19.6 19.6 2.4 2.4" />
        </svg>
      );
    case "vision":
      return (
        <svg {...commonProps}>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "data":
      return (
        <svg {...commonProps}>
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-4" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export function ServicesSection() {
  const reduceMotion = useReducedMotion();

  const cardsVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 28, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? { duration: 0.2 }
        : { type: "spring", stiffness: 230, damping: 22 },
    },
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative border-t border-white/10 bg-white/[0.018] py-16 sm:py-20"
    >
      <Container>
        <div id="services-heading">
          <SectionHeading
            eyebrow="Our Services"
            heading="Websites and systems that work together"
            description="We combine customer-facing development with behind-the-scenes automation, so your business looks clear from the outside and runs smoothly on the inside."
          />
        </div>

        <div className="relative mt-10">
          <motion.div
            variants={cardsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                variants={cardVariants}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -7,
                        borderColor: "rgba(99, 102, 241, 0.5)",
                        boxShadow:
                          "0 22px 48px -12px rgba(79, 70, 229, 0.35), 0 8px 20px rgba(0, 0, 0, 0.3)",
                      }
                }
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#111722]/90 p-5 text-slate-200 shadow-lg shadow-black/10 sm:p-6"
              >
                {/* Top hairline sweep on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent transition-colors duration-500 group-hover:via-indigo-500/80"
                />

                <div>
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.65, 1, 0.65],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 3.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.4,
                          }
                    }
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { rotate: 6, scale: 1.08 }
                    }
                    className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 transition-colors duration-300 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/20"
                  >
                    <ServiceIcon name={service.icon} />
                  </motion.div>
                  <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                    {service.description}
                  </p>
                </div>

                <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="group/item flex items-start gap-2"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="mt-[3px] h-3 w-3 shrink-0 text-indigo-400/70 transition-transform duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-indigo-300"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}