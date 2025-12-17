import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Helper to obtain a cross-browser AudioContext constructor without using `any`.
const getAudioContextConstructor = (): (new () => AudioContext) | null => {
  const win = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  return win.AudioContext ?? win.webkitAudioContext ?? null;
};

interface AudioContextType {
  playSound: (soundType: string) => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectsRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Initialize audio on component mount
  useEffect(() => {
    initializeAudio();
    return () => {
      // Cleanup audio on unmount
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      Object.values(soundEffectsRef.current).forEach((audio) => {
        audio.pause();
      });
      soundEffectsRef.current = {};
    };
  }, []);

  const initializeAudio = () => {
    // Create background music using Web Audio API with synthesized sounds
    backgroundMusicRef.current = createBackgroundMusic();

    // Create sound effects
    soundEffectsRef.current = {
      click: createClickSound(),
      success: createSuccessSound(),
      collect: createCollectSound(),
      achievement: createAchievementSound(),
      whoosh: createWhooshSound(),
      bounce: createBounceSound(),
      sparkle: createSparkleSound(),
      error: createErrorSound(),
      level_up: createLevelUpSound(),
      coin: createCoinSound(),
    };
  };

  const createBackgroundMusic = (): HTMLAudioElement => {
    // Create a simple, cheerful background melody using Web Audio API
    const AudioCtor = getAudioContextConstructor();
    if (!AudioCtor) return new Audio();
    const audioContext = new AudioCtor();
    const destination = audioContext.createMediaStreamDestination();

    // Create oscillators for a simple melody
    const createMelodyNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.05, startTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.03, startTime + duration - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    // Simple melody pattern (C major scale)
    const melody = [
      { note: 261.63, duration: 0.5 }, // C4
      { note: 293.66, duration: 0.5 }, // D4
      { note: 329.63, duration: 0.5 }, // E4
      { note: 349.23, duration: 0.5 }, // F4
      { note: 392.0, duration: 0.5 }, // G4
      { note: 440.0, duration: 0.5 }, // A4
      { note: 493.88, duration: 0.5 }, // B4
      { note: 523.25, duration: 1.0 }, // C5
    ];

    let currentTime = audioContext.currentTime;

    // Play melody in loop
    const playMelody = () => {
      melody.forEach((note, i) => {
        createMelodyNote(note.note, currentTime + i * 0.6, note.duration);
      });
      currentTime += melody.length * 0.6 + 1; // Add pause between loops
    };

    // Play initial melody
    playMelody();

    // Convert Web Audio to HTML Audio element for easier control
    const audio = new Audio();
    audio.srcObject = destination.stream;
    audio.loop = true;
    audio.volume = 0.3;

    return audio;
  };

  const createClickSound = (): HTMLAudioElement => {
    return createSynthAudio([{ freq: 800, duration: 0.1, type: 'sine' }], 0.3);
  };

  const createSuccessSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 523.25, duration: 0.2, type: 'sine' }, // C5
        { freq: 659.25, duration: 0.2, type: 'sine' }, // E5
        { freq: 783.99, duration: 0.4, type: 'sine' }, // G5
      ],
      0.4
    );
  };

  const createCollectSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 440, duration: 0.1, type: 'square' },
        { freq: 880, duration: 0.1, type: 'square' },
      ],
      0.5
    );
  };

  const createAchievementSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 523.25, duration: 0.15, type: 'sine' }, // C5
        { freq: 659.25, duration: 0.15, type: 'sine' }, // E5
        { freq: 783.99, duration: 0.15, type: 'sine' }, // G5
        { freq: 1046.5, duration: 0.3, type: 'sine' }, // C6
      ],
      0.6
    );
  };

  const createWhooshSound = (): HTMLAudioElement => {
    return createSynthAudio([{ freq: 200, duration: 0.3, type: 'sawtooth' }], 0.4);
  };

  const createBounceSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 150, duration: 0.1, type: 'sine' },
        { freq: 300, duration: 0.1, type: 'sine' },
      ],
      0.3
    );
  };

  const createSparkleSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 1000, duration: 0.1, type: 'sine' },
        { freq: 1500, duration: 0.1, type: 'sine' },
        { freq: 2000, duration: 0.1, type: 'sine' },
      ],
      0.2
    );
  };

  const createErrorSound = (): HTMLAudioElement => {
    return createSynthAudio([{ freq: 200, duration: 0.3, type: 'sawtooth' }], 0.4);
  };

  const createLevelUpSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 261.63, duration: 0.2, type: 'sine' }, // C4
        { freq: 329.63, duration: 0.2, type: 'sine' }, // E4
        { freq: 392.0, duration: 0.2, type: 'sine' }, // G4
        { freq: 523.25, duration: 0.4, type: 'sine' }, // C5
      ],
      0.7
    );
  };

  const createCoinSound = (): HTMLAudioElement => {
    return createSynthAudio(
      [
        { freq: 800, duration: 0.1, type: 'sine' },
        { freq: 1000, duration: 0.1, type: 'sine' },
      ],
      0.4
    );
  };

  const createSynthAudio = (
    notes: { freq: number; duration: number; type: OscillatorType }[],
    volume: number
  ): HTMLAudioElement => {
    const AudioCtor = getAudioContextConstructor();
    if (!AudioCtor) return new Audio();
    const audioContext = new AudioCtor();
    const destination = audioContext.createMediaStreamDestination();

    let currentTime = audioContext.currentTime;

    notes.forEach((note) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = note.type;
      oscillator.frequency.setValueAtTime(note.freq, currentTime);

      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(volume * 0.7, currentTime + note.duration - 0.05);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);

      oscillator.connect(gainNode);
      gainNode.connect(destination);

      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);

      currentTime += note.duration;
    });

    const audio = new Audio();
    audio.srcObject = destination.stream;
    audio.volume = volume;

    return audio;
  };

  const playSound = (soundType: string) => {
    if (isMuted) return;

    const sound = soundEffectsRef.current[soundType];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((e) => console.log('Sound play failed:', e));
    }
  };

  const playBackgroundMusic = () => {
    if (isMuted) return;

    if (backgroundMusicRef.current && !isPlaying) {
      backgroundMusicRef.current
        .play()
        .catch((e) => console.log('Background music play failed:', e));
      setIsPlaying(true);
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current && isPlaying) {
      backgroundMusicRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        stopBackgroundMusic();
      }
      return next;
    });
  };

  const contextValue: AudioContextType = {
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    toggleMute,
    isMuted,
    isPlaying,
  };

  return <AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>;
};

// Simplified Audio Manager Hook for easy integration
export const useSimpleAudio = () => {
  const [isMuted, setIsMuted] = useState(false);

  const playClickSound = () => {
    if (isMuted) return;
    const AudioCtor = getAudioContextConstructor();
    if (!AudioCtor) return;
    const audioContext = new AudioCtor();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playSuccessSound = () => {
    if (isMuted) return;
    // Simple success sound implementation
    const AudioCtor = getAudioContextConstructor();
    if (!AudioCtor) return;
    const audioContext = new AudioCtor();

    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    let startTime = audioContext.currentTime;

    frequencies.forEach((freq) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(freq, startTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);

      startTime += 0.1;
    });
  };

  return {
    playClickSound,
    playSuccessSound,
    toggleMute: toggleMuteFunctional,
    isMuted,
  };
};
