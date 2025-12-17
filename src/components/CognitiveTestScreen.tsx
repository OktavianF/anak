import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Clock, Star } from 'lucide-react';

interface CognitiveTestScreenProps {
  navigateTo: (screen: string) => void;
  addSticker: (sticker: string) => void;
  childName: string;
  updateTestResults: (testType: string, results: any) => void;
}

export default function CognitiveTestScreen({
  navigateTo,
  addSticker,
  childName,
  updateTestResults,
}: CognitiveTestScreenProps) {
  const [currentCategory, setCurrentCategory] = useState<'logic' | 'attention' | 'memory'>('logic');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const testCategories = {
    logic: {
      title: 'Tes Logika',
      description: 'Mengukur kemampuan berpikir logis dan memecahkan masalah',
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          id: 'log1',
          question: 'Jika semua kucing suka ikan, dan Mimi adalah kucing, apakah Mimi suka ikan?',
          image: '🐱',
          options: [
            { text: 'Ya, pasti suka', score: 5 },
            { text: 'Tidak, kucing tidak suka ikan', score: 1 },
            { text: 'Mungkin suka, mungkin tidak', score: 2 },
            { text: 'Hanya jika ikannya segar', score: 3 },
          ],
        },
        {
          id: 'log2',
          question: 'Pola apa yang melanjutkan: ⭐🌙⭐🌙⭐ ... ?',
          image: '🔍',
          options: [
            { text: '🌙', score: 5 },
            { text: '⭐', score: 1 },
            { text: '☀️', score: 2 },
            { text: '⭐🌙', score: 3 },
          ],
        },
        {
          id: 'log3',
          question: 'Jika dalam kotak ada 5 bola merah dan 3 bola biru, berapa total bola?',
          image: '⚽',
          options: [
            { text: '5 bola', score: 1 },
            { text: '3 bola', score: 1 },
            { text: '8 bola', score: 5 },
            { text: '2 bola', score: 1 },
          ],
        },
        {
          id: 'log4',
          question: 'Mana yang tidak termasuk dalam kelompuk: Apel, Pisang, Mobil, Jeruk?',
          image: '🍎',
          options: [
            { text: 'Apel', score: 1 },
            { text: 'Pisang', score: 1 },
            { text: 'Mobil', score: 5 },
            { text: 'Jeruk', score: 1 },
          ],
        },
        {
          id: 'log5',
          question: 'Jika hari ini Senin, hari apa 3 hari lagi?',
          image: '📅',
          options: [
            { text: 'Selasa', score: 1 },
            { text: 'Rabu', score: 2 },
            { text: 'Kamis', score: 5 },
            { text: 'Jumat', score: 1 },
          ],
        },
      ],
    },
    attention: {
      title: 'Tes Perhatian',
      description: 'Menilai kemampuan fokus dan konsentrasi',
      color: 'from-orange-500 to-orange-600',
      questions: [
        {
          id: 'att1',
          question: 'Dalam gambar ini: 🔴🔵🔴🔵🔴🔵🔴, berapa jumlah lingkaran merah?',
          image: '👀',
          options: [
            { text: '3 lingkaran', score: 1 },
            { text: '4 lingkaran', score: 5 },
            { text: '5 lingkaran', score: 2 },
            { text: '6 lingkaran', score: 1 },
          ],
        },
        {
          id: 'att2',
          question: 'Kata mana yang ditulis dengan benar?',
          image: '📝',
          options: [
            { text: 'ANJIG', score: 1 },
            { text: 'ANJING', score: 5 },
            { text: 'ANJNG', score: 1 },
            { text: 'ANJIN', score: 1 },
          ],
        },
        {
          id: 'att3',
          question: 'Cari huruf yang berbeda: PPPQPPP',
          image: '🔍',
          options: [
            { text: 'Huruf P', score: 1 },
            { text: 'Huruf Q', score: 5 },
            { text: 'Semua sama', score: 1 },
            { text: 'Tidak ada yang berbeda', score: 2 },
          ],
        },
        {
          id: 'att4',
          question: 'Berapa angka 7 yang kamu lihat: 7179771797?',
          image: '🔢',
          options: [
            { text: '3 angka', score: 1 },
            { text: '4 angka', score: 2 },
            { text: '5 angka', score: 5 },
            { text: '6 angka', score: 1 },
          ],
        },
        {
          id: 'att5',
          question: 'Gambar mana yang menghadap ke kanan: ⬅️➡️⬅️➡️⬅️',
          image: '👉',
          options: [
            { text: 'Yang pertama dan ketiga', score: 1 },
            { text: 'Yang kedua dan keempat', score: 5 },
            { text: 'Semuanya menghadap kanan', score: 1 },
            { text: 'Tidak ada yang menghadap kanan', score: 2 },
          ],
        },
      ],
    },
    memory: {
      title: 'Tes Memori',
      description: 'Mengukur kemampuan mengingat dan menyimpan informasi',
      color: 'from-purple-500 to-purple-600',
      questions: [
        {
          id: 'mem1',
          question: 'Ingat urutan ini: 🐶🐱🐭. Mana yang benar?',
          image: '🧠',
          options: [
            { text: '🐱🐶🐭', score: 1 },
            { text: '🐶🐱🐭', score: 5 },
            { text: '🐭🐱🐶', score: 1 },
            { text: '🐶🐭🐱', score: 2 },
          ],
        },
        {
          id: 'mem2',
          question: 'Tadi disebutkan: Apel, Pisang, Jeruk. Buah apa yang pertama?',
          image: '🍓',
          options: [
            { text: 'Pisang', score: 1 },
            { text: 'Jeruk', score: 1 },
            { text: 'Apel', score: 5 },
            { text: 'Anggur', score: 1 },
          ],
        },
        {
          id: 'mem3',
          question: 'Berapa angka yang ada di urutan: 2-4-6-8?',
          image: '🔢',
          options: [
            { text: '3 angka', score: 1 },
            { text: '4 angka', score: 5 },
            { text: '5 angka', score: 1 },
            { text: '2 angka', score: 1 },
          ],
        },
        {
          id: 'mem4',
          question: 'Warna apa yang disebutkan pertama tadi: Merah, Biru, Hijau?',
          image: '🎨',
          options: [
            { text: 'Biru', score: 1 },
            { text: 'Merah', score: 5 },
            { text: 'Hijau', score: 1 },
            { text: 'Kuning', score: 1 },
          ],
        },
        {
          id: 'mem5',
          question: 'Siapa nama anak di soal tadi yang punya kucing?',
          image: '👧',
          options: [
            { text: 'Mimi', score: 1 },
            { text: 'Kiki', score: 1 },
            { text: 'Nama kucingnya Mimi', score: 5 },
            { text: 'Tidak ada nama', score: 2 },
          ],
        },
      ],
    },
  };

  const currentTest = testCategories[currentCategory];
  const currentQ = currentTest.questions[currentQuestion];
  const totalQuestions = currentTest.questions.length;

  const handleAnswer = (score: number) => {
    const newAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to next category or complete test
      if (currentCategory === 'logic') {
        setCurrentCategory('attention');
        setCurrentQuestion(0);
      } else if (currentCategory === 'attention') {
        setCurrentCategory('memory');
        setCurrentQuestion(0);
      } else {
        completeTest(newAnswers);
      }
    }
  };

  const completeTest = (finalAnswers: Record<string, number>) => {
    setIsCompleted(true);

    // Calculate scores for each category
    const logicScore = testCategories.logic.questions.reduce(
      (sum, q) => sum + (finalAnswers[q.id] || 0),
      0
    );
    const attentionScore = testCategories.attention.questions.reduce(
      (sum, q) => sum + (finalAnswers[q.id] || 0),
      0
    );
    const memoryScore = testCategories.memory.questions.reduce(
      (sum, q) => sum + (finalAnswers[q.id] || 0),
      0
    );

    const totalScore = logicScore + attentionScore + memoryScore;
    const maxScore = 75; // 15 questions × 5 max score
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Save test results
    updateTestResults('cognitive', {
      score: totalScore,
      total: maxScore,
      percentage: percentage,
      timeSpent: 0, // Could add timer functionality later
      categoryScores: {
        logic: logicScore,
        attention: attentionScore,
        memory: memoryScore,
      },
    });

    // Award stickers based on performance
    if (logicScore >= 20) addSticker('logic-master');
    if (attentionScore >= 20) addSticker('attention-expert');
    if (memoryScore >= 20) addSticker('memory-champion');

    addSticker('cognitive-test-complete');
  };

  const getScoreInterpretation = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90)
      return { level: 'Sangat Baik', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 75) return { level: 'Baik', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { level: 'Cukup', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Perlu Latihan', color: 'text-red-600', bg: 'bg-red-50' };
  };

  if (isCompleted) {
    const logicScore = testCategories.logic.questions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );
    const attentionScore = testCategories.attention.questions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );
    const memoryScore = testCategories.memory.questions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );

    const maxScore = 25; // 5 questions × 5 max score

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 pt-14 pb-8 text-white">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            <h1 className="font-heading font-bold text-2xl mb-2">Tes Kognitif Selesai!</h1>
            <p className="text-blue-100">
              Luar biasa {childName}! Kemampuan kognitifmu berkembang dengan baik
            </p>
          </div>
        </div>

        <div className="px-6 py-6 pb-24">
          <div className="space-y-4">
            {/* Logic Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Kemampuan Logika</h3>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getScoreInterpretation(logicScore, maxScore).bg
                  } ${getScoreInterpretation(logicScore, maxScore).color}`}
                >
                  {getScoreInterpretation(logicScore, maxScore).level}
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {logicScore}/{maxScore}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(logicScore / maxScore) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>

            {/* Attention Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Kemampuan Perhatian</h3>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getScoreInterpretation(attentionScore, maxScore).bg
                  } ${getScoreInterpretation(attentionScore, maxScore).color}`}
                >
                  {getScoreInterpretation(attentionScore, maxScore).level}
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {attentionScore}/{maxScore}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-orange-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(attentionScore / maxScore) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </motion.div>

            {/* Memory Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Kemampuan Memori</h3>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getScoreInterpretation(memoryScore, maxScore).bg
                  } ${getScoreInterpretation(memoryScore, maxScore).color}`}
                >
                  {getScoreInterpretation(memoryScore, maxScore).level}
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {memoryScore}/{maxScore}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(memoryScore / maxScore) * 100}%` }}
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
            className="w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-2xl font-heading font-bold text-lg shadow-lg"
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
          <div className="w-10" />
        </div>

        <div className="text-center mb-6">
          <p className="text-white/90 mb-4">{currentTest.description}</p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>
              Pertanyaan {currentQuestion + 1} dari {totalQuestions}
            </span>
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
