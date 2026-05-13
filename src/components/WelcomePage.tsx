import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import {
  Sparkles,
  Heart,
  Mail,
  Map,
  Image,
  Music,
  Camera,
  Wand2,
  Coffee,
  Mountain,
} from 'lucide-react';
import { heroMotion, prefersReducedMotion } from '../lib/heroMotion';
import { CardSpotlight } from './ui/CardSpotlight';

const MountainHeroCanvas = lazy(() => import('./hero/MountainHeroCanvas'));

const cardVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.28 },
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

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const EXPLORE = [
  {
    to: '/letter',
    label: 'Letter',
    blurb: 'The long text version — no speech, just honesty.',
    Icon: Mail,
  },
  {
    to: '/journey',
    label: 'Journey',
    blurb: 'NIMAS week in scenes: trek line, gate, stairs, now.',
    Icon: Map,
  },
  {
    to: '/gallery',
    label: 'Gallery',
    blurb: 'Frames that still feel like that week — swap anytime.',
    Icon: Image,
  },
  {
    to: '/memories',
    label: 'Memories',
    blurb: 'Sticky notes, doodles, half-jokes saved on purpose.',
    Icon: Camera,
  },
  {
    to: '/notes',
    label: 'Hidden notes',
    blurb: 'Tiny sparkles — tap when you are in the mood.',
    Icon: Sparkles,
  },
  {
    to: '/playlist',
    label: 'Playlist',
    blurb: 'Soft soundtrack energy for late scrolling.',
    Icon: Music,
  },
  {
    to: '/calm',
    label: 'Calm',
    blurb: 'A slower corner if the site feels loud.',
    Icon: Coffee,
  },
  {
    to: '/final',
    label: 'Final',
    blurb: 'No pressure ending — warmth only.',
    Icon: Wand2,
  },
] as const;

const PLACES = ['Bhalukpong', 'Agartala', 'NIMAS gate', 'Institute stairs', 'River day', 'Same orbit'];

