"use client";

import type { ProjectItem } from "@/types";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import type { MouseEvent } from "react";

type ProjectCardProps = {
  project: ProjectItem;
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

    rawRotateX.set(yRatio * -6);
    rawRotateY.set(xRatio * 6);
    event.currentTarget.style.setProperty("--spot-x", `${localX}px`);
    event.currentTarget.style.setProperty("--spot-y", `${localY}px`);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const isExternal = /^https?:\/\//.test(project.detailsHref);

  return (
    <div className="project-perspective h-full">
      <motion.article
        initial={
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, scale: 0.92, y: 20 }
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
        className="project-spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d131e]/95 p-6 text-white shadow-2xl shadow-black/20 will-change-transform"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99, 102, 241, 0.24), transparent 62%)",
          }}
        />

        <div
          className="relative z-10 flex h-full flex-col"
          style={{ transform: reduceMotion ? undefined : "translateZ(28px)" }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              {project.category || "Case Study"}
            </span>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-white/60">
              0{index + 1}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {project.name}
          </h3>

          {project.metrics ? (
            <span className="mt-3 inline-flex w-fit items-center rounded-full border border-indigo-400/30 bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-300">
              {project.metrics}
            </span>
          ) : null}

          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                Problem
              </dt>
              <dd className="mt-1 leading-relaxed text-white/70">
                {project.problem}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                Result
              </dt>
              <dd className="mt-1 leading-relaxed text-white/90 font-medium">
                {project.result}
              </dd>
            </div>
          </dl>

          {project.tags && project.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              href={project.detailsHref}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center font-medium text-white hover:text-indigo-300 transition-colors"
              aria-label={`View details for ${project.name}`}
            >
              View details <span aria-hidden="true" className="ml-2">↗</span>
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}