"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type MagneticLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function MagneticLink({
  children,
  href,
  className = "",
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.35 });

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    rawY.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  };

  const resetPosition = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      style={{ x, y }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.035,
              boxShadow: "0 18px 45px rgba(79, 70, 229, 0.28)",
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      className="inline-block rounded-full"
    >
      <Link
        href={href}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetPosition}
      >
        {children}
      </Link>
    </motion.div>
  );
}
