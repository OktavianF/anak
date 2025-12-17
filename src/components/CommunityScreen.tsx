import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MessageSquare,
  Heart,
  Share2,
  MoreVertical,
  Users,
  TrendingUp,
  Clock,
  Home,
  BarChart3,
  User,
  Sparkles,
  Award,
  HelpCircle,
  Trophy,
  UserCheck,
  MessageCircle,
  Plus,
  BookOpen,
  Star,
  CheckCircle,
  Crown,
} from 'lucide-react';

interface CommunityScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode?: boolean;
}

export default function CommunityScreen({
  navigateTo,
  childName,
  isParentMode,
}: CommunityScreenProps) {
  const [activeTab, setActiveTab] = useState('popular');

  const posts = [
    {
      id: 1,
      author: 'Bunda Sarah',
      authorAvatar:
        'https://images.unsplash.com/photo-1549633564-3ab4c92ff2d3?w=100&h=100&fit=crop&auto=format',
      timeAgo: '2 jam lalu',
      content:
        'Anak saya (7th) baru mulai belajar membaca. Ada tips untuk membuat dia lebih semangat? Dia sering merasa bosan dengan buku bacaan biasa.',
      likes: 12,
      comments: 8,
      category: 'Pembelajaran',
      replies: [
        {
          author: 'Mama Rina',
          content:
            'Coba pakai buku bergambar yang interaktif, atau baca bersama dengan suara yang ekspresif!',
        },
        {
          author: 'Papa Doni',
          content:
            'Anak saya suka banget kalau ceritanya tentang hewan atau superhero. Mungkin bisa dicoba?',
        },
      ],
    },
    {
      id: 2,
      author: 'Papa Ahmad',
      authorAvatar:
        'https://images.unsplash.com/photo-1583249283649-c3bbbbafb5a8?w=100&h=100&fit=crop&auto=format',
      timeAgo: '5 jam lalu',
      content:
        'Sharing hasil tes kognitif anak saya hari ini: Matematika 85%, Bahasa 92%! Alhamdulillah ada peningkatan dari bulan lalu. Terima kasih tips dari komunitas ini 🙏',
      likes: 24,
      comments: 15,
      category: 'Pencapaian',
    },
    {
      id: 3,
      author: 'Mama Lisa',
      authorAvatar:
        'https://images.unsplash.com/flagged/photo-1553906789-3e7757f41ae7?w=100&h=100&fit=crop&auto=format',
      timeAgo: '1 hari lalu',
      content:
        'Ada yang punya pengalaman dengan anak yang susah fokus saat belajar? Anak saya (6th) sering teralihkan perhatiannya. Sudah coba berbagai cara tapi belum berhasil.',
      likes: 18,
      comments: 22,
      category: 'Konsultasi',
      replies: [
        {
          author: 'Dr. Maya',
          content:
            'Coba buat jadwal belajar dalam sesi pendek 15-20 menit dengan istirahat. Konsistensi sangat penting.',
          isExpert: true,
        },
      ],
    },
    {
      id: 4,
      author: 'Bunda Fitri',
      authorAvatar:
        'https://images.unsplash.com/photo-1549633564-3ab4c92ff2d3?w=100&h=100&fit=crop&auto=format',
      timeAgo: '2 hari lalu',
      content:
        'Game puzzle di app ANAK sangat membantu melatih logika anak saya! Sekarang dia lebih cepat dalam menyelesaikan masalah. Recommended banget!',
      likes: 31,
      comments: 12,
      category: 'Review',
    },
  ];

  const topics = [
    {
      id: 'popular',
      label: 'Populer',
      icon: Sparkles,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'recent',
      label: 'Terbaru',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'question',
      label: 'Q&A',
      icon: HelpCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'achievement',
      label: 'Pencapaian',
      icon: Award,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  const communityStats = [
    {
      label: 'Anggota Aktif',
      value: '2.8K',
      icon: UserCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-100/50',
    },
    {
      label: 'Diskusi Bulan Ini',
      value: '456',
      icon: MessageCircle,
      color: 'text-blue-400',
      bgColor: 'bg-blue-100/50',
    },
    {
      label: 'Tips Dibagikan',
      value: '89',
      icon: BookOpen,
      color: 'text-amber-400',
      bgColor: 'bg-amber-100/50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 px-6 pt-14 pb-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-16 left-12 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-8 right-4 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="flex items-center justify-between mb-6 relative z-10">
          <motion.button
            onClick={() => navigateTo('home')}
            className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </motion.button>
          <div className="text-center">
            <h1 className="text-white font-heading text-xl mb-1">Komunitas Orang Tua</h1>
            <p className="text-white/80 text-sm">Berbagi & belajar bersama</p>
          </div>
          <div className="w-10" />
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 relative z-10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-heading text-lg mb-1">
                Bersama {childName} & Keluarga Lainnya
              </h2>
              <p className="text-white/80 text-sm">Komunitas yang peduli tumbuh kembang anak</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} strokeWidth={2} />
                </div>
                <div className="text-white font-heading text-lg">{stat.value}</div>
                <div className="text-white/80 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-6 -mt-3 pb-24">
        {/* Topic Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl p-5 shadow-xl shadow-slate-200/50 border border-slate-200/50 mb-6"
        >
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {topics.map((topic) => {
              const IconComponent = topic.icon;
              return (
                <motion.button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`flex-shrink-0 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    activeTab === topic.id
                      ? `${topic.bgColor} ${topic.color} border-2 ${topic.borderColor} shadow-lg`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4" strokeWidth={2} />
                    <span>{topic.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Posts */}
        <div className="space-y-5">
          {posts.map((post, index) => {
            const getCategoryStyle = (category: string) => {
              switch (category) {
                case 'Pembelajaran':
                  return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-700',
                    border: 'border-blue-200',
                    icon: BookOpen,
                  };
                case 'Pencapaian':
                  return {
                    bg: 'bg-emerald-50',
                    text: 'text-emerald-700',
                    border: 'border-emerald-200',
                    icon: Trophy,
                  };
                case 'Konsultasi':
                  return {
                    bg: 'bg-amber-50',
                    text: 'text-amber-700',
                    border: 'border-amber-200',
                    icon: HelpCircle,
                  };
                case 'Review':
                  return {
                    bg: 'bg-purple-50',
                    text: 'text-purple-700',
                    border: 'border-purple-200',
                    icon: Star,
                  };
                default:
                  return {
                    bg: 'bg-slate-50',
                    text: 'text-slate-700',
                    border: 'border-slate-200',
                    icon: MessageSquare,
                  };
              }
            };

            const categoryStyle = getCategoryStyle(post.category);
            const CategoryIcon = categoryStyle.icon;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50 hover:shadow-2xl transition-all duration-300"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-200 bg-indigo-100">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-slate-800 font-heading text-base font-medium">
                        {post.author}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-slate-500 text-xs">{post.timeAgo}</span>
                        <span className="w-1 h-1 bg-slate-400 rounded-full" />
                        <div
                          className={`flex items-center space-x-1.5 px-2 py-1 rounded-lg border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                        >
                          <CategoryIcon className="w-3 h-3" strokeWidth={2} />
                          <span className="text-xs font-medium">{post.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Post Content */}
                <p className="text-slate-700 text-sm leading-relaxed mb-5">{post.content}</p>

                {/* Replies Preview */}
                {post.replies && post.replies.length > 0 && (
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-4 mb-5 space-y-3 border border-slate-200/50">
                    {post.replies.slice(0, 2).map((reply, replyIndex) => (
                      <div key={replyIndex} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-blue-200 rounded-xl flex items-center justify-center">
                          <User className="w-4 h-4 text-slate-600" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-slate-800 font-medium text-sm">
                              {reply.author}
                            </span>
                            {reply.isExpert && (
                              <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200">
                                <CheckCircle className="w-3 h-3" strokeWidth={2} />
                                <span className="text-xs font-medium">Expert</span>
                              </div>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                    {post.comments > 2 && (
                      <motion.button
                        className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        Lihat {post.comments - 2} balasan lainnya →
                      </motion.button>
                    )}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      className="flex items-center space-x-2 text-slate-500 hover:text-rose-500 transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="p-1.5 rounded-lg group-hover:bg-rose-50 transition-colors">
                        <Heart className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <span className="text-sm font-medium">{post.likes}</span>
                    </motion.button>

                    <motion.button
                      className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="p-1.5 rounded-lg group-hover:bg-blue-50 transition-colors">
                        <MessageSquare className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <span className="text-sm font-medium">{post.comments}</span>
                    </motion.button>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="p-1.5 rounded-lg group-hover:bg-emerald-50 transition-colors">
                      <Share2 className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium">Bagikan</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Create Post Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-28 right-6"
        >
          <motion.button
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center border border-white/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-7 h-7" strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg">
        <div className="flex justify-around py-4">
          {[
            { icon: Home, label: 'Home', screen: 'home' },
            { icon: MessageSquare, label: 'Konsultasi', screen: 'consultation' },
            { icon: Users, label: 'Komunitas', screen: 'community', active: true },
            { icon: BarChart3, label: 'Progress', screen: 'progress' },
            { icon: User, label: 'Profil', screen: 'profile' },
          ].map((item) => (
            <motion.button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className={`flex flex-col items-center space-y-1 py-1 px-3 transition-colors ${
                item.active ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
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
