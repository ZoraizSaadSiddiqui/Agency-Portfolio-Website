"use client";

import { Container } from "@/components/container";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  label: string;
  targetValue: number;
  suffix: string;
  reduceMotion: boolean;
  isInView: boolean;
}

function StatItem({
  label,
  targetValue,
  suffix,
  reduceMotion,
  isInView,
}: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(targetValue);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const duration = 1500; // 1.5s
    const startTime = performance.now();

    const animateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Ease out quad
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easedProgress * targetValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetValue);
      }
    };

    const animationFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, reduceMotion, targetValue]);

  return (
    <div className="text-center sm:text-left">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {reduceMotion ? targetValue : count}
        <span className="text-indigo-400">{suffix}</span>
      </p>
    </div>
  );
}

const teamAvatars = [
  { name: "Alex Rivers", initials: "AR", bg: "bg-indigo-600" },
  { name: "Sarah Chen", initials: "SC", bg: "bg-indigo-500" },
  { name: "Marcus Vance", initials: "MV", bg: "bg-indigo-700" },
  { name: "Elena Rostova", initials: "ER", bg: "bg-indigo-400" },
  { name: "David Kim", initials: "DK", bg: "bg-indigo-800" },
];

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative z-10 py-10 sm:py-14">
      <Container>
        <div
          ref={ref}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111722]/90 p-8 text-slate-200 shadow-2xl shadow-black/20 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent transition-colors duration-500 group-hover:via-indigo-500/80"
          />

          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
            {/* Left side: Stats */}
            <div className="grid w-full grid-cols-3 gap-4 sm:gap-8 lg:w-auto">
              <StatItem
                label="Years of Experience"
                targetValue={5}
                suffix="+"
                reduceMotion={reduceMotion}
                isInView={isInView}
              />
              <StatItem
                label="Projects Delivered"
                targetValue={120}
                suffix="+"
                reduceMotion={reduceMotion}
                isInView={isInView}
              />
              <StatItem
                label="Happy Clients"
                targetValue={99}
                suffix="%"
                reduceMotion={reduceMotion}
                isInView={isInView}
              />
            </div>

            {/* Right side: Team */}
            <div className="flex w-full flex-col items-center border-t border-white/10 pt-6 sm:items-start lg:w-auto lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Our Team
              </p>
              <div className="mt-3 flex items-center -space-x-3 overflow-hidden">
                {teamAvatars.map((avatar, idx) => (
                  <motion.div
                    key={avatar.name}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.7 }
                    }
                    transition={{
                      delay: reduceMotion ? 0 : 0.15 * idx,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    title={avatar.name}
                    className={`inline-block h-11 w-11 rounded-full ${avatar.bg} text-white font-semibold text-xs flex items-center justify-center ${
                      idx % 2 === 0 ? "ring-2 ring-indigo-500" : "ring-2 ring-indigo-400"
                    } ring-offset-2 ring-offset-[#111722] shadow-md`}
                  >
                    {avatar.initials}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
