import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Mail, Sparkles } from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { prefersReducedMotion } from '../lib/heroMotion';

const timelineEvents = [
  {
    year: 'Oct 2025',
    title: 'NIMAS, Bhalukpong',
    tag: 'Cold starts',
    description:
      'Same course, same mess, same Arunachal sky. Agartala cadet, Chhattisgarh cadet — polite nods at first, nothing loud yet. River days still felt like a shared joke before anyone admitted it.',
    icon: '🏔️',
    quote: 'Still unfair how good the sunsets looked.',
    color: 'from-purple-400 to-pink-400',
  },
  {
    year: 'Day three',
    title: 'The trek line',
    tag: 'The opener',
    description:
      'Halfway up a trail: “Tu Bengali h kya?” — worst opener, somehow worked. After that the talking just… didn’t stop. Altitude helped; nobody had to pretend they were fine.',
    icon: '🥾',
    quote: 'Still feels funny how everything started there.',
    color: 'from-slate-500 to-sky-500',
  },
  {
    year: 'Camp nights',
    title: 'Gate & stairs',
    tag: 'After dinner',
    description:
      'Everyone parked near the institute exit — gate, stairs, phones glowing. Texts to slide closer, swap seats, act chill. The batch wrote half a novel in glances. We pretended not to notice.',
    icon: '🌙',
    quote: 'Somehow the gate stairs became a daily thing.',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    year: 'Leaving',
    title: 'A proper bye',
    tag: 'No movie moment',
    description:
      'I left first, waved like an idiot, skipped the hug. You called it: no proper bye. Not dramatic — just accurate. Some sentences stick because they are plain, not because they are loud.',
    icon: '🌊',
    quote: 'You still owe one proper goodbye. (So do I.)',
    color: 'from-amber-400 to-pink-500',
  },
  {
    year: 'Now',
    title: 'Same orbit',
    tag: 'After camp',
    description:
      'The talking spilled into normal life — voice notes, random updates, easy laughter. Distance stayed boring; curiosity didn’t. No screenplay required — just two people who still pick up the phone.',
    icon: '✨',
    quote: 'Meghalaya plans somehow still sound real.',
    color: 'from-pink-400 to-purple-400',
  },
] as const;

type Event = (typeof timelineEvents)[number];

const rowVariants = {
  hidden: { opacity: 0, y: 48, rotateX: -8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function BeatInner({
  event,
  align,
}: {
  event: Event;
  align: 'left' | 'right';
}) {
  const r = align === 'right';
  return (
    <CardSpotlight className="rounded-2xl p-6">
      <div className={`mb-3 flex flex-wrap items-center gap-2 ${r ? 'justify-end' : 'justify-start'}`}>
        <span className="text-4xl leading-none md:text-5xl">{event.icon}</span>
        <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-purple-800/70 ring-1 ring-white/50">
          {event.tag}
        </span>
      </div>
      <h3 className={`mb-1 font-dancing text-2xl font-bold text-purple-800 md:text-3xl ${r ? 'text-right' : 'text-left'}`}>
        {event.title}
      </h3>
      <div
        className={`mb-3 inline-block bg-gradient-to-r ${event.color} bg-clip-text text-sm font-bold uppercase tracking-wide text-transparent md:text-base ${
          r ? 'text-right' : 'text-left'
        }`}
      >
        {event.year}
      </div>
      <p className={`mb-4 text-sm leading-relaxed text-gray-700 md:text-base ${r ? 'text-right' : 'text-left'}`}>
        {event.description}
      </p>
      <div
        className={`rounded-xl border-purple-300/80 bg-purple-50/35 py-2 text-sm italic text-purple-900/85 md:text-base ${
          r ? 'border-r-4 pr-4 text-right' : 'border-l-4 pl-4 text-left'
        }`}
      >
        {event.quote}
      </div>
    </CardSpotlight>
  );
}

function JourneyDesktopCard({
  event,
  isLeft,
  index,
}: {
  event: Event;
  isLeft: boolean;
  index: number;
}) {
  const reduce = prefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'end 0.18'],
  });

  const rawY = useTransform(scrollYProgress, [0, 0.45, 1], [56, 0, -36]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [isLeft ? -5 : 5, 0]);
  const y = useSpring(rawY, { stiffness: 90, damping: 28 });
  const rotateZ = useSpring(rawRotate, { stiffness: 80, damping: 30 });

  const floatDuration = 5.2 + index * 0.45;

  return (
    <div
      ref={ref}
      className={`hidden md:flex md:w-1/2 ${isLeft ? 'justify-end pr-10' : 'justify-start pl-10'}`}
    >
      <motion.div
        style={{ y, rotateZ }}
        className="max-w-md [perspective:1200px]"
      >
        <motion.div
          drag={reduce ? false : 'x'}
          dragConstraints={{ left: -28, right: 28 }}
          dragElastic={0.12}
          whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotateY: isLeft ? [0, 2.5, 0] : [0, -2.5, 0],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: floatDuration + 1.2, repeat: Infinity, ease: 'easeInOut' },
                }
          }
          whileHover={{
            scale: 1.03,
            y: -10,
            rotateX: 3,
            rotateY: isLeft ? -4 : 4,
            boxShadow: '0 32px 64px rgba(124,58,237,0.22)',
          }}
          className="lv-glass-panel lv-card-shine cursor-grab overflow-hidden rounded-2xl shadow-xl [transform-style:preserve-3d] ring-1 ring-white/40 active:cursor-grabbing"
        >
          <BeatInner event={event} align={isLeft ? 'right' : 'left'} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function JourneyMobileCard({ event, index }: { event: Event; index: number }) {
  const reduce = prefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'end 0.2'],
  });
  const rawX = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 10]);
  const x = useSpring(rawX, { stiffness: 100, damping: 32 });

  return (
    <div ref={ref} className="pl-10 md:hidden">
      <div className="absolute left-[9px] top-7 z-10 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-md" />
      <motion.div
        style={{ x }}
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={
          reduce ? undefined : { y: { duration: 4.5 + index * 0.35, repeat: Infinity, ease: 'easeInOut' } }
        }
        whileHover={{ scale: 1.01, y: -4 }}
        className="lv-glass-panel lv-card-shine overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/40"
      >
        <BeatInner event={event} align="left" />
      </motion.div>
    </div>
  );
}

const Timeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 pb-32 pt-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lv-glass-panel lv-card-shine mx-auto mb-14 max-w-2xl rounded-[2rem] px-6 py-10 text-center ring-1 ring-white/45 md:mb-20 md:px-12"
        >
          <span className="lv-kicker mb-3 inline-block">Loose chronology</span>
          <MapPin className="mx-auto mb-4 text-purple-600" size={44} />
          <h1 className="mb-3 font-dancing text-4xl font-bold text-purple-800 md:text-5xl">Our Journey</h1>
          <p className="mx-auto max-w-xl text-balance text-gray-600">
            NIMAS week in loose order — scroll to move the chapters. On desktop, cards drift and you can gently drag
            them sideways; on mobile they slide in with the scroll.
          </p>
        </motion.header>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            aria-hidden
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-purple-300 via-fuchsia-300 to-pink-300 shadow-[0_0_32px_rgba(168,85,247,0.35)] md:block"
          />
          <div
            className="pointer-events-none absolute left-[15px] top-2 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-purple-200 via-fuchsia-200 to-pink-200 md:hidden"
            aria-hidden
          />

          <div className="space-y-12 md:space-y-0">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-10%' }}
                  variants={rowVariants}
                  className={`relative md:mb-24 md:flex md:min-h-[1px] md:items-stretch ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <JourneyMobileCard event={event} index={index} />
                  <JourneyDesktopCard event={event} isLeft={isLeft} index={index} />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.08 }}
                    className="absolute left-1/2 top-9 z-10 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg md:flex"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="block h-2.5 w-2.5 rounded-full bg-white/90"
                    />
                  </motion.div>

                  <div className="hidden w-1/2 md:block" aria-hidden />
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center md:mt-8"
        >
          <div className="lv-glass-panel lv-card-shine mx-auto max-w-2xl rounded-[2rem] p-8 shadow-xl ring-1 ring-white/40 md:p-10">
            <Heart className="mx-auto mb-4 text-pink-500" size={32} />
            <p className="text-lg font-light leading-relaxed text-gray-700">
              You’d definitely stop for chai before reaching any destination. Someone should plan a trip around that.
            </p>
            <p className="mt-4 font-dancing text-xl text-purple-700">Okay. Roads later. For now — this 🌸</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/letter" className="lv-btn-ghost inline-flex items-center gap-2">
                <Mail size={16} className="opacity-80" />
                Read the letter
              </Link>
              <Link to="/gallery" className="lv-btn-ghost inline-flex items-center gap-2">
                <Sparkles size={16} className="opacity-80" />
                Gallery
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Timeline;
