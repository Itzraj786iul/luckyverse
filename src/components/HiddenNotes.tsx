import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter } from 'lucide-react';
import clsx from 'clsx';

const HiddenNotes = () => {
  const [revealedNotes, setRevealedNotes] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const notes = [
    { id: 1, text: "You made me feel seen when I thought I was invisible", category: "deep", position: { top: '15%', left: '20%' } },
    { id: 2, text: "Your quiet strength is louder than any speech", category: "deep", position: { top: '25%', right: '15%' } },
    { id: 3, text: "I'm rooting for your dreams, even from afar", category: "calm", position: { top: '40%', left: '10%' } },
    { id: 4, text: "You make introversion look like a superpower", category: "funny", position: { top: '60%', right: '25%' } },
    { id: 5, text: "Your mind works in beautiful, complex ways", category: "deep", position: { top: '35%', left: '60%' } },
    { id: 6, text: "Thank you for teaching me that silence can heal", category: "calm", position: { top: '70%', left: '30%' } },
    { id: 7, text: "You deserve all the peace this world can offer", category: "calm", position: { top: '20%', left: '70%' } },
    { id: 8, text: "Engineers who read poetry are rare treasures", category: "funny", position: { top: '80%', right: '20%' } },
    { id: 9, text: "You made me want to become a better person", category: "deep", position: { top: '50%', left: '40%' } },
    { id: 10, text: "Your birthday deserves all the gentle celebrations", category: "calm", position: { top: '65%', right: '10%' } },
    { id: 11, text: "You matter more than you know", category: "deep", position: { top: '85%', left: '50%' } },
    { id: 12, text: "Patna is lucky to have you back", category: "funny", position: { top: '30%', right: '40%' } },
    { id: 13, text: "Your friendship is a gift I didn't know I needed", category: "deep", position: { top: '10%', left: '45%' } },
    { id: 14, text: "Keep being authentically, beautifully you", category: "calm", position: { top: '75%', left: '65%' } },
    { id: 15, text: "The world needs more people like you", category: "deep", position: { top: '45%', right: '30%' } }
  ];

  const categories = [
    { id: 'all', label: 'All Notes', color: 'purple' },
    { id: 'deep', label: 'Deep', color: 'indigo' },
    { id: 'calm', label: 'Calm', color: 'blue' },
    { id: 'funny', label: 'Light', color: 'pink' }
  ];

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
      className="min-h-screen px-4 py-20 bg-gradient-to-b from-white via-purple-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <Sparkles className="mx-auto mb-4 text-purple-600 animate-bounce" size={48} />
          <h1 className="text-5xl font-dancing font-bold text-purple-700 mb-2">Hidden Notes</h1>
          <p className="text-gray-600 mb-6">Click sparkles to reveal heartfelt messages ✨</p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat.id)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-white/30",
                  filter === cat.id
                    ? `bg-${cat.color}-500 text-white shadow-lg`
                    : `bg-white/60 text-${cat.color}-600 hover:bg-${cat.color}-100`
                )}
              >
                <Filter size={16} className="inline mr-2" />
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Reset Button */}
          {revealedNotes.length > 0 && (
            <button
              onClick={resetRevealed}
              className="text-sm mt-2 underline text-purple-500 hover:text-purple-700"
            >
              Reset discovered notes
            </button>
          )}
        </motion.div>

        {/* Notes Canvas */}
        <div className="relative h-screen bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 overflow-hidden">
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
