"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { founders } from "@/data/site-content";
import { motion, useReducedMotion } from "framer-motion";

export function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-white/10 py-16 sm:py-24"
    >
      <Container>
        <div id="about-heading">
          <SectionHeading
            eyebrow="About"
            heading="A small team focused on useful outcomes"
            description="We bring technical execution and operational thinking into one working relationship."
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {founders.map((founder, index) => {
            const initials =
              founder.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "FN";

            return (
              <motion.article
                key={`${founder.role}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                        boxShadow:
                          "0 24px 55px -14px rgba(79, 70, 229, 0.3), 0 10px 24px rgba(0, 0, 0, 0.3)",
                      }
                }
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111722]/90 p-6 shadow-xl shadow-black/10 transition-colors duration-300 hover:border-indigo-500/30 sm:p-8"
              >
                {/* Top hairline sweep on hover, consistent with other sections */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent transition-colors duration-500 group-hover:via-indigo-500/60"
                />

                {/* Faint oversized initial watermark — quiet editorial touch */}
                <div className="relative">
                  <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                    {/* Slow rotating aura behind the avatar — subtle signature detail */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute -inset-1.5 rounded-2xl opacity-60"
                      style={{
                        background:
                          "conic-gradient(from 0deg, rgba(99,102,241,0.55), rgba(168,85,247,0.35), transparent 40%, transparent 60%, rgba(99,102,241,0.55))",
                      }}
                      animate={reduceMotion ? undefined : { rotate: 360 }}
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 14,
                              repeat: Infinity,
                              ease: "linear",
                            }
                      }
                    />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/30 via-indigo-900/20 to-slate-900 text-2xl font-bold text-indigo-300 shadow-inner transition-transform duration-300 group-hover:scale-[1.04]">
                      {initials}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {founder.name}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-indigo-400"
                    />
                    <p className="text-sm font-medium text-indigo-300">
                      {founder.role}
                    </p>
                  </div>

                  <p className="mt-4 border-l border-white/10 pl-4 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:border-indigo-500/30 sm:text-base sm:leading-7">
                    {founder.bio}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
