import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, MessageSquare, BarChart3, User, Users, Calendar, TrendingUp, Brain, Heart, MessageCircle, Zap, Target, Award, Sparkles, Trophy, ChevronRight, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ProgressScreenProps {
  navigateTo: (screen: string) => void;
  isParentMode: boolean;
  setIsParentMode: (mode: boolean) => void;
  collectedStickers: string[];
  childName: string;
  chcTestResults: any;
  chcAssessments: any;
}

export default function ProgressScreen({ navigateTo, isParentMode, setIsParentMode, collectedStickers, childName, chcTestResults, chcAssessments }: ProgressScreenProps) {
  const [activeTab, setActiveTab] = useState<'current' | 'weekly' | 'charts'>('current');
  
  // Calculate CHC-based user stats
  const calculateChcUserStats = () => {
    const chcDomains = Object.values(chcTestResults).filter((test: any) => test.chcDomain && test.completed);
    const completedTests = chcDomains.length;
    const totalChcTests = 8; // 8 CHC broad abilities
    
    let totalScore = 0;
    let totalPossible = 0;

    chcDomains.forEach((test: any) => {
      if (test.completed && test.score !== undefined) {
        totalScore += test.score;
        totalPossible += test.total;
      }
    });

    const averagePercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
    
    // CHC-based cognitive profile interpretation
    let cognitiveProfile = 'Perkembangan Awal';
    if (averagePercentage >= 85) cognitiveProfile = 'Profil Kognitif Superior';
    else if (averagePercentage >= 70) cognitiveProfile = 'Profil Kognitif Rata-rata Tinggi';
    else if (averagePercentage >= 55) cognitiveProfile = 'Profil Kognitif Rata-rata';
    else if (averagePercentage >= 40) cognitiveProfile = 'Profil Kognitif Rata-rata Rendah';

    // Calculate cognitive strengths and weaknesses
    const domainPerformance = chcDomains.map((test: any) => ({
      domain: test.chcDomain,
      score: test.percentage || 0,
      developmentLevel: test.developmentLevel || 'Belum Diukur'
    })).sort((a, b) => b.score - a.score);

    return {
      name: childName,
      level: completedTests + 1,
      score: averagePercentage,
      cognitiveProfile: cognitiveProfile,
      completedTests: completedTests,
      totalTests: totalChcTests,
      strengths: domainPerformance.slice(0, 3),
      needsImprovement: domainPerformance.slice(-2),
      overallCognitiveAge: Math.round(averagePercentage / 10) + 4 // Rough age equivalent
    };
  };

  const userStats = calculateChcUserStats();

  // CHC Weekly progress data
  const chcWeeklyData = [
    { week: 'Minggu 1', fluidReasoning: 65, comprehensionKnowledge: 70, visualProcessing: 58, workingMemory: 72 },
    { week: 'Minggu 2', fluidReasoning: 68, comprehensionKnowledge: 73, visualProcessing: 62, workingMemory: 75 },
    { week: 'Minggu 3', fluidReasoning: 72, comprehensionKnowledge: 76, visualProcessing: 65, workingMemory: 78 },
    { week: 'Minggu 4', fluidReasoning: 75, comprehensionKnowledge: 82, visualProcessing: 68, workingMemory: 82 },
  ];

  // CHC Chart data for each broad ability
  const chcChartData = {
    fluidReasoning: [
      { narrowAbility: 'Penalaran Induktif', score: 78, target: 85, description: 'Kemampuan menalar pola dan aturan' },
      { narrowAbility: 'Penalaran Deduktif', score: 72, target: 80, description: 'Kemampuan menerapkan aturan logis' },
      { narrowAbility: 'Penalaran Kuantitatif', score: 68, target: 75, description: 'Kemampuan menalar dengan angka' }
    ],
    comprehensionKnowledge: [
      { narrowAbility: 'Perkembangan Bahasa', score: 85, target: 90, description: 'Pemahaman bahasa dan komunikasi' },
      { narrowAbility: 'Pengetahuan Leksikal', score: 82, target: 85, description: 'Kosakata dan makna kata' },
      { narrowAbility: 'Informasi Umum', score: 78, target: 82, description: 'Pengetahuan dunia dan budaya' }
    ],
    visualProcessing: [
      { narrowAbility: 'Visualisasi', score: 65, target: 75, description: 'Kemampuan membayangkan objek dalam ruang' },
      { narrowAbility: 'Penalaran Spasial', score: 68, target: 78, description: 'Pemahaman hubungan spasial' },
      { narrowAbility: 'Kecepatan Penutupan', score: 72, target: 80, description: 'Mengenali objek dari bagian yang tidak lengkap' }
    ],
    workingMemory: [
      { narrowAbility: 'Memori Angka', score: 75, target: 82, description: 'Mengingat urutan angka' },
      { narrowAbility: 'Memori Kerja', score: 78, target: 85, description: 'Mengolah informasi dalam pikiran' },
      { narrowAbility: 'Rentang Memori', score: 82, target: 88, description: 'Kapasitas memori jangka pendek' }
    ],
    longTermMemory: [
      { narrowAbility: 'Memori Asosiasi', score: 70, target: 78, description: 'Mengingat hubungan antar informasi' },
      { narrowAbility: 'Pembelajaran Bermakna', score: 75, target: 82, description: 'Menyimpan informasi dengan makna' },
      { narrowAbility: 'Pemanggilan Bebas', score: 68, target: 75, description: 'Mengingat tanpa petunjuk' }
    ],
    processingSpeed: [
      { narrowAbility: 'Kecepatan Persepsi', score: 85, target: 90, description: 'Kecepatan mengenali informasi visual' },
      { narrowAbility: 'Kecepatan Numerik', score: 82, target: 88, description: 'Kecepatan dalam tugas numerik' },
      { narrowAbility: 'Kecepatan Membaca', score: 78, target: 85, description: 'Kecepatan dalam membaca' }
    ],
    auditoryProcessing: [
      { narrowAbility: 'Kodifikasi Fonetik', score: 72, target: 80, description: 'Memproses bunyi bahasa' },
      { narrowAbility: 'Diskriminasi Bunyi', score: 75, target: 82, description: 'Membedakan bunyi serupa' },
      { narrowAbility: 'Pemrosesan Temporal', score: 68, target: 75, description: 'Memproses urutan bunyi' }
    ],
    reactionSpeed: [
      { narrowAbility: 'Waktu Reaksi Sederhana', score: 80, target: 85, description: 'Kecepatan respons dasar' },
      { narrowAbility: 'Waktu Reaksi Pilihan', score: 75, target: 82, description: 'Kecepatan membuat keputusan' },
      { narrowAbility: 'Kecepatan Perbandingan Mental', score: 78, target: 85, description: 'Kecepatan membandingkan informasi' }
    ]
  };

  // Generate CHC-based progress data
  const generateChcProgressData = () => {
    const chcProgressData = [
      {
        chcCode: 'Gf',
        category: 'Fluid Reasoning', 
        categoryIndonesian: 'Penalaran Cair',
        color: 'blue',
        testId: 'fluid-reasoning-test',
        icon: Brain,
        description: 'Kemampuan menalar dan memecahkan masalah baru secara logis',
        keyDomain: 'fluidReasoning',
        narrowAbilities: ['Penalaran Induktif', 'Penalaran Deduktif', 'Penalaran Kuantitatif'],
        developmentLevel: 'Sesuai Usia',
        cognitiveImportance: 'Sangat Penting untuk belajar konsep baru dan pemecahan masalah',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Gc',
        category: 'Comprehension-Knowledge',
        categoryIndonesian: 'Pemahaman-Pengetahuan',
        color: 'orange',
        testId: 'comprehension-knowledge-test',
        icon: MessageCircle,
        description: 'Pengetahuan yang diperoleh dan kemampuan memahami bahasa',
        keyDomain: 'comprehensionKnowledge',
        narrowAbilities: ['Perkembangan Bahasa', 'Pengetahuan Leksikal', 'Informasi Umum'],
        developmentLevel: 'Sangat Baik',
        cognitiveImportance: 'Fundamental untuk prestasi akademik dan komunikasi',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Gv',
        category: 'Visual Processing',
        categoryIndonesian: 'Pemrosesan Visual',
        color: 'purple',
        testId: 'visual-processing-test',
        icon: Target,
        description: 'Kemampuan menganalisis dan memanipulasi informasi visual-spasial',
        keyDomain: 'visualProcessing',
        narrowAbilities: ['Visualisasi', 'Penalaran Spasial', 'Kecepatan Penutupan'],
        developmentLevel: 'Perlu Perhatian Lebih',
        cognitiveImportance: 'Penting untuk matematika, seni, dan pemecahan masalah visual',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Gsm',
        category: 'Short-Term Working Memory',
        categoryIndonesian: 'Memori Kerja Jangka Pendek',
        color: 'green',
        testId: 'working-memory-test',
        icon: Zap,
        description: 'Kemampuan menyimpan dan memanipulasi informasi dalam pikiran',
        keyDomain: 'workingMemory',
        narrowAbilities: ['Memori Angka', 'Memori Kerja', 'Rentang Memori'],
        developmentLevel: 'Sesuai Usia',
        cognitiveImportance: 'Krusial untuk perhatian, konsentrasi, dan pembelajaran',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Glr',
        category: 'Long-Term Storage & Retrieval',
        categoryIndonesian: 'Penyimpanan & Pemanggilan Memori',
        color: 'indigo',
        testId: 'long-term-memory-test',
        icon: Award,
        description: 'Kemampuan menyimpan dan mengambil informasi jangka panjang',
        keyDomain: 'longTermMemory',
        narrowAbilities: ['Memori Asosiasi', 'Pembelajaran Bermakna', 'Pemanggilan Bebas'],
        developmentLevel: 'Baik',
        cognitiveImportance: 'Esensial untuk pembelajaran dan akumulasi pengetahuan',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Gs',
        category: 'Processing Speed',
        categoryIndonesian: 'Kecepatan Pemrosesan',
        color: 'pink',
        testId: 'processing-speed-test',
        icon: Sparkles,
        description: 'Kecepatan melakukan tugas kognitif sederhana dengan akurat',
        keyDomain: 'processingSpeed',
        narrowAbilities: ['Kecepatan Persepsi', 'Kecepatan Numerik', 'Kecepatan Membaca'],
        developmentLevel: 'Sangat Baik',
        cognitiveImportance: 'Mendukung efisiensi dalam tugas akademik dan sehari-hari',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Ga',
        category: 'Auditory Processing',
        categoryIndonesian: 'Pemrosesan Auditori',
        color: 'teal',
        testId: 'auditory-processing-test',
        icon: Heart,
        description: 'Kemampuan memproses dan menganalisis informasi auditori',
        keyDomain: 'auditoryProcessing',
        narrowAbilities: ['Kodifikasi Fonetik', 'Diskriminasi Bunyi', 'Pemrosesan Temporal'],
        developmentLevel: 'Sesuai Usia',
        cognitiveImportance: 'Fundamental untuk perkembangan bahasa dan membaca',
        ageRange: '5-12 tahun'
      },
      {
        chcCode: 'Gt',
        category: 'Reaction & Decision Speed',
        categoryIndonesian: 'Kecepatan Reaksi & Keputusan',
        color: 'amber',
        testId: 'reaction-speed-test',
        icon: Trophy,
        description: 'Kecepatan dalam mengambil keputusan dan bereaksi',
        keyDomain: 'reactionSpeed',
        narrowAbilities: ['Waktu Reaksi Sederhana', 'Waktu Reaksi Pilihan', 'Kecepatan Perbandingan Mental'],
        developmentLevel: 'Baik',
        cognitiveImportance: 'Penting untuk respons cepat dan pengambilan keputusan',
        ageRange: '5-12 tahun'
      }
    ];

    // Update with actual CHC test results
    chcProgressData.forEach(domain => {
      const testResult = chcTestResults[domain.keyDomain];
      const assessmentResult = chcAssessments[domain.keyDomain];
      
      if (testResult && testResult.completed) {
        domain.developmentLevel = testResult.developmentLevel || domain.developmentLevel;
        domain.score = testResult.percentage || 0;
        domain.completedDate = testResult.completedDate;
        domain.narrowAbilityScores = testResult.narrowAbilityScores || {};
      }
      
      if (assessmentResult && assessmentResult.totalPlayed > 0) {
        domain.developmentLevel = assessmentResult.developmentLevel || domain.developmentLevel;
        domain.gamePerformance = {
          averageScore: assessmentResult.averageScore,
          totalPlayed: assessmentResult.totalPlayed,
          lastPlayed: assessmentResult.lastPlayed
        };
      }
    });

    return chcProgressData;
  };

  const chcProgressData = generateChcProgressData();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { 
          bg: 'bg-gradient-to-br from-indigo-500 to-blue-600', 
          stroke: 'stroke-indigo-500', 
          text: 'text-indigo-600',
          light: 'bg-indigo-50',
          border: 'border-indigo-200',
          icon: 'text-indigo-500'
        };
      case 'orange':
        return { 
          bg: 'bg-gradient-to-br from-amber-500 to-orange-600', 
          stroke: 'stroke-amber-500', 
          text: 'text-amber-600',
          light: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'text-amber-500'
        };
      case 'purple':
        return { 
          bg: 'bg-gradient-to-br from-violet-500 to-purple-600', 
          stroke: 'stroke-violet-500', 
          text: 'text-violet-600',
          light: 'bg-violet-50',
          border: 'border-violet-200',
          icon: 'text-violet-500'
        };
      case 'green':
        return { 
          bg: 'bg-gradient-to-br from-emerald-500 to-green-600', 
          stroke: 'stroke-emerald-500', 
          text: 'text-emerald-600',
          light: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: 'text-emerald-500'
        };
      default:
        return { 
          bg: 'bg-gradient-to-br from-slate-500 to-gray-600', 
          stroke: 'stroke-slate-500', 
          text: 'text-slate-600',
          light: 'bg-slate-50',
          border: 'border-slate-200',
          icon: 'text-slate-500'
        };
    }
  };

  const CircularProgress = ({ percentage, color, size = 60 }: { percentage: number; color: string; size?: number }) => {
    const radius = (size - 12) / 2; // Adjusted for thicker stroke
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const colorClasses = getColorClasses(color);

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="6" // Made thicker
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={colorClasses.stroke}
            strokeWidth="6" // Made thicker
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${colorClasses.text}`}>
            {percentage}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-lg px-6 pt-14 pb-6 border-b border-slate-200/50 shadow-sm">
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-slate-800 font-heading text-xl">Dashboard Perkembangan</h1>
            </div>
            <p className="text-slate-500 text-sm">Pantau progress belajar {childName}</p>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-slate-100/80 rounded-2xl p-1.5 backdrop-blur-sm">
          {[
            { id: 'current', label: 'Saat Ini', icon: Target },
            { id: 'weekly', label: 'Mingguan', icon: Calendar },
            { id: 'charts', label: 'Analisis', icon: TrendingUp }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-500/10'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={16} strokeWidth={2} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 py-6 pb-24">
        {/* CHC Cognitive Profile Card - Compact & Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 via-purple-600 to-violet-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-500/20 mb-6 border border-purple-400/20"
        >
          {/* Main Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs mb-0.5">Profil Kognitif CHC</p>
                <h2 className="font-heading text-lg">{userStats.name}</h2>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-heading mb-0.5">{userStats.score}%</div>
              <p className="text-white/80 text-xs">Indeks Global</p>
            </div>
          </div>
          
          {/* Quick Stats - Compact Grid */}
          <div className="grid grid-cols-3 gap-3 bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
            <div className="text-center">
              <p className="text-white/80 text-xs mb-1">Terukur</p>
              <p className="text-white font-semibold">{userStats.completedTests}/8</p>
            </div>
            <div className="text-center border-x border-white/30">
              <p className="text-white/80 text-xs mb-1">Kekuatan</p>
              <p className="text-white font-semibold text-sm">
                {userStats.strengths && userStats.strengths[0] ? userStats.strengths[0].domain : 'Gc'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-xs mb-1">Fokus</p>
              <p className="text-white font-semibold text-sm">
                {userStats.needsImprovement && userStats.needsImprovement[0] ? userStats.needsImprovement[0].domain : 'Gv'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'current' && (
          <>
            {/* CHC Broad Abilities */}
            <div className="space-y-6">
              {chcProgressData.map((domain, domainIndex) => {
                const colorClasses = getColorClasses(domain.color);
                const IconComponent = domain.icon;
                const developmentScore = domain.score || (Math.random() * 40 + 50); // Placeholder for demo
                
                return (
                  <motion.div
                    key={domain.chcCode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: domainIndex * 0.15 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 ${colorClasses.light} rounded-2xl flex items-center justify-center ${colorClasses.border} border-2`}>
                          <IconComponent className={`w-7 h-7 ${colorClasses.icon}`} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-slate-800 font-heading text-lg">
                              {domain.categoryIndonesian}
                            </h3>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${colorClasses.light} ${colorClasses.text} ${colorClasses.border} border`}>
                              {domain.chcCode}
                            </span>
                          </div>
                          <p className="text-slate-500 text-sm mb-2">{domain.description}</p>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              domain.developmentLevel === 'Sangat Baik' ? 'bg-emerald-100 text-emerald-700' :
                              domain.developmentLevel === 'Baik' ? 'bg-blue-100 text-blue-700' :
                              domain.developmentLevel === 'Sesuai Usia' ? 'bg-amber-100 text-amber-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              Status: {domain.developmentLevel}
                            </span>
                            <span className="text-xs text-slate-500">
                              {domain.ageRange}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <CircularProgress 
                          percentage={Math.round(developmentScore)} 
                          color={domain.color}
                          size={70}
                        />
                        <motion.button
                          onClick={() => navigateTo(domain.testId)}
                          className={`mt-3 ${colorClasses.light} ${colorClasses.text} p-2 rounded-xl border ${colorClasses.border} hover:bg-opacity-80 transition-colors`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Narrow Abilities */}
                    <div className="bg-slate-50/50 rounded-2xl p-4">
                      <h4 className="text-slate-700 font-medium text-sm mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Narrow Abilities (Kemampuan Spesifik)
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {domain.narrowAbilities.map((ability, abilityIndex) => {
                          const abilityScore = Math.random() * 30 + 60; // Placeholder score
                          return (
                            <div key={ability} className="flex items-center justify-between bg-white/60 rounded-xl p-3">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-700">{ability}</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {chcChartData[domain.keyDomain]?.[abilityIndex]?.description || 'Kemampuan spesifik dalam domain ini'}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="w-20 bg-slate-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      abilityScore >= 75 ? 'bg-emerald-500' :
                                      abilityScore >= 60 ? 'bg-blue-500' :
                                      abilityScore >= 45 ? 'bg-amber-500' : 'bg-orange-500'
                                    }`}
                                    style={{ width: `${Math.min(abilityScore, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-slate-600 w-8">
                                  {Math.round(abilityScore)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* CHC Cognitive Importance */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Brain className="w-3 h-3 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="text-blue-800 font-medium text-sm mb-1">Relevansi Kognitif</h5>
                          <p className="text-blue-700 text-xs leading-relaxed">{domain.cognitiveImportance}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CHC-Based Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 shadow-xl shadow-emerald-200/30 border border-emerald-200/50 mt-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center border-2 border-emerald-200">
                  <Award className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-slate-800 font-heading text-lg">
                    Rekomendasi Berbasis CHC
                  </h3>
                  <p className="text-slate-500 text-sm">Berdasarkan teori Cattell-Horn-Carroll</p>
                </div>
              </div>
              
              {/* Cognitive Profile Summary */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800 font-medium text-sm">Kekuatan Kognitif</span>
                  </div>
                  <p className="text-slate-700 text-xs">
                    {userStats.strengths && userStats.strengths[0] ? 
                      `Domain ${userStats.strengths[0].domain} menunjukkan performa terbaik dengan skor ${userStats.strengths[0].score}%` :
                      'Comprehension-Knowledge (Gc) dan Processing Speed (Gs) menunjukkan perkembangan yang baik'
                    }
                  </p>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-800 font-medium text-sm">Area Pengembangan</span>
                  </div>
                  <p className="text-slate-700 text-xs">
                    {userStats.needsImprovement && userStats.needsImprovement[0] ? 
                      `Domain ${userStats.needsImprovement[0].domain} memerlukan stimulasi tambahan` :
                      'Visual Processing (Gv) dan Working Memory (Gsm) dapat ditingkatkan melalui latihan terfokus'
                    }
                  </p>
                </div>
              </div>
              
              {/* Scientific Recommendation */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/50 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-medium text-sm mb-2">Rekomendasi Ilmiah CHC</h4>
                    <p className="text-slate-700 text-sm leading-relaxed mb-3">
                      Berdasarkan analisis profil CHC, fokuskan pada strengthening Visual Processing (Gv) melalui aktivitas 
                      manipulasi spasial dan puzzle 3D. Fluid Reasoning (Gf) dapat dikembangkan dengan problem-solving games yang progressif.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <p className="text-blue-800 text-xs">
                        <strong>Validitas Ilmiah:</strong> Rekomendasi ini didasarkan pada teori CHC yang telah divalidasi secara empiris 
                        untuk asesmen kognitif komprehensif pada anak usia 5-12 tahun.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => navigateTo('test-room')}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-2xl font-medium shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Brain className="w-4 h-4" />
                  <span>Tes CHC Lengkap</span>
                </motion.button>
                <motion.button
                  onClick={() => navigateTo('game')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-2xl font-medium shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Latihan Targeted</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'weekly' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* CHC Weekly Progress Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center border-2 border-indigo-200">
                  <TrendingUp className="w-5 h-5 text-indigo-600" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-slate-800 font-heading text-lg">
                    Progress CHC Mingguan
                  </h3>
                  <p className="text-slate-500 text-sm">Perkembangan domain CHC selama 4 minggu terakhir</p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chcWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="week" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      domain={[40, 90]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="fluidReasoning" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }}
                      name="Fluid Reasoning (Gf)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="comprehensionKnowledge" 
                      stroke="#f59e0b" 
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
                      name="Comprehension-Knowledge (Gc)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visualProcessing" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
                      name="Visual Processing (Gv)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="workingMemory" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 7, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                      name="Working Memory (Gsm)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* CHC Legend */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-sm"></div>
                  <span className="text-xs font-medium text-slate-600">Fluid Reasoning (Gf)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full shadow-sm"></div>
                  <span className="text-xs font-medium text-slate-600">Comprehension-Knowledge (Gc)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-violet-500 rounded-full shadow-sm"></div>
                  <span className="text-xs font-medium text-slate-600">Visual Processing (Gv)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                  <span className="text-xs font-medium text-slate-600">Working Memory (Gsm)</span>
                </div>
              </div>
              
              {/* CHC Interpretation */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="text-blue-800 font-medium text-sm mb-2">Interpretasi CHC</h4>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Grafik menunjukkan pola perkembangan 4 domain CHC utama. Tren peningkatan yang konsisten 
                    mengindikasikan maturasi kognitif yang sehat sesuai dengan teori perkembangan Cattell-Horn-Carroll.
                  </p>
                </div>
              </div>
            </div>

            {/* CHC Weekly Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Fluid Reasoning (Gf)', shortLabel: 'Penalaran Cair', value: 75, change: '+10', color: 'indigo', icon: Brain, chcCode: 'Gf' },
                { label: 'Comprehension-Knowledge (Gc)', shortLabel: 'Pemahaman-Pengetahuan', value: 82, change: '+12', color: 'amber', icon: MessageCircle, chcCode: 'Gc' },
                { label: 'Visual Processing (Gv)', shortLabel: 'Pemrosesan Visual', value: 68, change: '+10', color: 'violet', icon: Target, chcCode: 'Gv' },
                { label: 'Working Memory (Gsm)', shortLabel: 'Memori Kerja', value: 82, change: '+10', color: 'emerald', icon: Zap, chcCode: 'Gsm' }
              ].map((item, index) => (
                <motion.div
                  key={item.chcCode}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-200/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 bg-${item.color}-50 rounded-xl flex items-center justify-center border-2 border-${item.color}-200`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-500`} strokeWidth={2} />
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-${item.color}-100 text-${item.color}-700`}>
                      {item.chcCode}
                    </span>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className={`text-2xl font-heading text-${item.color}-600 mb-1`}>
                      {item.value}%
                    </div>
                    <div className="text-sm font-medium text-slate-700 mb-1">{item.shortLabel}</div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-medium border border-emerald-200">
                      {item.change} minggu ini
                    </div>
                  </div>
                  
                  {/* Mini Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 bg-${item.color}-500`}
                        style={{ width: `${Math.min(item.value, 100)}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'charts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* CHC Domain Analysis Charts */}
            {Object.entries(chcChartData).slice(0, 4).map(([chcDomain, data], index) => {
              const getChcColor = (domain: string) => {
                const colorMap: { [key: string]: string } = {
                  fluidReasoning: '#6366f1',
                  comprehensionKnowledge: '#f59e0b',
                  visualProcessing: '#8b5cf6',
                  workingMemory: '#10b981',
                  longTermMemory: '#6366f1',
                  processingSpeed: '#ec4899',
                  auditoryProcessing: '#06b6d4',
                  reactionSpeed: '#f59e0b'
                };
                return colorMap[domain] || '#6b7280';
              };
              
              const getIconForChcDomain = (domain: string) => {
                const iconMap: { [key: string]: any } = {
                  fluidReasoning: Brain,
                  comprehensionKnowledge: MessageCircle,
                  visualProcessing: Target,
                  workingMemory: Zap,
                  longTermMemory: Award,
                  processingSpeed: Sparkles,
                  auditoryProcessing: Heart,
                  reactionSpeed: Trophy
                };
                return iconMap[domain] || Brain;
              };
              
              const getChcInfo = (domain: string) => {
                const infoMap: { [key: string]: { code: string, name: string, description: string } } = {
                  fluidReasoning: { code: 'Gf', name: 'Fluid Reasoning', description: 'Kemampuan menalar dan memecahkan masalah baru' },
                  comprehensionKnowledge: { code: 'Gc', name: 'Comprehension-Knowledge', description: 'Pengetahuan yang diperoleh dan pemahaman bahasa' },
                  visualProcessing: { code: 'Gv', name: 'Visual Processing', description: 'Kemampuan menganalisis informasi visual-spasial' },
                  workingMemory: { code: 'Gsm', name: 'Working Memory', description: 'Kemampuan menyimpan dan memanipulasi informasi' }
                };
                return infoMap[domain] || { code: 'CHC', name: 'CHC Domain', description: 'Domain kognitif CHC' };
              };
              
              const DomainIcon = getIconForChcDomain(chcDomain);
              const chcInfo = getChcInfo(chcDomain);
              
              return (
                <motion.div
                  key={chcDomain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center border-2 border-slate-300">
                        <DomainIcon className="w-6 h-6 text-slate-600" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-slate-800 font-heading text-lg">
                            {chcInfo.name}
                          </h3>
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                            {chcInfo.code}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm">{chcInfo.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="narrowAbility" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#64748b' }}
                          interval={0}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                          domain={[0, 100]}
                        />
                        <Bar 
                          dataKey="score" 
                          fill={getChcColor(chcDomain)}
                          radius={[6, 6, 0, 0]}
                        />
                        <Bar 
                          dataKey="target" 
                          fill="#cbd5e1"
                          radius={[6, 6, 0, 0]}
                          opacity={0.4}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-center space-x-8 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: getChcColor(chcDomain) }}></div>
                        <span className="text-sm font-medium text-slate-600">Skor Saat Ini</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-slate-400 rounded-full shadow-sm"></div>
                        <span className="text-sm font-medium text-slate-600">Target Optimal</span>
                      </div>
                    </div>
                    
                    {/* CHC Narrow Abilities Details */}
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <h4 className="text-slate-700 font-medium text-sm mb-3">Narrow Abilities Detail</h4>
                      <div className="space-y-2">
                        {data.map((ability: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-slate-600">{ability.narrowAbility}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-slate-200 rounded-full h-1.5">
                                <div 
                                  className="h-1.5 rounded-full transition-all duration-500"
                                  style={{ 
                                    backgroundColor: getChcColor(chcDomain),
                                    width: `${Math.min(ability.score, 100)}%` 
                                  }}
                                />
                              </div>
                              <span className="text-slate-700 font-medium w-8">{ability.score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg">
        <div className="flex justify-around py-4">
          {[
            { icon: Home, label: 'Home', screen: 'home' },
            { icon: MessageSquare, label: 'Konsultasi', screen: 'consultation' },
            { icon: Users, label: 'Komunitas', screen: 'community' },
            { icon: BarChart3, label: 'Progress', screen: 'progress', active: true },
            { icon: User, label: 'Profil', screen: 'profile' }
          ].map((item) => (
            <motion.button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center space-y-1 py-1 px-3 transition-colors ${
                item.active 
                  ? 'text-indigo-600' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={20} strokeWidth={item.active ? 2 : 1.5} />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}