import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';

const LETTER_CONTENT = [
  'Dear Lucky,',
  'NCC River Rafting Special Course, NIMAS Bhalukpong — from 10 Oct 2025. Roughly a hundred cadets, same mess, same tired jokes. You from Agartala, Tripura. Me from Chhattisgarh. Same cold mornings, same river days.',
  'First couple of days we barely spoke. Then on day three of a trek you opened with “Tu Bengali h kya?” Still feels funny that everything started there. After that it was just… constant.',
  'After dinner everyone drifted to the institute exit — gate, stairs, phones glowing. Little texts to come sit closer, swap seats, pretend it was casual. The batch definitely had theories. We didn’t really care.',
  'When camp ended I left first. I wanted a real hug, chickened out, did a half wave. You said I didn’t give you a proper bye. Fair. That sentence stuck — not dramatic, just true. (You still owe one clean goodbye on better terms. Half joking.)',
  'You’re the extrovert who actually settles a room. Army kid, Himachal till 10th, Holy Cross now, third year, NCC Best Cadet runner-up — yeah, it tracks. You also romanticize mountains too much. It’s fine.',
  'April 20 slipped past while I was still sorting my head. Late wishes, but the intention survived. You’d still pick mountains over a fancy celebration anyway. One future birthday definitely deserves mountain air.',
  'This is just Luckyverse — chai breaks, half-made Meghalaya plans, voice notes, comfortable silence when words aren’t needed.',
  'Happy Birthday, Lucky. Seriously.',
  '— the cadet who still remembers the stairs',
];

const OpenLetter = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentParagraph((prev) => (prev < LETTER_CONTENT.length - 1 ? prev + 1 : prev));
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
          <p className="text-gray-600">Reads more like a long text than a speech</p>
        </motion.div>

        <motion.div
          initial={{ rotateY: -180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 relative overflow-hidden"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6e6fa' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {LETTER_CONTENT.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: index <= currentParagraph ? 1 : 0.3,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.5,
                  duration: 0.8,
                }}
                className={`text-lg ${
                  index === 0 || index === LETTER_CONTENT.length - 2
                    ? 'font-dancing text-2xl text-purple-700'
                    : index === LETTER_CONTENT.length - 1
                      ? 'font-dancing text-xl text-purple-600 text-right'
                      : 'font-poppins'
                } ${index <= currentParagraph ? 'opacity-100' : 'opacity-30'}`}
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
            Read it in pieces if you want. No timer. ✨
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OpenLetter;
