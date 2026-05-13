import { useCallback, useEffect, useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Mountain,
  Cake,
  MessageCircle,
  Handshake,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  Cloud,
  HardDrive,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DefaultPlanKey } from '../lib/futurePlansTypes';
import { useFuturePlans } from '../lib/useFuturePlans';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const DEFAULT_PLANS: ReadonlyArray<{
  key: DefaultPlanKey;
  Icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
}> = [
  {
    key: 'meghalaya',
    Icon: MapPin,
    title: 'Meghalaya, for real',
    body:
      'Same half-plan, better follow-through. Living roots, grey rain, bad signal — the version we keep joking about until the tickets exist.',
    tag: 'permits pending, optimism not',
  },
  {
    key: 'altitude',
    Icon: Mountain,
    title: 'Altitude before speeches',
    body:
      'One birthday that actually happens on a ridge — snacks in a bag, wind too loud for a big performance, just the view doing the talking.',
    tag: 'no pressure invite',
  },
  {
    key: 'chai',
    Icon: MessageCircle,
    title: 'Voice notes → same table',
    body:
      'Long notes stay allowed. So does chai across a table someday — same orbit, less distance, same easy laugh.',
    tag: 'when schedules behave',
  },
  {
    key: 'bye',
    Icon: Handshake,
    title: 'Proper bye, upgraded',
    body:
      'Half wave at a gate turned into a sentence that stuck. Future version: better lighting, no rush, one clean hug on better terms.',
    tag: 'IOU accepted',
  },
  {
    key: 'small',
    Icon: Cake,
    title: 'Small celebrations count',
    body:
      'Not every plan needs a banner. Sometimes it is just showing up — for a trek line, a gate, or a random Tuesday that felt worth saving.',
    tag: 'low drama, high sincerity',
  },
];

