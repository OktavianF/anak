import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Star,
  Home,
  MessageSquare,
  BarChart3,
  User,
} from 'lucide-react';

interface PersonalityTestScreenProps {
  navigateTo: (screen: string) => void;
  addSticker: (sticker: string) => void;
  childName: string;
  isParentMode?: boolean;
  setMbtiResult?: (result: any) => void;
  updateTestResults: (testType: string, results: any) => void;
}

export default function PersonalityTestScreen({
  navigateTo,
  addSticker,
  childName,
  isParentMode,
  setMbtiResult,
  updateTestResults,
}: PersonalityTestScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animalResult, setAnimalResult] = useState<any>(null);

  // MBTI Animal Personality Questions
  const mbtiQuestions = [
    {
      id: 1,
      question: 'Ketika bermain dengan teman-teman, kamu lebih suka:',
      image: '👥',
      options: [
        { text: 'Bermain ramai-ramai dengan banyak teman', trait: 'E' },
        { text: 'Bermain dengan 1-2 teman dekat saja', trait: 'I' },
      ],
    },
    {
      id: 2,
      question: 'Saat belajar hal baru, kamu biasanya:',
      image: '📚',
      options: [
        { text: 'Langsung praktek dan coba-coba sendiri', trait: 'S' },
        { text: 'Bertanya "kenapa" dan "bagaimana" dulu', trait: 'N' },
      ],
    },
    {
      id: 3,
      question: 'Ketika memutuskan sesuatu, kamu lebih sering:',
      image: '🤔',
      options: [
        { text: 'Ikuti kata hati dan perasaan', trait: 'F' },
        { text: 'Pikirkan mana yang paling masuk akal', trait: 'T' },
      ],
    },
    {
      id: 4,
      question: 'Dalam mengerjakan tugas, kamu lebih suka:',
      image: '📝',
      options: [
        { text: 'Selesaikan pelan-pelan sesuai jadwal', trait: 'J' },
        { text: 'Kerjakan sekaligus saat mood bagus', trait: 'P' },
      ],
    },
    {
      id: 5,
      question: 'Ketika bercerita, kamu cenderung:',
      image: '💬',
      options: [
        { text: 'Cerita detail dari awal sampai akhir', trait: 'S' },
        { text: 'Langsung ke poin penting yang menarik', trait: 'N' },
      ],
    },
    {
      id: 6,
      question: 'Saat melihat teman sedih, kamu biasanya:',
      image: '😢',
      options: [
        { text: 'Langsung peluk dan hibur temannya', trait: 'F' },
        { text: 'Tanya kenapa dan cari solusinya', trait: 'T' },
      ],
    },
    {
      id: 7,
      question: 'Untuk kegiatan weekend, kamu lebih suka:',
      image: '🎯',
      options: [
        { text: 'Ada rencana yang jelas dari pagi', trait: 'J' },
        { text: 'Lihat nanti mau ngapain aja', trait: 'P' },
      ],
    },
    {
      id: 8,
      question: 'Ketika di tempat baru, kamu cenderung:',
      image: '🌟',
      options: [
        { text: 'Langsung eksplorasi dan kenalan', trait: 'E' },
        { text: 'Observasi dulu dari jauh', trait: 'I' },
      ],
    },
  ];

  // Animal MBTI Results
  const animalTypes = {
    ENFJ: {
      animal: '🦁',
      name: 'Singa',
      personality: 'Pemimpin Peduli',
      traits: 'Karismatik dan Inspiratif',
      description: 'Anak yang natural jadi pemimpin dan selalu peduli sama teman-temannya!',
      strengths: ['Mudah bergaul', 'Suka membantu', 'Pemimpin natural', 'Empati tinggi'],
      tips: 'Dukung jiwa kepemimpinannya dengan memberikan tanggung jawab kecil dan ajari untuk mendengarkan pendapat orang lain.',
    },
    ENFP: {
      animal: '🐰',
      name: 'Kelinci',
      personality: 'Petualang Ceria',
      traits: 'Kreatif dan Antusias',
      description: 'Anak yang penuh energi, suka hal baru, dan selalu optimis!',
      strengths: ['Kreatif', 'Mudah beradaptasi', 'Komunikatif', 'Imajinatif'],
      tips: 'Berikan banyak aktivitas kreatif dan hindari rutinitas yang terlalu kaku.',
    },
    ENTJ: {
      animal: '🦅',
      name: 'Elang',
      personality: 'Komandan Cilik',
      traits: 'Tegas dan Ambisius',
      description: 'Anak yang punya visi besar dan determinasi kuat untuk mencapai tujuan!',
      strengths: ['Organised', 'Berani', 'Strategis', 'Goal-oriented'],
      tips: 'Tantang dengan target-target yang achievable dan ajarkan fleksibilitas.',
    },
    ENTP: {
      animal: '🦊',
      name: 'Rubah',
      personality: 'Innovator Pintar',
      traits: 'Cerdik dan Adaptif',
      description: 'Anak yang pintar, suka debat, dan selalu punya ide-ide fresh!',
      strengths: ['Problem solver', 'Quick learner', 'Inovatif', 'Curious'],
      tips: 'Stimulasi rasa ingin tahunya dengan eksperimen dan diskusi yang menantang.',
    },
    ESFJ: {
      animal: '🐨',
      name: 'Koala',
      personality: 'Penolong Setia',
      traits: 'Peduli dan Harmonis',
      description: 'Anak yang hangat, suka membantu, dan jaga perasaan orang lain!',
      strengths: ['Supportive', 'Reliable', 'Team player', 'Caring'],
      tips: 'Apresiasi kebaikannya dan ajarkan untuk kadang-kadang prioritaskan diri sendiri.',
    },
    ESFP: {
      animal: '🐹',
      name: 'Hamster',
      personality: 'Entertainer Lucu',
      traits: 'Fun dan Spontan',
      description: 'Anak yang jadi mood booster di mana-mana dan suka bikin orang senang!',
      strengths: ['Cheerful', 'Spontan', 'People person', 'Praktis'],
      tips: 'Dukung ekspresi dirinya dan ajarkan perencanaan sederhana.',
    },
    ESTJ: {
      animal: '🐝',
      name: 'Lebah',
      personality: 'Organizer Teliti',
      traits: 'Disiplin dan Sistematis',
      description: 'Anak yang suka kerapihan, punya jadwal jelas, dan reliable banget!',
      strengths: ['Organized', 'Responsible', 'Hardworking', 'Loyal'],
      tips: 'Hargai kedisiplinannya tapi sesekali ajak untuk lebih fleksibel dan spontan.',
    },
    ESTP: {
      animal: '🐯',
      name: 'Harimau',
      personality: 'Athlete Berani',
      traits: 'Sporty dan Aktif',
      description: 'Anak yang energik, suka tantangan fisik, dan berani coba hal baru!',
      strengths: ['Energetic', 'Adaptable', 'Hands-on', 'Courageous'],
      tips: 'Sediakan banyak aktivitas fisik dan olahraga untuk menyalurkan energinya.',
    },
    INFJ: {
      animal: '🦉',
      name: 'Burung Hantu',
      personality: 'Visioner Lembut',
      traits: 'Bijaksana dan Intuitif',
      description: 'Anak yang dalam, punya insight bagus, dan peduli banget sama orang lain!',
      strengths: ['Insightful', 'Empathetic', 'Creative', 'Idealistic'],
      tips: 'Berikan waktu sendiri untuk recharge dan dukung kreativitasnya.',
    },
    INFP: {
      animal: '🐼',
      name: 'Panda',
      personality: 'Dreamer Baik',
      traits: 'Sensitif dan Imajinatif',
      description: 'Anak yang punya dunia dalam yang kaya dan selalu peduli keadilan!',
      strengths: ['Creative', 'Authentic', 'Compassionate', 'Open-minded'],
      tips: 'Dukung ekspresi kreatifnya dan hargai sensitivitasnya.',
    },
    INTJ: {
      animal: '🐺',
      name: 'Serigala',
      personality: 'Mastermind Muda',
      traits: 'Strategis dan Independent',
      description: 'Anak yang suka mikir deep, punya rencana jangka panjang, dan mandiri!',
      strengths: ['Strategic', 'Independent', 'Analytical', 'Determined'],
      tips: 'Respect kebutuhan waktu sendiri dan tantang dengan puzzle atau strategi games.',
    },
    INTP: {
      animal: '🐧',
      name: 'Penguin',
      personality: 'Scientist Kecil',
      traits: 'Logis dan Eksploratif',
      description: 'Anak yang curious banget, suka experiment, dan selalu tanya "kenapa"!',
      strengths: ['Logical', 'Curious', 'Objective', 'Innovative'],
      tips: 'Fasilitasi rasa ingin tahunya dengan buku, eksperimen, dan diskusi sains.',
    },
    ISFJ: {
      animal: '🐑',
      name: 'Domba',
      personality: 'Protector Gentle',
      traits: 'Nurturing dan Supportive',
      description: 'Anak yang lembut, selalu siap bantu, dan jaga harmoni di group!',
      strengths: ['Caring', 'Detail-oriented', 'Loyal', 'Patient'],
      tips: 'Apresiasi kebaikannya dan ajarkan untuk assertive saat dibutuhkan.',
    },
    ISFP: {
      animal: '🐻',
      name: 'Beruang',
      personality: 'Artist Lembut',
      traits: 'Kreatif dan Peace-loving',
      description: 'Anak yang artistik, kalem, tapi passionate sama hal yang dia suka!',
      strengths: ['Artistic', 'Gentle', 'Flexible', 'Observant'],
      tips: 'Sediakan banyak medium artistik dan berikan ruang untuk eksplorasi kreatif.',
    },
    ISTJ: {
      animal: '🐘',
      name: 'Gajah',
      personality: 'Guardian Setia',
      traits: 'Reliable dan Traditional',
      description: 'Anak yang bisa diandalkan, detail-oriented, dan selalu keep promises!',
      strengths: ['Reliable', 'Methodical', 'Loyal', 'Responsible'],
      tips: 'Hargai konsistensinya dan sesekali ajak untuk coba pendekatan baru.',
    },
    ISTP: {
      animal: '🐱',
      name: 'Kucing',
      personality: 'Mechanic Cool',
      traits: 'Praktis dan Independent',
      description: 'Anak yang hands-on, suka oprek-oprek, dan solve masalah dengan praktek!',
      strengths: ['Practical', 'Adaptable', 'Calm', 'Problem-solver'],
      tips: 'Berikan banyak aktivitas hands-on dan respect kebutuhan space-nya.',
    },
  };

  const calculateMBTI = (answers: string[]) => {
    const traits = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach((answer) => {
      traits[answer as keyof typeof traits]++;
    });

    const result =
      (traits.E > traits.I ? 'E' : 'I') +
      (traits.S > traits.N ? 'S' : 'N') +
      (traits.T > traits.F ? 'T' : 'F') +
      (traits.J > traits.P ? 'J' : 'P');

    return result;
  };

  const handleAnswer = (trait: string) => {
    const newAnswers = [...answers, trait];
    setAnswers(newAnswers);

    if (currentQuestion < mbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete test
      const mbtiType = calculateMBTI(newAnswers);
      const result = animalTypes[mbtiType as keyof typeof animalTypes];
      setAnimalResult(result);
      setIsCompleted(true);
      addSticker('animal-mbti-complete');

      // Save MBTI result to app state
      if (setMbtiResult) {
        setMbtiResult(result);
      }

      // Save test results
      updateTestResults('personality', {
        type: mbtiType,
        animal: result.name,
        personality: result.personality,
        traits: result.strengths,
        description: result.description,
      });
    }
  };

  const currentQ = mbtiQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  if (isCompleted && animalResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-14 pb-8 text-white">
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-4">
              {animalResult.animal}
            </motion.div>
            <h1 className="font-heading font-bold text-2xl mb-2">
              Kamu adalah {animalResult.name}!
            </h1>
            <p className="text-purple-100 text-lg font-body">{animalResult.personality}</p>
            <p className="text-purple-100 text-sm font-body mt-2">{animalResult.traits}</p>
          </div>
        </div>

        <div className="px-6 py-6 pb-32">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm mb-6"
          >
            <h3 className="font-heading font-bold text-lg mb-3 text-center">
              Tentang Kepribadianmu
            </h3>
            <p className="text-gray-700 font-body text-center leading-relaxed">
              {animalResult.description}
            </p>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm mb-6"
          >
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Kekuatan Kamu
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {animalResult.strengths.map((strength: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center"
                >
                  <span className="text-purple-700 font-body font-medium text-sm">{strength}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tips for Parents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-2xl p-6"
          >
            <h3 className="font-heading font-bold text-lg mb-3 text-orange-700">
              💡 Tips untuk Orang Tua
            </h3>
            <p className="text-orange-600 font-body leading-relaxed">{animalResult.tips}</p>
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigateTo('progress')}
            className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-heading font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Lihat Progress Dashboard
          </motion.button>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
          <div className="flex justify-around py-3">
            {[
              { icon: Home, label: 'Home', screen: 'home' },
              {
                icon: MessageSquare,
                label: 'Consultation',
                screen: isParentMode ? 'consultation' : 'tips',
              },
              { icon: BarChart3, label: 'Progress', screen: 'progress' },
              { icon: User, label: 'Profile', screen: 'profile' },
            ].map((item) => (
              <motion.button
                key={item.screen}
                onClick={() => navigateTo(item.screen)}
                className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
                whileTap={{ scale: 0.95 }}
              >
                <item.icon size={20} />
                <span className="text-xs font-body font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-14 pb-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigateTo('home')}
            className="p-2 rounded-xl bg-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="font-heading font-bold text-xl">Tes Animal MBTI</h1>
          <div className="w-10" />
        </div>

        <div className="text-center mb-6">
          <p className="text-purple-100 mb-4">
            Yuk cari tahu hewan apa yang paling cocok dengan kepribadian {childName}!
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>
              Pertanyaan {currentQuestion + 1} dari {mbtiQuestions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-6 py-6 pb-32">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          {/* Question */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentQ.image}</div>
            <h2 className="font-heading font-bold text-xl text-gray-900 leading-tight">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option.trait)}
                className="w-full p-5 text-left bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-2xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full border-2 border-purple-300 flex items-center justify-center text-lg font-bold text-purple-600">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-body text-gray-900 leading-relaxed">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100">
        <div className="flex justify-around py-3">
          {[
            { icon: Home, label: 'Home', screen: 'home' },
            {
              icon: MessageSquare,
              label: 'Consultation',
              screen: isParentMode ? 'consultation' : 'tips',
            },
            { icon: BarChart3, label: 'Progress', screen: 'progress' },
            { icon: User, label: 'Profile', screen: 'profile' },
          ].map((item) => (
            <motion.button
              key={item.screen}
              onClick={() => navigateTo(item.screen)}
              className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400"
              whileTap={{ scale: 0.95 }}
            >
              <item.icon size={20} />
              <span className="text-xs font-body font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
