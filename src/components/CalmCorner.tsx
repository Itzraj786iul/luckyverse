import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const CalmCorner = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale', 'hold', 'exhale'

  const affirmations = [
    "Warmth doesn't need a speech attached.",
    "You can want roads and rest in the same week.",
    "April 28 is just a date — the thought can arrive later.",
    "Mountains can stay a hobby, not a personality trial.",
    "Playful isn't shallow. You proved that.",
    "Voice notes are allowed to be long. So is silence after.",
    "Chai first, decisions later.",
    "Stillness isn't the enemy of your energy.",
    "Meghalaya can stay a running joke until it isn't.",
    "You're allowed to be loud and tired at once.",
    "Comfortable beats impressive most days.",
    "If today is heavy — smaller steps still count."
  ];

  useEffect(() => {
    let breathTimer: NodeJS.Timeout;
    let affirmationTimer: NodeJS.Timeout;

    if (isBreathing) {
      // Breathing cycle: 4s inhale, 2s hold, 6s exhale
      const runBreathCycle = () => {
        setBreathPhase('inhale');
        
        setTimeout(() => setBreathPhase('hold'), 4000);
        setTimeout(() => setBreathPhase('exhale'), 6000);
        setTimeout(() => runBreathCycle(), 12000);
      };
      
      runBreathCycle();
      
      // Change affirmation every 24 seconds (2 breath cycles)
      affirmationTimer = setInterval(() => {
        setCurrentAffirmation(prev => (prev + 1) % affirmations.length);
      }, 24000);
    }

    return () => {
      clearTimeout(breathTimer);
      clearInterval(affirmationTimer);
    };
  }, [isBreathing]);

  const breathingInstructions = {
    inhale: { text: "Breathe In", duration: 4, scale: 1.3 },
    hold: { text: "Hold", duration: 2, scale: 1.3 },
    exhale: { text: "Breathe Out", duration: 6, scale: 0.8 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <Heart className="mx-auto mb-4 text-pink-500 animate-heartbeat" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            Calm Corner
          </h1>
          <p className="text-gray-600">A peaceful space for mindful moments</p>
        </motion.div>

        {/* Breathing Exercise */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 mb-8 text-center"
        >
          {/* Sound Control */}
          <div className="flex justify-end mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </motion.button>
          </div>

          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              animate={isBreathing ? {
                scale: breathingInstructions[breathPhase as keyof typeof breathingInstructions].scale
              } : { scale: 1 }}
              transition={{ 
                duration: breathingInstructions[breathPhase as keyof typeof breathingInstructions]?.duration || 1,
                ease: "easeInOut"
              }}
              className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart size={48} className="text-white" />
              </motion.div>
            </motion.div>

            {/* Breath instruction */}
            <AnimatePresence mode="wait">
              {isBreathing && (
                <motion.div
                  key={breathPhase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -bottom-16"
                >
                  <p className="text-2xl font-dancing font-bold text-purple-700">
                    {breathingInstructions[breathPhase as keyof typeof breathingInstructions]?.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Control Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBreathing(!isBreathing)}
            className={`px-8 py-4 rounded-full text-lg font-medium shadow-lg transition-all ${
              isBreathing
                ? 'bg-red-400 hover:bg-red-500 text-white'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
            }`}
          >
            {isBreathing ? (
              <>
                <Pause size={20} className="inline mr-2" />
                Stop Session
              </>
            ) : (
              <>
                <Play size={20} className="inline mr-2" />
                Start Breathing
              </>
            )}
          </motion.button>

          {isBreathing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 mt-4 text-sm"
            >
              Follow the circle's rhythm • 4s in, 2s hold, 6s out 🌸
            </motion.p>
          )}
        </motion.div>

        {/* Affirmations */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40"
        >
          <h2 className="text-2xl font-dancing font-bold text-purple-700 text-center mb-8">
            Gentle Reminders
          </h2>

          <div className="text-center min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAffirmation}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed italic">
                  "{affirmations[currentAffirmation]}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Affirmation navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {affirmations.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentAffirmation(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentAffirmation
                    ? 'bg-purple-500'
                    : 'bg-gray-300 hover:bg-purple-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Ambient sounds note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm italic">
            {soundEnabled 
              ? "🎵 Ambient sounds enabled for deeper relaxation"
              : "Click the sound icon to enable gentle ambient sounds"
            }
          </p>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-4xl"
        >
          🌸
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ duration: 6, delay: 2, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 text-3xl"
        >
          ✨
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 10, delay: 4, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/3 text-3xl"
        >
          🌙
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CalmCorner;