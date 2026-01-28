import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import type { ChcDomain } from '../../constants/chcDomains';

interface DomainCardProps {
  domain: ChcDomain;
  index: number;
  onClick: () => void;
}

export function DomainCard({ domain, index, onClick }: DomainCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{
        delay: index * 0.15 + 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      }}
      className="group cursor-pointer"
      onClick={onClick}
      whileHover={{
        scale: 1.08,
        y: -8,
        rotate: Math.random() * 6 - 3,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{
        scale: 0.92,
        rotate: Math.random() * 10 - 5,
        transition: { duration: 0.1 },
      }}
    >
      <div
        className={`bg-white rounded-3xl p-4 shadow-2xl ${domain.shadowColor} border-4 ${domain.borderColor} h-56 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-3xl`}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-15`}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        />

        {/* Floating sparkles */}
        <FloatingSparkles index={index} />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Illustration */}
          <motion.div
            className="mb-3"
            whileHover={{
              scale: 1.15,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.3 },
            }}
          >
            {domain.illustration}
          </motion.div>

          {/* Child-friendly title */}
          <motion.h3
            className="font-heading text-lg text-slate-800 mb-1 group-hover:text-slate-900 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            {domain.childFriendlyTitle || domain.title}
          </motion.h3>

          {/* CHC Code Badge */}
          <motion.div
            className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${domain.color} mb-2 shadow-lg`}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            }}
          >
            {domain.subtitle}
          </motion.div>

          {/* Fun description */}
          <motion.p
            className="text-slate-600 text-sm group-hover:text-slate-700 transition-colors leading-relaxed"
            whileHover={{ scale: 1.02 }}
          >
            {domain.description}
          </motion.p>
        </div>

        {/* Animated border glow */}
        <motion.div
          className={`absolute inset-0 rounded-3xl border-2 ${domain.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          animate={{
            borderColor: ['currentColor', 'transparent', 'currentColor'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Play button indicator */}
        <motion.div
          className="absolute top-3 left-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <Play className="w-4 h-4 text-green-600" fill="currentColor" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function FloatingSparkles({ index }: { index: number }) {
  return (
    <>
      <motion.div
        className="absolute top-2 right-2 text-yellow-400 text-lg"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.3,
        }}
      >
        ✨
      </motion.div>

      <motion.div
        className="absolute bottom-2 left-2 text-pink-400 text-sm"
        animate={{
          y: [0, -3, 0],
          rotate: [0, -180, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      >
        💫
      </motion.div>
    </>
  );
}
