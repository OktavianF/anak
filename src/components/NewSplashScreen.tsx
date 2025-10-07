import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles, Star, Heart, Cloud } from 'lucide-react';
import anakLogo from 'figma:asset/e98844b3cc7b597ff0b79e0a631a430f264ab517.png';

export default function NewSplashScreen() {
  const [imageError, setImageError] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const texts = ['Menyiapkan petualangan', 'Memuat permainan seru', 'Hampir siap'];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Colorful Background Shapes */}
      <motion.div 
        className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-60 blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full opacity-60 blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-28 h-28 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full opacity-60 blur-2xl"
        animate={{ 
          scale: [1, 1.4, 1],
          x: [0, 15, 0],
          y: [0, 25, 0]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-16 left-16"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Heart className="w-7 h-7 text-pink-400 fill-pink-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20"
        animate={{ 
          y: [0, -10, 0],
          x: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Cloud className="w-10 h-10 text-white fill-white opacity-80" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-16"
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, 20, 0]
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Sparkles className="w-8 h-8 text-purple-300" />
      </motion.div>

      {/* Animated Rainbow Circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            background: ['#FF6B9D', '#C770F0', '#6EC1E4', '#54D6BB', '#FFD93D', '#FF8A65'][i],
            top: `${15 + i * 12}%`,
            left: `${10 + (i % 2) * 70}%`,
          }}
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 2 + i * 0.3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}

      {/* Main Logo Container with Bounce Animation */}
      <motion.div 
        className="relative z-20 flex flex-col items-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          duration: 0.8
        }}
      >
        {/* Glowing Circle Behind Logo */}
        <motion.div
          className="absolute w-64 h-64 bg-white rounded-full opacity-30 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ANAK Logo with Bounce */}
        <motion.div 
          className="relative mb-6 flex flex-col items-center"
          animate={{ 
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-40 h-40 mb-3 flex items-center justify-center relative">
            {/* Sparkle effects around logo */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </motion.div>
            
            {!imageError ? (
              <ImageWithFallback 
                src={anakLogo} 
                alt="ANAK Logo" 
                className="w-full h-full object-contain drop-shadow-2xl"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl">
                <div className="text-center">
                  <motion.div 
                    className="text-6xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🧠
                  </motion.div>
                  <div className="text-4xl font-heading text-white tracking-wider">
                    ANAK
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Fun Title with Gradient */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-3xl font-heading bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Selamat Datang!
            </h1>
            <p className="text-sm font-heading text-white/90 tracking-wide">
              Petualangan Cerdas Dimulai
            </p>
          </motion.div>
        </motion.div>

        {/* Playful Loading Animation */}
        <motion.div 
          className="flex flex-col items-center space-y-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Bouncing Dots */}
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: ['#FF6B9D', '#C770F0', '#6EC1E4', '#54D6BB', '#FFD93D'][i]
                }}
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Loading Text */}
          <motion.p 
            className="text-white font-heading text-sm"
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {loadingText}...
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Floating Bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: 20 + Math.random() * 40,
            height: 20 + Math.random() * 40,
            left: `${Math.random() * 100}%`,
            bottom: -50,
          }}
          animate={{ 
            y: [-50, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear"
          }}
        />
      ))}

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-600/20 to-transparent z-10" />
    </div>
  );
}