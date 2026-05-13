import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Heart,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  Eye,
  Map,
} from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { prefersReducedMotion } from '../lib/heroMotion';

const LETTER_CONTENT = [
  'Dear Lucky,',
  'NCC River Rafting Special Course, NIMAS Bhalukpong — from 10 Oct 2025. Roughly a hundred cadets, same mess, same tired jokes. You from Agartala, Tripura. Me from Chhattisgarh. Same cold mornings, same river days.',
  'First couple of days we barely spoke. Then on day three of a trek you opened with “Tu Bengali h kya?” Still feels funny that everything started there. After that it was just… constant.',
  'After dinner everyone drifted to the institute exit — gate, stairs, phones glowing. Little texts to come sit closer, swap seats, pretend it was casual. The batch definitely had theories. We didn’t really care.',
  'When camp ended I left first. I wanted a real hug, chickened out, did a half wave. You said I didn’t give you a proper bye. Fair. That sentence stuck — not dramatic, just true. (You still owe one clean goodbye on better terms. Half joking.)',
  'You’re the extrovert who actually settles a room. Army kid, Himachal till 10th, Holy Cross now, third year, NCC Best Cadet runner-up — yeah, it tracks. You also romanticize mountains too much. It’s fine.',
  'April 28 slipped past while I was still sorting my head. Late wishes, but the intention survived. You’d still pick mountains over a fancy celebration anyway. One future birthday definitely deserves mountain air.',
  'This is just Luckyverse — chai breaks, half-made Meghalaya plans, voice notes, comfortable silence when words aren’t needed.',
  'P.S. None of this needs a “perfect” reply. It already lived in real time — messy, human, ours.',
  'Happy Birthday, Lucky. Seriously.',
  '— the cadet who still remembers the stairs',
] as const;

const BEAT_LABELS = [
  'Opening',
  'Camp',
  'Day three',
  'Nights',
  'Leaving',
  'You',
  'Apr 28',
  'Luckyverse',
  'P.S.',
  'Wish',
  'Sign-off',
] as const;

const AUTO_MS = 3200;

