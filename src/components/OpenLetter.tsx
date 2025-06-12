import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';

const OpenLetter = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const letterContent = [
    "Dear Shagufta,",
    "I disappeared. I messed up. There’s no way around it. Two years of silence where there should have been support, honesty, and friendship.",
    "After NDA didn’t work out, I shut down. I was lost in disappointment and didn’t know how to handle it — so I disappeared instead of reaching out. That was selfish. And you didn’t deserve that silence.",
    "Over time, guilt turned into learning. I’ve realized how silence can speak louder than words, and how walking away hurts people who once genuinely cared.",
    "That day at the railway station… I didn’t even see you. But the thought of you, just the thought, hit me like a storm. It made me feel things I thought I had buried. It was overwhelming — not in a dramatic way, but in a raw, honest way. That moment made me realize just how deeply someone’s presence — or absence — can affect you",
    "I’m not writing this expecting anything. I know you've made it clear you want to go slow, stay friends — and I truly respect that. This space isn’t for pressure. It’s just appreciation.",
    "You’re in your second year of B.Tech EE at Jamia, walking your own path, with calmness and clarity. That’s something I deeply admire. You’ve always been someone who chose depth over noise, peace over chaos.",
    "This letter, and this digital space, are just a small gesture. Something for you, your mind, your soul — because you’ve always valued the small, quiet, beautiful things.",
    "So here it is — a soft birthday gift. No expectations, just good intentions. May this year bring you ease, clarity, strength, and joy.",
    "Happy Birthday, Shagufta. Thank you for still being here. 🌸",
    "With quiet respect, and genuine care — Chotu(Raziullah)"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentParagraph((prev) =>
        prev < letterContent.length - 1 ? prev + 1 : prev
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
          <BookOpen className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            An Open Letter
          </h1>
          <p className="text-gray-600">Written with honesty and care</p>
        </motion.div>

        <motion.div
          initial={{ rotateY: -180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 relative overflow-hidden"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e6e6fa\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        >
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {letterContent.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentParagraph ? 1 : 0.3,
                  x: 0
                }}
                transition={{
                  delay: index * 0.5,
                  duration: 0.8
                }}
                className={`text-lg ${
                  index === 0 || index === letterContent.length - 2
                    ? 'font-dancing text-2xl text-purple-700'
                    : index === letterContent.length - 1
                    ? 'font-dancing text-xl text-purple-600 text-right'
                    : 'font-poppins'
                } ${
                  index <= currentParagraph ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 right-4 text-purple-300 opacity-20"
          >
            <Heart size={32} />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-4 left-4 text-pink-300 opacity-20"
          >
            🌸
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm">
            Take your time reading. There's no rush. ✨
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OpenLetter;
