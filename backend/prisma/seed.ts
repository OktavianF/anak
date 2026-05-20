import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ANAK database...');

  // ==================== USERS (50) ====================
  console.log('👥 Creating 50 users...');
  const parentNames = [
    'Siti Aminah','Budi Santoso','Dewi Lestari','Ahmad Fauzi','Rina Wati',
    'Joko Widodo','Maya Sari','Hendra Gunawan','Fitri Handayani','Agus Prabowo',
    'Lina Marlina','Dian Permana','Yuni Astuti','Rudi Hartono','Sari Indah',
    'Tono Sugianto','Nur Hasanah','Bambang Sutrisno','Wulan Dari','Eko Prasetyo',
    'Ratna Dewi','Surya Adi','Endang Supriyatin','Fajar Nugroho','Ika Putri',
    'Wahyu Hidayat','Sri Mulyani','Didik Setiawan','Ani Suryani','Putu Gede',
    'Kartini Wulandari','Irwan Setiadi','Megawati Putri','Arief Rahman','Dwi Cahyani',
    'Hadi Wibowo','Nurul Aisyah','Sigit Purnomo','Lilis Suryani','Yoga Pratama',
    'Retno Wulandari','Dedi Kurniawan','Suci Rahmawati','Firman Hakim','Tutik Lestari',
    'Rizal Fahmi','Widya Kusuma','Gatot Subroto','Indri Permatasari','Bayu Aditya',
  ];

  const hashedPassword = await bcrypt.hash('password123', 10);
  const hashedPin = await bcrypt.hash('1234', 10);

  const users = await Promise.all(
    parentNames.map((name, i) =>
      prisma.anak_users.create({
        data: {
          email: `parent${String(i + 1).padStart(2, '0')}@anak.id`,
          password: hashedPassword,
          name,
          role: 'PARENT',
          pin: hashedPin,
        },
      })
    )
  );
  console.log(`  ✅ ${users.length} users created`);

  // ==================== CHILDREN (52) ====================
  console.log('👶 Creating children...');
  const childrenData: { parentIdx: number; name: string; gender: 'MALE' | 'FEMALE'; birthDate: string; age: number; avatar: string }[] = [
    { parentIdx: 0, name: 'Aira', gender: 'FEMALE', birthDate: '2021-03-15', age: 5, avatar: '🧒' },
    { parentIdx: 1, name: 'Raka', gender: 'MALE', birthDate: '2020-07-22', age: 5, avatar: '👦' },
    { parentIdx: 1, name: 'Nisa', gender: 'FEMALE', birthDate: '2022-11-10', age: 3, avatar: '👧' },
    { parentIdx: 2, name: 'Farel', gender: 'MALE', birthDate: '2019-05-18', age: 7, avatar: '👦' },
    { parentIdx: 3, name: 'Zahra', gender: 'FEMALE', birthDate: '2021-09-01', age: 4, avatar: '👧' },
    { parentIdx: 4, name: 'Kenji', gender: 'MALE', birthDate: '2020-01-25', age: 6, avatar: '👦' },
    { parentIdx: 5, name: 'Salwa', gender: 'FEMALE', birthDate: '2022-04-12', age: 4, avatar: '👧' },
    { parentIdx: 6, name: 'Raffi', gender: 'MALE', birthDate: '2019-08-30', age: 6, avatar: '👦' },
    { parentIdx: 6, name: 'Kiara', gender: 'FEMALE', birthDate: '2022-02-14', age: 4, avatar: '👧' },
    { parentIdx: 7, name: 'Dimas', gender: 'MALE', birthDate: '2020-12-05', age: 5, avatar: '👦' },
    { parentIdx: 8, name: 'Citra', gender: 'FEMALE', birthDate: '2021-06-20', age: 5, avatar: '👧' },
    { parentIdx: 9, name: 'Arya', gender: 'MALE', birthDate: '2019-11-11', age: 6, avatar: '👦' },
    { parentIdx: 10, name: 'Putri', gender: 'FEMALE', birthDate: '2022-01-30', age: 4, avatar: '👧' },
    { parentIdx: 11, name: 'Galih', gender: 'MALE', birthDate: '2020-09-15', age: 5, avatar: '👦' },
    { parentIdx: 12, name: 'Anisa', gender: 'FEMALE', birthDate: '2021-04-08', age: 5, avatar: '👧' },
    { parentIdx: 13, name: 'Bagas', gender: 'MALE', birthDate: '2019-02-28', age: 7, avatar: '👦' },
    { parentIdx: 14, name: 'Sinta', gender: 'FEMALE', birthDate: '2022-07-19', age: 3, avatar: '👧' },
    { parentIdx: 15, name: 'Ilham', gender: 'MALE', birthDate: '2020-05-10', age: 6, avatar: '👦' },
    { parentIdx: 16, name: 'Nadya', gender: 'FEMALE', birthDate: '2021-08-25', age: 4, avatar: '👧' },
    { parentIdx: 17, name: 'Farhan', gender: 'MALE', birthDate: '2019-12-03', age: 6, avatar: '👦' },
    { parentIdx: 18, name: 'Lala', gender: 'FEMALE', birthDate: '2022-03-17', age: 4, avatar: '👧' },
    { parentIdx: 19, name: 'Rizky', gender: 'MALE', birthDate: '2020-10-22', age: 5, avatar: '👦' },
    { parentIdx: 20, name: 'Aulia', gender: 'FEMALE', birthDate: '2021-01-14', age: 5, avatar: '👧' },
    { parentIdx: 21, name: 'Faiz', gender: 'MALE', birthDate: '2019-07-07', age: 6, avatar: '👦' },
    { parentIdx: 22, name: 'Jasmine', gender: 'FEMALE', birthDate: '2022-06-29', age: 3, avatar: '👧' },
    { parentIdx: 23, name: 'Kenzo', gender: 'MALE', birthDate: '2020-02-11', age: 6, avatar: '👦' },
    { parentIdx: 24, name: 'Rania', gender: 'FEMALE', birthDate: '2021-11-05', age: 4, avatar: '👧' },
    { parentIdx: 25, name: 'Satria', gender: 'MALE', birthDate: '2019-04-20', age: 7, avatar: '👦' },
    { parentIdx: 26, name: 'Elsa', gender: 'FEMALE', birthDate: '2022-08-08', age: 3, avatar: '👧' },
    { parentIdx: 27, name: 'Naufal', gender: 'MALE', birthDate: '2020-06-16', age: 5, avatar: '👦' },
    { parentIdx: 28, name: 'Shafa', gender: 'FEMALE', birthDate: '2021-10-30', age: 4, avatar: '👧' },
    { parentIdx: 29, name: 'Wayan', gender: 'MALE', birthDate: '2019-09-12', age: 6, avatar: '👦' },
    { parentIdx: 30, name: 'Amira', gender: 'FEMALE', birthDate: '2022-05-21', age: 4, avatar: '👧' },
    { parentIdx: 31, name: 'Haikal', gender: 'MALE', birthDate: '2020-03-08', age: 6, avatar: '👦' },
    { parentIdx: 32, name: 'Alya', gender: 'FEMALE', birthDate: '2021-07-14', age: 4, avatar: '👧' },
    { parentIdx: 33, name: 'Danish', gender: 'MALE', birthDate: '2019-01-19', age: 7, avatar: '👦' },
    { parentIdx: 34, name: 'Inara', gender: 'FEMALE', birthDate: '2022-09-25', age: 3, avatar: '👧' },
    { parentIdx: 35, name: 'Gibran', gender: 'MALE', birthDate: '2020-08-04', age: 5, avatar: '👦' },
    { parentIdx: 36, name: 'Nayla', gender: 'FEMALE', birthDate: '2021-12-18', age: 4, avatar: '👧' },
    { parentIdx: 37, name: 'Alif', gender: 'MALE', birthDate: '2019-06-23', age: 6, avatar: '👦' },
    { parentIdx: 38, name: 'Kayla', gender: 'FEMALE', birthDate: '2022-10-09', age: 3, avatar: '👧' },
    { parentIdx: 39, name: 'Rayhan', gender: 'MALE', birthDate: '2020-04-27', age: 6, avatar: '👦' },
    { parentIdx: 40, name: 'Azzura', gender: 'FEMALE', birthDate: '2021-02-06', age: 5, avatar: '👧' },
    { parentIdx: 41, name: 'Zafran', gender: 'MALE', birthDate: '2019-10-15', age: 6, avatar: '👦' },
    { parentIdx: 42, name: 'Alesha', gender: 'FEMALE', birthDate: '2022-12-01', age: 3, avatar: '👧' },
    { parentIdx: 43, name: 'Arkana', gender: 'MALE', birthDate: '2020-11-20', age: 5, avatar: '👦' },
    { parentIdx: 44, name: 'Syifa', gender: 'FEMALE', birthDate: '2021-05-13', age: 5, avatar: '👧' },
    { parentIdx: 45, name: 'Dzaky', gender: 'MALE', birthDate: '2019-03-28', age: 7, avatar: '👦' },
    { parentIdx: 46, name: 'Calista', gender: 'FEMALE', birthDate: '2022-07-04', age: 3, avatar: '👧' },
    { parentIdx: 47, name: 'Erlangga', gender: 'MALE', birthDate: '2020-01-09', age: 6, avatar: '👦' },
    { parentIdx: 48, name: 'Keisha', gender: 'FEMALE', birthDate: '2021-09-22', age: 4, avatar: '👧' },
    { parentIdx: 49, name: 'Titan', gender: 'MALE', birthDate: '2019-08-16', age: 6, avatar: '👦' },
  ];

  const children = await Promise.all(
    childrenData.map((c) =>
      prisma.anak_children.create({
        data: {
          parent_id: users[c.parentIdx].id,
          name: c.name,
          gender: c.gender,
          birth_date: new Date(c.birthDate),
          age: c.age,
          avatar: c.avatar,
        },
      })
    )
  );
  console.log(`  ✅ ${children.length} children created`);

  // ==================== STICKERS (22) ====================
  console.log('⭐ Creating stickers...');
  const stickersData = [
    { sticker_id: 'cognitive-test-complete', name: 'Brain Explorer', emoji: '🧠', description: 'Selesaikan tes kognitif', rarity: 'COMMON' as const },
    { sticker_id: 'logic-master', name: 'Logic Master', emoji: '💡', description: 'Master tes logika', rarity: 'EPIC' as const },
    { sticker_id: 'attention-expert', name: 'Attention Expert', emoji: '👁️', description: 'Expert dalam tes perhatian', rarity: 'RARE' as const },
    { sticker_id: 'memory-champion', name: 'Memory Champion', emoji: '🧩', description: 'Juara tes memori', rarity: 'EPIC' as const },
    { sticker_id: 'memory-master', name: 'Memory Master', emoji: '🧠', description: 'Selesaikan memory game!', rarity: 'RARE' as const },
    { sticker_id: 'word-master', name: 'Word Master', emoji: '📝', description: 'Ahli dalam word puzzle!', rarity: 'RARE' as const },
    { sticker_id: 'number-master', name: 'Number Master', emoji: '🔢', description: 'Master urutan angka!', rarity: 'EPIC' as const },
    { sticker_id: 'number-explorer', name: 'Number Explorer', emoji: '🧮', description: 'Penjelajah angka!', rarity: 'COMMON' as const },
    { sticker_id: 'pattern-master', name: 'Pattern Master', emoji: '🎯', description: 'Ahli mengenali pola!', rarity: 'LEGENDARY' as const },
    { sticker_id: 'pattern-explorer', name: 'Pattern Explorer', emoji: '👁️', description: 'Mata tajam!', rarity: 'RARE' as const },
    { sticker_id: 'puzzle-master', name: 'Puzzle Master', emoji: '🧩', description: 'Master puzzle game!', rarity: 'EPIC' as const },
    { sticker_id: 'artist-star', name: 'Artist Star', emoji: '🎨', description: 'Selesaikan coloring game!', rarity: 'COMMON' as const },
    { sticker_id: 'motor-master', name: 'Motor Master', emoji: '🏃', description: 'Master tes motorik!', rarity: 'LEGENDARY' as const },
    { sticker_id: 'panda-buddy', name: 'Panda Buddy', emoji: '🐼', description: 'Teman panda imut', rarity: 'COMMON' as const },
    { sticker_id: 'unicorn-magic', name: 'Unicorn Magic', emoji: '🦄', description: 'Keajaiban unicorn', rarity: 'LEGENDARY' as const },
    { sticker_id: 'cool-penguin', name: 'Cool Penguin', emoji: '🐧', description: 'Penguin keren', rarity: 'RARE' as const },
    { sticker_id: 'tiger-champ', name: 'Tiger Champ', emoji: '🐯', description: 'Juara harimau', rarity: 'EPIC' as const },
    { sticker_id: 'level-up', name: 'Level Up!', emoji: '🎯', description: 'Naik level!', rarity: 'RARE' as const },
    { sticker_id: 'first-test', name: 'First Test Completed', emoji: '🥇', description: 'Tes pertama selesai', rarity: 'COMMON' as const },
    { sticker_id: 'five-days-streak', name: '5 Days Streak', emoji: '🌟', description: 'Belajar 5 hari berturut', rarity: 'EPIC' as const },
    { sticker_id: 'hot-streak', name: 'Hot Streak!', emoji: '🔥', description: 'Sedang on fire!', rarity: 'LEGENDARY' as const },
    { sticker_id: 'all-tests-done', name: 'All Tests Done!', emoji: '🎉', description: 'Semua tes selesai!', rarity: 'LEGENDARY' as const },
  ];

  const stickers = await Promise.all(
    stickersData.map((s) => prisma.anak_stickers.create({ data: s }))
  );
  console.log(`  ✅ ${stickers.length} stickers created`);

  // ==================== DOCTORS (5) ====================
  console.log('🩺 Creating doctors...');
  const doctorsData = [
    { name: 'Dr. Zaky Ainur Rahman', specialty: 'Dokter Umum', experience: '2 Tahun', rating: 4.8, rating_count: 150, price: 20000, image: 'https://i.pravatar.cc/150?img=14', bio: 'Dokter umum berpengalaman dalam kesehatan anak', education: 'Universitas Veteran Jawa Timur', verified: true, availability: 'ONLINE' as const },
    { name: 'Dr. Nizar Hakim', specialty: 'Dokter Anak', experience: '5 Tahun', rating: 4.9, rating_count: 230, price: 35000, image: 'https://i.pravatar.cc/150?img=12', bio: 'Spesialis anak dengan fokus tumbuh kembang', education: 'Universitas Airlangga', verified: true, availability: 'ONLINE' as const },
    { name: 'Dr. Iren Sari', specialty: 'Psikolog Anak', experience: '3 Tahun', rating: 4.7, rating_count: 180, price: 40000, image: 'https://i.pravatar.cc/150?img=32', bio: 'Psikolog anak spesialisasi perkembangan kognitif', education: 'Universitas Indonesia', verified: true, availability: 'BUSY' as const },
    { name: 'Dr. Andi Pratama', specialty: 'Psikiater Anak', experience: '7 Tahun', rating: 4.9, rating_count: 310, price: 50000, image: 'https://i.pravatar.cc/150?img=11', bio: 'Psikiater anak berpengalaman', education: 'Universitas Gadjah Mada', verified: true, availability: 'ONLINE' as const },
    { name: 'Dr. Ratna Kusuma', specialty: 'Terapis Okupasi', experience: '4 Tahun', rating: 4.6, rating_count: 120, price: 30000, image: 'https://i.pravatar.cc/150?img=25', bio: 'Terapis okupasi untuk anak berkebutuhan khusus', education: 'Universitas Padjadjaran', verified: true, availability: 'ONLINE' as const },
  ];

  const doctors = await Promise.all(
    doctorsData.map((d) => prisma.anak_doctors.create({ data: d }))
  );
  console.log(`  ✅ ${doctors.length} doctors created`);

  // ==================== GUIDES (5) ====================
  console.log('📚 Creating guides...');
  await prisma.anak_guides.createMany({
    data: [
      { title: 'Mengenali Tanda Keterlambatan Bicara', description: 'Panduan lengkap untuk orang tua', content: 'Keterlambatan bicara adalah salah satu masalah perkembangan yang paling sering ditemui...', category: 'Perkembangan', age_range: '2-5 tahun' },
      { title: 'Stimulasi Kognitif Anak Usia 3-5 Tahun', description: 'Aktivitas sederhana untuk melatih otak anak', content: 'Stimulasi kognitif penting untuk perkembangan otak anak usia dini...', category: 'Kognitif', age_range: '3-5 tahun' },
      { title: 'Tips Meningkatkan Memori Anak', description: 'Cara menyenangkan melatih daya ingat', content: 'Memori kerja adalah kemampuan penting yang mendukung proses belajar...', category: 'Kognitif', age_range: '4-7 tahun' },
      { title: 'Bermain Puzzle untuk Kecerdasan Visual', description: 'Manfaat puzzle bagi perkembangan anak', content: 'Puzzle bukan sekadar mainan, tetapi alat stimulasi visual yang efektif...', category: 'Visual', age_range: '3-6 tahun' },
      { title: 'Screen Time yang Sehat untuk Anak', description: 'Panduan waktu layar ideal', content: 'Di era digital, mengelola waktu layar anak menjadi tantangan tersendiri...', category: 'Parenting', age_range: '2-7 tahun' },
    ],
  });
  console.log('  ✅ 5 guides created');

  // ==================== GAME SESSIONS + TELEMETRY + ASSESSMENTS ====================
  console.log('🎮 Creating game sessions...');
  const gameTemplates = [
    { gameType: 'memory', domain: 'Gsm' as const, score: 75, duration: 120, level: 5, difficulty: 'EASY' as const },
    { gameType: 'numberSequence', domain: 'Gf' as const, score: 82, duration: 90, level: 7, difficulty: 'MEDIUM' as const },
    { gameType: 'patternRecognition', domain: 'Gf' as const, score: 68, duration: 150, level: 4, difficulty: 'EASY' as const },
    { gameType: 'puzzle', domain: 'Gv' as const, score: 90, duration: 200, level: 8, difficulty: 'MEDIUM' as const },
    { gameType: 'memory', domain: 'Gsm' as const, score: 85, duration: 100, level: 6, difficulty: 'MEDIUM' as const },
  ];

  const feedbackMap: Record<string, Record<string, string>> = {
    Gf: { child: '🧩 Bagus sekali! Kamu pandai menyelesaikan teka-teki!', parent: 'Kemampuan penalaran berkembang baik. Lanjutkan dengan puzzle dan teka-teki logika.' },
    Gv: { child: '👁️ Matamu sangat jeli! Kamu ahli dalam melihat detail!', parent: 'Pemrosesan visual bagus. Lanjutkan dengan aktivitas menggambar dan menyusun.' },
    Gsm: { child: '🧠 Hebat! Memori kamu sangat bagus!', parent: 'Memori berkembang bagus. Lanjutkan dengan permainan ingatan secara rutin.' },
  };

  let sessionCount = 0;
  for (let i = 0; i < 20; i++) {
    const child = children[i];
    for (const tmpl of gameTemplates) {
      const accuracy = tmpl.score > 80 ? 85 + Math.random() * 15 : 50 + Math.random() * 30;
      const session = await prisma.anak_game_sessions.create({
        data: {
          child_id: child.id, game_type: tmpl.gameType, chc_domain: tmpl.domain,
          score: tmpl.score, duration: tmpl.duration, level: tmpl.level, difficulty: tmpl.difficulty,
        },
      });
      await prisma.anak_game_telemetry.create({
        data: {
          session_id: session.id, accuracy, completion_time: tmpl.duration,
          errors: Math.floor(Math.random() * 5), attempts: Math.floor(Math.random() * 3) + 1,
          hints_used: Math.floor(Math.random() * 3), consecutive_correct: Math.floor(Math.random() * 5 + 2),
          complexity_level: tmpl.level,
          memory_capacity: tmpl.domain === 'Gsm' ? Math.floor(Math.random() * 6 + 3) : null,
          sequence_accuracy: tmpl.domain === 'Gsm' ? 60 + Math.random() * 40 : null,
          longest_streak: tmpl.domain === 'Gsm' ? Math.floor(Math.random() * 8 + 2) : null,
        },
      });
      const finalScore = tmpl.score >= 85 ? 75 + Math.random() * 25 : tmpl.score >= 70 ? 55 + Math.random() * 20 : 30 + Math.random() * 25;
      const devLevel = tmpl.score >= 85 ? 'EXCELLENT' : tmpl.score >= 70 ? 'ABOVE' : tmpl.score >= 50 ? 'AVERAGE' : 'BELOW';
      const starRating = tmpl.score >= 90 ? 5 : tmpl.score >= 75 ? 4 : tmpl.score >= 60 ? 3 : tmpl.score >= 40 ? 2 : 1;
      await prisma.anak_assessment_results.create({
        data: {
          child_id: child.id, session_id: session.id, chc_domain: tmpl.domain, game_type: tmpl.gameType,
          final_score: finalScore, star_rating: starRating, development_level: devLevel as any,
          score_breakdown: { accuracy, completionTime: tmpl.duration, errors: 0 },
          feedback: feedbackMap[tmpl.domain].child, parent_recommendation: feedbackMap[tmpl.domain].parent,
        },
      });
      sessionCount++;
    }
  }
  console.log(`  ✅ ${sessionCount} game sessions with telemetry & assessments created`);

  // ==================== STICKER ASSIGNMENTS ====================
  console.log('🏆 Assigning stickers...');
  let stickerCount = 0;
  const stickerSubset = stickers.slice(0, 5);
  for (let i = 0; i < 20; i++) {
    const count = 3 + (i % 3);
    for (let j = 0; j < count && j < stickerSubset.length; j++) {
      await prisma.anak_child_stickers.create({
        data: { child_id: children[i].id, sticker_id: stickerSubset[j].id },
      });
      stickerCount++;
    }
  }
  console.log(`  ✅ ${stickerCount} stickers assigned`);

  // ==================== COMMUNITY POSTS ====================
  console.log('💬 Creating community posts...');
  const postContents = [
    'Anak saya baru saja menyelesaikan tes memori dan hasilnya luar biasa!',
    'Sharing pengalaman: game puzzle sangat membantu perkembangan visual anak saya',
    'Ada yang punya rekomendasi aktivitas untuk melatih penalaran logis anak?',
    'Alhamdulillah, anak saya sudah konsisten bermain edukatif 5 hari berturut-turut!',
    'Baru konsultasi dengan Dr. Nizar, sangat membantu untuk memahami perkembangan anak',
    'Tips: bermain memory card sebelum tidur ternyata efektif untuk melatih daya ingat!',
    'Anak saya senang sekali mengumpulkan stiker digital. Motivasi yang bagus!',
    'Kapan ya waktu yang tepat untuk mulai tes kognitif anak?',
    'Pattern recognition game membuat anak saya lebih jeli memperhatikan detail',
    'Bersyukur ada platform seperti ini untuk pantau tumbuh kembang anak',
    'Anak saya suka banget sama game urutan angka. Ada level yang lebih sulit?',
    'Sharing: cara saya memanfaatkan laporan CHC untuk stimulasi anak di rumah',
    'Ada yang sudah coba fitur konsultasi psikolog? Bagaimana pengalamannya?',
    'Tips parenting: jangan bandingkan perkembangan anak satu dengan yang lain',
    'Senang lihat anak-anak belajar sambil bermain. Semangat para orang tua!',
  ];

  const posts = await Promise.all(
    postContents.map((content, i) =>
      prisma.anak_posts.create({
        data: { author_id: users[i].id, content, tags: ['parenting', 'tips'] },
      })
    )
  );

  // Comments on first 5 posts
  const commentTexts = ['Setuju!', 'Terima kasih sharingnya!', 'Mau coba juga'];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      await prisma.anak_comments.create({
        data: { post_id: posts[i].id, author_id: users[49 - j].id, content: commentTexts[j] },
      });
    }
  }

  // Likes
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
      await prisma.anak_post_likes.create({
        data: { post_id: posts[i].id, user_id: users[j + 10].id },
      }).catch(() => {}); // ignore duplicates
    }
  }
  console.log(`  ✅ ${posts.length} posts, 15 comments, 50 likes created`);

  console.log('\n🎉 Seeding complete!');
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
