export interface Reply {
  author: string;
  content: string;
  isExpert?: boolean;
}

export interface Post {
  id: number;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
  replies?: Reply[];
}

export const samplePosts: Post[] = [
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
