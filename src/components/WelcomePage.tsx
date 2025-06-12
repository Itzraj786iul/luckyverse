import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const WelcomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <div className="text-center max-w-4xl mx-auto relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl mb-4"
          >
            🌸
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-dancing font-bold text-purple-700 mb-6">
            Hey Shagufta
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/30"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="text-pink-500 mr-2 animate-heartbeat" size={24} />
            <Sparkles className="text-purple-500 ml-2 animate-sparkle" size={24} />
          </div>

          <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6">
            This is just a gentle digital gift,<br />
            a space of calm, memories, and care — no expectations.
          </p>

          <p className="text-base md:text-lg text-gray-600 font-light mb-8 italic">
            “I’m not waiting on answers or outcomes. Just grateful we’re talking again. I’ll always respect your space and pace.”
          </p>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg"
          >
            No pressure. Just Happy Birthday 🎂
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-gray-600"
          >
            <p className="text-sm">Scroll up to navigate through your special space ✨</p>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-4xl opacity-30"
        >
          ⭐
        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 text-3xl opacity-30"
        >
          🌙
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, delay: 2, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/3 text-3xl opacity-30"
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
