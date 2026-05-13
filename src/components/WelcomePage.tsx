import React, { lazy, Suspense, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { heroMotion, prefersReducedMotion } from '../lib/heroMotion';

const MountainHeroCanvas = lazy(() => import('./hero/MountainHeroCanvas'));

const cardVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const WelcomePage = () => {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 90, damping: 28, mass: 0.35 });
  const titleY = useTransform(smoothY, [0, 420], [0, -28]);
  const titleBlur = useTransform(smoothY, [0, 280], [0, 2]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const visitNoted = useRef(false);
  const [showWhisper, setShowWhisper] = React.useState(false);
  const allowMotion = !prefersReducedMotion();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      heroMotion.mx = nx;
      heroMotion.my = ny;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      heroMotion.scroll01 = Math.min(1, v / 520);
    });
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    if (visitNoted.current) return;
    visitNoted.current = true;
    try {
      const prev = Number(sessionStorage.getItem('lv_home_visits') || '0');
      if (prev >= 1) setShowWhisper(true);
      sessionStorage.setItem('lv_home_visits', String(prev + 1));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16"
    >
      {!allowMotion ? null : (
        <Suspense fallback={null}>
          <MountainHeroCanvas />
        </Suspense>
      )}

      <div
        className="pointer-events-none fixed inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(124,58,237,0.08)_55%,rgba(15,10,40,0.18)_100%)]"
        aria-hidden
      />

      <div className="text-center max-w-4xl mx-auto relative z-[8]">
        <motion.div style={{ y: titleY, filter: titleFilter }} className="mb-8 will-change-transform">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-8xl mb-4 drop-shadow-[0_0_28px_rgba(168,85,247,0.25)]"
          >
            🌸
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-dancing font-bold text-purple-700 mb-6 [text-shadow:0_2px_40px_rgba(255,255,255,0.35)]"
          >
            Luckyverse
          </motion.h1>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="rounded-3xl border border-white/50 bg-white/45 p-8 shadow-[0_8px_40px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl md:p-12"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center mb-6">
            <Heart className="text-pink-500 mr-2 animate-heartbeat drop-shadow-sm" size={24} />
            <Sparkles className="text-purple-500 ml-2 animate-sparkle drop-shadow-sm" size={24} />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6"
          >
            For Lucky — mostly NIMAS noise, a little mountain brain,
            <br />
            and the normal habit of texting after everyone else had “gone to bed.”
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 font-light mb-8 italic"
          >
            100 cadets on one campus and we still talked every day. Gate stairs after dinner. Voice notes
            that got normal way too quickly. No scorecards — just that week, and after.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(168,85,247,0.35)' }}
              whileTap={{ scale: 0.98 }}
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block cursor-default rounded-full bg-gradient-to-r from-purple-400 to-pink-400 px-8 py-4 text-lg font-medium text-white shadow-lg"
            >
              Happy Birthday, Lucky — whenever you actually open this 🎂
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 text-gray-600">
            <p className="text-sm">Same layout as before. Softer subtitles. Tap through when you want ✨</p>
          </motion.div>
        </motion.div>

        {showWhisper && allowMotion ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 1.8, duration: 0.9 }}
            className="pointer-events-none mt-10 text-xs text-purple-700/80"
          >
            Back here again? Still feels like a Meghalaya kind of evening.
          </motion.p>
        ) : null}

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="pointer-events-none absolute top-1/4 left-1/4 text-4xl opacity-30"
        >
          ⭐
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity }}
          className="pointer-events-none absolute top-1/3 right-1/4 text-3xl opacity-30"
        >
          🌙
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, delay: 2, repeat: Infinity }}
          className="pointer-events-none absolute bottom-1/4 left-1/3 text-3xl opacity-30"
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
