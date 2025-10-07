import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioControlsProps {
  className?: string;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ className = '' }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Play a small feedback sound when toggling
    if (!isMuted) {
      playToggleSound();
    }
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !isMuted) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  };

  const playToggleSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playBackgroundMusic = () => {
    // Simple background music loop
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playMelodyLoop = () => {
      if (!isPlaying || isMuted) return;
      
      const melody = [
        { freq: 523.25, duration: 0.3 }, // C5
        { freq: 587.33, duration: 0.3 }, // D5
        { freq: 659.25, duration: 0.3 }, // E5
        { freq: 698.46, duration: 0.3 }, // F5
        { freq: 783.99, duration: 0.6 }, // G5
      ];
      
      let startTime = audioContext.currentTime;
      
      melody.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0.05, startTime + note.duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
        
        startTime += note.duration + 0.1;
      });
      
      // Schedule next loop
      setTimeout(playMelodyLoop, (melody.length * 0.4 + 2) * 1000);
    };
    
    playMelodyLoop();
  };

  const stopBackgroundMusic = () => {
    // Music will stop naturally when isPlaying becomes false
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Music Toggle */}
      <motion.button
        onClick={toggleMusic}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors ${
          isPlaying 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-white text-white' 
            : 'bg-white/80 border-green-300 text-green-600 hover:bg-green-50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ 
          duration: 2, 
          repeat: isPlaying ? Infinity : 0, 
          ease: "easeInOut" 
        }}
      >
        <Music className="w-6 h-6" strokeWidth={2} />
      </motion.button>

      {/* Sound Toggle */}
      <motion.button
        onClick={toggleMute}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors ${
          !isMuted 
            ? 'bg-gradient-to-r from-blue-400 to-indigo-500 border-white text-white' 
            : 'bg-white/80 border-red-300 text-red-600 hover:bg-red-50'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isMuted ? { 
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ 
          duration: 1.5, 
          repeat: !isMuted ? Infinity : 0, 
          ease: "easeInOut" 
        }}
      >
        {!isMuted ? (
          <Volume2 className="w-6 h-6" strokeWidth={2} />
        ) : (
          <VolumeX className="w-6 h-6" strokeWidth={2} />
        )}
      </motion.button>
    </div>
  );
};

// Simple Audio Feedback Hooks
export const useAudioFeedback = () => {
  const [isMuted, setIsMuted] = useState(false);

  const playClickSound = () => {
    if (isMuted) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const playSuccessSound = () => {
    if (isMuted) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const notes = [
        { freq: 523.25, start: 0, duration: 0.2 },    // C5
        { freq: 659.25, start: 0.15, duration: 0.2 }, // E5
        { freq: 783.99, start: 0.3, duration: 0.4 }   // G5
      ];
      
      notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.start);
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + note.start;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + note.duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const playCollectSound = () => {
    if (isMuted) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Coin-like collect sound
      const frequencies = [800, 1000];
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const startTime = audioContext.currentTime + (index * 0.1);
        oscillator.frequency.setValueAtTime(freq, startTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + 0.1);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.1);
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const playWhooshSound = () => {
    if (isMuted) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.3);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.15);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  const playAchievementSound = () => {
    if (isMuted) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Achievement fanfare
      const melody = [
        { freq: 523.25, start: 0, duration: 0.15 },    // C5
        { freq: 659.25, start: 0.1, duration: 0.15 },  // E5
        { freq: 783.99, start: 0.2, duration: 0.15 },  // G5
        { freq: 1046.50, start: 0.3, duration: 0.3 }   // C6
      ];
      
      melody.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.start);
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + note.start;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + note.duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, startTime + note.duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + note.duration);
      });
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  return {
    playClickSound,
    playSuccessSound,
    playCollectSound,
    playWhooshSound,
    playAchievementSound,
    isMuted,
    toggleMute: () => setIsMuted(!isMuted)
  };
};