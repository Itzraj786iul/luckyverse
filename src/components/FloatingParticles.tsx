import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-30"
          style={{
            left: `${particle.left}%`,
            top: '100%',
          }}
          animate={{
            y: [-20, -window.innerHeight - 100],
            x: [0, Math.sin(particle.id) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="rounded-full bg-gradient-to-r from-cyan-300/90 via-violet-400/85 to-fuchsia-400/80 shadow-[0_0_12px_rgba(34,211,238,0.35)]"
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;