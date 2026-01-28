import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Home,
  MessageSquare,
  BarChart3,
  User,
  Users,
  Edit3,
  Bell,
  History,
  HelpCircle,
  Plus,
  Trash2,
  Shield,
  Mail,
  Lock,
  Phone,
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
  MessageCircle,
} from 'lucide-react';

interface ProfileScreenProps {
  navigateTo: (screen: string) => void;
  isParentMode: boolean;
  setIsParentMode: (mode: boolean) => void;
  childName: string;
  setChildName: (name: string) => void;
  collectedStickers: string[];
  profileData: Record<string, unknown>;
  updateProfile: (data: Record<string, unknown>) => void;
}

export default function ProfileScreen({ navigateTo }: ProfileScreenProps) {
  const [activeSection, setActiveSection] = useState('account');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Parent Account Data
  const [parentAccount, setParentAccount] = useState({
    name: 'Sarah Wijaya',
    email: 'sarah.wijaya@gmail.com',
    phone: '+62 812-3456-7890',
    occupation: 'Dokter',
    location: 'Jakarta Selatan',
  });

  // Children Profiles
  const [children, setChildren] = useState([
    {
      id: 1,
      name: 'Maya Wijaya',
      age: 6,
      gender: 'female',
      avatar:
        'https://images.unsplash.com/photo-1646039254748-78649b967501?w=200&h=200&fit=crop&auto=format',
      lastAssessment: '3 hari yang lalu',
      assessmentProgress: 75,
      favoriteActivity: 'Memory Games',
    },
    {
      id: 2,
      name: 'Rafi Wijaya',
      age: 9,
      gender: 'male',
      avatar:
        'https://images.unsplash.com/photo-1758782213616-7b4cd41eff29?w=200&h=200&fit=crop&auto=format',
      lastAssessment: '1 minggu yang lalu',
      assessmentProgress: 60,
      favoriteActivity: 'Pattern Recognition',
    },
  ]);

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    assessmentReminders: true,
    consultationReminders: true,
    progressReports: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  // Consultation History
  const consultationHistory = [
    {
      id: 1,
      date: '15 November 2024',
      doctor: 'Dr. Andi Susanto, M.Psi',
      child: 'Maya Wijaya',
      duration: '45 menit',
      type: 'Konsultasi Rutin',
      summary:
        'Perkembangan kognitif Maya menunjukkan progress yang baik. Disarankan untuk meningkatkan stimulasi pada area visual processing.',
      status: 'completed',
    },
    {
      id: 2,
      date: '8 November 2024',
      doctor: 'Dr. Sarah Lestari, M.Psi',
      child: 'Rafi Wijaya',
      duration: '60 menit',
      type: 'Assessment Review',
      summary:
        'Review hasil assessment menunjukkan Rafi memiliki kekuatan di area working memory, namun perlu stimulasi tambahan untuk processing speed.',
      status: 'completed',
    },
    {
      id: 3,
      date: '22 November 2024',
      doctor: 'Dr. Andi Susanto, M.Psi',
      child: 'Maya Wijaya',
      duration: '45 menit',
      type: 'Follow-up',
      summary: '',
      status: 'scheduled',
    },
  ];

  const updateParentAccount = (field: string, value: string) => {
    setParentAccount((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNotification = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  const addChild = () => {
    const newChild = {
      id: Date.now(),
      name: '',
      age: 0,
      gender: 'male',
      avatar:
        'https://images.unsplash.com/photo-1758782213616-7b4cd41eff29?w=200&h=200&fit=crop&auto=format',
      lastAssessment: 'Belum pernah',
      assessmentProgress: 0,
      favoriteActivity: 'Belum ada',
    };
    setChildren([...children, newChild]);
    setShowChildForm(true);
  };

  const deleteChild = (id: number) => {
    setChildren(children.filter((child) => child.id !== id));
  };

  const menuSections = [
    {
      id: 'account',
      title: 'Manajemen Akun Induk',
      icon: User,
      description: 'Kelola data pribadi dan keamanan akun',
    },
    {
      id: 'children',
      title: 'Manajemen Profil Anak',
      icon: Users,
      description: 'Tambah, edit, atau hapus profil anak',
    },
    {
      id: 'notifications',
      title: 'Pengaturan Notifikasi',
      icon: Bell,
      description: 'Atur pengingat dan notifikasi',
    },
    {
      id: 'consultations',
      title: 'Riwayat Konsultasi',
      icon: History,
      description: 'Lihat riwayat sesi dengan psikolog',
    },
    {
      id: 'support',
      title: 'Bantuan & Dukungan',
      icon: HelpCircle,
      description: 'FAQ dan layanan pelanggan',
    },
  ];

  const renderAccountSection = () => (
    <div className="space-y-6">
      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-slate-800 font-heading text-xl">{parentAccount.name}</h3>
            <p className="text-slate-500">{parentAccount.occupation}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">{parentAccount.email}</span>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">{parentAccount.phone}</span>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <h4 className="text-slate-800 font-heading text-lg mb-4 flex items-center">
          <Shield className="w-5 h-5 text-emerald-600 mr-2" />
          Keamanan Akun
        </h4>

        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl hover:from-emerald-100 hover:to-blue-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span className="text-slate-700 font-medium">Ubah Kata Sandi</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        {showPasswordForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-4 p-4 bg-slate-50 rounded-xl"
          >
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                placeholder="Kata sandi saat ini"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                placeholder="Kata sandi baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                placeholder="Konfirmasi kata sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                Simpan
              </button>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );

  const renderChildrenSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-slate-800 font-heading text-xl">Profil Anak</h3>
        <button
          onClick={addChild}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Anak</span>
        </button>
      </div>

      <div className="space-y-4">
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-300 shadow-md bg-orange-100">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-slate-800 font-heading text-lg">{child.name}</h4>
                  <p className="text-slate-500">
                    {child.age} tahun • {child.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteChild(child.id)}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-slate-500 text-sm mb-1">Assessment Terakhir</div>
                <div className="text-slate-800 font-medium">{child.lastAssessment}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-slate-500 text-sm mb-1">Aktivitas Favorit</div>
                <div className="text-slate-800 font-medium">{child.favoriteActivity}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700 text-sm font-medium">Progress Assessment</span>
                <span className="text-indigo-600 font-bold">{child.assessmentProgress}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${child.assessmentProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <h3 className="text-slate-800 font-heading text-xl mb-6 flex items-center">
          <Bell className="w-6 h-6 text-blue-600 mr-2" />
          Pengaturan Notifikasi
        </h3>

        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => {
            const labels = {
              assessmentReminders: 'Pengingat Assessment Mingguan',
              consultationReminders: 'Pengingat Jadwal Konsultasi',
              progressReports: 'Laporan Progress Bulanan',
              weeklyDigest: 'Ringkasan Mingguan',
              marketingEmails: 'Email Promosi',
            };

            return (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
              >
                <div>
                  <div className="text-slate-800 font-medium">
                    {labels[key as keyof typeof labels]}
                  </div>
                  <div className="text-slate-500 text-sm">
                    {key === 'assessmentReminders' &&
                      'Dapatkan pengingat untuk melakukan assessment rutin'}
                    {key === 'consultationReminders' &&
                      'Notifikasi untuk jadwal konsultasi yang akan datang'}
                    {key === 'progressReports' && 'Laporan perkembangan anak secara berkala'}
                    {key === 'weeklyDigest' && 'Ringkasan aktivitas dan progress mingguan'}
                    {key === 'marketingEmails' && 'Informasi produk dan penawaran khusus'}
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );

  const renderConsultationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-slate-800 font-heading text-xl flex items-center">
        <History className="w-6 h-6 text-emerald-600 mr-2" />
        Riwayat Konsultasi
      </h3>

      <div className="space-y-4">
        {consultationHistory.map((consultation, index) => (
          <motion.div
            key={consultation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    consultation.status === 'completed'
                      ? 'bg-emerald-500'
                      : consultation.status === 'scheduled'
                      ? 'bg-blue-500'
                      : 'bg-slate-300'
                  }`}
                />
                <div>
                  <h4 className="text-slate-800 font-heading text-lg">{consultation.doctor}</h4>
                  <p className="text-slate-500">
                    {consultation.date} • {consultation.duration}
                  </p>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  consultation.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-700'
                    : consultation.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {consultation.status === 'completed'
                  ? 'Selesai'
                  : consultation.status === 'scheduled'
                  ? 'Terjadwal'
                  : 'Dibatalkan'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-slate-500 text-sm mb-1">Anak</div>
                <div className="text-slate-800 font-medium">{consultation.child}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-slate-500 text-sm mb-1">Jenis Konsultasi</div>
                <div className="text-slate-800 font-medium">{consultation.type}</div>
              </div>
            </div>

            {consultation.summary && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="text-slate-700 text-sm font-medium mb-2">Ringkasan Konsultasi:</div>
                <p className="text-slate-600 text-sm leading-relaxed">{consultation.summary}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSupportSection = () => (
    <div className="space-y-6">
      <h3 className="text-slate-800 font-heading text-xl flex items-center">
        <HelpCircle className="w-6 h-6 text-purple-600 mr-2" />
        Bantuan & Dukungan
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h4 className="font-heading text-lg mb-2">FAQ - Pertanyaan Umum</h4>
              <p className="text-purple-100 text-sm">
                Temukan jawaban untuk pertanyaan yang sering ditanyakan
              </p>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h4 className="font-heading text-lg mb-2">Hubungi Customer Service</h4>
              <p className="text-emerald-100 text-sm">Chat langsung dengan tim support kami</p>
            </div>
            <MessageCircle className="w-6 h-6" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h4 className="font-heading text-lg mb-2">Panduan Penggunaan</h4>
              <p className="text-orange-100 text-sm">Video tutorial dan panduan lengkap aplikasi</p>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </motion.button>
      </div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <h4 className="text-slate-800 font-heading text-lg mb-4">Informasi Kontak</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-slate-500" />
            <span className="text-slate-700">support@anak-app.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-slate-500" />
            <span className="text-slate-700">+62 21-1234-5678</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-slate-500" />
            <span className="text-slate-700">Senin - Jumat, 09:00 - 18:00 WIB</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 px-6 pt-14 pb-8 relative overflow-hidden">
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
            <h1 className="text-white font-heading text-xl mb-1">Pengaturan Profil</h1>
            <p className="text-white/80 text-sm">Mode Orang Tua</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-6 -mt-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-slate-200/50 mb-6"
        >
          <div className="grid grid-cols-1 gap-3">
            {menuSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === section.id ? 'bg-white/20' : 'bg-white'
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        activeSection === section.id ? 'text-white' : 'text-indigo-600'
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-heading font-medium">{section.title}</h3>
                    <p
                      className={`text-xs mt-1 ${
                        activeSection === section.id ? 'text-white/80' : 'text-slate-500'
                      }`}
                    >
                      {section.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 ${
                      activeSection === section.id ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'account' && renderAccountSection()}
          {activeSection === 'children' && renderChildrenSection()}
          {activeSection === 'notifications' && renderNotificationsSection()}
          {activeSection === 'consultations' && renderConsultationsSection()}
          {activeSection === 'support' && renderSupportSection()}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg">
        <div className="flex justify-around py-4">
          {[
            { icon: Home, label: 'Home', screen: 'home' },
            { icon: MessageSquare, label: 'Konsultasi', screen: 'consultation' },
            { icon: Users, label: 'Komunitas', screen: 'community' },
            { icon: BarChart3, label: 'Progress', screen: 'progress' },
            { icon: User, label: 'Profil', screen: 'profile', active: true },
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
