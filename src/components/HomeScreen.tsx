import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Home, MessageSquare, BarChart3, User, Users, Brain, MessageCircle, Theater, Target, Gamepad2, Calendar, Clock, AlertCircle, Award, Sparkles, Trophy, Play, Star, ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode: boolean;
  setIsParentMode: (mode: boolean) => void;
  collectedStickers: string[];
  profileData: any;
  chcTestResults: any;
  switchToChildMode?: () => void;
}

export default function HomeScreen({ 
  navigateTo, 
  childName, 
  isParentMode, 
  setIsParentMode,
  collectedStickers,
  profileData,
  chcTestResults,
  switchToChildMode
}: HomeScreenProps) {



  // Generate dynamic test data based on actual results
  const getTestDisplayData = () => {
    const tests = [
      {
        id: 'cognitive',
        title: 'Kognitif',
        IconComponent: Brain,
        bgColor: 'bg-blue-50',
        progressColor: 'bg-blue-500',
        testKey: 'cognitive'
      },
      {
        id: 'linguistic',
        title: 'Linguistik',
        IconComponent: MessageSquare,
        bgColor: 'bg-orange-50',
        progressColor: 'bg-orange-500',
        testKey: 'linguistic'
      },
      {
        id: 'personality',
        title: 'Kepribadian',
        IconComponent: Theater,
        bgColor: 'bg-purple-50',
        progressColor: 'bg-purple-500',
        testKey: 'personality'
      },
      {
        id: 'motor',
        title: 'Motorik',
        IconComponent: Target,
        bgColor: 'bg-green-50',
        progressColor: 'bg-green-500',
        testKey: 'motor'
      }
    ];

    return tests.map(test => {
      const testResult = chcTestResults[test.testKey];
      
      if (test.testKey === 'personality') {
        // Special handling for personality test
        return {
          ...test,
          score: testResult && testResult.completed ? 'Selesai' : 'Belum',
          total: testResult && testResult.completed ? testResult.animal || 'Selesai' : 'Mulai',
          progress: testResult && testResult.completed ? 100 : 0
        };
      } else {
        // Handle CHC tests - map old keys to new CHC structure
        let chcTestResult = null;
        if (test.testKey === 'cognitive') {
          chcTestResult = chcTestResults.fluidReasoning;
        } else if (test.testKey === 'linguistic') {
          chcTestResult = chcTestResults.comprehensionKnowledge;
        } else if (test.testKey === 'motor') {
          chcTestResult = chcTestResults.workingMemory; // Map motor to working memory for now
        }
        
        return {
          ...test,
          score: chcTestResult && chcTestResult.completed ? chcTestResult.score : 0,
          total: chcTestResult ? chcTestResult.total : 10,
          progress: chcTestResult && chcTestResult.completed ? chcTestResult.percentage : 0
        };
      }
    }).filter(test => {
      if (test.testKey === 'personality') {
        return chcTestResults.personality && chcTestResults.personality.completed;
      } else if (test.testKey === 'cognitive') {
        return chcTestResults.fluidReasoning && chcTestResults.fluidReasoning.completed;
      } else if (test.testKey === 'linguistic') {
        return chcTestResults.comprehensionKnowledge && chcTestResults.comprehensionKnowledge.completed;
      } else if (test.testKey === 'motor') {
        return chcTestResults.workingMemory && chcTestResults.workingMemory.completed;
      }
      return false;
    }); // Only show completed tests
  };

  const recentTests = getTestDisplayData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-600 font-body text-base">Selamat Datang</p>
            <h1 className="text-gray-900 font-heading font-bold text-2xl">Bunda !</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-blue-100">
              <img 
                src={profileData?.avatar || 'https://images.unsplash.com/photo-1758782213616-7b4cd41eff29?w=100&h=100&fit=crop&auto=format'} 
                alt="Profile" 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        {/* Main Adventure Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-6 mb-8 shadow-2xl shadow-purple-500/25 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 right-4 text-white text-2xl">🎮</div>
            <div className="absolute bottom-2 left-4 text-white text-xl">🌟</div>
            <div className="absolute top-1/2 left-8 text-white text-lg">🎯</div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-heading text-2xl mb-2">Game-Based Assessment</h2>
                <p className="text-white/90 text-base mb-4">
                  Saatnya {childName} memulai petualangan belajar yang menyenangkan!
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <motion.button
              onClick={() => switchToChildMode ? switchToChildMode() : navigateTo('child-assessment')}
              className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold py-4 px-6 rounded-2xl shadow-lg border border-white/30 flex items-center justify-center space-x-3 transition-all"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-6 h-6" />
              <span className="text-lg">Mulai Petualangan {childName}!</span>
              <Star className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Schedule & Important Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-heading text-lg">Jadwal & Pengingat Penting</h3>
            <Calendar className="w-5 h-5 text-slate-500" />
          </div>
          
          <div className="space-y-3">
            {/* Consultation Reminder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-blue-800 font-medium text-sm">Konsultasi Mendatang</h4>
                  <p className="text-blue-600 text-xs mt-1">Besok, 15:00 - Dr. Sarah Wijaya</p>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </div>
            </motion.div>

            {/* Assessment Reminder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 border border-amber-200 rounded-2xl p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-amber-800 font-medium text-sm">Pengingat Assessment</h4>
                  <p className="text-amber-600 text-xs mt-1">{childName} belum melakukan tes hari ini</p>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CHC-Based Recommendations (moved from Progress) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 shadow-xl shadow-emerald-200/30 border border-emerald-200/50 mb-8"
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
                Comprehension-Knowledge (Gc) dan Processing Speed (Gs) menunjukkan perkembangan yang baik
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-amber-600" />
                <span className="text-amber-800 font-medium text-sm">Area Pengembangan</span>
              </div>
              <p className="text-slate-700 text-xs">
                Visual Processing (Gv) dan Working Memory (Gsm) dapat ditingkatkan melalui latihan terfokus
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
              onClick={() => navigateTo('progress')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-2xl font-medium shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Lihat Progress</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Recently - Game-Based Assessments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-heading text-lg">Aktivitas Terakhir</h3>
            <Gamepad2 className="w-5 h-5 text-slate-500" />
          </div>
          {recentTests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6 text-center border-2 border-dashed border-slate-200"
            >
              <span className="text-4xl mb-3 block">🎮</span>
              <h4 className="text-slate-700 font-heading font-semibold text-base mb-2">
                Belum ada game assessment yang dimainkan
              </h4>
              <p className="text-slate-500 text-sm">
                Klik "Mulai Petualangan" untuk memulai game-based assessment pertama {childName}!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {recentTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${test.bgColor} rounded-2xl p-4 shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        {test.IconComponent && <test.IconComponent className="w-6 h-6 text-gray-700" strokeWidth={2} />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 font-heading font-semibold text-base">
                          {test.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                            <div 
                              className={`h-2 ${test.progressColor} rounded-full transition-all duration-500`}
                              style={{ width: `${test.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-900 font-heading font-bold text-lg">
                        {test.score}/{test.total}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
        <div className="flex justify-around py-3">
          {[
            { icon: Home, label: 'Home', screen: 'home', active: true },
            { icon: MessageSquare, label: 'Consultation', screen: 'consultation' },
            { icon: Users, label: 'Community', screen: 'community' },
            { icon: BarChart3, label: 'Progress', screen: 'progress' },
            { icon: User, label: 'Profile', screen: 'profile' }
          ].map((item) => (
            <motion.button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center space-y-1 py-2 px-2 ${
                item.active 
                  ? 'text-orange-500' 
                  : 'text-gray-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={18} />
              <span className="text-xs font-body font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}