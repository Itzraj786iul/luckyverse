import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Heart } from 'lucide-react';

const JustSpace = () => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    
    // Simulate sending (in real implementation, this would connect to a backend)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            💌
          </motion.div>
          
          <h1 className="text-4xl font-dancing font-bold text-purple-700 mb-6">
            Thank You
          </h1>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/40">
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Your message has been safely received. 
            </p>
            <p className="text-gray-600">
              Got it. This box is mostly symbolic anyway — but thanks for typing.
            </p>
            
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-pink-500"
            >
              <Heart size={32} className="mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

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
          <Mail className="mx-auto mb-4 text-purple-600" size={48} />
          <h1 className="text-4xl md:text-5xl font-dancing font-bold text-purple-700 mb-4">
            Just Your Space
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Optional. Truly. Type nonsense, type nothing — both are allowed.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-lg font-medium mb-4">
                If you ever feel like sharing something...
              </label>
              
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="If you want to leave a note — cool. If not — also cool.

Random ideas:
• something funny from camp
• a place you want to drive to
• one sentence you never sent
• literally “ok”

No grading. No expectations. 🌸"
                className="w-full h-64 p-6 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none resize-none text-gray-700 placeholder-gray-400 bg-white/60 backdrop-blur-sm transition-all"
                style={{ fontFamily: 'inherit' }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-600">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Completely private and secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>No pressure to share anything</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  isSubmitting || !message.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Share Thoughts</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Decorative elements */}
          <div className="mt-8 pt-6 border-t border-purple-200/50">
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-2xl"
              >
                🌸
              </motion.div>
              <span className="text-sm italic">
                Your comfort is the priority
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl"
              >
                ✨
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm">
            Made with care — Luckyverse
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JustSpace;