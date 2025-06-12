import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, BookOpen, Lightbulb, MapPin, X } from 'lucide-react';

const MemoryWall = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const memories = [
    {
      category: 'This reminded me of you',
      icon: '💭',
      color: 'from-blue-400 to-purple-500',
      items: [
        {
          title: 'Quiet Library Corners',
          content: 'Every library corner I see reminds me of how you find peace in books and solitude. That\'s your superpower.',
          sticker: '📚'
        },
        {
          title: 'Evening Tea',
          content: 'Saw someone having evening tea alone, looking content. Thought of you and how you make solitude look beautiful.',
          sticker: '🍵'
        },
        {
          title: 'Engineering Memes',
          content: 'Every electrical engineering joke I see makes me think "Shagufta would get this immediately"',
          sticker: '⚡'
        }
      ]
    },
    {
      category: 'Random Poems',
      icon: '📝',
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          title: 'Distance',
          content: 'Two years of silence,\nYet some bonds don\'t break—\nThey just wait patiently\nFor courage to wake.',
          sticker: '🌙'
        },
        {
          title: 'For Introverts',
          content: 'She finds magic in quiet moments,\nStrength in gentle thoughts,\nBeauty in simple conversations\nThat say everything words cannot.',
          sticker: '✨'
        },
        {
          title: 'Birthday Wish',
          content: 'May your new year be filled\nWith books that inspire,\nTea that comforts,\nAnd dreams that never tire.',
          sticker: '🌸'
        }
      ]
    },
    {
      category: 'Just Doodles',
      icon: '🎨',
      color: 'from-pink-500 to-orange-400',
      items: [
        {
          title: 'Circuit of you',
          content: '⚡ ~~~~ 💝 ~~~~ ⚡\n(A simple circuit where care flows both ways)',
          sticker: '🔌'
        },
        {
          title: 'Introvert\'s Paradise',
          content: '🏠 + 📚 + ☕ + 🎵 = Perfect Day\n(The equation for contentment)',
          sticker: '🏡'
        },
        {
          title: 'Growth Chart',
          content: 'Mistake → Learning → Growth → Better Human\n📈 (We\'re all just works in progress)',
          sticker: '🌱'
        }
      ]
    },
    {
      category: 'Someday Thoughts',
      icon: '🌟',
      color: 'from-green-400 to-blue-400',
      items: [
        {
          title: 'Future Engineer',
          content: 'Someday you\'ll design something that makes the world a little better. I just know it.',
          sticker: '🔬'
        },
        {
          title: 'Comfort Zone',
          content: 'Someday I hope you find spaces everywhere that feel as safe as your favorite reading corner.',
          sticker: '🛋️'
        },
        {
          title: 'Us',
          content: 'Someday we\'ll look back at this rebuilding phase and be grateful for second chances.',
          sticker: '🤝'
        }
      ]
    }
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
          <p className="text-gray-600">Little thoughts and memories collected just for you</p>
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
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => setSelectedCard(categoryIndex * 100 + itemIndex)}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/40 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 text-3xl">
                      {item.sticker}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 pr-12">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed line-clamp-4">
                      {item.content}
                    </p>
                    
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color}`}></div>
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
              "The best memories are the ones that make you smile without trying"
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