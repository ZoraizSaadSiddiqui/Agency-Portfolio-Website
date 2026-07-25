"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(-40, { stiffness: 500, damping: 40, mass: 0.25 });
  const y = useSpring(-40, { stiffness: 500, damping: 40, mass: 0.25 });
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");

    if (!pointerQuery.matches || reduceMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX - 16);
      y.set(event.clientY - 16);
      setIsVisible(true);
      setIsInteractive(
        event.target instanceof Element &&
          Boolean(
            event.target.closest(
              "a, button, input, textarea, select, [data-cursor-interactive]",
            ),
          ),
      );
    };

    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border border-white/45 bg-indigo-400/10 backdrop-invert [@media(pointer:fine)]:block"
      style={{ x, y }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isInteractive ? 1.55 : 1,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
}
