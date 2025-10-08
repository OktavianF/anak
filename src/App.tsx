import React, { useState } from 'react';
import NewSplashScreen from './components/NewSplashScreen';
import LoginScreen from './components/LoginScreen';
import SurveyScreen from './components/SurveyScreen';
import HomeScreen from './components/HomeScreen';
import CognitiveTestScreen from './components/CognitiveTestScreen';
import LinguisticTestScreen from './components/LinguisticTestScreen';
import InterestTalentTestScreen from './components/InterestTalentTestScreen';
import TestRoomScreen from './components/TestRoomScreen';
import GameScreen from './components/GameScreen';
import ProgressScreen from './components/ProgressScreen';
import ProfileScreen from './components/ProfileScreen';

import StickerCollectionScreen from './components/StickerCollectionScreen';
import PersonalityTestScreen from './components/PersonalityTestScreen';
import ConsultationScreen from './components/ConsultationScreen';
import DoctorListScreen from './components/DoctorListScreen';
import DoctorDetailScreen from './components/DoctorDetailScreen';
import PaymentScreen from './components/PaymentScreen';
import ChatScreen from './components/ChatScreen';
import ParentGuideScreen from './components/ParentGuideScreen';
import CommunityScreen from './components/CommunityScreen';
import MemoryGameScreen from './components/MemoryGameScreen';
import WordPuzzleGameScreen from './components/WordPuzzleGameScreen';
import NumberSequenceGameScreen from './components/NumberSequenceGameScreen';
import PatternRecognitionGameScreen from './components/PatternRecognitionGameScreen';
import MotorTipsScreen from './components/MotorTipsScreen';
import MotorTestGameScreen from './components/MotorTestGameScreen';
import StickerNotification from './components/StickerNotification';
import ChildAssessmentScreen from './components/ChildAssessmentScreen';
import ChildProfileScreen from './components/ChildProfileScreen';
import PINInputModal from './components/PINInputModal';

