import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '../../lib/heroMotion';

/**
 * Soft cinematic cursor glow + micro ring — pointer-events none, z under nav.
 */
export function CursorAura() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 280, damping: 26, mass: 0.28 });
  const sy = useSpring(y, { stiffness: 280, damping: 26, mass: 0.28 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (prefersReducedMotion()) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[46] h-[min(55vw,420px)] w-[min(55vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-400/28 via-violet-500/22 to-fuchsia-400/20 blur-3xl mix-blend-soft-light"
        style={{ left: sx, top: sy }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[46] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/50 bg-white/30 shadow-[0_0_28px_rgba(34,211,238,0.35),0_0_20px_rgba(139,92,246,0.25)] backdrop-blur-sm"
        style={{ left: sx, top: sy }}
      />
    </>
  );
}
