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
          <h1 className="lv-title-gradient mb-6 text-4xl font-dancing font-bold md:text-6xl">
            No pressure, just warmth
          </h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="lv-glass-panel lv-card-shine rounded-[2rem] p-8 shadow-2xl ring-1 ring-white/45 md:p-12 mb-12"
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
                Nothing here is trying to negotiate with you. It’s just a saved atmosphere.
              </p>
              
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                NIMAS stuff mostly — the trek, the gate, the stairs, the bye that wasn’t quite a bye. Small things that refuse to shrink in memory.
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
                April / Lucky
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Happy Birthday, Lucky — for real, even if the timing’s awkward.
                <br />
                <br />
                April 20 passed while I was still clueless — that’s on me. Late wishes still count if the intention survives, right?
                <br />
                <br />
                You’d still choose mountains over a huge party. One future birthday definitely deserves actual altitude and bad signal.
                <br />
                <br />
                Until then: keep your trips messy, your chai hot, your voice notes unreasonably long.
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
              If anything from that week stuck, it’s probably small — a sentence at a gate, a joke on a trek, someone calling out a lazy goodbye. Nothing needs to be bigger than it already was.
            </p>
            <p className="text-purple-600 mt-4 font-dancing text-xl">
              — saved as Luckyverse
            </p>
          </div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg"
          >
            Thanks for being easy to remember — Lucky 🌸
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
          This tab can stay open. Or not. No pressure either way 💜
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FinalPage;