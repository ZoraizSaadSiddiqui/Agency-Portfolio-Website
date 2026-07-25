"use client";

import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { processSteps } from "@/content/site-content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".process-step", { opacity: 1, y: 0 });
        gsap.set(".process-progress", { scaleX: 1, scaleY: 1 });
        return;
      }

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          ".process-progress",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 58%",
              end: "bottom 68%",
              scrub: 0.45,
            },
          },
        );
      });

      media.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          ".process-progress",
          { scaleY: 0, transformOrigin: "center top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 64%",
              end: "bottom 76%",
              scrub: 0.45,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      return () => media.revert();
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="border-t border-white/10 bg-white/[0.018] py-16 sm:py-24"
    >
      <Container>
        <div id="process-heading">
          <SectionHeading
            eyebrow="Process"
            heading="A clear path from bottleneck to working system"
          />
        </div>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-6 top-0 w-px bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-auto"
          >
            <div className="process-progress h-full w-full bg-indigo-500" />
          </div>
          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="process-step grid grid-cols-[3rem_1fr] gap-5 lg:block"
            >
              <div
                aria-hidden="true"
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#111722] text-sm font-semibold text-white shadow-lg shadow-black/20"
              >
                0{index + 1}
              </div>
              <div className="pt-1 lg:pt-0">
                <h3 className="lg:mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
