import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: '2022',
      title: 'The Beginning',
      description:
        "It all started during JEE prep — not just friendship, but a bond that turned into a relationship. We connected over shared ambition, dreams, and something deeper we didn’t even need to explain.",
      icon: '💫',
      quote: '"Some stories begin quietly, but they echo for years."',
      color: 'from-purple-400 to-pink-400',
    },
    {
      year: '2023',
      title: 'The Distance',
      description:
        "When NDA didn’t work out, I broke down — and instead of leaning on you, I pushed you away. I chose silence over vulnerability. It wasn’t fair to you.",
      icon: '🌫️',
      quote: '"Pain explains a lot, but it doesn’t excuse everything."',
      color: 'from-gray-500 to-blue-500',
    },
    {
      year: '2023–24',
      title: 'The Guilt',
      description:
        "Months passed, and I carried the guilt — not loudly, but deeply. I began realizing what my absence might have meant to you… and to us.",
      icon: '🔁',
      quote: '"Healing starts with accountability."',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      year: '2025',
      title: 'The Stirring',
      description:
        "At Patna railway station, I didn’t even see you — but just thinking about you wrecked me. It made me realize how real it all still is. How much I needed to say sorry — and mean it.",
      icon: '🚉',
      quote: '"You don’t need to see someone to feel their presence shake your soul."',
      color: 'from-yellow-400 to-pink-500',
    },
    {
      year: 'Now',
      title: 'The Chance',
      description:
        "You gave this bond a second chance. You asked to keep it slow. And I’m here — not to rush anything, but to show up better. With honesty, patience, and gratitude.",
      icon: '🌸',
      quote: '"Some second chances are quieter — but far more sacred."',
      color: 'from-pink-400 to-purple-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <MapPin className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            Our Journey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every bond has seasons — the warmth, the storms, and the calm after
          </p>
        </motion.div>

        {/* Timeline Line */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-300 to-pink-300 rounded-full"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content Box */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/40"
                >
                  <div className={`text-6xl mb-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {event.icon}
                  </div>

                  <h3 className="text-2xl font-dancing font-bold text-purple-700 mb-2">
                    {event.title}
                  </h3>

                  <div
                    className={`text-lg font-bold bg-gradient-to-r ${event.color} bg-clip-text text-transparent mb-3`}
                  >
                    {event.year}
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                  <div className="italic text-purple-600 font-light border-l-4 border-purple-300 pl-4">
                    {event.quote}
                  </div>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.3 + 0.4, type: 'spring', stiffness: 200 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-4 border-white shadow-lg z-10"
              />

              {/* Empty side for alignment */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-16"
        >
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 max-w-2xl mx-auto">
            <Heart className="mx-auto mb-4 text-pink-500" size={32} />
            <p className="text-lg text-gray-700 font-light">
              "Every end is a new beginning, and every beginning deserves to be celebrated with care."
            </p>
            <p className="text-purple-600 mt-4 font-dancing text-xl">Here’s to the journey ahead 🌸</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Timeline;