function PlanDoneToggle({
  done,
  onToggle,
  label,
}: {
  done: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      aria-label={done ? `Mark "${label}" not done` : `Mark "${label}" complete`}
      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors ${
        done
          ? 'bg-emerald-500/20 text-emerald-800 ring-emerald-400/50'
          : 'bg-white/50 text-slate-500 ring-white/60 hover:bg-white/80'
      }`}
    >
      <Check size={18} strokeWidth={2.5} className={done ? 'opacity-100' : 'opacity-35'} />
    </button>
  );
}

const FutureTogether = () => {
  const formId = useId();
  const dialogHeadingId = `${formId}-dialog-heading`;
  const fieldTitleId = `${formId}-field-title`;
  const fieldBodyId = `${formId}-field-body`;
  const fieldTagId = `${formId}-field-tag`;

  const {
    userPlans,
    defaultDone,
    toggleDefaultDone,
    addPlan,
    toggleUserComplete,
    deleteUserPlan,
    loading,
    error,
    useRemote,
    retry,
  } = useFuturePlans();

  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [saving, setSaving] = useState(false);

  const closeModal = useCallback(() => {
    setShowAdd(false);
    setTitle('');
    setBody('');
    setTag('');
  }, []);

  useEffect(() => {
    if (!showAdd) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showAdd, closeModal]);

  const submitAdd = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const ok = await addPlan({ title, body, tag });
    setSaving(false);
    if (ok) closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 pb-16 pt-24 md:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Compass
            className="mx-auto mb-4 text-cyan-600 drop-shadow-sm"
            size={44}
            strokeWidth={1.5}
          />
          <span className="lv-kicker mb-3 inline-block">Us, forward</span>
          <h1 className="font-dancing text-4xl font-bold text-purple-800 md:text-5xl">
            Plans we still owe each other
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-gray-600 md:text-lg">
            Nothing here is a contract — just the soft list of things that sound like{' '}
            <span className="text-purple-700/90">you, me, and whatever we call this orbit</span> when the world
            leaves room.
          </p>

          <div className="mx-auto mt-5 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/30"
            >
              <Plus size={18} strokeWidth={2.25} />
              Add a plan
            </motion.button>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {useRemote ? (
                <>
                  <Cloud size={14} className="text-cyan-600" aria-hidden />
                  <span>Shared live — both of you see the same list</span>
                </>
              ) : (
                <>
                  <HardDrive size={14} className="text-violet-600" aria-hidden />
                  <span>Saved in this browser — add Supabase keys to sync together</span>
                </>
              )}
            </div>
          </div>

          {error && (
            <div className="mx-auto mt-4 max-w-xl rounded-xl bg-rose-50 px-4 py-3 text-left text-sm text-rose-800 ring-1 ring-rose-200/80">
              <p className="font-medium">Something went wrong</p>
              <p className="mt-1 opacity-90">{error}</p>
              {useRemote && (
                <button
                  type="button"
                  onClick={() => void retry()}
                  className="mt-2 text-sm font-semibold text-rose-900 underline decoration-rose-400 underline-offset-2 hover:no-underline"
                >
                  Try again
                </button>
              )}
            </div>
          )}
        </motion.div>

        {loading && (
          <p className="mb-6 text-center text-sm text-slate-500" role="status">
            Loading plans…
          </p>
        )}

        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {DEFAULT_PLANS.map(({ key, Icon, title: t, body: b, tag: tg }) => {
            const done = Boolean(defaultDone[key]);
            return (
              <motion.li key={key} variants={item}>
                <div
                  className={`lv-glass-panel group rounded-2xl p-5 ring-1 ring-white/45 transition-all duration-300 md:p-6 ${
                    done ? 'opacity-75' : 'hover:shadow-[0_16px_40px_rgba(14,116,144,0.12)]'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <PlanDoneToggle done={done} onToggle={() => toggleDefaultDone(key)} label={t} />
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100/90 to-violet-100/90 text-indigo-800 ring-1 ring-cyan-200/50">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2
                        className={`font-dancing text-xl font-semibold text-purple-800 md:text-2xl ${
                          done ? 'line-through decoration-purple-400/70' : ''
                        }`}
                      >
                        {t}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">{b}</p>
                      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-cyan-700/80">{tg}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}

          {userPlans.map((plan) => {
            const done = plan.completed;
            return (
              <motion.li key={plan.id} layout variants={item}>
                <div
                  className={`lv-glass-panel rounded-2xl p-5 ring-1 ring-violet-200/50 transition-all duration-300 md:p-6 ${
                    done ? 'opacity-75' : 'hover:shadow-[0_16px_40px_rgba(124,58,237,0.12)]'
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                    <PlanDoneToggle
                      done={done}
                      onToggle={() => void toggleUserComplete(plan.id)}
                      label={plan.title}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h2
                          className={`font-dancing text-xl font-semibold text-purple-800 md:text-2xl ${
                            done ? 'line-through decoration-purple-400/70' : ''
                          }`}
                        >
                          {plan.title}
                        </h2>
                        <button
                          type="button"
                          onClick={() => void deleteUserPlan(plan.id)}
                          className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                          aria-label={`Delete plan “${plan.title}”`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      {plan.body ? (
                        <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">{plan.body}</p>
                      ) : null}
                      {plan.tag ? (
                        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-violet-700/80">
                          {plan.tag}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {!loading && userPlans.length === 0 && (
          <p className="mt-6 text-center text-sm text-slate-500">
            No custom plans yet — tap <span className="font-medium text-purple-700">Add a plan</span> when something
            new feels worth saving.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link to="/" className="lv-btn-ghost inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} className="opacity-80" />
            Welcome
          </Link>
          <Link to="/journey" className="lv-btn-ghost text-sm">
            Journey
          </Link>
          <Link to="/final" className="lv-btn-ghost text-sm">
            Final
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogHeadingId}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="w-full max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl ring-1 ring-white/80"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <h2 id={dialogHeadingId} className="font-dancing text-2xl font-bold text-purple-800">
                New plan
              </h2>
              <p className="mt-1 text-sm text-slate-600">Short title helps; details are optional.</p>

              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor={fieldTitleId} className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Title
                  </label>
                  <input
                    id={fieldTitleId}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={120}
                    placeholder="e.g. Shillong weekend"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition-shadow focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.25)]"
                  />
                </div>
                <div>
                  <label htmlFor={fieldBodyId} className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Notes
                  </label>
                  <textarea
                    id={fieldBodyId}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    maxLength={800}
                    rows={3}
                    placeholder="Anything you both should remember…"
                    className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.25)]"
                  />
                </div>
                <div>
                  <label htmlFor={fieldTagId} className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tiny tag
                  </label>
                  <input
                    id={fieldTagId}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    maxLength={80}
                    placeholder="e.g. after exams"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.25)]"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-2">
                <button type="button" onClick={closeModal} className="lv-btn-ghost text-sm">
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!title.trim() || saving}
                  onClick={() => void submitAdd()}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 text-sm font-medium text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save plan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FutureTogether;
