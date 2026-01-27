import React from 'react';
import { motion } from 'motion/react';

export const BackgroundDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating puzzle pieces */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-5"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="text-purple-300"
        >
          <path
            fill="currentColor"
            d="M20,0 L40,0 L40,15 C45,15 50,20 50,25 C50,30 45,35 40,35 L40,40 L40,60 L0,60 L0,40 L15,40 C15,35 10,30 5,30 C0,30 0,25 5,25 C10,25 15,20 15,15 L0,15 L0,0 L20,0 Z"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-40 right-10"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 60 60"
          className="text-pink-300"
        >
          <path
            fill="currentColor"
            d="M20,0 L40,0 L40,15 C45,15 50,20 50,25 C50,30 45,35 40,35 L40,40 L40,60 L0,60 L0,40 L15,40 C15,35 10,30 5,30 C0,30 0,25 5,25 C10,25 15,20 15,15 L0,15 L0,0 L20,0 Z"
          />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-40 left-10"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 60 60"
          className="text-amber-300"
        >
          <path
            fill="currentColor"
            d="M20,0 L40,0 L40,15 C45,15 50,20 50,25 C50,30 45,35 40,35 L40,40 L40,60 L0,60 L0,40 L15,40 C15,35 10,30 5,30 C0,30 0,25 5,25 C10,25 15,20 15,15 L0,15 L0,0 L20,0 Z"
          />
        </svg>
      </motion.div>

      {/* Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute text-xl"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
};
