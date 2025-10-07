import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, Video, FileText, Download, Play, Clock, Star, Library, Brain, MessageCircle, GraduationCap, Heart, Sprout, Palette, ClipboardList, Timer } from 'lucide-react';

interface ParentGuideScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
}

export default function ParentGuideScreen({ navigateTo, childName }: ParentGuideScreenProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const guides = [
    {
      id: 1,
      title: 'Panduan Lengkap Tes Kognitif Anak',
      description: 'Memahami cara menginterpretasi hasil tes kognitif dan langkah tindak lanjut yang tepat.',
      category: 'cognitive',
      type: 'pdf',
      duration: '15 menit',
      rating: 4.8,
      IconComponent: Brain,
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Stimulasi Perkembangan Bahasa di Rumah',
      description: 'Teknik-teknik sederhana untuk meningkatkan kemampuan berbahasa anak sehari-hari.',
      category: 'language',
      type: 'video',
      duration: '12 menit',
      rating: 4.9,
      IconComponent: BookOpen,
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      id: 3,
      title: 'Mengenali Gaya Belajar Anak Anda',
      description: 'Identifikasi apakah anak Anda visual, auditori, atau kinestetik untuk pembelajaran optimal.',
      category: 'learning',
      type: 'article',
      duration: '8 menit',
      rating: 4.7,
      IconComponent: Palette,
      color: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      id: 4,
      title: 'Menghadapi Tantrum dan Emosi Anak',
      description: 'Strategi efektif untuk membantu anak mengelola emosi dengan cara yang sehat.',
      category: 'emotion',
      type: 'video',
      duration: '20 menit',
      rating: 4.6,
      IconComponent: Heart,
      color: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      id: 5,
      title: 'Checklist Perkembangan Usia 5-12 Tahun',
      description: 'Panduan milestone perkembangan yang harus dicapai anak pada setiap usia.',
      category: 'development',
      type: 'pdf',
      duration: '10 menit',
      rating: 4.9,
      IconComponent: ClipboardList,
      color: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 6,
      title: 'Membangun Rutina Belajar yang Menyenangkan',
      description: 'Tips menciptakan lingkungan belajar yang positif dan rutina yang konsisten.',
      category: 'learning',
      type: 'article',
      duration: '6 menit',
      rating: 4.8,
      IconComponent: Timer,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua', IconComponent: Library },
    { id: 'cognitive', label: 'Kognitif', IconComponent: Brain },
    { id: 'language', label: 'Bahasa', IconComponent: MessageCircle },
    { id: 'learning', label: 'Belajar', IconComponent: GraduationCap },
    { id: 'emotion', label: 'Emosi', IconComponent: Heart },
    { id: 'development', label: 'Perkembangan', IconComponent: Sprout }
  ];

  const filteredGuides = activeCategory === 'all' 
    ? guides 
    : guides.filter(guide => guide.category === activeCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'pdf': return FileText;
      case 'article': return BookOpen;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 pt-14 pb-8">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigateTo('consultation')}
            className="p-2 rounded-xl bg-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <h1 className="text-white font-heading font-bold text-xl">Panduan Orang Tua</h1>
          <div className="w-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
        >
          <h2 className="text-white font-heading font-semibold text-lg mb-2">
            Mendampingi {childName} Belajar
          </h2>
          <p className="text-blue-100 font-body text-sm">
            Panduan lengkap untuk mengoptimalkan perkembangan anak Anda
          </p>
        </motion.div>
      </div>

      <div className="px-6 -mt-4 pb-24">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm mb-6"
        >
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-body font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-2">
                  {category.IconComponent && <category.IconComponent className="w-4 h-4" strokeWidth={2} />}
                  <span>{category.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Guides List */}
        <div className="space-y-4">
          {filteredGuides.map((guide, index) => {
            const TypeIcon = getTypeIcon(guide.type);
            
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex space-x-4">
                  <div className={`w-16 h-16 ${guide.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <guide.IconComponent className={`w-8 h-8 ${guide.textColor}`} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 font-heading font-bold text-base leading-tight">
                        {guide.title}
                      </h3>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-body font-semibold text-gray-700">
                          {guide.rating}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-body text-sm leading-relaxed mb-3">
                      {guide.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <TypeIcon className={`w-4 h-4 ${guide.textColor}`} />
                          <span className="text-xs font-body text-gray-500 capitalize">
                            {guide.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-body text-gray-500">
                            {guide.duration}
                          </span>
                        </div>
                      </div>
                      
                      <motion.button
                        className={`px-4 py-2 rounded-xl text-sm font-body font-semibold ${guide.textColor} ${guide.color} hover:opacity-80`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center space-x-2">
                          {guide.type === 'video' ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          <span>
                            {guide.type === 'video' ? 'Tonton' : 'Baca'}
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mt-8 text-white"
        >
          <h3 className="font-heading font-bold text-lg mb-3">💡 Tips Hari Ini</h3>
          <p className="font-body text-green-100 text-sm leading-relaxed">
            "Berikan pujian spesifik saat anak berhasil menyelesaikan tugas. 
            Alih-alih 'Bagus!', coba katakan 'Kamu berhasil menyelesaikan puzzle dengan sabar dan teliti!'"
          </p>
        </motion.div>
      </div>
    </div>
  );
}