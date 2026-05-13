import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter } from 'lucide-react';
import clsx from 'clsx';

const HiddenNotes = () => {
  const [revealedNotes, setRevealedNotes] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const notes = [
    { id: 1, text: "100 cadets on one campus and we still ended up talking every day", category: "deep", position: { top: '15%', left: '20%' } },
    { id: 2, text: "You really do romanticize mountains too much", category: "funny", position: { top: '25%', right: '15%' } },
    { id: 3, text: "Meghalaya plans somehow still sound real", category: "calm", position: { top: '40%', left: '10%' } },
    { id: 4, text: "Still feels funny how everything started with Tu Bengali h kya?", category: "funny", position: { top: '60%', right: '25%' } },
    { id: 5, text: "Some conversations naturally became part of memory", category: "deep", position: { top: '35%', left: '60%' } },
    { id: 6, text: "Voice notes became normal way too quickly", category: "calm", position: { top: '70%', left: '30%' } },
    { id: 7, text: "You made everyone around you comfortable so easily", category: "deep", position: { top: '20%', left: '70%' } },
    { id: 8, text: "NCC Best Cadet runner-up — sneakily sharp about it", category: "funny", position: { top: '80%', right: '20%' } },
    { id: 9, text: "You definitely would stop for chai before reaching any destination", category: "funny", position: { top: '50%', left: '40%' } },
    { id: 10, text: "April 20 — late note, sincere intention", category: "calm", position: { top: '65%', right: '10%' } },
    { id: 11, text: "You somehow made random stairs feel memorable", category: "deep", position: { top: '85%', left: '50%' } },
    { id: 12, text: "Agartala’s stuck with you — lucky them", category: "funny", position: { top: '30%', right: '40%' } },
    { id: 13, text: "Proper bye still pending on better terms", category: "deep", position: { top: '10%', left: '45%' } },
    { id: 14, text: "Holy Cross, third year — finish strong, flex softly", category: "calm", position: { top: '75%', left: '65%' } },
    { id: 15, text: "Comfortable silence counts as hanging out", category: "deep", position: { top: '45%', right: '30%' } }
  ];

  const categories = [
    { id: 'all', label: 'All Notes' },
    { id: 'deep', label: 'Deep' },
    { id: 'calm', label: 'Calm' },
    { id: 'funny', label: 'Light' },
  ];

  const noteFilterTone: Record<string, { on: string; off: string }> = {
    all: {
      on: 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-300/40',
      off: 'bg-white/75 text-purple-700 hover:bg-purple-50/95',
    },
    deep: {
      on: 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-200/45',
      off: 'bg-white/75 text-indigo-700 hover:bg-indigo-50/95',
    },
    calm: {
      on: 'bg-sky-500 text-white shadow-lg ring-2 ring-sky-200/45',
      off: 'bg-white/75 text-sky-700 hover:bg-sky-50/95',
    },
    funny: {
      on: 'bg-pink-500 text-white shadow-lg ring-2 ring-pink-200/45',
      off: 'bg-white/75 text-pink-700 hover:bg-pink-50/95',
    },
  };

  const filteredNotes = filter === 'all' ? notes : notes.filter(note => note.category === filter);

  const revealNote = (noteId: number) => {
    if (!revealedNotes.includes(noteId)) {
      setRevealedNotes([...revealedNotes, noteId]);
    }
  };

  const resetRevealed = () => {
    setRevealedNotes([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lv-glass-panel lv-card-shine mx-auto mb-12 max-w-2xl rounded-[2rem] px-6 py-10 text-center ring-1 ring-white/45"
        >
          <span className="lv-kicker mb-4 inline-block">Tap to reveal</span>
          <Sparkles className="mx-auto mb-4 text-purple-600" size={44} />
          <h1 className="mb-2 text-4xl font-dancing font-bold text-purple-800 md:text-5xl">Hidden Notes</h1>
          <p className="mb-8 text-gray-600">Click sparkles to reveal messages — filters keep the noise kind ✨</p>

          <div className="mb-2 flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => {
              const tone = noteFilterTone[cat.id] ?? noteFilterTone.all;
              const active = filter === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setFilter(cat.id)}
                  className={clsx(
                    'rounded-full border border-white/35 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors',
                    active ? tone.on : tone.off
                  )}
                >
                  <Filter size={16} className="mr-2 inline" />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>

          {revealedNotes.length > 0 && (
            <button
              type="button"
              onClick={resetRevealed}
              className="mt-3 text-sm text-purple-600 underline decoration-purple-300 underline-offset-4 hover:text-purple-800"
            >
              Reset discovered notes
            </button>
          )}
        </motion.div>

        {/* Notes Canvas */}
        <div className="relative h-screen overflow-hidden rounded-[2rem] lv-glass-panel ring-1 ring-white/40">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.4) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}
          />

          <AnimatePresence>
            {filteredNotes.map((note) => {
              const isRevealed = revealedNotes.includes(note.id);
              const categoryColor = categories.find(c => c.id === note.category)?.color || 'purple';

              return (
                <motion.div
                  key={note.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute"
                  style={note.position}
                >
                  {!isRevealed ? (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      onClick={() => revealNote(note.id)}
                      className="cursor-pointer"
                    >
                      <Sparkles className={clsx(`text-${categoryColor}-400 hover:text-${categoryColor}-600`, "drop-shadow-lg transition-colors")} size={32} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={clsx("bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-xl border-2 max-w-xs", `border-${categoryColor}-200`)}
                    >
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-700 font-medium text-center"
                      >
                        {note.text}
                      </motion.p>
                      <div className={clsx("w-full h-1 rounded-full mt-3", `bg-gradient-to-r from-${categoryColor}-300 to-${categoryColor}-500`)} />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* No Notes Yet */}
          {revealedNotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ✨
              </motion.div>
              <p className="text-gray-600 text-lg">Click around to find the magic</p>
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-gray-600 mb-2">
              Progress: {revealedNotes.length} / {filteredNotes.length} notes discovered
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(revealedNotes.length / filteredNotes.length) * 100}%` }}
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
              />
            </div>
            {revealedNotes.length === filteredNotes.length && filteredNotes.length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-purple-600 font-dancing text-xl mt-4"
              >
                You found them all! 🌟
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HiddenNotes;
