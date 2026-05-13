import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart } from 'lucide-react';

const Timeline = () => {
  const timelineEvents = [
    {
      year: 'Oct 2025',
      title: 'NIMAS, Bhalukpong',
      description:
        'Same course, same mess, same Arunachal sky. Agartala cadet, Chhattisgarh cadet — polite nods at first, nothing loud yet.',
      icon: '🏔️',
      quote: 'Still unfair how good the sunsets looked.',
      color: 'from-purple-400 to-pink-400',
    },
    {
      year: 'Day three',
      title: 'The trek line',
      description:
        'Halfway up a trail: “Tu Bengali h kya?” — worst opener, somehow worked. After that the talking just… didn’t stop.',
      icon: '🥾',
      quote: 'Still feels funny how everything started there.',
      color: 'from-gray-500 to-blue-500',
    },
    {
      year: 'Camp nights',
      title: 'Gate & stairs',
      description:
        'After dinner everyone parked near the exit — gate, stairs, phones glowing. Texts to slide closer, swap seats, act chill. The batch wrote half a novel. We pretended not to notice.',
      icon: '🌙',
      quote: 'Somehow the gate stairs became a daily thing.',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      year: 'Leaving',
      title: 'A proper bye',
      description:
        'I left first, waved like an idiot, skipped the hug. You called it: no proper bye. Not a movie moment — just accurate.',
      icon: '🌊',
      quote: 'You still owe one proper goodbye. (So do I.)',
      color: 'from-yellow-400 to-pink-500',
    },
    {
      year: 'Now',
      title: 'Same orbit',
      description:
        'After camp the talking spilled into normal life — voice notes, random updates, easy laughter. No screenplay required.',
      icon: '✨',
      quote: 'Meghalaya plans somehow still sound real.',
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
            NIMAS week in loose order — nothing here needs a perfect ending
          </p>
        </motion.div>

        {/* Timeline Line */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className="absolute left-1/2 h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-purple-300 to-pink-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
          />

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
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    rotateX: 3,
                    rotateY: index % 2 === 0 ? -2.5 : 2.5,
                    boxShadow: '0 24px 56px rgba(124,58,237,0.22)',
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="lv-glass-panel lv-card-shine rounded-2xl p-6 shadow-xl [transform-style:preserve-3d] ring-1 ring-white/40"
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
              You’d definitely stop for chai before reaching any destination. Someone should plan a trip around that.
            </p>
            <p className="text-purple-600 mt-4 font-dancing text-xl">Okay. Roads later. For now — this 🌸</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Timeline;
