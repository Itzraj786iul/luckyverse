import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Heart, Inbox, Loader2, Cloud, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useSpaceThoughts } from '../lib/useSpaceThoughts';
import { supabaseErrorMessage } from '../lib/supabaseErrors';

function formatWhen(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

const JustSpace = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [justSent, setJustSent] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const { thoughts, loading, error, configured, sendThought, refresh } = useSpaceThoughts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    if (!configured) {
      setSendError('Supabase is not configured — thoughts cannot be saved yet.');
      return;
    }

    setIsSubmitting(true);
    setSendError(null);
    try {
      await sendThought(text);
      setMessage('');
      setJustSent(true);
      window.setTimeout(() => setJustSent(false), 4500);
    } catch (err) {
      setSendError(supabaseErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20 pt-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-10 text-center"
        >
          <Mail className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="mb-4 font-dancing text-4xl font-bold text-purple-700 md:text-5xl">Just Your Space</h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Optional. Truly. Leave a thought if you want — it lands in the same thread below so it can actually be
            seen, not just swallowed by the void.
          </p>
          <button
            type="button"
            onClick={() => setShowHelp((v) => !v)}
            className="mx-auto mt-4 flex items-center gap-1 text-sm font-medium text-purple-700 underline decoration-purple-300 underline-offset-2 hover:text-purple-900"
          >
            {showHelp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            How this works · if something fails
          </button>
          <AnimatePresence>
            {showHelp && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mx-auto mt-3 max-w-2xl overflow-hidden text-left text-sm text-gray-700"
              >
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-purple-100/80">
                  <ul className="list-inside list-disc space-y-2 leading-relaxed">
                    <li>
                      Messages are stored in your Supabase table <code className="rounded bg-violet-100/80 px-1">space_thoughts</code> — same project as the URL in{' '}
                      <code className="rounded bg-violet-100/80 px-1">.env.local</code> / site config.
                    </li>
                    <li>
                      If the inbox stays empty after sending, check the red error under the button, or Supabase → Table
                      Editor → confirm rows appear in <code className="rounded bg-violet-100/80 px-1">space_thoughts</code>.
                    </li>
                    <li>
                      The publishable key must allow <strong>insert</strong> and <strong>select</strong> (RLS policies in{' '}
                      <code className="rounded bg-violet-100/80 px-1">.env.example</code>). If insert fails, use the <strong>anon</strong> JWT from Supabase → Settings → API instead.
                    </li>
                    <li>
                      Supabase connected: {configured ? 'yes' : 'no'} · Thoughts loaded: {thoughts.length}
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="lv-glass-panel rounded-3xl border border-white/40 p-8 shadow-2xl md:p-10"
          >
            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
              <div>
                <label className="mb-4 block text-lg font-medium text-gray-700">
                  If you ever feel like sharing something…
                </label>

                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={8000}
                  placeholder={`If you want to leave a note — cool. If not — also cool.

Random ideas:
• something funny from camp
• a place you want to drive to
• one sentence you never sent
• literally "ok"

No grading. No expectations. 🌸`}
                  className="h-64 w-full resize-y rounded-2xl border-2 border-purple-200 bg-white/60 p-6 text-gray-700 placeholder-gray-400 backdrop-blur-sm transition-all focus:border-purple-400 focus:outline-none"
                  style={{ fontFamily: 'inherit' }}
                />
              </div>

              <AnimatePresence>
                {justSent && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-900"
                  >
                    Sent — it’s in the thread. He can read it here anytime.
                  </motion.div>
                )}
              </AnimatePresence>

              {sendError && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                  {sendError}
                </div>
              )}

              <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                <div className="text-sm text-gray-600">
                  {configured ? (
                    <div className="flex items-start gap-2">
                      <Cloud size={16} className="mt-0.5 shrink-0 text-cyan-600" aria-hidden />
                      <span>
                        Saved to the shared Luckyverse inbox — same page for both of you, updates live.
                      </span>
                    </div>
                  ) : (
                    <span>Add Supabase keys (see <code className="rounded bg-white/60 px-1 text-xs">.env.example</code>).</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting || !message.trim() || !configured}
                  className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${
                    isSubmitting || !message.trim() || !configured
                      ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Share thoughts</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-8 border-t border-purple-200/50 pt-6">
              <div className="flex items-center justify-center gap-4 text-gray-500">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-2xl"
                >
                  🌸
                </motion.div>
                <span className="text-sm italic">Your comfort is the priority</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-2xl"
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lv-glass-panel rounded-3xl border border-white/40 p-6 shadow-xl md:p-8"
            aria-label="Thoughts inbox"
          >
            <div className="mb-4 flex items-center gap-2 text-purple-800">
              <Inbox size={22} className="text-violet-600" aria-hidden />
              <h2 className="font-dancing text-2xl font-bold md:text-3xl">Thoughts that landed</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              Everything saved from this page shows up here for both of you — newest first. Open this tab when you
              want to read what she shared.
            </p>

            {error && (
              <div className="mb-4 flex gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-950 ring-1 ring-amber-200/80">
                <AlertCircle className="mt-0.5 shrink-0" size={16} />
                <div>
                  <p>{error}</p>
                  <p className="mt-1 text-xs opacity-90">
                    Run the <code className="rounded bg-white/70 px-1">space_thoughts</code> SQL in{' '}
                    <code className="rounded bg-white/70 px-1">.env.example</code> and enable Realtime on that table.
                  </p>
                  <button
                    type="button"
                    onClick={() => void refresh()}
                    className="mt-2 text-xs font-semibold underline underline-offset-2"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {loading && !error && (
              <div className="flex items-center gap-2 py-8 text-sm text-gray-500">
                <Loader2 size={18} className="animate-spin" />
                Loading…
              </div>
            )}

            {!loading && !error && thoughts.length === 0 && (
              <p className="rounded-2xl bg-white/50 py-10 text-center text-sm text-gray-600 ring-1 ring-white/60">
                No thoughts loaded yet — send one from the left, or tap Retry if the inbox had an error. On small
                screens, scroll down to this box after sending.
              </p>
            )}

            <ul className="min-h-[120px] max-h-[min(70vh,560px)] space-y-4 overflow-y-auto pr-1">
              {thoughts.map((t) => (
                <li
                  key={t.id}
                  className="rounded-2xl border border-violet-100/80 bg-white/55 p-4 shadow-sm ring-1 ring-white/50"
                >
                  <p className="mb-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{t.body}</p>
                  <p className="text-xs font-medium text-gray-500">{formatWhen(t.created_at)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center text-pink-500">
              <Heart size={28} className="opacity-80" aria-hidden />
            </div>
          </motion.aside>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center text-sm text-gray-600"
        >
          Made with care — Luckyverse
        </motion.p>
      </div>
    </motion.div>
  );
};

export default JustSpace;
