import React from 'react';
import { motion } from 'motion/react';
import { ChcDomain } from '../constants';
import { domainIllustrations } from './DomainIllustrations';

interface DomainCardProps {
  domain: ChcDomain;
  index: number;
  onClick: () => void;
}

export const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  index,
  onClick,
}) => {
  const Illustration = domainIllustrations[domain.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Card Background with Gradient */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${domain.color} p-1 ${domain.shadowColor} shadow-xl`}
      >
        {/* Inner card content */}
        <div className="relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm p-4">
          {/* Animated illustration background */}
          {Illustration && <Illustration />}

          {/* Card Content */}
          <div className="relative z-10">
            {/* Icon and badge area */}
            <div className="flex items-start justify-between mb-3">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-4xl filter drop-shadow-lg"
              >
                {domain.icon}
              </motion.div>
              {/* CHC Badge */}
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-xs font-bold text-white drop-shadow">
                  {domain.subtitle}
                </span>
              </div>
            </div>

            {/* Title area */}
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white drop-shadow-md leading-tight">
                {domain.childFriendlyTitle}
              </h3>
              <p className="text-xs text-white/90 font-medium drop-shadow">
                {domain.description}
              </p>
            </div>

            {/* Play button indicator */}
            <div className="mt-3 flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-white text-sm">▶</span>
              </motion.div>
              <span className="text-xs font-bold text-white/90 drop-shadow">
                Main Sekarang!
              </span>
            </div>
          </div>

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-[1.25rem] transition-all duration-300"
            initial={false}
          />
        </div>
      </div>

      {/* Floating particles on hover */}
      <motion.div
        className="absolute -top-2 -right-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ y: [-5, 5, -5], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};
