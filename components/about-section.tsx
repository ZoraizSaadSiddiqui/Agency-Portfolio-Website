"use client";

import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { founders } from "@/content/site-content";
import { motion } from "framer-motion";

export function AboutSection() {
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
          {founders.map((founder, index) => (
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
              className="rounded-3xl border border-white/10 bg-[#111722]/90 p-6 shadow-xl shadow-black/10 sm:p-8"
            >
              <div
                aria-hidden="true"
                className="founder-placeholder mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-[#0d131d]"
              />
              <h3 className="text-xl font-semibold">{founder.name}</h3>
              <p className="mt-1 text-sm font-medium text-indigo-300">
                {founder.role}
              </p>
              <p className="mt-4 leading-7 text-slate-400">{founder.bio}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
