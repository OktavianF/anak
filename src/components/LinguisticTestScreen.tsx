import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Clock, Volume2 } from 'lucide-react';

interface LinguisticTestScreenProps {
  navigateTo: (screen: string) => void;
  addSticker: (sticker: string) => void;
  childName: string;
  updateTestResults: (testType: string, results: any) => void;
}

export default function LinguisticTestScreen({ navigateTo, addSticker, childName, updateTestResults }: LinguisticTestScreenProps) {
  const [currentCategory, setCurrentCategory] = useState<'receptive' | 'expressive' | 'phonemic'>('receptive');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const testCategories = {
    receptive: {
      title: 'Tes Reseptif',
      description: 'Mengukur kemampuan memahami bahasa yang didengar dan dibaca',
      color: 'from-pink-500 to-pink-600',
      questions: [
        {
          id: 'rec1',
          question: 'Pilih gambar yang sesuai dengan kata "KUCING"',
          image: '🗣️',
          audio: 'Kucing',
          options: [
            { text: '🐱', score: 5 },
            { text: '🐶', score: 1 },
            { text: '🐰', score: 1 },
            { text: '🐦', score: 1 }
          ]
        },
        {
          id: 'rec2',
          question: 'Kata mana yang artinya tempat tinggal?',
          image: '🏠',
          options: [
            { text: 'Mobil', score: 1 },
            { text: 'Rumah', score: 5 },
            { text: 'Sekolah', score: 2 },
            { text: 'Pasar', score: 3 }
          ]
        },
        {
          id: 'rec3',
          question: 'Dengarkan kalimat: "Adik sedang bermain bola". Siapa yang bermain?',
          image: '👂',
          audio: 'Adik sedang bermain bola',
          options: [
            { text: 'Kakak', score: 1 },
            { text: 'Adik', score: 5 },
            { text: 'Ayah', score: 1 },
            { text: 'Ibu', score: 1 }
          ]
        },
        {
          id: 'rec4',
          question: 'Apa lawan kata dari "TINGGI"?',
          image: '📏',
          options: [
            { text: 'Besar', score: 2 },
            { text: 'Pendek', score: 5 },
            { text: 'Kecil', score: 3 },
            { text: 'Panjang', score: 1 }
          ]
        },
        {
          id: 'rec5',
          question: 'Gambar mana yang menunjukkan "MAKAN"?',
          image: '🍽️',
          options: [
            { text: '🏃', score: 1 },
            { text: '😴', score: 1 },
            { text: '🍽️', score: 5 },
            { text: '📚', score: 1 }
          ]
        }
      ]
    },
    expressive: {
      title: 'Tes Ekspresif',
      description: 'Menilai kemampuan mengungkapkan pikiran dengan bahasa',
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          id: 'exp1',
          question: 'Lengkapi kalimat: "Aku suka makan _____ yang manis"',
          image: '🍎',
          options: [
            { text: 'buah', score: 5 },
            { text: 'batu', score: 1 },
            { text: 'kertas', score: 1 },
            { text: 'kayu', score: 1 }
          ]
        },
        {
          id: 'exp2',
          question: 'Bagaimana cara meminta izin yang sopan?',
          image: '🙏',
          options: [
            { text: 'Aku mau!', score: 1 },
            { text: 'Permisi, boleh saya...?', score: 5 },
            { text: 'Kasih aku!', score: 1 },
            { text: 'Ambil aja!', score: 1 }
          ]
        },
        {
          id: 'exp3',
          question: 'Apa yang kamu katakan saat bertemu teman di pagi hari?',
          image: '☀️',
          options: [
            { text: 'Selamat malam', score: 1 },
            { text: 'Selamat pagi', score: 5 },
            { text: 'Selamat sore', score: 1 },
            { text: 'Dah!', score: 2 }
          ]
        },
        {
          id: 'exp4',
          question: 'Ceritakan dalam satu kalimat: Gambar menunjukkan anak bermain',
          image: '⚽',
          options: [
            { text: 'Anak bermain bola', score: 5 },
            { text: 'Bola', score: 2 },
            { text: 'Main', score: 3 },
            { text: 'Anak', score: 2 }
          ]
        },
        {
          id: 'exp5',
          question: 'Bagaimana cara mengucapkan terima kasih?',
          image: '🙏',
          options: [
            { text: 'Oke', score: 1 },
            { text: 'Ya', score: 1 },
            { text: 'Terima kasih', score: 5 },
            { text: 'Baik', score: 2 }
          ]
        }
      ]
    },
    phonemic: {
      title: 'Tes Fonemik',
      description: 'Mengukur kemampuan mengenali dan memanipulasi suara bahasa',
      color: 'from-green-500 to-green-600',
      questions: [
        {
          id: 'pho1',
          question: 'Kata mana yang dimulai dengan suara yang sama seperti "BUKU"?',
          image: '📚',
          audio: 'Bu-ku',
          options: [
            { text: 'Meja', score: 1 },
            { text: 'Bola', score: 5 },
            { text: 'Tas', score: 1 },
            { text: 'Kursi', score: 1 }
          ]
        },
        {
          id: 'pho2',
          question: 'Berapa suku kata dalam kata "KUPU-KUPU"?',
          image: '🦋',
          audio: 'Ku-pu Ku-pu',
          options: [
            { text: '2 suku kata', score: 2 },
            { text: '3 suku kata', score: 1 },
            { text: '4 suku kata', score: 5 },
            { text: '1 suku kata', score: 1 }
          ]
        },
        {
          id: 'pho3',
          question: 'Kata mana yang berima dengan "MATA"?',
          image: '👁️',
          audio: 'Ma-ta',
          options: [
            { text: 'Kaki', score: 1 },
            { text: 'Rata', score: 5 },
            { text: 'Hidung', score: 1 },
            { text: 'Mulut', score: 1 }
          ]
        },
        {
          id: 'pho4',
          question: 'Suara akhir kata "RUMAH" adalah?',
          image: '🏠',
          audio: 'Ru-mah',
          options: [
            { text: 'Suara R', score: 1 },
            { text: 'Suara M', score: 1 },
            { text: 'Suara A', score: 2 },
            { text: 'Suara H', score: 5 }
          ]
        },
        {
          id: 'pho5',
          question: 'Jika kita hilangkan huruf "S" pertama dari "SUSU", menjadi kata apa?',
          image: '🥛',
          audio: 'Su-su',
          options: [
            { text: 'USU', score: 5 },
            { text: 'SUS', score: 2 },
            { text: 'SUU', score: 1 },
            { text: 'Tetap SUSU', score: 1 }
          ]
        }
      ]
    }
  };

  const currentTest = testCategories[currentCategory];
  const currentQ = currentTest.questions[currentQuestion];
  const totalQuestions = currentTest.questions.length;

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to next category or complete test
      if (currentCategory === 'receptive') {
        setCurrentCategory('expressive');
        setCurrentQuestion(0);
      } else if (currentCategory === 'expressive') {
        setCurrentCategory('phonemic');
        setCurrentQuestion(0);
      } else {
        completeTest(newAnswers);
      }
    }
  };

  const completeTest = (finalAnswers: Record<string, number>) => {
    setIsCompleted(true);
    
    // Calculate scores for each category
    const receptiveScore = testCategories.receptive.questions.reduce((sum, q) => 
      sum + (finalAnswers[q.id] || 0), 0);
    const expressiveScore = testCategories.expressive.questions.reduce((sum, q) => 
      sum + (finalAnswers[q.id] || 0), 0);
    const phonemicScore = testCategories.phonemic.questions.reduce((sum, q) => 
      sum + (finalAnswers[q.id] || 0), 0);

    const totalScore = receptiveScore + expressiveScore + phonemicScore;
    const maxScore = 75; // 15 questions × 5 max score
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Save test results
    updateTestResults('linguistic', {
      score: totalScore,
      total: maxScore,
      percentage: percentage,
      timeSpent: 0,
      categoryScores: {
        receptive: receptiveScore,
        expressive: expressiveScore,
        phonemic: phonemicScore
      }
    });

    // Award stickers based on performance
    if (receptiveScore >= 20) addSticker('receptive-master');
    if (expressiveScore >= 20) addSticker('expressive-star');
    if (phonemicScore >= 20) addSticker('phonemic-expert');
    
    addSticker('linguistic-test-complete');
  };

  const getScoreInterpretation = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { level: 'Sangat Baik', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 75) return { level: 'Baik', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { level: 'Cukup', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Perlu Latihan', color: 'text-red-600', bg: 'bg-red-50' };
  };

  if (isCompleted) {
    const receptiveScore = testCategories.receptive.questions.reduce((sum, q) => 
      sum + (answers[q.id] || 0), 0);
    const expressiveScore = testCategories.expressive.questions.reduce((sum, q) => 
      sum + (answers[q.id] || 0), 0);
    const phonemicScore = testCategories.phonemic.questions.reduce((sum, q) => 
      sum + (answers[q.id] || 0), 0);

    const maxScore = 25; // 5 questions × 5 max score

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-pink-500 to-green-500 px-6 pt-14 pb-8 text-white">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            <h1 className="font-heading font-bold text-2xl mb-2">
              Tes Linguistik Selesai!
            </h1>
            <p className="text-pink-100">
              Hebat {childName}! Kemampuan bahasamu berkembang dengan baik
            </p>
          </div>
        </div>

        <div className="px-6 py-6 pb-24">
          <div className="space-y-4">
            {/* Receptive Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Kemampuan Reseptif</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreInterpretation(receptiveScore, maxScore).bg} ${getScoreInterpretation(receptiveScore, maxScore).color}`}>
                  {getScoreInterpretation(receptiveScore, maxScore).level}
                </div>
              </div>
              <div className="text-2xl font-bold text-pink-600 mb-2">{receptiveScore}/{maxScore}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-pink-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(receptiveScore / maxScore) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>

            {/* Expressive Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Kemampuan Ekspresif</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreInterpretation(expressiveScore, maxScore).bg} ${getScoreInterpretation(expressiveScore, maxScore).color}`}>
                  {getScoreInterpretation(expressiveScore, maxScore).level}
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{expressiveScore}/{maxScore}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(expressiveScore / maxScore) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </motion.div>

            {/* Phonemic Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Kemampuan Fonemik</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreInterpretation(phonemicScore, maxScore).bg} ${getScoreInterpretation(phonemicScore, maxScore).color}`}>
                  {getScoreInterpretation(phonemicScore, maxScore).level}
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">{phonemicScore}/{maxScore}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(phonemicScore / maxScore) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => navigateTo('progress')}
            className="w-full mt-8 bg-gradient-to-r from-pink-500 to-green-500 text-white py-4 px-6 rounded-2xl font-heading font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Lihat Progress Dashboard
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentTest.color} px-6 pt-14 pb-8 text-white`}>
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={() => navigateTo('progress')}
            className="p-2 rounded-xl bg-white/20"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="font-heading font-bold text-xl">{currentTest.title}</h1>
          {currentQ.audio && (
            <motion.button
              onClick={() => playAudio(currentQ.audio || '')}
              className="p-2 rounded-xl bg-white/20"
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 className="w-6 h-6" />
            </motion.button>
          )}
          {!currentQ.audio && <div className="w-10" />}
        </div>

        <div className="text-center mb-6">
          <p className="text-white/90 mb-4">{currentTest.description}</p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>Pertanyaan {currentQuestion + 1} dari {totalQuestions}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-6 py-6 pb-24">
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
            {currentQ.audio && (
              <motion.button
                onClick={() => playAudio(currentQ.audio || '')}
                className="mt-4 bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-xl font-body font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔊 Putar Suara
              </motion.button>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option.score)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-body text-gray-900">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}