const OpenLetter = () => {
  const reduceMotion = prefersReducedMotion();
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [paused, setPaused] = useState(false);
  const [revealAll, setRevealAll] = useState(reduceMotion);

  const lastIndex = LETTER_CONTENT.length - 1;
  const progress = ((currentParagraph + 1) / LETTER_CONTENT.length) * 100;

  const go = useCallback(
    (dir: -1 | 1) => {
      setCurrentParagraph((prev) => {
        const next = prev + dir;
        if (next < 0) return 0;
        if (next > lastIndex) return lastIndex;
        return next;
      });
    },
    [lastIndex]
  );

  const jump = useCallback((index: number) => {
    setCurrentParagraph(Math.max(0, Math.min(lastIndex, index)));
  }, [lastIndex]);

  useEffect(() => {
    if (reduceMotion || revealAll || paused) return;
    const timer = setInterval(() => {
      setCurrentParagraph((prev) => (prev < lastIndex ? prev + 1 : prev));
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [paused, revealAll, reduceMotion, lastIndex]);

  useEffect(() => {
    if (revealAll) setCurrentParagraph(lastIndex);
  }, [revealAll, lastIndex]);

  const activeIndex = revealAll ? lastIndex : currentParagraph;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 pb-28 pt-20"
    >
      <div className="mx-auto max-w-4xl">
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lv-glass-panel lv-card-shine mb-10 rounded-[2rem] px-6 py-10 text-center ring-1 ring-white/45 md:px-12"
        >
          <BookOpen className="mx-auto mb-4 text-purple-600" size={44} />
          <span className="lv-kicker mb-3 inline-block">Long-form · your pace</span>
          <h1 className="lv-title-gradient mb-3 font-dancing text-4xl font-bold md:text-5xl">An Open Letter</h1>
          <p className="mx-auto max-w-lg text-balance text-sm text-gray-600 md:text-base">
            Reads like a long text, not a speech. Use the controls — or open the full letter in one tap.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-purple-900/50">
            <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/55">NIMAS</span>
            <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/55">Oct 2025</span>
            <span className="rounded-full bg-white/50 px-3 py-1 ring-1 ring-white/55">Bhalukpong</span>
          </div>
        </motion.header>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-900/45">
              Beat {Math.min(activeIndex, lastIndex) + 1} of {LETTER_CONTENT.length}
              {!revealAll && !reduceMotion ? (
                <span className="ml-2 font-normal normal-case text-purple-800/55">
                  · {BEAT_LABELS[Math.min(activeIndex, BEAT_LABELS.length - 1)]}
                </span>
              ) : null}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setRevealAll((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-3 py-1.5 text-xs font-medium text-purple-800 shadow-sm backdrop-blur-sm transition hover:bg-white/80"
              >
                <Eye size={14} />
                {revealAll ? 'Guided mode' : 'Full letter'}
              </button>
              {!reduceMotion ? (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/55 px-3 py-1.5 text-xs font-medium text-purple-800 shadow-sm backdrop-blur-sm transition hover:bg-white/80"
                >
                  {paused ? <Play size={14} /> : <Pause size={14} />}
                  {paused ? 'Play' : 'Pause'}
                </button>
              ) : null}
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/50 ring-1 ring-white/40">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-400"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {LETTER_CONTENT.map((_, i) => {
              const lit = revealAll || i <= activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setRevealAll(false);
                    jump(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex && !revealAll
                      ? 'w-6 bg-purple-500'
                      : lit
                        ? 'w-2 bg-purple-300'
                        : 'w-2 bg-white/50 ring-1 ring-white/40'
                  }`}
                  aria-label={`Go to section ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ rotateY: reduceMotion ? 0 : -12, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lv-glass-panel lv-card-shine relative overflow-hidden rounded-[2rem] p-6 shadow-2xl ring-1 ring-white/45 md:p-12"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6e6fa' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <CardSpotlight className="min-h-[200px] rounded-[1.5rem] md:rounded-[2rem]">
            <div className="mx-auto max-w-prose space-y-6 leading-relaxed text-gray-800">
              {LETTER_CONTENT.map((paragraph, index) => {
                const visible = revealAll || index <= activeIndex;
                const isOpening = index === 0;
                const isWish = index === LETTER_CONTENT.length - 2;
                const isSign = index === LETTER_CONTENT.length - 1;
                const isPS = paragraph.startsWith('P.S.');

                return (
                  <motion.p
                    key={index}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{
                      opacity: visible ? 1 : 0.22,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${
                      isOpening || isWish
                        ? 'font-dancing text-2xl text-purple-800 md:text-3xl'
                        : isSign
                          ? 'font-dancing text-right text-xl text-purple-700 md:text-2xl'
                          : isPS
                            ? 'rounded-2xl border border-purple-200/60 bg-purple-50/50 px-4 py-3 text-base italic text-purple-900/90 md:text-lg'
                            : 'font-poppins text-lg text-gray-700'
                    } ${visible ? '' : 'pointer-events-none select-none'}`}
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </div>
          </CardSpotlight>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute right-5 top-5 text-purple-300/25"
          >
            <Heart size={36} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            className="pointer-events-none absolute bottom-5 left-5 text-2xl opacity-25"
          >
            🌸
          </motion.div>
        </motion.div>

        {/* Step controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={activeIndex <= 0}
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-purple-800 shadow-sm backdrop-blur-sm transition enabled:hover:bg-white disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={activeIndex >= lastIndex}
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-purple-800 shadow-sm backdrop-blur-sm transition enabled:hover:bg-white disabled:opacity-40"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center"
        >
          <div className="lv-glass-panel lv-card-shine rounded-2xl px-6 py-3 ring-1 ring-white/40">
            <p className="text-sm text-gray-600">
              Prefer the week in scenes?{' '}
              <Link to="/journey" className="font-medium text-purple-700 underline decoration-purple-300 underline-offset-4 hover:text-purple-900">
                Journey page
              </Link>
              .
            </p>
          </div>
          <Link
            to="/journey"
            className="lv-btn-ghost inline-flex items-center gap-2"
          >
            <Map size={16} className="opacity-80" />
            Open journey
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OpenLetter;