export default function App() {
  // Core application state with Authentication
  const [appMode, setAppMode] = useState<'child' | 'parent'>('child');
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [showPINModal, setShowPINModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  
  const [childName, setChildName] = useState('');
  const [childGender, setChildGender] = useState('male');
  const [childAge, setChildAge] = useState(6);
  const [isParentMode, setIsParentMode] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [collectedStickers, setCollectedStickers] = useState<string[]>([
    'cognitive-test-complete', 'memory-master', 'panda-buddy', 'level-up'
  ]);
  
  // Survey data
  const [surveyData, setSurveyData] = useState({
    personality: [],
    activities: [],
    learningStyle: [],
    interests: [],
    hobbies: []
  });
  
  // Profile customization state
  const [profileData, setProfileData] = useState({
    avatar: '🦄',
    backgroundColor: '#3B82F6', // blue-500
    favoriteColor: 'blue',
    badges: ['super-star', 'brain-explorer']
  });

  // MBTI Test Result
  const [mbtiResult, setMbtiResult] = useState<any>(null);

  // Sticker Notification State
  const [stickerNotification, setStickerNotification] = useState<{
    id: string;
    name: string;
    emoji: string;
    description: string;
    rarity: string;
  } | null>(null);

  // CHC-Based Test Results State
  const [chcTestResults, setChcTestResults] = useState({
    // Fluid Reasoning (Gf)
    fluidReasoning: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Gf',
      narrowAbilityScores: {
        inductiveReasoning: 0,
        deductiveReasoning: 0,
        quantitativeReasoning: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Comprehension-Knowledge (Gc)
    comprehensionKnowledge: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Gc',
      narrowAbilityScores: {
        languageDevelopment: 0,
        lexicalKnowledge: 0,
        generalInformation: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Visual Processing (Gv)
    visualProcessing: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Gv',
      narrowAbilityScores: {
        visualization: 0,
        spatialRelations: 0,
        closureSpeed: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Short-Term Working Memory (Gsm)
    workingMemory: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Gsm',
      narrowAbilityScores: {
        memorySpan: 0,
        workingMemoryCapacity: 0,
        attentionalControl: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Long-Term Storage and Retrieval (Glr)
    longTermMemory: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Glr',
      narrowAbilityScores: {
        associativeMemory: 0,
        meaningfulMemory: 0,
        freeRecallMemory: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Processing Speed (Gs)
    processingSpeed: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Gs',
      narrowAbilityScores: {
        perceptualSpeed: 0,
        numberFacility: 0,
        readingSpeed: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Auditory Processing (Ga)
    auditoryProcessing: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Ga',
      narrowAbilityScores: {
        phoneticCoding: 0,
        speechSoundDiscrimination: 0,
        resistanceToDistortion: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Reaction and Decision Speed (Gt)
    reactionSpeed: {
      completed: false,
      score: 0,
      total: 10,
      percentage: 0,
      completedDate: null,
      timeSpent: 0,
      chcDomain: 'Gt',
      narrowAbilityScores: {
        simpleReactionTime: 0,
        choiceReactionTime: 0,
        mentalComparisonSpeed: 0
      },
      developmentLevel: 'Belum Diukur',
      ageEquivalent: null,
      recommendations: []
    },
    // Non-CHC assessments
    personality: {
      completed: false,
      type: null,
      animal: null,
      completedDate: null,
      traits: []
    }
  });

  // CHC-Based Assessment Results State
  const [chcAssessments, setChcAssessments] = useState({
    // Fluid Reasoning (Gf) - Kemampuan menalar & memecahkan masalah baru
    fluidReasoning: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Gf',
      narrowAbilities: ['Penalaran Induktif', 'Penalaran Deduktif', 'Penalaran Kuantitatif'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Sesuai Usia'
    },
    // Comprehension-Knowledge (Gc) - Pengetahuan & pemahaman bahasa
    comprehensionKnowledge: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Gc',
      narrowAbilities: ['Perkembangan Bahasa', 'Pengetahuan Leksikal', 'Informasi Umum'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Sangat Baik'
    },
    // Visual Processing (Gv) - Kemampuan analisis & manipulasi visual
    visualProcessing: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Gv',
      narrowAbilities: ['Visualisasi', 'Penalaran Spasial', 'Kecepatan Penutupan'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Perlu Perhatian Lebih'
    },
    // Short-Term Working Memory (Gsm) - Kemampuan mengingat & menggunakan info singkat
    workingMemory: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Gsm',
      narrowAbilities: ['Memori Angka', 'Memori Kerja', 'Rentang Memori'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Sesuai Usia'
    },
    // Long-Term Storage and Retrieval (Glr) - Kemampuan menyimpan & mengambil memori jangka panjang
    longTermMemory: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Glr',
      narrowAbilities: ['Penyimpanan dan Pemanggilan', 'Kelancaran Asosiasi', 'Pembelajaran Bermakna'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Baik'
    },
    // Processing Speed (Gs) - Kecepatan melakukan tugas kognitif sederhana
    processingSpeed: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Gs',
      narrowAbilities: ['Kecepatan Persepsi', 'Kecepatan Numerik', 'Kecepatan Membaca'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Sangat Baik'
    },
    // Auditory Processing (Ga) - Kemampuan memproses suara & bunyi
    auditoryProcessing: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Ga',
      narrowAbilities: ['Diskriminasi Auditori', 'Memori Auditori', 'Pemrosesan Temporal'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Sesuai Usia'
    },
    // Reaction and Decision Speed (Gt) - Kecepatan dalam mengambil keputusan
    reactionSpeed: {
      totalPlayed: 0,
      averageTime: 0,
      averageErrors: 0,
      averageScore: 0,
      bestScore: 0,
      difficulty: 'medium',
      chcDomain: 'Gt',
      narrowAbilities: ['Waktu Reaksi Sederhana', 'Waktu Reaksi Pilihan', 'Kecepatan Keputusan'],
      lastPlayed: null,
      sessions: [],
      developmentLevel: 'Baik'
    }
  });

  // Update CHC test results function
  const updateChcTestResults = (chcDomain: string, results: any) => {
    setChcTestResults(prev => ({
      ...prev,
      [chcDomain]: {
        ...prev[chcDomain as keyof typeof prev],
        ...results,
        completed: true,
        completedDate: new Date().toISOString()
      }
    }));
  };

  // Update CHC assessment function
  const updateChcAssessment = (gameType: string, sessionData: any) => {
    // Map game types to CHC domains
    const gameToChcMapping: { [key: string]: string } = {
      'numberSequence': 'fluidReasoning',
      'patternRecognition': 'visualProcessing', 
      'memory': 'workingMemory',
      'wordPuzzle': 'comprehensionKnowledge',
      'motor': 'reactionSpeed',
      'auditory': 'auditoryProcessing',
      'processing': 'processingSpeed',
      'longTermMemory': 'longTermMemory'
    };
    
    const chcDomain = gameToChcMapping[gameType];
    
    // If domain doesn't exist, just return without error
    if (!chcDomain) {
      console.warn(`Unknown game type: ${gameType}`);
      return;
    }
    
    setChcAssessments(prev => {
      const domain = prev[chcDomain as keyof typeof prev];
      
      // Safety check: ensure domain exists
      if (!domain) {
        console.warn(`CHC domain not found: ${chcDomain}`);
        return prev;
      }
      
      const newSessions = [...domain.sessions, sessionData];
      const totalPlayed = domain.totalPlayed + 1;
      
      // Calculate averages with safety checks
      const totalTime = newSessions.reduce((sum, session) => sum + (session?.timeSpent || 0), 0);
      const totalErrors = newSessions.reduce((sum, session) => sum + (session?.errors || 0), 0);
      const totalScore = newSessions.reduce((sum, session) => sum + (session?.score || 0), 0);
      
      const averageTime = totalPlayed > 0 ? Math.round(totalTime / totalPlayed) : 0;
      const averageErrors = totalPlayed > 0 ? Math.round((totalErrors / totalPlayed) * 10) / 10 : 0;
      const averageScore = totalPlayed > 0 ? Math.round(totalScore / totalPlayed) : 0;
      const bestScore = Math.max(domain.bestScore, sessionData?.score || 0);
      
      // Determine development level based on performance
      let developmentLevel = 'Perlu Perhatian Lebih';
      if (averageScore >= 85) developmentLevel = 'Sangat Baik';
      else if (averageScore >= 70) developmentLevel = 'Baik';
      else if (averageScore >= 55) developmentLevel = 'Sesuai Usia';
      
      return {
        ...prev,
        [chcDomain]: {
          ...domain,
          totalPlayed,
          averageTime,
          averageErrors,
          averageScore,
          bestScore,
          developmentLevel,
          lastPlayed: new Date().toISOString(),
          sessions: newSessions.slice(-10) // Keep only last 10 sessions
        }
      };
    });
  };

  // Mode switching functions
  const switchToParentMode = () => {
    setAppMode('parent');
    setIsParentMode(true);
    setCurrentScreen('home'); // Navigate to parent dashboard
    setShowPINModal(false); // Close PIN modal if open
  };

  const switchToChildMode = () => {
    setAppMode('child');
    setIsParentMode(false);
    setCurrentScreen('game'); // Navigate to child game gallery
  };

  const requestParentAccess = () => {
    setShowPINModal(true);
  };

  const navigateTo = (screen: string, data?: any) => {
    if (data) {
      if (screen === 'doctor-detail') {
        setSelectedDoctor(data);
      }
    }
    setCurrentScreen(screen);
  };

  // Sticker Database with all available stickers
  const stickerDatabase = {
    // Achievement Stickers
    'cognitive-test-complete': { name: 'Brain Explorer', emoji: '🧠', description: 'Selesaikan tes kognitif', rarity: 'common' },
    'logic-master': { name: 'Logic Master', emoji: '💡', description: 'Master tes logika', rarity: 'epic' },
    'attention-expert': { name: 'Attention Expert', emoji: '👁️', description: 'Expert dalam tes perhatian', rarity: 'rare' },
    'memory-champion': { name: 'Memory Champion', emoji: '🧩', description: 'Juara tes memori', rarity: 'epic' },
    'linguistic-test-complete': { name: 'Language Star', emoji: '🗣️', description: 'Selesaikan tes bahasa', rarity: 'common' },
    'receptive-master': { name: 'Receptive Master', emoji: '👂', description: 'Master bahasa reseptif', rarity: 'rare' },
    'expressive-star': { name: 'Expressive Star', emoji: '💬', description: 'Bintang bahasa ekspresif', rarity: 'rare' },
    'phonemic-expert': { name: 'Phonemic Expert', emoji: '🔤', description: 'Expert dalam fonemik', rarity: 'epic' },
    'animal-mbti-complete': { name: 'Personality Explorer', emoji: '🦁', description: 'Temukan kepribadian hewan', rarity: 'legendary' },
    
    // Game Stickers
    'memory-master': { name: 'Memory Master', emoji: '🧠', description: 'Selesaikan memory game!', rarity: 'rare' },
    'word-master': { name: 'Word Master', emoji: '📝', description: 'Ahli dalam word puzzle!', rarity: 'rare' },
    'number-master': { name: 'Number Master', emoji: '🔢', description: 'Master urutan angka!', rarity: 'epic' },
    'number-explorer': { name: 'Number Explorer', emoji: '🧮', description: 'Penjelajah angka!', rarity: 'common' },
    'pattern-master': { name: 'Pattern Master', emoji: '🎯', description: 'Ahli mengenali pola!', rarity: 'legendary' },
    'pattern-explorer': { name: 'Pattern Explorer', emoji: '👁️', description: 'Mata tajam!', rarity: 'rare' },
    'puzzle-master': { name: 'Puzzle Master', emoji: '🧩', description: 'Master puzzle game!', rarity: 'epic' },
    'artist-star': { name: 'Artist Star', emoji: '🎨', description: 'Selesaikan coloring game!', rarity: 'common' },
    'motor-master': { name: 'Motor Master', emoji: '🏃', description: 'Master tes motorik!', rarity: 'legendary' },
    'motor-star': { name: 'Motor Star', emoji: '⭐', description: 'Bintang tes motorik!', rarity: 'rare' },
    'motor-participant': { name: 'Motor Participant', emoji: '🏃‍♂️', description: 'Ikut serta tes motorik!', rarity: 'common' },
    'tips-explorer': { name: 'Tips Explorer', emoji: '💡', description: 'Belajar dari tips motorik!', rarity: 'common' },
    
    // Character Stickers
    'panda-buddy': { name: 'Panda Buddy', emoji: '🐼', description: 'Teman panda imut', rarity: 'common' },
    'unicorn-magic': { name: 'Unicorn Magic', emoji: '🦄', description: 'Keajaiban unicorn', rarity: 'legendary' },
    'cool-penguin': { name: 'Cool Penguin', emoji: '🐧', description: 'Penguin keren', rarity: 'rare' },
    'tiger-champ': { name: 'Tiger Champ', emoji: '🐯', description: 'Juara harimau', rarity: 'epic' },
    'happy-frog': { name: 'Happy Frog', emoji: '🐸', description: 'Katak bahagia', rarity: 'common' },
    
    // Progress Stickers
    'level-up': { name: 'Level Up!', emoji: '🎯', description: 'Naik level!', rarity: 'rare' },
    'first-test': { name: 'First Test Completed', emoji: '🥇', description: 'Tes pertama selesai', rarity: 'common' },
    'five-days-streak': { name: '5 Days Streak', emoji: '🌟', description: 'Belajar 5 hari berturut', rarity: 'epic' },
    'hot-streak': { name: 'Hot Streak!', emoji: '🔥', description: 'Sedang on fire!', rarity: 'legendary' },
    'all-tests-done': { name: 'All Tests Done!', emoji: '🎉', description: 'Semua tes selesai!', rarity: 'legendary' }
  };

  const addSticker = (stickerId: string) => {
    if (!collectedStickers.includes(stickerId)) {
      setCollectedStickers([...collectedStickers, stickerId]);
      
      // Show notification if sticker exists in database
      const stickerInfo = stickerDatabase[stickerId as keyof typeof stickerDatabase];
      if (stickerInfo) {
        setStickerNotification({
          id: stickerId,
          ...stickerInfo
        });
      }
    }
  };

  const updateProfile = (newData: any) => {
    setProfileData({ ...profileData, ...newData });
  };

  const updateSurveyData = (newData: any) => {
    setSurveyData({ ...surveyData, ...newData });
  };

  // Auto-navigate from splash to login after 3 seconds
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
    if (isFirstTime || !childName) {
      // First time users go to survey
      setCurrentScreen('survey');
    } else {
      // Returning users go to parent home
      setAppMode('parent');
      setIsParentMode(true);
      setCurrentScreen('home');
    }
  };

  // Handle survey completion
  const handleSurveyComplete = () => {
    setIsFirstTime(false);
    setIsAuthenticated(true);
    setAppMode('parent');
    setIsParentMode(true);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    const commonProps = {
      navigateTo,
      isParentMode,
      setIsParentMode,
      addSticker,
      collectedStickers
    };

    // Authentication Flow - Show splash and login before main app
    if (!isAuthenticated) {
      switch (currentScreen) {
        case 'splash':
          return <NewSplashScreen />;
        case 'login':
          return <LoginScreen navigateTo={handleLogin} />;
        case 'survey':
          return <SurveyScreen 
            navigateTo={handleSurveyComplete} 
            childName={childName}
            setChildName={setChildName}
            childGender={childGender}
            setChildGender={setChildGender}
            childAge={childAge}
            setChildAge={setChildAge}
            surveyData={surveyData}
            updateSurveyData={updateSurveyData}
          />;
        default:
          return <NewSplashScreen />;
      }
    }

    // Child-First: Show Child Interface or Parent Interface based on appMode
    if (appMode === 'child') {
      // Child Interface - Show appropriate screen based on currentScreen
      switch (currentScreen) {
        case 'memory-game':
          return <MemoryGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
        case 'word-puzzle-game':
          return <WordPuzzleGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
        case 'number-sequence-game':
          return <NumberSequenceGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
        case 'pattern-recognition-game':
          return <PatternRecognitionGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
        case 'child-assessment':
          return <ChildAssessmentScreen 
            navigateTo={navigateTo} 
            childName={childName} 
            isParentMode={isParentMode} 
            setIsParentMode={setIsParentMode}
            chcAssessments={chcAssessments}
          />;
        case 'child-profile':
          return <ChildProfileScreen
            navigateTo={navigateTo}
            childName={childName}
            isParentMode={isParentMode}
            setIsParentMode={setIsParentMode}
            collectedStickers={collectedStickers}
            profileData={profileData}
            updateProfile={updateProfile}
          />;
        default:
          // Default to GameScreen (gallery of games) with parent access button
          return <GameScreen 
            {...commonProps} 
            chcAssessments={chcAssessments} 
            requestParentAccess={requestParentAccess}
            showParentAccessButton={true}
          />;
      }
    }

    // Parent Interface - Full app functionality
    switch (currentScreen) {
      case 'splash':
        return <NewSplashScreen />;
      case 'login':
        return <LoginScreen navigateTo={handleLogin} />;
      case 'survey':
        return <SurveyScreen 
          navigateTo={handleSurveyComplete} 
          childName={childName}
          setChildName={setChildName}
          childGender={childGender}
          setChildGender={setChildGender}
          childAge={childAge}
          setChildAge={setChildAge}
          surveyData={surveyData}
          updateSurveyData={updateSurveyData}
        />;
      case 'home':
        return <HomeScreen 
          {...commonProps} 
          childName={childName} 
          profileData={profileData} 
          chcTestResults={chcTestResults}
          switchToChildMode={switchToChildMode}
        />;
      case 'cognitive-test':
        return <CognitiveTestScreen {...commonProps} childName={childName} updateTestResults={updateChcTestResults} />;
      case 'linguistic-test':
        return <LinguisticTestScreen {...commonProps} childName={childName} updateTestResults={updateChcTestResults} />;
      case 'personality-test':
        return <PersonalityTestScreen {...commonProps} childName={childName} isParentMode={isParentMode} setMbtiResult={setMbtiResult} updateTestResults={updateChcTestResults} />;
      case 'interest-talent-test':
        return <InterestTalentTestScreen {...commonProps} />;
      case 'test-room':
        return <TestRoomScreen {...commonProps} />;
      case 'game':
        return <GameScreen {...commonProps} chcAssessments={chcAssessments} />;
      case 'memory-game':
        return <MemoryGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
      case 'word-puzzle-game':
        return <WordPuzzleGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
      case 'number-sequence-game':
        return <NumberSequenceGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
      case 'pattern-recognition-game':
        return <PatternRecognitionGameScreen {...commonProps} updateGameAssessment={updateChcAssessment} />;
      case 'motor-tips':
        return <MotorTipsScreen {...commonProps} childAge={childAge} addSticker={addSticker} />;
      case 'motor-test-game':
        return <MotorTestGameScreen {...commonProps} childName={childName} updateTestResults={updateChcTestResults} />;
      case 'progress':
        return <ProgressScreen {...commonProps} childName={childName} chcTestResults={chcTestResults} chcAssessments={chcAssessments} />;
      case 'profile':
        return <ProfileScreen 
          {...commonProps} 
          childName={childName} 
          setChildName={setChildName}
          profileData={profileData}
          updateProfile={updateProfile}
          mbtiResult={mbtiResult}
        />;

      case 'stickers':
        return <StickerCollectionScreen {...commonProps} />;
      case 'consultation':
        return <ConsultationScreen {...commonProps} setIsParentMode={setIsParentMode} />;
      case 'doctor-list':
        return <DoctorListScreen {...commonProps} setIsParentMode={setIsParentMode} />;
      case 'doctor-detail':
        return <DoctorDetailScreen {...commonProps} doctor={selectedDoctor} />;
      case 'payment':
        return <PaymentScreen {...commonProps} doctor={selectedDoctor} />;
      case 'chat':
        return <ChatScreen {...commonProps} doctor={selectedDoctor} />;
      case 'parent-guide':
        return <ParentGuideScreen {...commonProps} childName={childName} />;
      case 'community':
        return <CommunityScreen {...commonProps} childName={childName} isParentMode={isParentMode} />;
      case 'child-assessment':
        return <ChildAssessmentScreen 
          navigateTo={navigateTo} 
          childName={childName} 
          isParentMode={isParentMode} 
          setIsParentMode={setIsParentMode}
          chcAssessments={chcAssessments}
        />;
      case 'child-profile':
        return <ChildProfileScreen
          navigateTo={navigateTo}
          childName={childName}
          isParentMode={isParentMode}
          setIsParentMode={setIsParentMode}
          collectedStickers={collectedStickers}
          profileData={profileData}
          updateProfile={updateProfile}
        />;
      default:
        return <HomeScreen 
          {...commonProps} 
          childName={childName} 
          profileData={profileData} 
          chcTestResults={chcTestResults}
          switchToChildMode={switchToChildMode}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative">
        {renderScreen()}
        <StickerNotification 
          sticker={stickerNotification}
          onClose={() => setStickerNotification(null)}
        />
        <PINInputModal
          isOpen={showPINModal}
          onClose={() => setShowPINModal(false)}
          onSuccess={switchToParentMode}
        />
      </div>
    </div>
  );
}