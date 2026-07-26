"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/site-content";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Tracks each node's "lit up" overlay + whether it's currently active, so
  // the activation animation only fires once per crossing (not every tick).
  const nodeOverlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeActiveState = useRef<boolean[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const stepCount = processSteps.length;

      const setNodeActive = (index: number, active: boolean) => {
        const overlay = nodeOverlayRefs.current[index];
        if (!overlay || nodeActiveState.current[index] === active) return;
        nodeActiveState.current[index] = active;

        gsap.to(overlay, {
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.85,
          duration: 0.45,
          ease: active ? "back.out(2.2)" : "power2.out",
        });
      };

      if (reduceMotion) {
        gsap.set(".process-step", { opacity: 1, y: 0, scale: 1 });
        gsap.set(".process-progress", { scaleX: 1, scaleY: 1 });
        processSteps.forEach((_, i) => setNodeActive(i, true));
        return;
      }

      const handleProgress = (progress: number) => {
        processSteps.forEach((_, i) => {
          const threshold = stepCount > 1 ? i / (stepCount - 1) : 0;
          setNodeActive(i, progress >= threshold - 0.02);
        });
      };

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
              onUpdate: (self) => handleProgress(self.progress),
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
              onUpdate: (self) => handleProgress(self.progress),
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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
            eyebrow="Our Process"
            heading="A clear path from operational bottleneck to working digital system"
          />
        </div>

        <div className="relative mt-14">
          {/* Connecting line — gradient track with a scrub-driven fill */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-6 top-0 w-px overflow-hidden rounded-full bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-auto"
          >
            <div className="process-progress h-full w-full bg-gradient-to-b from-indigo-500 to-purple-500 lg:bg-gradient-to-r" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="process-step grid grid-cols-[3rem_1fr] gap-5 lg:block"
              >
                {/* Node — base ring + gradient overlay that lights up in sync with scroll */}
                <div
                  aria-hidden="true"
                  className="relative z-10 h-12 w-12 shrink-0"
                >
                  <div className="absolute inset-0 rounded-full border border-white/15 bg-[#111722] shadow-lg shadow-black/20" />
                  <div
                    ref={(el) => {
                      nodeOverlayRefs.current[index] = el;
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 shadow-[0_0_18px_2px_rgba(99,102,241,0.45)]"
                    style={{ transform: "scale(0.85)" }}
                  />
                  <span className="relative flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                    0{index + 1}
                  </span>
                </div>

                {/* Step content card */}
                <div className="group relative rounded-2xl pt-1 transition-colors duration-300 lg:mt-5 lg:pt-0">
                  <div className="lg:rounded-2xl lg:border lg:border-transparent lg:p-5 lg:transition-all lg:duration-300 lg:hover:border-indigo-500/25 lg:hover:bg-white/[0.03]">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}