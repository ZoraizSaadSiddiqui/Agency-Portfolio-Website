"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MouseEvent } from "react";

type ProjectCardProps = {
  project: {
    name: string;
    problem: string;
    result: string;
    detailsHref: string;
  };
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, {
    stiffness: 220,
    damping: 24,
    mass: 0.5,
  });
  const rotateY = useSpring(rawRotateY, {
    stiffness: 220,
    damping: 24,
    mass: 0.5,
  });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const xRatio = localX / bounds.width - 0.5;
    const yRatio = localY / bounds.height - 0.5;

    rawRotateX.set(yRatio * -7);
    rawRotateY.set(xRatio * 7);
    event.currentTarget.style.setProperty("--spot-x", `${localX}px`);
    event.currentTarget.style.setProperty("--spot-y", `${localY}px`);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <div className="project-perspective">
      <motion.article
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.85, y: 26 }
        }
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1,
              }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="project-spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d131e]/95 p-3 text-white shadow-2xl shadow-black/20 will-change-transform"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99, 102, 241, 0.24), transparent 62%)",
          }}
        />

        <motion.div
          initial={
            reduceMotion
              ? false
              : { clipPath: "inset(0 0 100% 0 round 1.1rem)" }
          }
          whileInView={{ clipPath: "inset(0 0 0% 0 round 1.1rem)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.9,
            delay: 0.12 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`project-preview project-preview-${(index % 3) + 1} relative z-10 aspect-[16/10] overflow-hidden rounded-[1.1rem] border border-white/10 p-4`}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <div className="mt-5 grid h-[calc(100%-1.75rem)] grid-cols-[0.34fr_1fr] gap-3">
            <div className="rounded-lg border border-white/10 bg-black/15 p-2">
              <div className="h-2 w-8 rounded-full bg-white/20" />
              <div className="mt-4 space-y-2">
                <div className="h-1.5 rounded-full bg-white/10" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
                <div className="h-1.5 w-3/5 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur">
              <div className="h-2 w-16 rounded-full bg-white/25" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-12 rounded-md bg-white/10" />
                <div className="h-12 rounded-md bg-white/10" />
                <div className="h-12 rounded-md bg-white/10" />
              </div>
              <div className="mt-3 h-8 rounded-md bg-black/10" />
            </div>
          </div>
        </motion.div>

        <div
          className="relative z-10 flex flex-1 flex-col px-3 pb-3 pt-6"
          style={{ transform: reduceMotion ? undefined : "translateZ(28px)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/60">
              0{index + 1}
            </span>
          </div>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                Problem
              </dt>
              <dd className="mt-2 leading-7 text-white/70">
                {project.problem}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                Result
              </dt>
              <dd className="mt-2 leading-7 text-white/70">
                {project.result}
              </dd>
            </div>
          </dl>
          <a
            href={project.detailsHref}
            className="mt-8 inline-flex items-center self-start font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
            aria-label={`View details for ${project.name}`}
          >
            View details <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>
      </motion.article>
    </div>
  );
}
