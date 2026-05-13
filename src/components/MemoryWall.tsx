import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';

const MemoryWall = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const memories = [
    {
      category: 'This reminded me of you',
      icon: '💭',
      color: 'from-blue-400 to-purple-500',
      items: [
        {
          title: 'Grey-sky hills',
          content:
            'Whenever the weather turns moody on a ridgeline I think of you pitching Meghalaya again while standing in Tripura heat. Still “soon,” apparently.',
          sticker: '🏔️',
        },
        {
          title: 'Chai o’clock (illegal edition)',
          content:
            'Someone pouring tea too late, laughing too loud — instant flash to you making a mess hall feel smaller than it was.',
          sticker: '🍵',
        },
        {
          title: 'Random stairs',
          content:
            'Concrete steps + phone light = NIMAS default. You somehow made random stairs feel memorable.',
          sticker: '🌙',
        },
      ],
    },
    {
      category: 'Small fragments',
      icon: '📝',
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          title: 'Day three',
          content:
            'Not about altitude,\njust relief —\nfinally talking\nwithout overthinking the timing.',
          sticker: '🥾',
        },
        {
          title: 'Batch theories',
          content:
            'We swapped seats,\nacted casual,\ntexted anyway.\nPlayful.\nPredictable.\nFine.',
          sticker: '✨',
        },
        {
          title: 'April 20',
          content:
            'Missed it in real time.\nNot trying to turn that into a scene —\nlate wishes still count if the intention survived.',
          sticker: '🎂',
        },
      ],
    },
    {
      category: 'Just doodles',
      icon: '🎨',
      color: 'from-pink-500 to-orange-400',
      items: [
        {
          title: 'Map math',
          content: 'Agartala ←→ Chhattisgarh\n     \\       /\n      Bhalukpong\n(rivers do the negotiating)',
          sticker: '🗺️',
        },
        {
          title: 'Cadet equation',
          content: '100 cadets + 1 gate + 0 sleep\n= still somehow remembering your laugh first.',
          sticker: '⚡',
        },
        {
          title: 'Proper bye box',
          content: '[ ] wave\n[ ] text\n[x] sentence that stayed\n[ ] future hug IOU',
          sticker: '📦',
        },
      ],
    },
    {
      category: 'Someday thoughts',
      icon: '🌟',
      color: 'from-green-400 to-blue-400',
      items: [
        {
          title: 'Meghalaya again',
          content: 'Same half-plan. Different month. Still sounds doable if we stop overthinking permits.',
          sticker: '🌧️',
        },
        {
          title: 'Mountain air IOU',
          content: 'One future birthday should happen at altitude — snacks optional, pressure not invited.',
          sticker: '🎈',
        },
        {
          title: 'Same orbit',
          content: 'Whatever we call this phase — glad we still talk. Glad it’s still easy.',
          sticker: '🤝',
        },
      ],
    },
  ];

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
          className="text-center mb-12"
        >
          <Camera className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            Memory Wall
          </h1>
          <p className="text-gray-600">Little thoughts collected just for you</p>
        </motion.div>

        <div className="grid gap-8">
          {memories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4">
                <div className={`text-4xl bg-gradient-to-r ${category.color} p-4 rounded-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-dancing font-bold text-purple-700">
                    {category.category}
                  </h2>
                  <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full`}></div>
                </div>
              </div>

              {/* Memory Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    layoutId={`card-${categoryIndex}-${itemIndex}`}
                    whileHover={{
                      scale: 1.04,
                      y: -8,
                      rotateX: 2,
                      rotateY: itemIndex % 2 === 0 ? -2.5 : 2.5,
                      boxShadow: '0 24px 50px rgba(124,58,237,0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    onClick={() => setSelectedCard(categoryIndex * 100 + itemIndex)}
                    className="lv-glass-panel lv-card-shine rounded-2xl shadow-xl cursor-pointer relative [transform-style:preserve-3d] ring-1 ring-white/35"
                  >
                    <CardSpotlight className="rounded-2xl h-full min-h-[200px]">
                      <div className="relative p-6 h-full flex flex-col">
                        <div className="absolute top-4 right-4 text-3xl z-[2]">
                          {item.sticker}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-4 pr-12">
                          {item.title}
                        </h3>

                        <p className="text-gray-700 leading-relaxed line-clamp-4 flex-1">
                          {item.content}
                        </p>

                        <div
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-b-2xl`}
                        />
                      </div>
                    </CardSpotlight>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for expanded view */}
        <AnimatePresence>
          {selectedCard !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/50 relative"
              >
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>

                {(() => {
                  const categoryIndex = Math.floor(selectedCard / 100);
                  const itemIndex = selectedCard % 100;
                  const category = memories[categoryIndex];
                  const item = category.items[itemIndex];

                  return (
                    <div>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`text-4xl bg-gradient-to-r ${category.color} p-4 rounded-2xl`}>
                          {category.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-dancing font-bold text-purple-700">
                            {item.title}
                          </h2>
                          <p className="text-gray-600">{category.category}</p>
                        </div>
                        <div className="text-5xl ml-auto">
                          {item.sticker}
                        </div>
                      </div>

                      <div className="prose max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-600 italic">
              Some conversations naturally became part of memory. No thesis required.
            </p>
            <p className="text-purple-600 mt-2 font-dancing text-lg">
              Click on any card to read more ✨
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemoryWall;