const WelcomePage = () => {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 90, damping: 28, mass: 0.35 });
  const titleY = useTransform(smoothY, [0, 420], [0, -28]);
  const titleBlur = useTransform(smoothY, [0, 280], [0, 2]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;
  const visitNoted = useRef(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const allowMotion = !prefersReducedMotion();

  const lowerReveal = useTransform(smoothY, [120, 420], [0, 1]);
  const lowerY = useTransform(smoothY, [0, 400], [24, 0]);

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
      className="relative min-h-screen overflow-x-hidden px-4 pb-32 pt-20"
    >
      {!allowMotion ? null : (
        <Suspense fallback={null}>
          <MountainHeroCanvas />
        </Suspense>
      )}

      <div
        className="pointer-events-none fixed inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(124,58,237,0.08)_55%,rgba(15,10,40,0.14)_100%)]"
        aria-hidden
      />

      {/* Soft color wash behind lower sections */}
      <div
        className="pointer-events-none absolute left-1/2 top-[55vh] h-[min(80vh,900px)] w-[min(140vw,900px)] -translate-x-1/2 rounded-full bg-gradient-to-b from-fuchsia-200/25 via-violet-200/15 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="relative z-[8] mx-auto w-full max-w-5xl">
        {/* Hero title */}
        <motion.div
          style={{ y: titleY, filter: titleFilter }}
          className="mb-10 text-center will-change-transform md:mb-14"
        >
          <motion.div
            animate={allowMotion ? { rotate: [0, 10, -10, 0] } : false}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-4 text-7xl drop-shadow-[0_0_28px_rgba(168,85,247,0.25)] md:text-8xl"
          >
            🌸
          </motion.div>

          <span className="lv-kicker mb-5 inline-block">NIMAS week · preserved soft</span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lv-title-gradient mb-4 font-dancing text-5xl font-bold drop-shadow-[0_4px_32px_rgba(255,255,255,0.45)] md:text-7xl md:leading-tight"
          >
            Luckyverse
          </motion.h1>
          <p className="mx-auto max-w-2xl text-balance text-sm font-medium uppercase tracking-[0.18em] text-purple-900/45 md:text-xs">
            A small birthday site — mountains optional, sincerity not
          </p>
        </motion.div>

        {/* Main story card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="lv-glass-panel lv-card-shine rounded-[2rem] p-8 shadow-[0_12px_48px_rgba(124,58,237,0.14),inset_0_1px_0_rgba(255,255,255,0.72)] md:p-12"
        >
          <CardSpotlight className="rounded-[2rem]">
            <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center gap-3">
              <Heart className="animate-heartbeat text-pink-500 drop-shadow-sm" size={24} />
              <Sparkles className="animate-sparkle text-purple-500 drop-shadow-sm" size={24} />
              <Mountain className="text-sky-500/90 drop-shadow-sm" size={22} />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-5 text-xl font-light leading-relaxed text-gray-700 md:text-2xl"
            >
              For Lucky — mostly NIMAS noise, a little mountain brain, and the normal habit of texting after
              everyone else had &ldquo;gone to bed.&rdquo;
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mb-5 text-base font-light italic leading-relaxed text-gray-600 md:text-lg"
            >
              Same course, same mess hall, same Arunachal sky. Agartala cadet, Chhattisgarh cadet — polite nods at
              first, then day three happened and the talking just… did not stop.
            </motion.p>

            <motion.p variants={itemVariants} className="mb-5 text-base leading-relaxed text-gray-700 md:text-lg">
              After dinner the batch drifted toward the institute exit — gate, stairs, phones glowing. Little texts
              to slide closer, swap seats, pretend it was casual. Theories floated; nobody cared much. Camp ended,
              distance stayed boring, and the easy laughter somehow stayed anyway.
            </motion.p>

            <motion.p variants={itemVariants} className="mb-6 text-base leading-relaxed text-gray-600 md:text-lg">
              April 20 is in here quietly — late wishes, still meant. Meghalaya plans are still half-made on purpose.
              This whole place is just a saved atmosphere: chai breaks, voice notes, comfortable silence when words
              are not required.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mx-auto my-8 h-px max-w-md bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"
            />

            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap justify-center gap-2 text-xs text-purple-900/55">
              <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/60">~100 cadets</span>
              <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/60">1 river course</span>
              <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/60">∞ half-plans</span>
              <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/60">Still one orbit</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(168,85,247,0.35)' }}
                whileTap={{ scale: 0.98 }}
                animate={allowMotion ? { scale: [0.98, 1.02, 0.98] } : false}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block cursor-default rounded-full bg-gradient-to-r from-purple-400 to-pink-400 px-8 py-4 text-lg font-medium text-white shadow-lg"
              >
                Happy Birthday, Lucky — whenever you actually open this 🎂
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link to="/letter" className="lv-btn-ghost">
                <Mail size={16} className="opacity-80" />
                Letter
              </Link>
              <Link to="/journey" className="lv-btn-ghost">
                <Map size={16} className="opacity-80" />
                Journey
              </Link>
              <Link to="/gallery" className="lv-btn-ghost">
                <Image size={16} className="opacity-80" />
                Gallery
              </Link>
              <Link to="/memories" className="lv-btn-ghost">
                <Camera size={16} className="opacity-80" />
                Memories
              </Link>
              <Link to="/playlist" className="lv-btn-ghost">
                <Music size={16} className="opacity-80" />
                Playlist
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 text-center text-gray-600">
              <p className="text-sm">
                Scroll down for a map of the rest — or wander the nav whenever ✨
              </p>
            </motion.div>
          </CardSpotlight>
        </motion.div>

        {/* Explore grid */}
        <motion.section
          style={{ opacity: lowerReveal, y: lowerY }}
          className="mt-16 md:mt-20"
        >
          <div className="mb-8 text-center">
            <span className="lv-kicker mb-3 inline-block">Pick a room</span>
            <h2 className="font-dancing text-3xl font-bold text-purple-800 md:text-4xl">Wander the Luckyverse</h2>
            <p className="mx-auto mt-2 max-w-xl text-balance text-sm text-gray-600 md:text-base">
              Nothing here grades you. Each page is a different drawer — open what matches your mood.
            </p>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-8%' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {EXPLORE.map(({ to, label, blurb, Icon }) => (
              <motion.div key={to} variants={tileVariants}>
                <Link
                  to={to}
                  className="group lv-glass-panel lv-card-shine flex h-full flex-col rounded-2xl p-5 ring-1 ring-white/40 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(124,58,237,0.14)]"
                >
                  <div className="mb-3 flex items-center gap-2 text-purple-700">
                    <span className="rounded-xl bg-white/60 p-2 ring-1 ring-white/50 transition-transform group-hover:scale-105">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="font-dancing text-xl font-semibold">{label}</span>
                  </div>
                  <p className="text-left text-sm leading-snug text-gray-600">{blurb}</p>
                  <span className="mt-4 text-xs font-medium text-purple-600/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Open →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Quote + places */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 space-y-10 md:mt-20"
        >
          <div className="lv-glass-panel lv-card-shine relative overflow-hidden rounded-[1.75rem] px-8 py-10 text-center ring-1 ring-white/45 md:px-14">
            <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-fuchsia-300/20 blur-2xl" />
            <p className="relative font-dancing text-2xl font-semibold leading-relaxed text-purple-900 md:text-3xl">
              &ldquo;Some weeks do not need a moral — they just need a shelf where they can sit without
              shrinking.&rdquo;
            </p>
            <p className="relative mt-4 text-sm text-gray-500">— the cadet who still remembers the stairs</p>
          </div>

          <div className="text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-900/40">Tiny atlas</p>
            <div className="flex flex-wrap justify-center gap-2">
              {PLACES.map((place) => (
                <span
                  key={place}
                  className="rounded-full border border-white/50 bg-white/45 px-4 py-1.5 text-sm font-medium text-purple-800/90 shadow-sm backdrop-blur-sm"
                >
                  {place}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {showWhisper && allowMotion ? (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="pointer-events-none mt-14 text-center text-xs text-purple-700/80"
          >
            Back here again? Still feels like a Meghalaya kind of evening.
          </motion.p>
        ) : null}

        {/* Floating accents — hero zone */}
        {allowMotion ? (
          <>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="pointer-events-none fixed left-[12%] top-[22%] z-[7] text-3xl opacity-[0.22] md:text-4xl"
            >
              ⭐
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, delay: 1, repeat: Infinity }}
              className="pointer-events-none fixed right-[14%] top-[28%] z-[7] text-2xl opacity-[0.2] md:text-3xl"
            >
              🌙
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.2, delay: 2, repeat: Infinity }}
              className="pointer-events-none fixed bottom-[18%] left-[22%] z-[7] text-2xl opacity-[0.2]"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 6, -6, 0] }}
              transition={{ duration: 6, delay: 0.5, repeat: Infinity }}
              className="pointer-events-none fixed bottom-[24%] right-[18%] z-[7] text-2xl opacity-[0.18]"
            >
              🥾
            </motion.div>
          </>
        ) : null}
      </div>
    </motion.div>
  );
};

export default WelcomePage;
