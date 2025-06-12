import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Heart, Star } from 'lucide-react';

const FinalPage = () => {
  const floatingLanterns = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 2,
    x: Math.random() * 100,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20 relative overflow-hidden"
    >
      {/* Floating Lanterns Background */}
      {floatingLanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="absolute opacity-20"
          style={{ left: `${lantern.x}%`, bottom: '-100px' }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(lantern.id) * 150],
            rotate: [0, 360],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-16 h-20 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-t-full rounded-b-lg relative">
            <div className="absolute inset-2 bg-gradient-to-b from-yellow-200 to-orange-300 rounded-t-full rounded-b-lg">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-600"></div>
          </div>
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <Wand2 className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-4xl md:text-6xl font-dancing font-bold text-purple-700 mb-6">
            No Pressure, Just Peace
          </h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 mb-12"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <Heart className="text-pink-500 mx-2 animate-heartbeat" size={32} />
                <Star className="text-yellow-500 mx-2 animate-sparkle" size={32} />
                <Heart className="text-pink-500 mx-2 animate-heartbeat" size={32} />
              </div>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                This space is not here to ask, expect, or change anything.
              </p>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                It's only here to appreciate you — for being you.
              </p>
              
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block"
              >
                <div className="text-6xl mb-6">🌸</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border-l-4 border-purple-400"
            >
              <h2 className="text-3xl font-dancing font-bold text-purple-700 mb-4">
                Happy Birthday, Shagufta
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                May the year ahead be kind, free, and fulfilling.
                <br />
                May it bring you peace in quiet moments,
                <br />
                strength in challenges,
                <br />
                and joy in unexpected places.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-6"
        >
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
            <p className="text-gray-700 font-light text-lg">
              "The most beautiful people are those who have known defeat, 
              known suffering, known struggle, known loss, and have found 
              their way out of the depths. They have an appreciation, 
              a sensitivity, and an understanding of life that fills them 
              with compassion, gentleness, and a deep loving concern."
            </p>
            <p className="text-purple-600 mt-4 font-dancing text-xl">
              — Elisabeth Kübler-Ross
            </p>
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg"
          >
            Thank you for being wonderfully you 🌸
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-5xl opacity-30"
        >
          🎂
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ duration: 6, delay: 2, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 text-4xl opacity-30"
        >
          🎈
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, delay: 4, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/3 text-4xl opacity-30"
        >
          ✨
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 7, delay: 1, repeat: Infinity }}
          className="absolute bottom-1/3 right-1/3 text-3xl opacity-30"
        >
          🌙
        </motion.div>
      </div>

      {/* Final ambient touch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p className="text-gray-500 text-sm italic">
          This website will always be here, like a quiet friend 💜
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FinalPage;